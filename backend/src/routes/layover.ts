import { Router, Request, Response } from 'express';
import { calculateLayover } from '../services/layoverService.js';

const router = Router();

// POST /api/v1/layover/calculate
router.post('/calculate', async (req: Request, res: Response): Promise<void> => {
  try {
    const { terminal, arrivalTime, departureTime, passengers, destinationCoords } = req.body;

    if (!terminal || !arrivalTime || !departureTime) {
      res.status(400).json({
        error: 'Missing required fields: terminal, arrivalTime, departureTime',
      });
      return;
    }

    const result = await calculateLayover({
      terminal,
      arrivalTime,
      departureTime,
      passengers,
      destinationCoords,
    });

    res.status(200).json(result);
  } catch (error: any) {
    res.status(400).json({
      error: error.message || 'Failed to calculate layover safety metrics',
    });
  }
});

export default router;
