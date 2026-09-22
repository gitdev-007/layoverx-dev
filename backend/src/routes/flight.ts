import { Router, Response } from 'express';
import { trackAndProtectFlight } from '../services/flightService.js';
import { flightLimiter } from '../middleware/rateLimiter.js';
import { sanitizeFlightTrack } from '../middleware/sanitize.js';
import { optionalAuth, AuthenticatedRequest } from '../middleware/auth.js';

const router = Router();

// POST /api/v1/flight/track
router.post(['/track', '/api/v1/flight/track'], flightLimiter, optionalAuth, sanitizeFlightTrack, async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const { flightNumber, flightDate, bookingId } = req.body || {};

    if (!flightNumber || !flightDate) {
      res.status(400).json({
        status: 'error',
        message: 'Missing required body fields: flightNumber, flightDate',
      });
      return;
    }

    // IDOR protection: if bookingId is specified, caller must be authenticated
    if (bookingId && !req.user) {
      res.status(401).json({
        status: 'error',
        message: 'Authentication required to track and update booking flight status.',
      });
      return;
    }

    const result = await trackAndProtectFlight({
      flightNumber: String(flightNumber),
      flightDate: String(flightDate),
      bookingId: bookingId ? String(bookingId) : undefined,
      userId: req.user?.id,
      userRole: req.userRole || req.user?.role,
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
