import { Router, Request, Response } from 'express';
import { supabase, SUPABASE_URL } from '../utils/supabase.js';

const router = Router();

router.post('/', async (req: Request, res: Response): Promise<void> => {
  try {
    const { fullName, email, phone, date, message } = req.body || {};

    if (!fullName || typeof fullName !== 'string' || fullName.trim().length === 0) {
      res.status(400).json({ error: 'Full name is required.' });
      return;
    }
    if (!email || typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      res.status(400).json({ error: 'A valid email address is required.' });
      return;
    }
    if (!phone || typeof phone !== 'string' || phone.trim().length < 7) {
      res.status(400).json({ error: 'A valid phone/WhatsApp number is required.' });
      return;
    }
    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      res.status(400).json({ error: 'Message content is required.' });
      return;
    }

    const cleanData = {
      full_name: fullName.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      layover_date: date ? String(date).trim() : null,
      message: message.trim(),
      created_at: new Date().toISOString(),
      source: 'web_contact_form',
    };

    if (SUPABASE_URL.startsWith('http') && !SUPABASE_URL.includes('sample-project')) {
      try {
        const { error } = await supabase.from('contact_inquiries').insert([cleanData]);
        if (error) {
          console.warn('⚠️ Supabase contact_inquiries insert fallback:', error.message);
        }
      } catch (dbErr: any) {
        console.warn('⚠️ DB insert exception in contact route:', dbErr.message || dbErr);
      }
    }

    console.log(`📩 [Contact Form Inquiry] From: ${cleanData.full_name} (${cleanData.email}, ${cleanData.phone}) - Layover: ${cleanData.layover_date}`);

    res.status(200).json({
      success: true,
      message: 'Your inquiry has been received by our CSMIA airport dispatch team. We usually respond within 15 minutes.',
    });
  } catch (error: any) {
    console.error('❌ Contact Form Error:', error);
    res.status(500).json({ error: error.message || 'Failed to submit contact inquiry.' });
  }
});

export default router;
