/**
 * Error Tracker
 * Phase 8.1.3: Error Tracking
 *
 * Yapilandirilmis hata yakalama:
 * - Error types
 * - Error severity
 * - Error context
 * - Logging
 */

export type ErrorSeverity = 'low' | 'medium' | 'high' | 'critical';

export interface TrackedError {
  id: string;
  message: string;
  severity: ErrorSeverity;
  code: string;
  context?: Record<string, any>;
  timestamp: string;
  stack?: string;
}

export class ErrorTracker {
  private static errors: TrackedError[] = [];
  private static maxErrors = 100;

  /**
   * Hata kaydet
   */
  static track(
    error: Error | string,
    options: {
      severity?: ErrorSeverity;
      code?: string;
      context?: Record<string, any>;
    } = {}
  ): TrackedError {
    const tracked: TrackedError = {
      id: `ERR-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      message: typeof error === 'string' ? error : error.message,
      severity: options.severity || 'medium',
      code: options.code || 'UNKNOWN',
      context: options.context,
      timestamp: new Date().toISOString(),
      stack: typeof error === 'string' ? undefined : error.stack,
    };

    ErrorTracker.errors.push(tracked);

    if (ErrorTracker.errors.length > ErrorTracker.maxErrors) {
      ErrorTracker.errors = ErrorTracker.errors.slice(-ErrorTracker.maxErrors);
    }

    if (process.env.NODE_ENV !== 'test') {
      console.error('[ERROR]', JSON.stringify(tracked));
    }

    return tracked;
  }

  static getErrors(limit: number = 10): TrackedError[] {
    return ErrorTracker.errors.slice(-limit);
  }

  static getErrorCount(): number {
    return ErrorTracker.errors.length;
  }

  static getCriticalCount(): number {
    return ErrorTracker.errors.filter(e => e.severity === 'critical').length;
  }

  static clear(): void {
    ErrorTracker.errors = [];
  }
}
