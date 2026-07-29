import { Request, Response, NextFunction } from 'express';

// Simple regex matches to sanitize input strings
const ALPHANUM_HYPHEN_COLON = /^[a-zA-Z0-9\-:_]+$/;
const DATE_FORMAT = /^\d{4}-\d{2}-\d{2}$/;

export function sanitizeHoldSlot(req: Request, res: Response, next: NextFunction): void {
  const { userId, serviceId, slotId } = req.body || {};

  if (!userId || typeof userId !== 'string' || userId.length > 100) {
    res.status(400).json({ status: 'error', message: 'Invalid userId format or length' });
    return;
  }
  if (!serviceId || typeof serviceId !== 'string' || !ALPHANUM_HYPHEN_COLON.test(serviceId) || serviceId.length > 50) {
    res.status(400).json({ status: 'error', message: 'Invalid serviceId format' });
    return;
  }
  if (!slotId || typeof slotId !== 'string' || !ALPHANUM_HYPHEN_COLON.test(slotId) || slotId.length > 50) {
    res.status(400).json({ status: 'error', message: 'Invalid slotId format' });
    return;
  }

  next();
}

export function sanitizeCreateOrder(req: Request, res: Response, next: NextFunction): void {
  const { userId, serviceId, slotId, amount } = req.body || {};

  if (!userId || typeof userId !== 'string' || userId.length > 100) {
    res.status(400).json({ status: 'error', message: 'Invalid userId format or length' });
    return;
  }
  if (!serviceId || typeof serviceId !== 'string' || !ALPHANUM_HYPHEN_COLON.test(serviceId) || serviceId.length > 50) {
    res.status(400).json({ status: 'error', message: 'Invalid serviceId format' });
    return;
  }
  if (!slotId || typeof slotId !== 'string' || !ALPHANUM_HYPHEN_COLON.test(slotId) || slotId.length > 50) {
    res.status(400).json({ status: 'error', message: 'Invalid slotId format' });
    return;
  }
  if (typeof amount !== 'number' || amount < 0 || amount > 1000000) {
    res.status(400).json({ status: 'error', message: 'Invalid amount format or range' });
    return;
  }

  next();
}

export function sanitizeFlightTrack(req: Request, res: Response, next: NextFunction): void {
  const { flightNumber, flightDate, bookingId } = req.body || {};

  if (!flightNumber || typeof flightNumber !== 'string' || !ALPHANUM_HYPHEN_COLON.test(flightNumber) || flightNumber.length > 20) {
    res.status(400).json({ status: 'error', message: 'Invalid flightNumber format' });
    return;
  }
  if (!flightDate || typeof flightDate !== 'string' || (!DATE_FORMAT.test(flightDate) && isNaN(Date.parse(flightDate)))) {
    res.status(400).json({ status: 'error', message: 'Invalid flightDate format' });
    return;
  }
  if (bookingId && (typeof bookingId !== 'string' || bookingId.length > 100)) {
    res.status(400).json({ status: 'error', message: 'Invalid bookingId format' });
    return;
  }

  next();
}
