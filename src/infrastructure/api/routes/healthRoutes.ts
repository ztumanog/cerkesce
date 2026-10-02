import { Router } from 'express';
import { HealthController } from '../controllers/HealthController';

const healthRouter = Router();
const controller = new HealthController();

// Full health
healthRouter.get('/', controller.getHealth);

// Detailed health
healthRouter.get('/detailed', controller.getDetailedHealth);

// Liveness probe — process canli mi?
healthRouter.get('/live', (req, res) => {
  res.status(200).json({
    status: 'ok',
    service: 'express',
    timestamp: new Date().toISOString(),
  });
});

// Readiness probe — trafik almaya hazir mi?
healthRouter.get('/ready', (req, res) => {
  const memory = process.memoryUsage();
  const heapUsedMB = Math.round(memory.heapUsed / 1024 / 1024);
  const isReady = heapUsedMB < 1024; // 1 GB altinda

  res.status(isReady ? 200 : 503).json({
    status: isReady ? 'ok' : 'not_ready',
    service: 'express',
    checks: {
      memory: isReady ? 'ok' : 'high',
      heapUsedMB,
    },
    timestamp: new Date().toISOString(),
  });
});

export { healthRouter };
