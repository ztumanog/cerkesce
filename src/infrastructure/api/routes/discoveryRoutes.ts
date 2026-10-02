import { Router } from 'express';
import { ConceptNetworkController } from '../controllers/ConceptNetworkController';
import { DiscoveryGatewayController } from '../../../presentation/api/DiscoveryGatewayController';
import { rateLimiter } from '../middleware/rateLimiter';
import { authMiddleware } from '../middleware/authMiddleware';

const discoveryRouter = Router();
const controller = new ConceptNetworkController();
const gateway = new DiscoveryGatewayController();

// 1. Rate limiting (tum endpoint'ler icin)
discoveryRouter.use(rateLimiter);

// 2. Authentication (tum endpoint'ler icin)
discoveryRouter.use(authMiddleware);

// 3. Concept Network (mevcut)
discoveryRouter.get('/concept-network', controller.getConceptNetwork);

// 4. Explore (yeni)
discoveryRouter.get('/explore', async (req, res) => {
  const q = req.query.q as string;
  const dialect = req.query.dialect as string | undefined;
  const result = await gateway.explore(q, dialect);
  res.status(result.success ? 200 : 400).json(result);
});

// 5. Concept Details (yeni)
discoveryRouter.get('/concept/:id', async (req, res) => {
  const result = await gateway.getConceptDetails(req.params.id);
  res.status(result.success ? 200 : 400).json(result);
});

export { discoveryRouter };
