/**
 * Monitoring Middleware
 * ADR-GOV-005: API Gateway olgunlastirma
 *
 * Istek/yanit izleme:
 * - Method + Path + Status + Sure
 * - X-Response-Time header
 */

export function monitoringMiddleware(req: any, res: any, next: any): void {
  const startTime = Date.now();

  // Yanit bittiginde sure hesapla
  res.on('finish', () => {
    const duration = Date.now() - startTime;
    const logEntry = {
      timestamp: new Date().toISOString(),
      method: req.method,
      path: req.path,
      status: res.statusCode,
      duration: `${duration}ms`,
    };

    // Test modunda log yazma
    if (process.env.NODE_ENV !== 'test') {
      console.log('[API]', JSON.stringify(logEntry));
    }
  });

  // Response time header
  res.setHeader('X-Response-Time', `${Date.now() - startTime}ms`);

  next();
}
