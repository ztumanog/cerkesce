/**
 * Authentication Middleware
 * ADR-GOV-005: API Gateway olgunlastirma
 *
 * API Key tabanli kimlik dogrulama:
 * - X-API-Key header
 * - Gecersiz anahtar -> 401
 * - Anahtarsiz -> 401
 */

const VALID_API_KEYS = new Set<string>([
  'cerkesce-dev-key-001',
  'cerkesce-test-key-002',
]);

export interface AuthRequest {
  headers: Record<string, string | string[] | undefined>;
}

export function authMiddleware(req: any, res: any, next: any): void {
  // Development modunda auth atlanabilir
  if (process.env.NODE_ENV === 'test' || process.env.SKIP_AUTH === 'true') {
    next();
    return;
  }

  const apiKey = req.headers['x-api-key'] as string | undefined;

  if (!apiKey) {
    res.status(401).json({
      error: 'UNAUTHORIZED',
      message: 'X-API-Key header is required.',
    });
    return;
  }

  if (!VALID_API_KEYS.has(apiKey)) {
    res.status(401).json({
      error: 'UNAUTHORIZED',
      message: 'Invalid API key.',
    });
    return;
  }

  next();
}
