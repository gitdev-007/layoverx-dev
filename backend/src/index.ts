import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
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

dotenv.config();

const app: Express = express();
app.set('trust proxy', 1);
const PORT = process.env.PORT || 5000;

const allowedOrigins = [
  'https://layoverx.in',
  'https://www.layoverx.in',
  'http://localhost:3000',
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin) || /\.vercel\.app$/.test(origin)) {
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
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Health check endpoint
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
      memoryUsage: process.memoryUsage(),
    },
  });
});

// API Routes
app.use('/api/v1/layover', layoverRouter);
app.use('/api/v1/services', servicesRouter);
app.use('/api/v1/booking', bookingRouter);
app.use('/api/v1/itinerary', itineraryRouter);
app.use('/api/v1/telemetry', telemetryRouter);
app.use('/api/v1/payments', paymentsRouter);
app.use('/api/v1/flight', flightRouter);
app.use('/api/v1/verify', verifyRouter);
app.use('/api/v1/ops', opsRouter);
app.use('/api/user', userRouter);
app.use('/api/bookings', bookingRoutesRouter);
app.use('/api/v1/bookings', bookingRoutesRouter);



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
