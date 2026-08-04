import { Router, Request, Response } from 'express';
import multer from 'multer';
import { supabase, SUPABASE_URL } from '../utils/supabase.js';
import { extractTextFromFile, parseTicketTelemetry } from '../services/ticketParser.js';

const router = Router();
const upload = multer({ limits: { fileSize: 10 * 1024 * 1024 } }); // 10MB memory limit

router.post('/upload-ticket', upload.single('ticket'), async (req: Request, res: Response): Promise<void> => {
  try {
    const { phone, isConsented } = req.body || {};
    const file = req.file;

    if (!file || !phone) {
      res.status(400).json({ error: 'Missing e-ticket file or contact phone number.' });
      return;
    }

    // Local Open-Source Extraction
    const rawText = await extractTextFromFile(file.buffer, file.mimetype);
    const telemetry = parseTicketTelemetry(rawText);

    // Mock Mode fallback for dev/testing when Supabase is unconfigured
    if (!SUPABASE_URL.startsWith('http') || SUPABASE_URL.includes('sample-project')) {
      res.status(200).json({
        success: true,
        bookingId: `bk_${Date.now()}`,
        extracted: telemetry,
        message: 'Ticket uploaded and processed successfully (Mock Mode).'
      });
      return;
    }

    // 1. Upload to Supabase Private Bucket
    const fileExt = file.originalname.split('.').pop();
    const fileName = `${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;
    
    const { data: storageData, error: storageError } = await supabase.storage
      .from('e-tickets')
      .upload(fileName, file.buffer, { contentType: file.mimetype });

    if (storageError) throw storageError;

    // 2. Set 48-Hour Retention Limit for DPDP Act
    const deletionTimestamp = new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString();

    // 3. Insert Database Booking Record
    const { data: booking, error: dbError } = await supabase
      .from('bookings')
      .insert([
        {
          user_phone: phone,
          ticket_file_path: storageData.path,
          extracted_pnr: telemetry.pnr,
          extracted_inbound_flight: telemetry.flights[0] || null,
          extracted_outbound_flight: telemetry.flights[1] || null,
          dpdp_consented: isConsented === 'true' || isConsented === true,
          scheduled_deletion_at: deletionTimestamp,
          status: 'pending_verification'
        }
      ])
      .select()
      .single();

    if (dbError) throw dbError;

    res.status(200).json({
      success: true,
      bookingId: booking.id,
      extracted: telemetry,
      message: 'Ticket uploaded and processed successfully.'
    });

  } catch (error: any) {
    console.error('❌ Booking Upload Error:', error);
    res.status(500).json({ error: 'Failed to upload and process ticket.' });
  }
});

export default router;
