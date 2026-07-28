import { Router, Request, Response } from 'express';
import { processFlightUpdate } from '../services/telemetryService.js';

const router = Router();

// POST /api/v1/telemetry/flight-update
router.post(
  ['/flight-update', '/api/v1/telemetry/flight-update'],
  async (req: Request, res: Response): Promise<void> => {
    try {
      const {
        flightNumber,
        userId,
        bookingId,
        slotId,
        originalLayoverMinutes,
        delayMinutes,
      } = req.body || {};

      if (
        !flightNumber ||
        !userId ||
        !bookingId ||
        originalLayoverMinutes === undefined ||
        originalLayoverMinutes === null ||
        delayMinutes === undefined ||
        delayMinutes === null
      ) {
        res.status(400).json({
          status: 'error',
          message:
            'Missing required body fields: flightNumber, userId, bookingId, originalLayoverMinutes, delayMinutes',
        });
        return;
      }

      const result = await processFlightUpdate({
        flightNumber,
        userId,
        bookingId,
        slotId,
        originalLayoverMinutes: Number(originalLayoverMinutes),
        delayMinutes: Number(delayMinutes),
      });

      res.status(result.statusCode).json({
        status: result.status,
        message: result.message,
        netLayoverMinutes: result.netLayoverMinutes,
        ...(result.refundStatus && { refundStatus: result.refundStatus }),
      });
    } catch (error: any) {
      res.status(500).json({
        status: 'error',
        message: error.message || 'Internal server error processing flight telemetry update',
      });
    }
  }
);

export default router;
