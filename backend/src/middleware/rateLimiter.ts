import rateLimit from 'express-rate-limit';

// Global API rate limiter: Max 120 requests per minute per IP.
// Provides baseline Layer 7 DDoS mitigation and API flood protection.
export const globalApiLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 120,
  message: {
    status: 'error',
    message: 'Too many requests from this IP. Please slow down and try again later.',
  },
  standardHeaders: true,
  legacyHeaders: false,
  validate: { xForwardedForHeader: false },
});

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

// Contact form rate limiter: Max 5 inquiries per 15 minutes per IP.
// Prevents email bombing, database flooding, and spam abuse.
export const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5,
  message: {
    status: 'error',
    message: 'Too many contact inquiries from this IP, please try again after 15 minutes.',
  },
  standardHeaders: true,
  legacyHeaders: false,
  validate: { xForwardedForHeader: false },
});

// Voucher verification rate limiter: Max 30 scans/requests per 15 minutes per IP.
// Prevents brute-forcing voucher tokens or scanning flood.
export const verifyLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 30,
  message: {
    status: 'error',
    message: 'Too many verification attempts from this IP, please try again later.',
  },
  standardHeaders: true,
  legacyHeaders: false,
  validate: { xForwardedForHeader: false },
});
