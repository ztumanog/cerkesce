import { Router } from 'express';
import { ConceptNetworkController } from '../controllers/ConceptNetworkController';
import { DiscoveryGatewayController } from '../../../presentation/api/DiscoveryGatewayController';
import { monitoringMiddleware } from '../middleware/monitoringMiddleware';
import { rateLimiter } from '../middleware/rateLimiter';
import { authMiddleware } from '../middleware/authMiddleware';
import { cachingMiddleware } from '../middleware/cachingMiddleware';

const discoveryRouter = Router();
const controller = new ConceptNetworkController();
const gateway = new DiscoveryGatewayController();

// 1. Monitoring
discoveryRouter.use(monitoringMiddleware);

// 2. Rate limiting
discoveryRouter.use(rateLimiter);

// 3. Authentication
discoveryRouter.use(authMiddleware);

// 4. Caching (GET istekleri icin)
discoveryRouter.use(cachingMiddleware);

// 5. Concept Network
discoveryRouter.get('/concept-network', controller.getConceptNetwork);

// 6. Explore
discoveryRouter.get('/explore', async (req, res) => {
  const q = req.query.q as string;
  const dialect = req.query.dialect as string | undefined;
  const result = await gateway.explore(q, dialect);
  res.status(result.success ? 200 : 400).json(result);
});

// 7. Concept Details
discoveryRouter.get('/concept/:id', async (req, res) => {
  const result = await gateway.getConceptDetails(req.params.id);
  res.status(result.success ? 200 : 400).json(result);
});

export { discoveryRouter };
