/**
 * Caching Middleware
 * ADR-GOV-005: API Gateway olgunlastirma
 *
 * Basit in-memory cache:
 * - GET istekleri icin
 * - TTL: 60 saniye
 * - Cache hit/miss header
 */

interface CacheEntry {
  data: any;
  expiresAt: number;
}

const cache = new Map<string, CacheEntry>();
const TTL_MS = 60 * 1000; // 60 saniye

export function cachingMiddleware(req: any, res: any, next: any): void {
  // Sadece GET istekleri icin
  if (req.method !== 'GET') {
    next();
    return;
  }

  const key = `${req.method}:${req.originalUrl}`;
  const now = Date.now();

  const entry = cache.get(key);

  if (entry && now < entry.expiresAt) {
    // Cache hit
    res.setHeader('X-Cache', 'HIT');
    res.status(200).json(entry.data);
    return;
  }

  // Cache miss
  res.setHeader('X-Cache', 'MISS');

  // Orijinal json metodunu override et
  const originalJson = res.json.bind(res);
  res.json = (data: any) => {
    cache.set(key, { data, expiresAt: now + TTL_MS });
    return originalJson(data);
  };

  next();
}

/**
 * Cache temizleme (test icin)
 */
export function clearCache(): void {
  cache.clear();
}
