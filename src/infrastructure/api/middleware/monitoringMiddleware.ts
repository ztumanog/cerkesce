/**
 * Monitoring Middleware
 * ADR-GOV-005: API Gateway olgunlastirma
 * Phase 8.1.4: Metrics entegrasyonu
 *
 * Istek/yanit izleme:
 * - Method + Path + Status + Sure
 * - X-Response-Time header
 * - MetricsService'e kayit
 */

import { MetricsService } from '../../../infra/telemetry/MetricsService';

export function monitoringMiddleware(req: any, res: any, next: any): void {
  const startTime = Date.now();

  res.on('finish', () => {
    const duration = Date.now() - startTime;
    const logEntry = {
      timestamp: new Date().toISOString(),
      method: req.method,
      path: req.path,
      status: res.statusCode,
      duration: `${duration}ms`,
    };

    // MetricsService'e kayit
    MetricsService.incrementCounter('http_requests_total');
    MetricsService.recordLatency('http_request_duration_ms', duration);

    if (res.statusCode >= 400) {
      MetricsService.incrementCounter('http_errors_total');
    }

    if (process.env.NODE_ENV !== 'test') {
      console.log('[API]', JSON.stringify(logEntry));
    }
  });

  res.setHeader('X-Response-Time', `${Date.now() - startTime}ms`);

  next();
}
