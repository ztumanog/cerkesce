import { describe, it, expect, beforeEach } from 'vitest';
import { LoggerService } from '../../infra/logging/LoggerService';

describe('Sprint 8.3.3 - Structured Logging (Mimar Formati)', () => {
  beforeEach(() => {
    LoggerService.clear();
  });

  it('INFO log olusturur', () => {
    const entry = LoggerService.info('test_event', { correlationId: 'corr-1' });
    expect(entry.level).toBe('INFO');
    expect(entry.event).toBe('test_event');
    expect(entry.service).toBe('api-gateway');
    expect(entry.correlationId).toBe('corr-1');
    expect(entry.timestamp).toBeDefined();
  });

  it('Tum log seviyeleri', () => {
    LoggerService.debug('d');
    LoggerService.info('i');
    LoggerService.warn('w');
    LoggerService.error('e');
    LoggerService.fatal('f');
    expect(LoggerService.getLogs()).toHaveLength(5);
  });

  it('durationMs', () => {
    const entry = LoggerService.info('test', { durationMs: 42 });
    expect(entry.durationMs).toBe(42);
  });

  it('JSON export', () => {
    LoggerService.info('test_event');
    const json = LoggerService.toJSON();
    expect(json).toContain('test_event');
    expect(json).toContain('api-gateway');
  });
});
