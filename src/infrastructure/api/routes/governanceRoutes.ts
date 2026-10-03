import { Router } from 'express';
import { GovernanceDashboardService } from '../../../infra/governance/GovernanceDashboardService';
import { GovernanceReportService } from '../../../infra/governance/GovernanceReportService';
import { OperationalIntelligenceService } from '../../../infra/operations/OperationalIntelligenceService';
import { GovernanceDashboardViewService } from '../../../infra/ui/GovernanceDashboardViewService';

const governanceRouter = Router();

governanceRouter.get('/dashboard', (_req, res) => {
  res.status(200).json(GovernanceDashboardService.getDashboard());
});

governanceRouter.get('/report', (_req, res) => {
  res.status(200).json(GovernanceReportService.generate());
});

governanceRouter.get('/report/markdown', (_req, res) => {
  res.setHeader('Content-Type', 'text/markdown');
  res.status(200).send(GovernanceReportService.toMarkdown(GovernanceReportService.generate()));
});

governanceRouter.get('/operations', (_req, res) => {
  res.status(200).json(OperationalIntelligenceService.getDashboard());
});

governanceRouter.get('/view', (_req, res) => {
  res.status(200).json(GovernanceDashboardViewService.getView());
});

export { governanceRouter };
