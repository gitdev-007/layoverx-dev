import { Router, Request, Response } from 'express';
import crypto from 'crypto';
import { sendDiscordAlert } from '../utils/discord.js';
import { supabase, SUPABASE_URL } from '../utils/supabase.js';

const router = Router();

// POST /api/v1/payments/webhook
router.post(['/webhook', '/api/v1/payments/webhook'], async (req: Request, res: Response): Promise<void> => {
  try {
    const signature = req.headers['x-razorpay-signature'] as string;
    const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
    const isProduction = process.env.NODE_ENV === 'production';

    const hasSecret = !!(secret && secret.trim() !== '');

    if (hasSecret) {
      if (!signature) {
        res.status(401).json({
          status: 'error',
          message: 'Missing x-razorpay-signature header',
        });
        return;
      }

      const payload = typeof req.body === 'string' ? req.body : JSON.stringify(req.body);
      const generatedSignature = crypto
        .createHmac('sha256', secret)
        .update(payload)
        .digest('hex');

      const isValidSignature = (generatedSignature === signature);
      if (!isValidSignature) {
        res.status(401).json({
          status: 'error',
          message: 'Invalid webhook signature',
        });
        return;
      }
    } else {
      if (isProduction) {
        res.status(401).json({
          status: 'error',
          message: 'RAZORPAY_WEBHOOK_SECRET is not configured on server',
        });
        return;
      }
      console.log('[DEV] Bypassing webhook signature verification');
    }

    const event = req.body?.event;

    if (event === 'payment.captured' || event === 'order.paid') {
      const paymentEntity = req.body?.payload?.payment?.entity || req.body?.payload?.order?.entity;
      const razorpayOrderId = paymentEntity?.order_id;
      const razorpayPaymentId = paymentEntity?.id || `pay_${Date.now()}`;
      const bookingIdFromNotes = paymentEntity?.notes?.bookingId || paymentEntity?.notes?.booking_id;

      if (bookingIdFromNotes || razorpayOrderId) {
        // a. Update Supabase 'bookings' table where id = bookingId or payment_order_id = razorpayOrderId
        let updatedBooking: any = null;

        if (SUPABASE_URL.startsWith('http') && !SUPABASE_URL.includes('sample-project')) {
          // Double-capture idempotency guard: skip if already CONFIRMED
          let existingStatus: string | null = null;
          if (bookingIdFromNotes) {
            const { data: existing } = await supabase
              .from('bookings')
              .select('payment_status')
              .eq('id', bookingIdFromNotes)
              .maybeSingle();
            existingStatus = existing?.payment_status;
          } else if (razorpayOrderId) {
            const { data: existing } = await supabase
              .from('bookings')
              .select('payment_status')
              .eq('payment_order_id', razorpayOrderId)
              .maybeSingle();
            existingStatus = existing?.payment_status;
          }

          if (existingStatus === 'CONFIRMED') {
            console.log(`[WEBHOOK] Booking already CONFIRMED. Skipping duplicate capture for order ${razorpayOrderId}`);
          } else {
            let query = supabase
              .from('bookings')
              .update({
                payment_status: 'CONFIRMED',
                payment_id: razorpayPaymentId,
              });

            if (bookingIdFromNotes) {
              query = query.eq('id', bookingIdFromNotes);
            } else {
              query = query.eq('payment_order_id', razorpayOrderId);
            }

            const { data, error } = await query.select();

            if (error) {
              console.error('❌ Webhook Supabase update error:', error);
            } else if (data && data.length > 0) {
              updatedBooking = data[0];
            }
          }
        }

        const bookingId = updatedBooking?.id || bookingIdFromNotes || `bk_${Date.now()}`;
        const slotId = updatedBooking?.slot_id || paymentEntity?.notes?.slotId || 'slot_webhook';
        const userId = updatedBooking?.user_id || paymentEntity?.notes?.userId || 'usr_webhook';

        const notes = paymentEntity?.notes || {};
        const redemptionToken = updatedBooking?.vendor_ref_code || notes.redemptionToken || 'LX-7842';
        const calculatedPickupTime = calculatePickupTime(notes.arrivalTime || updatedBooking?.arrival_time);

        // b. Trigger the Discord notification ping to your ops channel
        sendDiscordAlert({
          bookingId,
          slotId,
          userId,
          paymentId: razorpayPaymentId,
          leadPassengerName: notes.leadPassengerName,
          passportId: notes.passportId,
          flightNumber: notes.flightNumber,
          flightDate: notes.flightDate,
          serviceNames: notes.serviceNames || 'Niranta Airport Transit Hotel',
          redemptionToken,
          calculatedPickupTime,
        }).catch((err) => console.error('❌ Webhook Discord alert error:', err));
      }
    }

    // c. Return HTTP 200 OK
    res.status(200).json({
      status: 'success',
      message: 'Webhook processed successfully',
    });
  } catch (error: any) {
    res.status(500).json({
      status: 'error',
      message: error.message || 'Internal server error processing payment webhook',
    });
  }
});

function calculatePickupTime(arrivalTimeStr?: string): string {
  if (!arrivalTimeStr) return '15:00';
  if (arrivalTimeStr.includes(':')) {
    const parts = arrivalTimeStr.split(':');
    const hours = parseInt(parts[0], 10);
    const minutes = parseInt(parts[1], 10);
    if (!isNaN(hours) && !isNaN(minutes)) {
      const totalMinutes = hours * 60 + minutes + 30;
      const newHours = Math.floor(totalMinutes / 60) % 24;
      const newMinutes = totalMinutes % 60;
      return `${String(newHours).padStart(2, '0')}:${String(newMinutes).padStart(2, '0')}`;
    }
  }
  try {
    const date = new Date(arrivalTimeStr);
    if (!isNaN(date.getTime())) {
      const shifted = new Date(date.getTime() + 30 * 60 * 1000);
      return shifted.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
    }
  } catch (e) {}
  return '15:00';
}

export default router;
