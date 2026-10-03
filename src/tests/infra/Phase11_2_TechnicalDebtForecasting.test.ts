import { describe, it, expect } from 'vitest';
import { TechnicalDebtForecastingService } from '../../infra/intelligence/TechnicalDebtForecastingService';

describe('Sprint 11.2 - TechnicalDebtForecastingService', () => {
  it('Rapor uretir', () => {
    const report = TechnicalDebtForecastingService.forecast();
    expect(report.timestamp).toBeDefined();
    expect(report.categories.length).toBe(3);
    expect(report.status).toMatch(/^(ok|warning|critical)$/);
  });

  it('Dusuk borc ok', () => {
    const report = TechnicalDebtForecastingService.forecast({
      codeDebt: 1,
      testDebt: 1,
      docDebt: 1,
    });
    expect(report.status).toBe('ok');
  });

  it('Yuksek borc critical', () => {
    const report = TechnicalDebtForecastingService.forecast({
      codeDebt: 5,
      testDebt: 5,
      docDebt: 5,
    });
    expect(report.status).toBe('critical');
  });

  it('Projected total hesaplanir', () => {
    const report = TechnicalDebtForecastingService.forecast({
      codeDebt: 2,
      testDebt: 2,
      docDebt: 2,
    });
    expect(report.projectedTotal).toBeGreaterThan(report.totalDebt);
  });
});
