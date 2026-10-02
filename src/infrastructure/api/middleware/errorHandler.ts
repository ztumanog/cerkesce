/**
 * Error Handler Middleware
 * Phase 8.1.3: Error Tracking
 *
 * Express hata yakalama:
 * - ErrorTracker'a kaydet
 * - JSON yanit don
 */

import { Request, Response, NextFunction } from 'express';
import { ErrorTracker, ErrorSeverity } from '../../errors/errorTracker';

export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const tracked = ErrorTracker.track(err, {
    severity: 'high' as ErrorSeverity,
    code: 'API_ERROR',
    context: {
      method: req.method,
      path: req.path,
      query: req.query,
    },
  });

  if (res.headersSent) {
    return next(err);
  }

  res.status(500).json({
    error: 'INTERNAL_SERVER_ERROR',
    message: tracked.message,
    errorId: tracked.id,
    timestamp: tracked.timestamp,
  });
}
