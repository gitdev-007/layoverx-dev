import { Router, Request, Response } from 'express';
import {
  holdSlot,
  releaseSlot,
  createBookingOrder,
  confirmBooking,
} from '../services/bookingLockService.js';

const router = Router();

// POST /api/v1/booking/hold-slot
router.post(['/hold-slot', '/api/v1/booking/hold-slot'], async (req: Request, res: Response): Promise<void> => {
  try {
    const { serviceId, slotId, userId } = req.body || {};

    if (!serviceId || !slotId || !userId) {
      res.status(400).json({
        status: 'error',
        message: 'Missing required body fields: serviceId, slotId, userId',
      });
      return;
    }

    const result = await holdSlot({ serviceId, slotId, userId });

    if (!result.success) {
      res.status(result.statusCode).json({
        status: 'error',
        message: result.message,
      });
      return;
    }

    res.status(200).json({
      status: 'success',
      message: result.message,
      bookingId: result.bookingId,
      slotId: result.slotId,
      serviceId: result.serviceId,
      paymentStatus: 'HELD',
      expiresAt: new Date(Date.now() + (result.holdExpiresInSeconds || 600) * 1000).toISOString(),
    });
  } catch (error: any) {
    if (error?.code === '23503' || error?.code === '22P02' || error?.message?.includes('foreign key')) {
      res.status(404).json({
        status: 'error',
        message: 'The specified service or slot ID was not found.',
      });
      return;
    }

    res.status(500).json({
      status: 'error',
      message: error.message || 'Internal server error while holding slot',
    });
  }
});

// POST /api/v1/booking/release-slot
router.post(['/release-slot', '/api/v1/booking/release-slot'], async (req: Request, res: Response): Promise<void> => {
  try {
    const { slotId, userId } = req.body || {};

    if (!slotId || !userId) {
      res.status(400).json({
        status: 'error',
        message: 'Missing required body fields: slotId, userId',
      });
      return;
    }

    const result = await releaseSlot({ slotId, userId });

    if (!result.success) {
      res.status(result.statusCode).json({
        status: 'error',
        message: result.message,
      });
      return;
    }

    res.status(200).json({
      status: 'success',
      message: result.message,
    });
  } catch (error: any) {
    if (error?.code === '23503' || error?.code === '22P02' || error?.message?.includes('foreign key')) {
      res.status(404).json({
        status: 'error',
        message: 'The specified service or slot ID was not found.',
      });
      return;
    }

    res.status(500).json({
      status: 'error',
      message: error.message || 'Internal server error while releasing slot',
    });
  }
});

// POST /api/v1/booking/create-order
router.post(['/create-order', '/api/v1/booking/create-order'], async (req: Request, res: Response): Promise<void> => {
  try {
    const { slotId, serviceId, userId, amount } = req.body || {};

    if (!slotId || !serviceId || !userId || amount === undefined || amount === null) {
      res.status(400).json({
        status: 'error',
        message: 'Missing required body fields: slotId, serviceId, userId, amount',
      });
      return;
    }

    const result = await createBookingOrder({ slotId, serviceId, userId, amount: Number(amount) });

    if (!result.success) {
      res.status(result.statusCode).json({
        status: 'error',
        message: result.message,
      });
      return;
    }

    res.status(200).json({
      status: 'success',
      bookingId: result.bookingId,
      razorpayOrderId: result.razorpayOrderId,
      amount: result.amount,
      currency: result.currency,
      keyId: result.keyId,
      order: result.order,
    });
  } catch (error: any) {
    res.status(500).json({
      status: 'error',
      message: error.message || 'Internal server error while creating order',
    });
  }
});

// POST /api/v1/booking/confirm
router.post(['/confirm', '/api/v1/booking/confirm'], async (req: Request, res: Response): Promise<void> => {
  try {
    const { bookingId, slotId, userId, paymentId } = req.body || {};

    if (!bookingId || !slotId || !userId || !paymentId) {
      res.status(400).json({
        status: 'error',
        message: 'Missing required body fields: bookingId, slotId, userId, paymentId',
      });
      return;
    }

    const result = await confirmBooking({ bookingId, slotId, userId, paymentId });

    if (!result.success) {
      res.status(result.statusCode).json({
        status: 'error',
        message: result.message,
      });
      return;
    }

    res.status(200).json({
      status: 'success',
      message: result.message,
      data: result.data,
    });
  } catch (error: any) {
    res.status(500).json({
      status: 'error',
      message: error.message || 'Internal server error while confirming booking',
    });
  }
});

router.get('/schema-debug', async (req: Request, res: Response) => {
  try {
    const SUPABASE_URL = process.env.SUPABASE_URL || '';
    const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY || '';
    const { createClient } = await import('@supabase/supabase-js');
    const db = createClient(
      SUPABASE_URL.startsWith('http') ? SUPABASE_URL : 'https://placeholder.supabase.co',
      SUPABASE_ANON_KEY || 'placeholder'
    );
    const { data, error } = await db.from('bookings').select('*').limit(1);
    if (error) {
      res.status(500).json({ error: error.message });
    } else if (data && data.length > 0) {
      res.status(200).json({ columns: Object.keys(data[0]) });
    } else {
      res.status(200).json({ message: 'No records found' });
    }
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
