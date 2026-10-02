import { Router } from 'express';
import { DashboardService } from '../../../infra/telemetry/DashboardService';

const dashboardRouter = Router();

dashboardRouter.get('/', (_req, res) => {
  res.status(200).json(DashboardService.getDashboard());
});

export { dashboardRouter };
