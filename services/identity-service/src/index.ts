import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import config from './config';
import apiV1 from './api/v1';
import { logger } from './utils/logger';

dotenv.config();

const app: Express = express();
const port = config.port;

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/v1', apiV1);

// Health check endpoint
app.get('/', (req: Request, res: Response) => {
  res.send('Identity Service is healthy!');
});

app.listen(port, () => {
  logger.info(`[server]: Server is running at http://localhost:${port}`);
});
