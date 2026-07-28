import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import layoverRouter from './routes/layover.js';
import servicesRouter from './routes/services.js';

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
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

// Start server
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`🚀 LayoverX Backend running on port ${PORT}`);
  });
}

export default app;
