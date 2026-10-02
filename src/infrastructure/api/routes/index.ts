/**
 * Main API Router
 * ADR-GOV-005: API Gateway olgunlastirma
 *
 * Tum route'lari birlestirir:
 * - /api/v1/discovery/* (REST)
 * - /api/v1/graphql (GraphQL)
 * - /api/v1/analytics/* (Batch Export)
 */

import { Router } from 'express';
import { discoveryRouter } from './discoveryRoutes';
import { graphqlRouter } from './graphqlRoutes';
import { analyticsRouter } from './analyticsRoutes';

const apiRouter = Router();

// REST API
apiRouter.use('/discovery', discoveryRouter);

// GraphQL API
apiRouter.use('/', graphqlRouter);

// Analytics API
apiRouter.use('/analytics', analyticsRouter);

export { apiRouter };
