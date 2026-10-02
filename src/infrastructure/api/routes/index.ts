/**
 * Main API Router
 * ADR-GOV-005: API Gateway olgunlastirma
 * Phase 7.1-7.2: Analytics + Monitoring
 * Phase 8.1.4: Metrics
 */

import { Router } from 'express';
import { discoveryRouter } from './discoveryRoutes';
import { graphqlRouter } from './graphqlRoutes';
import { analyticsRouter } from './analyticsRoutes';
import { healthRouter } from './healthRoutes';
import { dashboardRouter } from './dashboardRoutes';
import { metricsRouter } from './metricsRoutes';
import { governanceRouter } from './governanceRoutes';

const apiRouter = Router();

// Metrics (auth yok - izleme icin)
apiRouter.use('/metrics', metricsRouter);

// Health (auth yok)
apiRouter.use('/health', healthRouter);

// REST API
apiRouter.use('/discovery', discoveryRouter);

// GraphQL API
apiRouter.use('/', graphqlRouter);

// Analytics API
apiRouter.use('/analytics', analyticsRouter);

// Dashboard API
apiRouter.use('/dashboard', dashboardRouter);

// Governance API
apiRouter.use('/governance', governanceRouter);

// Governance API
apiRouter.use('/governance', governanceRouter);

export { apiRouter };
