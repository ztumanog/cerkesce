/**
 * Error Tracking Test
 * Phase 8.1.3: Error Tracking
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { ErrorTracker } from '@/infrastructure/errors/errorTracker';

describe('ErrorTracker (Phase 8.1.3)', () => {
  beforeEach(() => {
    ErrorTracker.clear();
  });

  it('should track a simple error', () => {
    ErrorTracker.track('Test error');
    expect(ErrorTracker.getErrorCount()).toBe(1);
  });

  it('should track Error object with stack', () => {
    const err = new Error('Boom');
    const tracked = ErrorTracker.track(err, {
      severity: 'high',
      code: 'TEST_001',
    });
    expect(tracked.severity).toBe('high');
    expect(tracked.code).toBe('TEST_001');
    expect(tracked.stack).toBeDefined();
  });

  it('should count critical errors', () => {
    ErrorTracker.track('a', { severity: 'low' });
    ErrorTracker.track('b', { severity: 'critical' });
    ErrorTracker.track('c', { severity: 'critical' });
    expect(ErrorTracker.getCriticalCount()).toBe(2);
  });

  it('should limit stored errors to 100', () => {
    for (let i = 0; i < 150; i++) {
      ErrorTracker.track(`err-${i}`);
    }
    expect(ErrorTracker.getErrorCount()).toBeLessThanOrEqual(100);
  });

  it('should get recent errors', () => {
    ErrorTracker.track('first');
    ErrorTracker.track('second');
    const recent = ErrorTracker.getErrors(5);
    expect(recent.length).toBe(2);
  });

  it('should clear all errors', () => {
    ErrorTracker.track('test');
    ErrorTracker.clear();
    expect(ErrorTracker.getErrorCount()).toBe(0);
  });
});
