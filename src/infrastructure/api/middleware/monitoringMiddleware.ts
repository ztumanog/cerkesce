/**
 * Monitoring Middleware
 * Phase 8.3.3: Structured Logging
 *
 * Istek/yanit izleme:
 * - Method + Path + Status + Sure
 * - X-Response-Time header
 * - Correlation ID
 * - MetricsService + LoggerService entegrasyonu
 */

import { MetricsService } from '../../../infra/telemetry/MetricsService';
import { LoggerService } from '../../../infra/logging/LoggerService';

export function monitoringMiddleware(req: any, res: any, next: any): void {
  const startTime = Date.now();
  const correlationId = req.headers['x-correlation-id'] || `req-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

  res.setHeader('X-Correlation-ID', correlationId);

  res.on('finish', () => {
    const duration = Date.now() - startTime;

    MetricsService.incrementCounter('http_requests_total');
    MetricsService.recordLatency('http_request_duration_ms', duration);

    if (res.statusCode >= 400) {
      MetricsService.incrementCounter('http_errors_total');
    }

    LoggerService.info('HTTP request', {
      method: req.method,
      path: req.path,
      status: res.statusCode,
      durationMs: duration,
    }, correlationId);
  });

  res.setHeader('X-Response-Time', `${Date.now() - startTime}ms`);

  next();
}
