import { Router } from 'express';
import { DashboardController } from '../controllers/DashboardController';
import { monitoringMiddleware } from '../middleware/monitoringMiddleware';
import { rateLimiter } from '../middleware/rateLimiter';
import { authMiddleware } from '../middleware/authMiddleware';

const dashboardRouter = Router();
const controller = new DashboardController();

dashboardRouter.use(monitoringMiddleware);
dashboardRouter.use(rateLimiter);
dashboardRouter.use(authMiddleware);

dashboardRouter.get('/summary', controller.getDashboardSummary);
dashboardRouter.get('/reports', controller.getReports);

export { dashboardRouter };
