import { describe, it, expect } from 'vitest';
import { RiskForecastingService } from '../../infra/operations/RiskForecastingService';

describe('Sprint 10.4 - RiskForecastingService', () => {
  it('Rapor uretir', () => {
    const report = RiskForecastingService.forecast();
    expect(report.timestamp).toBeDefined();
    expect(report.riskScore).toBeGreaterThanOrEqual(0);
    expect(report.status).toMatch(/^(ok|warning|critical)$/);
  });

  it('Yuksek risk tespit eder', () => {
    const report = RiskForecastingService.forecast({
      errorRate: 4,
      latencyMs: 500,
      memoryPercent: 95,
    });
    expect(report.status).toBe('critical');
  });

  it('Dusuk risk ok', () => {
    const report = RiskForecastingService.forecast({
      errorRate: 0.1,
      latencyMs: 100,
      memoryPercent: 40,
    });
    expect(report.status).toBe('ok');
  });

  it('Top risk', () => {
    const report = RiskForecastingService.forecast({ errorRate: 4 });
    expect(report.topRisk).toBeDefined();
  });

  it('Risk skoru hesaplanir', () => {
    const report = RiskForecastingService.forecast({ errorRate: 2, latencyMs: 300 });
    expect(report.riskScore).toBeGreaterThan(0);
  });
});
