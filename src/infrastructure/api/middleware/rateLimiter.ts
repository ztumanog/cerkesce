/**
 * Rate Limiter Middleware
 * ADR-GOV-005: API Gateway olgunlastirma
 *
 * IP basina istek sinirlama:
 * - Dakikada 100 istek
 * - 429 yanit
 */

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const store = new Map<string, RateLimitEntry>();
const WINDOW_MS = 60 * 1000; // 1 dakika
const MAX_REQUESTS = 100;

export function rateLimiter(req: any, res: any, next: any): void {
  const ip = req.ip || req.connection?.remoteAddress || 'unknown';
  const now = Date.now();

  let entry = store.get(ip);

  if (!entry || now > entry.resetAt) {
    entry = { count: 0, resetAt: now + WINDOW_MS };
    store.set(ip, entry);
  }

  entry.count++;

  if (entry.count > MAX_REQUESTS) {
    res.status(429).json({
      error: 'TOO_MANY_REQUESTS',
      message: `Rate limit exceeded. Max ${MAX_REQUESTS} requests per minute.`,
      retryAfter: Math.ceil((entry.resetAt - now) / 1000),
    });
    return;
  }

  res.setHeader('X-RateLimit-Limit', MAX_REQUESTS);
  res.setHeader('X-RateLimit-Remaining', MAX_REQUESTS - entry.count);
  res.setHeader('X-RateLimit-Reset', entry.resetAt);

  next();
}
