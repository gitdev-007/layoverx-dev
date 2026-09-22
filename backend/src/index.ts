import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import layoverRouter from './routes/layover.js';
import servicesRouter from './routes/services.js';
import bookingRouter from './routes/booking.js';
import itineraryRouter from './routes/itinerary.js';
import telemetryRouter from './routes/telemetry.js';
import paymentsRouter from './routes/payments.js';
import flightRouter from './routes/flight.js';
import verifyRouter from './routes/verify.js';
import opsRouter from './routes/ops.js';
import userRouter from './routes/user.js';
import bookingRoutesRouter from './routes/bookingRoutes.js';
import contactRouter from './routes/contact.js';
import { errorHandler } from './middleware/errorHandler.js';
import {
  globalApiLimiter,
  bookingLimiter,
  flightLimiter,
  contactLimiter,
  verifyLimiter,
} from './middleware/rateLimiter.js';

dotenv.config();

const app: Express = express();
app.disable('x-powered-by');
app.set('trust proxy', 1);
const PORT = process.env.PORT || 5000;

// Set standard API security headers
app.use((_req: Request, res: Response, next: NextFunction): void => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  res.setHeader('Permissions-Policy', 'geolocation=(), microphone=(), camera=()');
  next();
});

// Strict CORS: Only allow production LayoverX domains and local development
const allowedOrigins = [
  'https://layoverx.in',
  'https://www.layoverx.in',
  ...(process.env.NODE_ENV !== 'production' ? ['http://localhost:3000', 'http://127.0.0.1:3000'] : []),
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
    optionsSuccessStatus: 200,
  })
);

// Payload size capping (Mitigates Memory Exhaustion / Large Payload DDoS)
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));

// Prototype pollution mitigation guard
app.use((req: Request, res: Response, next: NextFunction): void => {
  const sanitizeObject = (obj: any): boolean => {
    if (!obj || typeof obj !== 'object') return true;
    for (const key of Object.keys(obj)) {
      if (key === '__proto__' || key === 'constructor' || key === 'prototype') {
        return false;
      }
      if (typeof obj[key] === 'object' && !sanitizeObject(obj[key])) {
        return false;
      }
    }
    return true;
  };

  if (req.body && !sanitizeObject(req.body)) {
    res.status(400).json({
      type: 'https://layoverx.in/errors/security-violation',
      title: 'Malicious payload rejected (prototype pollution detected)',
      status: 400,
      code: 'PROTOTYPE_POLLUTION_BLOCKED',
    });
    return;
  }
  next();
});

// Health check endpoint (sanitized for production)
app.get(['/health', '/api/v1/health'], async (req: Request, res: Response): Promise<void> => {
  let dbStatus = 'disconnected';
  try {
    const { supabase, SUPABASE_URL } = await import('./utils/supabase.js');
    if (SUPABASE_URL.startsWith('http') && !SUPABASE_URL.includes('sample-project')) {
      const { error } = await supabase.from('services').select('id').limit(1);
      if (!error) {
        dbStatus = 'connected';
      }
    } else {
      dbStatus = 'connected (mock mode)';
    }
  } catch (err) {
    console.warn('⚠️ Health Check database ping failed:', err);
  }

  res.status(200).json({
    status: dbStatus.includes('disconnected') ? 'degraded' : 'online',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'production',
    uptime: process.uptime(),
    checks: {
      database: dbStatus,
    },
  });
});

// Mount Baseline Layer 7 DDoS Rate Limiter (120 req/min per IP)
app.use(['/api', '/api/v1'], globalApiLimiter);

// Mount Operation-Specific Rate Limiters
app.use(['/api/v1/booking', '/api/v1/bookings', '/api/bookings'], bookingLimiter);
app.use('/api/v1/flight', flightLimiter);
app.use('/api/v1/contact', contactLimiter);
app.use('/api/v1/verify', verifyLimiter);

// API Routes
app.use('/api/v1/layover', layoverRouter);
app.use('/api/v1/services', servicesRouter);
app.use('/api/v1/booking', bookingRouter);
app.use('/api/v1/booking', bookingRoutesRouter);
app.use('/api/v1/itinerary', itineraryRouter);
app.use('/api/v1/telemetry', telemetryRouter);
app.use('/api/v1/payments', paymentsRouter);
app.use('/api/v1/flight', flightRouter);
app.use('/api/v1/verify', verifyRouter);
app.use('/api/v1/ops', opsRouter);
app.use('/api/v1/contact', contactRouter);
app.use('/api/user', userRouter);
app.use('/api/bookings', bookingRoutesRouter);
app.use('/api/v1/bookings', bookingRoutesRouter);

