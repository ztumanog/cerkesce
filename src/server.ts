/**
 * Express Server
 * Phase 8.2: Deployment
 *
 * Express API Server:
 * - /api/v1/* : Versiyonlu API
 * - /api/*    : Frontend uyumlulugu (alias)
 * - /         : API bilgisi
 */

import express from 'express';
import { apiRouter } from './infrastructure/api/routes';
import { errorHandler } from './infrastructure/api/middleware/errorHandler';
import { monitoringMiddleware } from './infrastructure/api/middleware/monitoringMiddleware';

const app = express();
const PORT = process.env.PORT || 3001;

// 1. Body parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// 2. CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

// 3. Monitoring (TUM istekleri kaydeder)
app.use(monitoringMiddleware);

// 4. Versiyonlu API
app.use('/api/v1', apiRouter);

// 5. Frontend uyumlulugu
app.use('/api', apiRouter);

// 6. Error Handler
app.use(errorHandler);

// 7. Root endpoint
app.get('/', (_req, res) => {
  res.json({
    name: 'Cerkesce API',
    version: '1.0.0',
    endpoints: {
      health: '/api/v1/health',
      detailedHealth: '/api/v1/health/detailed',
      metrics: '/api/v1/metrics',
      metricsJson: '/api/v1/metrics/json',
      discovery: '/api/v1/discovery',
      analytics: '/api/v1/analytics',
    },
  });
});

// 8. Server baslat
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`[SERVER] Express API calisiyor: http://localhost:${PORT}`);
    console.log(`[SERVER] API v1: http://localhost:${PORT}/api/v1`);
    console.log(`[SERVER] API alias: http://localhost:${PORT}/api`);
  });
}

export { app };
