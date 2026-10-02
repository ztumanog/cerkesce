import { Router } from 'express';
import { BatchExportController } from '../controllers/BatchExportController';
import { AnalyticsController } from '../controllers/AnalyticsController';
import { monitoringMiddleware } from '../middleware/monitoringMiddleware';
import { rateLimiter } from '../middleware/rateLimiter';
import { authMiddleware } from '../middleware/authMiddleware';

const analyticsRouter = Router();
const batchController = new BatchExportController();
const analyticsController = new AnalyticsController();

// 1. Monitoring
analyticsRouter.use(monitoringMiddleware);

// 2. Rate limiting
analyticsRouter.use(rateLimiter);

// 3. Authentication
analyticsRouter.use(authMiddleware);

// 4. Analytics API (Phase 7.1)
analyticsRouter.get('/summary', analyticsController.getSummary);
analyticsRouter.get('/families', analyticsController.getFamilies);
analyticsRouter.get('/top-roots', analyticsController.getTopRoots);
analyticsRouter.get('/top-relations', analyticsController.getTopRelations);

// 5. Batch Export (Phase 7.0.4)
analyticsRouter.post('/batch-export', batchController.postBatchExport);

export { analyticsRouter };