// Centralized RFC 7807 Error Handler
app.use(errorHandler);



// Startup helper to log all registered Express routes
function printRoutes(app: Express) {
  console.log('\n📌 Registered Express Routes:');
  
  const logRoutes = (stack: any[], prefix = '') => {
    stack.forEach((layer) => {
      if (layer.route) {
        const methods = Object.keys(layer.route.methods)
          .map((m) => m.toUpperCase())
          .join(', ');
        const path = Array.isArray(layer.route.path) ? layer.route.path.join(' | ') : layer.route.path;
        console.log(`  Registered: ${methods} ${prefix}${path}`);
      } else if (layer.name === 'router' && layer.handle && layer.handle.stack) {
        let routePrefix = prefix;
        if (layer.regexp && layer.regexp.source) {
          const match = layer.regexp.source.match(/^\^\\?\/([^\\]*)/);
          if (match && match[1]) {
            routePrefix += '/' + match[1].replace(/\\\//g, '/');
          }
        }
        logRoutes(layer.handle.stack, routePrefix);
      }
    });
  };

  if (app._router && app._router.stack) {
    logRoutes(app._router.stack);
  }
}

function startKeepAlive() {
  if (process.env.NODE_ENV !== 'production') return;

  const healthUrl = process.env.SELF_URL || `https://layoverx-dev.onrender.com/api/v1/health`;
  console.log(`📡 Starting Keep-Alive utility pinging ${healthUrl} every 10 minutes...`);

  setInterval(async () => {
    try {
      const res = await fetch(healthUrl);
      console.log(`[Keep-Alive] Pinged health endpoint. Status: ${res.status}`);
    } catch (err: any) {
      console.warn(`[Keep-Alive] Ping failed: ${err.message}`);
    }
  }, 10 * 60 * 1000);
}

// Start server
let server: any;
if (process.env.NODE_ENV !== 'test') {
  server = app.listen(PORT, () => {
    console.log(`🚀 LayoverX Backend running on port ${PORT}`);
    printRoutes(app);

    // Production key format validation audit
    const rzpKeyId = process.env.RAZORPAY_KEY_ID || '';
    const rzpSecret = process.env.RAZORPAY_KEY_SECRET || '';
    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET || '';
    const isProduction = process.env.NODE_ENV === 'production';
    if (isProduction) {
      if (!rzpKeyId.startsWith('rzp_live_')) {
        console.warn('⚠️  LAUNCH WARNING: RAZORPAY_KEY_ID does not start with "rzp_live_". Test keys detected in production!');
      }
      if (!webhookSecret || webhookSecret.trim() === '') {
        console.warn('⚠️  LAUNCH WARNING: RAZORPAY_WEBHOOK_SECRET is not set. Webhook verification will reject all events.');
      }
    }

    if (!process.env.AIRLABS_API_KEY) {
      console.log('ℹ️ LAUNCH INFO: AIRLABS_API_KEY missing. Running in Mock Flight Mode.');
    } else {
      console.log('✈️ AirLabs Flight Telemetry Service initialized successfully.');
    }

    startKeepAlive();
  });

  // Slowloris & HTTP connection exhaustion protection
  server.setTimeout(30000); // 30s connection timeout
  server.keepAliveTimeout = 65000; // 65s keep-alive timeout
  server.headersTimeout = 66000; // 66s headers timeout
}

function handleGracefulShutdown(signal: string) {
  console.log(`🛑 Received ${signal}. Shutting down gracefully...`);
  if (server) {
    server.close(() => {
      console.log('⚡ HTTP server closed.');
      process.exit(0);
    });

    setTimeout(() => {
      console.error('⚠️ Force exit triggered.');
      process.exit(1);
    }, 10000);
  } else {
    process.exit(0);
  }
}

process.on('SIGTERM', () => handleGracefulShutdown('SIGTERM'));
process.on('SIGINT', () => handleGracefulShutdown('SIGINT'));

export default app;
