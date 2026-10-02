/**
 * Main API Router
 * ADR-GOV-005: API Gateway olgunlastirma
 * Phase 7.1-7.2: Analytics + Monitoring
 */

import { Router } from 'express';
import { discoveryRouter } from './discoveryRoutes';
import { graphqlRouter } from './graphqlRoutes';
import { analyticsRouter } from './analyticsRoutes';
import { healthRouter } from './healthRoutes';
import { dashboardRouter } from './dashboardRoutes';

const apiRouter = Router();

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

export { apiRouter };
