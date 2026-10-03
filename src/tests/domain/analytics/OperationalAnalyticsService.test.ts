import { describe, it, expect } from 'vitest';
import { OperationalAnalyticsService } from '../../../domain/analytics/services/OperationalAnalyticsService';

describe('Sprint 9.3 - Operational Analytics', () => {
  it('Rapor uretir', () => {
    const report = OperationalAnalyticsService.getReport();
    expect(report.timestamp).toBeDefined();
    expect(report.periods.length).toBeGreaterThan(0);
    expect(report.status).toMatch(/^(ok|warning|critical)$/);
  });

  it('Metrikler hesaplanir', () => {
    const report = OperationalAnalyticsService.getReport({
      errorRate: 0.5,
      avgLatencyMs: 150,
      cacheHitRatio: 0.85,
    });
    expect(report.periods[0].errorRate).toBe(0.5);
    expect(report.periods[0].avgLatencyMs).toBe(150);
  });

  it('Trends dondurur', () => {
    const report = OperationalAnalyticsService.getReport();
    expect(report.trends.errorRate).toMatch(/^(improving|stable|degrading)$/);
  });
});
