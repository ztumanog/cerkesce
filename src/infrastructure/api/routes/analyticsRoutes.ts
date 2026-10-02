import { Router } from 'express';
import { BatchExportController } from '../controllers/BatchExportController';
import { monitoringMiddleware } from '../middleware/monitoringMiddleware';
import { rateLimiter } from '../middleware/rateLimiter';
import { authMiddleware } from '../middleware/authMiddleware';

const analyticsRouter = Router();
const controller = new BatchExportController();

// 1. Monitoring
analyticsRouter.use(monitoringMiddleware);

// 2. Rate limiting
analyticsRouter.use(rateLimiter);

// 3. Authentication
analyticsRouter.use(authMiddleware);

// 4. Batch Export
analyticsRouter.post('/batch-export', controller.postBatchExport);

export { analyticsRouter };
