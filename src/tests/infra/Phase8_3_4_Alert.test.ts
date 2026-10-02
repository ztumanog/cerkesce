import { describe, it, expect, beforeEach } from 'vitest';
import { AlertService } from '../../infra/telemetry/AlertService';

describe('Sprint 8.3.4 - Alerting', () => {
  beforeEach(() => {
    AlertService.clear();
  });

  it('INFO alert', () => {
    const alert = AlertService.info('Test info');
    expect(alert.level).toBe('INFO');
    expect(alert.message).toBe('Test info');
    expect(alert.timestamp).toBeDefined();
  });

  it('WARNING alert', () => {
    const alert = AlertService.warning('Test warning', { metric: 'latency' });
    expect(alert.level).toBe('WARNING');
    expect(alert.context?.metric).toBe('latency');
  });

  it('CRITICAL alert', () => {
    const alert = AlertService.critical('Test critical');
    expect(alert.level).toBe('CRITICAL');
  });

  it('Alert listesi', () => {
    AlertService.info('a');
    AlertService.warning('b');
    AlertService.critical('c');
    expect(AlertService.getAlerts()).toHaveLength(3);
  });

  it('JSON export', () => {
    AlertService.info('test');
    const json = AlertService.toJSON();
    expect(json).toContain('INFO');
    expect(json).toContain('test');
  });
});
