import { Router, Request, Response } from 'express';
import crypto from 'crypto';
import { createClient } from '@supabase/supabase-js';
import { sendDiscordAlert } from '../utils/discord.js';

const router = Router();

const SUPABASE_URL = process.env.SUPABASE_URL || '';
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY || '';

const supabase = createClient(
  SUPABASE_URL.startsWith('http') ? SUPABASE_URL : 'https://placeholder.supabase.co',
  SUPABASE_ANON_KEY || 'placeholder'
);

// POST /api/v1/payments/webhook
router.post(['/webhook', '/api/v1/payments/webhook'], async (req: Request, res: Response): Promise<void> => {
  try {
    const signature = req.headers['x-razorpay-signature'] as string;
    const secret = process.env.RAZORPAY_WEBHOOK_SECRET;

    if (secret && !secret.includes('sample_webhook_secret') && !secret.includes('your_razorpay')) {
      const payload = typeof req.body === 'string' ? req.body : JSON.stringify(req.body);
      const generatedSignature = crypto
        .createHmac('sha256', secret)
        .update(payload)
        .digest('hex');

      if (generatedSignature !== signature) {
        res.status(400).json({
          status: 'error',
          message: 'Invalid webhook signature',
        });
        return;
      }
    }

    const event = req.body?.event;

    if (event === 'payment.captured' || event === 'order.paid') {
      const paymentEntity = req.body?.payload?.payment?.entity || req.body?.payload?.order?.entity;
      const razorpayOrderId = paymentEntity?.order_id || paymentEntity?.id;
      const razorpayPaymentId = paymentEntity?.id || `pay_${Date.now()}`;

      if (razorpayOrderId) {
        // a. Update Supabase 'bookings' table where payment_order_id = razorpayOrderId
        let updatedBooking: any = null;

        if (SUPABASE_URL.startsWith('http') && !SUPABASE_URL.includes('sample-project')) {
          const { data, error } = await supabase
            .from('bookings')
            .update({
              payment_status: 'CONFIRMED',
              payment_id: razorpayPaymentId,
            })
            .eq('payment_order_id', razorpayOrderId)
            .select();

          if (error) {
            console.error('❌ Webhook Supabase update error:', error);
          } else if (data && data.length > 0) {
            updatedBooking = data[0];
          }
        }

        const bookingId = updatedBooking?.id || `bk_${Date.now()}`;
        const slotId = updatedBooking?.slot_id || paymentEntity?.notes?.slotId || 'slot_webhook';
        const userId = updatedBooking?.user_id || paymentEntity?.notes?.userId || 'usr_webhook';

        // b. Call sendDiscordAlert(...) with updated booking details
        sendDiscordAlert({
          bookingId,
          slotId,
          userId,
          paymentId: razorpayPaymentId,
        }).catch((err) => console.error('❌ Webhook Discord alert error:', err));
      }
    }

    // c. Return HTTP 200 { "status": "ok" }
    res.status(200).json({ status: 'ok' });
  } catch (error: any) {
    res.status(500).json({
      status: 'error',
      message: error.message || 'Internal server error processing payment webhook',
    });
  }
});

export default router;
