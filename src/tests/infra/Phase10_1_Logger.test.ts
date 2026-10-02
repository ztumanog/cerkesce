import { describe, it, expect, beforeEach } from 'vitest';
import { LoggerService } from '../../infra/logging/LoggerService';

describe('Phase 10.1 - Structured Logging Certification', () => {
  beforeEach(() => {
    LoggerService.clear();
  });

  it('OBS-004: Generates structured JSON log entries with level, timestamp, and context', () => {
    const entry = LoggerService.info('discovery_query_executed', {
      context: { query: 'WATER', durationMs: 12.4 },
    });

    expect(entry.level).toBe('INFO');
    expect(entry.event).toBe('discovery_query_executed');
    expect(entry.context?.query).toBe('WATER');
    expect(entry.timestamp).toBeDefined();
    expect(entry.service).toBe('api-gateway');
    expect(LoggerService.getLogs()).toHaveLength(1);
  });
});
