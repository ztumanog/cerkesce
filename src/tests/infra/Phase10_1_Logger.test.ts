import { describe, it, expect, beforeEach } from 'vitest';
import { LoggerService } from '../../infra/logging/LoggerService';

describe('Phase 10.1 - Structured Logging Certification', () => {
  beforeEach(() => {
    LoggerService.clear();
  });

  it('OBS-004: Generates structured JSON log entries with level, timestamp, and context', () => {
    const entry = LoggerService.log('INFO', 'Discovery query executed', { query: 'WATER', durationMs: 12.4 });

    expect(entry.level).toBe('INFO');
    expect(entry.message).toBe('Discovery query executed');
    expect(entry.context?.query).toBe('WATER');
    expect(entry.timestamp).toBeDefined();
    expect(LoggerService.getLogs()).toHaveLength(1);
  });
});