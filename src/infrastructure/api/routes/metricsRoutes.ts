/**
 * Metrics Routes
 * Sprint 8.1.4: Monitoring
 *
 * Endpoint'ler:
 * - GET /api/v1/metrics         -> Prometheus format
 * - GET /api/v1/metrics/json    -> JSON format
 */

import { Router } from 'express';
import { MetricsService } from '../../../infra/telemetry/MetricsService';

const metricsRouter = Router();

/**
 * Prometheus format
 */
metricsRouter.get('/', (_req, res) => {
  res.setHeader('Content-Type', 'text/plain; version=0.0.4');
  res.status(200).send(MetricsService.toPrometheus());
});

/**
 * JSON format
 */
metricsRouter.get('/json', (_req, res) => {
  res.status(200).json(MetricsService.toJSON());
});

export { metricsRouter };
