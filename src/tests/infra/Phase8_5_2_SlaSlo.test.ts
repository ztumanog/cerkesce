import { describe, it, expect } from 'vitest';
import { SlaSloService } from '../../infra/operations/SlaSloService';

describe('Sprint 8.5.2 - SLA / SLO', () => {
  it('Rapor dondurur', () => {
    const report = SlaSloService.getReport();
    expect(report.timestamp).toBeDefined();
    expect(report.availability).toBeDefined();
    expect(report.latency).toBeDefined();
    expect(report.errorRate).toBeDefined();
    expect(report.status).toMatch(/^(ok|warning|critical)$/);
  });

  it('Metrics ile hesaplama', () => {
    const report = SlaSloService.getReport({
      requestsTotal: 1000,
      errorsTotal: 5,
      avgLatencyMs: 150,
    });
    expect(report.errorRate.current).toBe(0.5);
    expect(report.errorRate.status).toBe('ok');
  });

  it('Yuksek latency warning', () => {
    const report = SlaSloService.getReport({
      avgLatencyMs: 250,
    });
    expect(report.latency.status).toBe('warning');
  });
});
