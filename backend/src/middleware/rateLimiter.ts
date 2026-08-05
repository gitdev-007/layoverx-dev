import rateLimit from 'express-rate-limit';

// Hold Slot & Order Creation rate limiter: Max 10 requests per 15-minute window per IP.
export const bookingLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10,
  message: {
    status: 'error',
    message: 'Too many booking requests from this IP, please try again after 15 minutes',
  },
  standardHeaders: true,
  legacyHeaders: false,
  validate: { xForwardedForHeader: false },
});

// Flight Tracking rate limiter: Max 20 requests per 15-minute window per IP.
export const flightLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20,
  message: {
    status: 'error',
    message: 'Too many flight tracking requests from this IP, please try again after 15 minutes',
  },
  standardHeaders: true,
  legacyHeaders: false,
  validate: { xForwardedForHeader: false },
});
