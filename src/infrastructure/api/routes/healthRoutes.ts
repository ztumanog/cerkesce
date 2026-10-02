import { Router } from 'express';
import { HealthController } from '../controllers/HealthController';

const healthRouter = Router();
const controller = new HealthController();

healthRouter.get('/', controller.getHealth);
healthRouter.get('/detailed', controller.getDetailedHealth);

export { healthRouter };
