import { Router, Request, Response } from 'express';
import { trackAndProtectFlight } from '../services/flightService.js';

const router = Router();

// POST /api/v1/flight/track
router.post(['/track', '/api/v1/flight/track'], async (req: Request, res: Response): Promise<void> => {
  try {
    const { flightNumber, flightDate, bookingId } = req.body || {};

    if (!flightNumber || !flightDate) {
      res.status(400).json({
        status: 'error',
        message: 'Missing required body fields: flightNumber, flightDate',
      });
      return;
    }

    const result = await trackAndProtectFlight({
      flightNumber: String(flightNumber),
      flightDate: String(flightDate),
      bookingId: bookingId ? String(bookingId) : undefined,
    });

    if (!result.success) {
      res.status(result.statusCode || 500).json({
        status: 'error',
        message: result.message || 'Failed to track flight status',
      });
      return;
    }

    res.status(200).json({
      status: 'success',
      flight: {
        flightNumber: result.flightNumber,
        status: result.status,
        delayMinutes: result.delayMinutes,
        originalETA: result.originalETA,
        updatedETA: result.updatedETA,
        slotProtectionApplied: result.slotProtectionApplied,
      },
    });
  } catch (error: any) {
    res.status(500).json({
      status: 'error',
      message: error.message || 'Internal server error while tracking flight status',
    });
  }
});

export default router;
