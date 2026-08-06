import { Router, Request, Response } from 'express';
import multer from 'multer';
import Razorpay from 'razorpay';
import crypto from 'crypto';
import { supabase, SUPABASE_URL } from '../utils/supabase.js';
import { extractTextFromFile, parseTicketTelemetry } from '../services/ticketParser.js';
import { sendDiscordAlert } from '../utils/discord.js';

const router = Router();
const upload = multer({ limits: { fileSize: 10 * 1024 * 1024 } }); // 10MB limit

let razorpay: Razorpay | null = null;
const keyId = process.env.RAZORPAY_KEY_ID || '';
const keySecret = process.env.RAZORPAY_KEY_SECRET || '';
if (keyId && keySecret && !keyId.includes('sample')) {
  try {
    razorpay = new Razorpay({
      key_id: keyId,
      key_secret: keySecret,
    });
  } catch (err) {
    console.error('⚠️ Failed to initialize Razorpay client:', err);
  }
}

// Helper to check for valid PostgreSQL UUID format
const isValidUUID = (str: any) => {
  if (!str || typeof str !== 'string') return false;
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuidRegex.test(str);
};

// ENDPOINT 1: UPLOAD TICKET, EXTRACT TELEMETRY & CREATE RAZORPAY ORDER
router.post('/create-checkout-order', upload.single('ticket'), async (req: Request, res: Response): Promise<void> => {
  try {
    const { phone, isConsented, userId, amount = 1499, slotId, serviceId } = req.body || {};
    const sanitizedSlotId = isValidUUID(slotId) ? slotId : null;
    const sanitizedServiceId = isValidUUID(serviceId) ? serviceId : null;
    const file = req.file;

    if (!userId || userId === 'undefined' || userId === 'null' || userId.trim() === '') {
      res.status(401).json({ error: 'Authentication required. Please log in.' });
      return;
    }
    if (!phone || !file) {
      res.status(400).json({ error: 'Missing e-ticket file or contact phone number.' });
      return;
    }

    // A. Upload E-Ticket to Supabase Private Bucket
    const fileExt = file.originalname.split('.').pop();
    const fileName = `${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;
    
    let ticketPath = `mock_bucket/${fileName}`;
    let telemetry: any = { pnr: 'XXXXXX', flights: [] };

    // Extract Flight Telemetry via local parser
    const rawText = await extractTextFromFile(file.buffer, file.mimetype);
    telemetry = parseTicketTelemetry(rawText);

    if (SUPABASE_URL.startsWith('http') && !SUPABASE_URL.includes('sample-project')) {
      const { data: storageData, error: storageError } = await supabase.storage
        .from('e-tickets')
        .upload(fileName, file.buffer, { contentType: file.mimetype });

      if (storageError) throw storageError;
      ticketPath = storageData.path;
    }

    // B. Generate Official Razorpay Order
    const numericAmount = Math.round(parseFloat(amount) * 100); // convert to paise
    let razorpayOrderId = `ord_mock_${Date.now()}`;
    let razorpayAmount = numericAmount;
    let razorpayCurrency = 'INR';

    if (razorpay) {
      try {
        const orderOptions = {
          amount: numericAmount,
          currency: 'INR',
          receipt: `rcpt_${Date.now()}`,
        };
        const razorpayOrder = await razorpay.orders.create(orderOptions);
        razorpayOrderId = razorpayOrder.id;
        razorpayAmount = Number(razorpayOrder.amount);
        razorpayCurrency = razorpayOrder.currency;
      } catch (err: any) {
        console.warn('⚠️ Razorpay order creation warning (using mock order):', err.message || err);
      }
    }

    // C. Insert Booking Record into Supabase with PENDING Status
    const deletionTimestamp = new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString();
    let bookingId = `bk_mock_${Date.now()}`;

    if (SUPABASE_URL.startsWith('http') && !SUPABASE_URL.includes('sample-project')) {
      const insertObj: any = {
        user_id: userId,
        user_phone: phone,
        ticket_file_path: ticketPath,
        extracted_pnr: telemetry.pnr,
        extracted_inbound_flight: telemetry.flights[0] || null,
        extracted_outbound_flight: telemetry.flights[1] || null,
        dpdp_consented: isConsented === 'true' || isConsented === true,
        scheduled_deletion_at: deletionTimestamp,
        payment_status: 'PENDING',
        amount: parseFloat(amount),
        currency: 'INR',
        payment_order_id: razorpayOrderId,
        slot_id: sanitizedSlotId,
        service_id: sanitizedServiceId,
        status: 'pending_verification'
      };

      let insertResult: any = null;

      const rawItinerary = req.body.itinerary || req.body.itinerary_details;
      let parsedItinerary: any[] = [];

      if (rawItinerary) {
        try {
          parsedItinerary = typeof rawItinerary === 'string'
            ? JSON.parse(rawItinerary)
            : rawItinerary;
        } catch (err: any) {
          console.error('❌ Itinerary JSON parse error:', err.message);
        }
      }

      console.log('💾 Saving to Supabase itinerary_details:', parsedItinerary);

      try {
        console.log('[API] Attempting booking insert with itinerary_details:', parsedItinerary);
        const resWithItineraryDetails = await supabase
          .from('bookings')
          .insert([{ ...insertObj, itinerary_details: parsedItinerary }])
          .select()
          .single();
        
        if (!resWithItineraryDetails.error) {
          insertResult = resWithItineraryDetails;
        } else {
          console.warn('⚠️ Error inserting with itinerary_details (might be missing column), attempting fallback:', resWithItineraryDetails.error.message);
        }
      } catch (dbErr: any) {
        console.warn('⚠️ Booking insert with itinerary_details column exception, falling back:', dbErr.message || dbErr);
      }

      if (!insertResult) {
        try {
          console.log('[API] Attempting booking insert with itinerary:', parsedItinerary);
          const resWithItinerary = await supabase
            .from('bookings')
            .insert([{ ...insertObj, itinerary: parsedItinerary }])
            .select()
            .single();
          
          if (!resWithItinerary.error) {
            insertResult = resWithItinerary;
          } else {
            console.warn('⚠️ Error inserting with itinerary (might be missing column), attempting fallback:', resWithItinerary.error.message);
          }
        } catch (dbErr: any) {
          console.warn('⚠️ Booking insert with itinerary column exception, falling back:', dbErr.message || dbErr);
        }
      }

      if (!insertResult) {
        insertResult = await supabase
          .from('bookings')
          .insert([insertObj])
          .select()
          .single();
      }

      const { data: booking, error: dbError } = insertResult;
      if (dbError) throw dbError;
      bookingId = booking.id;
    }

    res.status(200).json({
      success: true,
      bookingId: bookingId,
      orderId: razorpayOrderId,
      amount: razorpayAmount,
      currency: razorpayCurrency,
      keyId: process.env.RAZORPAY_KEY_ID || 'rzp_test_samplekey',
      extracted: telemetry,
    });

  } catch (error: any) {
    console.error('❌ Create Checkout Order Error:', error);
    res.status(500).json({ error: error.message || 'Failed to initiate checkout.' });
  }
});

// ENDPOINT 2: VERIFY RAZORPAY PAYMENT & MARK COMPLETED
router.post('/verify-payment', async (req: Request, res: Response): Promise<void> => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, bookingId } = req.body || {};

    if (!razorpay_order_id || !razorpay_payment_id || !bookingId) {
      res.status(400).json({ error: 'Missing payment verification params.' });
      return;
    }

    let isValid = true;
    if (!razorpay_order_id.startsWith('ord_mock_') && process.env.RAZORPAY_KEY_SECRET && !process.env.RAZORPAY_KEY_SECRET.includes('sample')) {
      const body = razorpay_order_id + '|' + razorpay_payment_id;
      const expectedSignature = crypto
        .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET || '')
        .update(body.toString())
        .digest('hex');

      isValid = expectedSignature === razorpay_signature;
    }

    if (!isValid) {
      res.status(400).json({ error: 'Invalid payment signature verification.' });
      return;
    }

    if (SUPABASE_URL.startsWith('http') && !SUPABASE_URL.includes('sample-project')) {
      const { data: updatedData, error: updateError } = await supabase
        .from('bookings')
        .update({
          payment_status: 'COMPLETED',
          payment_id: razorpay_payment_id,
          status: 'confirmed'
        })
        .eq('id', bookingId)
        .select()
        .single();

      if (updateError) throw updateError;

      // Send actual Discord alert
      if (updatedData) {
        try {
          await sendDiscordAlert({
            bookingId: updatedData.id,
            slotId: updatedData.slot_id || 'slot-1400',
            userId: updatedData.user_id || 'testuser01',
            paymentId: razorpay_payment_id || 'pay_test_54321',
            leadPassengerName: updatedData.extracted_pnr ? `Passenger (${updatedData.extracted_pnr})` : 'Passenger',
            flightNumber: updatedData.extracted_inbound_flight || 'AI302',
            redemptionToken: updatedData.vendor_ref_code || updatedData.id,
          });
        } catch (err: any) {
          console.error('❌ Failed to send Discord alert in verify-payment:', err.message || err);
        }
      }
    } else {
      // Send mock Discord alert in dev mode
      try {
        await sendDiscordAlert({
          bookingId: bookingId,
          slotId: 'slot-1400',
          userId: 'testuser01',
          paymentId: razorpay_payment_id || 'pay_test_54321',
          leadPassengerName: 'Passenger (MH202A)',
          flightNumber: 'AI302',
          redemptionToken: 'redem_token_mock',
        });
      } catch (err: any) {
        console.error('❌ Failed to send mock Discord alert in verify-payment:', err.message || err);
      }
    }

    res.status(200).json({
      success: true,
      message: 'Payment verified successfully.',
      bookingId: bookingId,
    });

  } catch (error: any) {
    console.error('❌ Verify Payment Error:', error);
    res.status(500).json({ error: error.message || 'Failed to verify payment.' });
  }
});

// ENDPOINT 3: GET BOOKING DETAILS BY ID
router.get('/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    if (SUPABASE_URL.startsWith('http') && !SUPABASE_URL.includes('sample-project')) {
      const { data: booking, error } = await supabase
        .from('bookings')
        .select('*')
        .eq('id', id)
        .maybeSingle();

      if (error) throw error;
      if (!booking) {
        res.status(404).json({ error: 'Booking not found.' });
        return;
      }
      res.status(200).json({ success: true, booking });
    } else {
      res.status(200).json({
        success: true,
        booking: {
          id,
          user_phone: '+91 98765 43210',
          ticket_file_path: 'mock_bucket/mock_ticket.pdf',
          extracted_pnr: 'MH202A',
          extracted_inbound_flight: 'AI302',
          extracted_outbound_flight: 'EK501',
          dpdp_consented: true,
          payment_status: 'COMPLETED',
          amount: 1499,
          currency: 'INR',
          status: 'confirmed',
          created_at: new Date().toISOString(),
        }
      });
    }
  } catch (error: any) {
    console.error('❌ Get Booking Error:', error);
    res.status(500).json({ error: error.message || 'Failed to fetch booking details.' });
  }
});

export default router;
