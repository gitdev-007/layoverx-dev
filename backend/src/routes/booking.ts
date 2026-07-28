import { Router, Request, Response } from 'express';
import { holdSlot, releaseSlot } from '../services/bookingLockService.js';

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
      holdExpiresInSeconds: result.holdExpiresInSeconds,
      lockKey: result.lockKey,
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

export default router;
