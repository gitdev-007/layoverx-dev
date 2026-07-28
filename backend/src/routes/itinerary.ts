import { Router, Request, Response } from 'express';
import { getUserItinerary } from '../services/itineraryService.js';

const router = Router();

// GET /api/v1/itinerary/me?userId=string
router.get(['/me', '/api/v1/itinerary/me'], async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.query.userId as string | undefined;

    if (!userId || userId.trim() === '') {
      res.status(400).json({
        status: 'error',
        message: 'Missing required query parameter: userId',
      });
      return;
    }

    const result = await getUserItinerary(userId);

    if (!result.success) {
      res.status(result.statusCode).json({
        status: 'error',
        message: result.message || 'Failed to fetch user itinerary',
      });
      return;
    }

    res.status(200).json({
      status: 'success',
      count: result.count,
      itineraries: result.itineraries,
    });
  } catch (error: any) {
    res.status(500).json({
      status: 'error',
      message: error.message || 'Internal server error while fetching user itinerary',
    });
  }
});

export default router;
