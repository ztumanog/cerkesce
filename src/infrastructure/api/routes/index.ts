/**
 * Main API Router
 * ADR-GOV-005: API Gateway olgunlastirma
 *
 * Tum route'lari birlestirir:
 * - /api/v1/discovery/* (REST)
 * - /api/v1/graphql (GraphQL)
 */

import { Router } from 'express';
import { discoveryRouter } from './discoveryRoutes';
import { graphqlRouter } from './graphqlRoutes';

const apiRouter = Router();

// REST API
apiRouter.use('/discovery', discoveryRouter);

// GraphQL API
apiRouter.use('/', graphqlRouter);

export { apiRouter };
