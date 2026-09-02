import { Router } from 'express';
import { ConceptNetworkController } from '../controllers/ConceptNetworkController';

const discoveryRouter = Router();
const controller = new ConceptNetworkController();

discoveryRouter.get('/concept-network', controller.getConceptNetwork);

export { discoveryRouter };
