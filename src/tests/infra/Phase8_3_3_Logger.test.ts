import { describe, it, expect, beforeEach } from 'vitest';
import { LoggerService } from '../../infra/logging/LoggerService';

describe('Sprint 8.3.3 - Structured Logging', () => {
  beforeEach(() => {
    LoggerService.clear();
  });

  it('INFO log olusturur', () => {
    const entry = LoggerService.info('Test message', { key: 'value' });
    expect(entry.level).toBe('INFO');
    expect(entry.message).toBe('Test message');
    expect(entry.context?.key).toBe('value');
    expect(entry.timestamp).toBeDefined();
    expect(entry.service).toBe('cerkesce-api');
  });

  it('DEBUG/WARN/ERROR seviyeleri', () => {
    LoggerService.debug('debug msg');
    LoggerService.warn('warn msg');
    LoggerService.error('error msg');
    expect(LoggerService.getLogs()).toHaveLength(3);
  });

  it('Correlation ID', () => {
    const entry = LoggerService.info('test', {}, 'corr-123');
    expect(entry.correlationId).toBe('corr-123');
  });

  it('JSON export', () => {
    LoggerService.info('test');
    const json = LoggerService.toJSON();
    expect(json).toContain('INFO');
    expect(json).toContain('test');
  });
});
