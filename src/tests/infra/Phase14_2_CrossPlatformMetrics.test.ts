import { describe, it, expect, beforeEach } from 'vitest';
import { CrossPlatformMetricsService } from '../../infra/ecosystem/CrossPlatformMetricsService';

describe('Sprint 14.2 - CrossPlatformMetricsService', () => {
  beforeEach(() => {
    CrossPlatformMetricsService.clear();
  });

  it('Metrik kaydeder', () => {
    CrossPlatformMetricsService.record({
      platform: 'vercel',
      metric: 'latency',
      value: 150,
      unit: 'ms',
    });
    const report = CrossPlatformMetricsService.getReport();
    expect(report.totalMetrics).toBe(1);
  });

  it('Platformlari karsilastirir', () => {
    CrossPlatformMetricsService.record({
      platform: 'vercel',
      metric: 'latency',
      value: 150,
      unit: 'ms',
    });
    CrossPlatformMetricsService.record({
      platform: 'railway',
      metric: 'latency',
      value: 200,
      unit: 'ms',
    });
    const comparison = CrossPlatformMetricsService.compare('latency');
    expect(comparison).toBeDefined();
    expect(comparison?.platforms.vercel).toBe(150);
    expect(comparison?.platforms.railway).toBe(200);
  });

  it('Ortalama hesaplanir', () => {
    CrossPlatformMetricsService.record({
      platform: 'a',
      metric: 'cpu',
      value: 10,
      unit: '%',
    });
    CrossPlatformMetricsService.record({
      platform: 'b',
      metric: 'cpu',
      value: 30,
      unit: '%',
    });
    const comparison = CrossPlatformMetricsService.compare('cpu');
    expect(comparison?.average).toBe(20);
  });

  it('Rapor uretir', () => {
    CrossPlatformMetricsService.record({
      platform: 'a',
      metric: 'cpu',
      value: 10,
      unit: '%',
    });
    const report = CrossPlatformMetricsService.getReport();
    expect(report.timestamp).toBeDefined();
    expect(report.status).toMatch(/^(ok|warning|critical)$/);
  });

  it('Bos metrik warning', () => {
    const report = CrossPlatformMetricsService.getReport();
    expect(report.status).toBe('warning');
  });
});
