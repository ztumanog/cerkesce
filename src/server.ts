/**
 * Express Server
 * Phase 8.2: Deployment
 *
 * Express API Server:
 * - apiRouter: /api/v1/*
 * - errorHandler: Hata yakalama
 * - PORT: 3001
 */

import express from 'express';
import { apiRouter } from './infrastructure/api/routes';
import { errorHandler } from './infrastructure/api/middleware/errorHandler';

const app = express();
const PORT = process.env.PORT || 3001;

// 1. Body parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// 2. API Router
app.use('/api/v1', apiRouter);

// 3. Error Handler (en son)
app.use(errorHandler);

// 4. Server baslat
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`[SERVER] Express API calisiyor: http://localhost:${PORT}`);
    console.log(`[SERVER] API base: http://localhost:${PORT}/api/v1`);
  });
}

export { app };
