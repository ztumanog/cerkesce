import { describe, it, expect, beforeEach } from 'vitest';
import { FailureAnalyticsService } from '../../infra/reliability/FailureAnalyticsService';

describe('Sprint 15.3 - FailureAnalyticsService', () => {
  beforeEach(() => {
    FailureAnalyticsService.clear();
  });

  it('Failure kaydeder', () => {
    const f = FailureAnalyticsService.record({
      service: 'api',
      type: 'crash',
      severity: 'high',
      description: 'API crash',
    });
    expect(f.id).toBeDefined();
    expect(f.timestamp).toBeDefined();
  });

  it('Rapor uretir', () => {
    FailureAnalyticsService.record({
      service: 'api',
      type: 'crash',
      severity: 'critical',
      description: 'Crash',
    });
    const report = FailureAnalyticsService.getReport();
    expect(report.totalFailures).toBe(1);
    expect(report.bySeverity.critical).toBe(1);
  });

  it('Cluster olusturur', () => {
    FailureAnalyticsService.record({
      service: 'api',
      type: 'crash',
      severity: 'high',
      description: 'Crash 1',
    });
    FailureAnalyticsService.record({
      service: 'api',
      type: 'crash',
      severity: 'high',
      description: 'Crash 2',
    });
    const report = FailureAnalyticsService.getReport();
    expect(report.clusters.length).toBe(1);
    expect(report.clusters[0].count).toBe(2);
  });

  it('Bos failure ok', () => {
    const report = FailureAnalyticsService.getReport();
    expect(report.totalFailures).toBe(0);
    expect(report.status).toBe('ok');
  });
});
