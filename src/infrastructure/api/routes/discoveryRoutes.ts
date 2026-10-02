import { Router } from 'express';
import { ConceptNetworkController } from '../controllers/ConceptNetworkController';
import { DiscoveryGatewayController } from '../../../presentation/api/DiscoveryGatewayController';
import { rateLimiter } from '../middleware/rateLimiter';

const discoveryRouter = Router();
const controller = new ConceptNetworkController();
const gateway = new DiscoveryGatewayController();

// Rate limiting (tum endpoint'ler icin)
discoveryRouter.use(rateLimiter);

// 1. Concept Network (mevcut)
discoveryRouter.get('/concept-network', controller.getConceptNetwork);

// 2. Explore (yeni)
discoveryRouter.get('/explore', async (req, res) => {
  const q = req.query.q as string;
  const dialect = req.query.dialect as string | undefined;
  const result = await gateway.explore(q, dialect);
  res.status(result.success ? 200 : 400).json(result);
});

// 3. Concept Details (yeni)
discoveryRouter.get('/concept/:id', async (req, res) => {
  const result = await gateway.getConceptDetails(req.params.id);
  res.status(result.success ? 200 : 400).json(result);
});

export { discoveryRouter };
