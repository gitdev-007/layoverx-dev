import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import layoverRouter from './routes/layover.js';
import servicesRouter from './routes/services.js';
import bookingRouter from './routes/booking.js';

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 5000;

// Middlewares - Ensure JSON parsing middleware is loaded before routes
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Health check endpoint
app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({
    status: 'ok',
    service: 'LayoverX Backend API',
    timestamp: new Date().toISOString(),
  });
});

// API Routes
app.use('/api/v1/layover', layoverRouter);
app.use('/api/v1/services', servicesRouter);
app.use('/api/v1/booking', bookingRouter);

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

// Start server
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`🚀 LayoverX Backend running on port ${PORT}`);
    printRoutes(app);
  });
}

export default app;
