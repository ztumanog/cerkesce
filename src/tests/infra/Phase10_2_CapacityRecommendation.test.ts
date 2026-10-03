import { describe, it, expect } from 'vitest';
import { CapacityRecommendationService } from '../../infra/operations/CapacityRecommendationService';

describe('Sprint 10.2 - CapacityRecommendationService', () => {
  it('Rapor uretir', () => {
    const report = CapacityRecommendationService.generate();
    expect(report.timestamp).toBeDefined();
    expect(report.scenarios.length).toBe(3);
    expect(report.status).toMatch(/^(ok|warning|critical)$/);
  });

  it('2x/5x/10x senaryolari', () => {
    const report = CapacityRecommendationService.generate();
    expect(report.scenarios[0].multiplier).toBe(2);
    expect(report.scenarios[1].multiplier).toBe(5);
    expect(report.scenarios[2].multiplier).toBe(10);
  });

  it('Yuksek yuk icin oneriler', () => {
    const report = CapacityRecommendationService.generate({
      cpu: 30,
      memory: 50,
      cache: 85,
      storage: 2000,
    });
    const critical = report.scenarios.find(s => s.status === 'critical');
    expect(critical).toBeDefined();
  });

  it('Dusuk yuk icin ok status', () => {
    const report = CapacityRecommendationService.generate({
      cpu: 5,
      memory: 10,
      cache: 95,
      storage: 100,
    });
    const ok = report.scenarios.find(s => s.status === 'ok');
    expect(ok).toBeDefined();
  });

  it('Overall recommendation', () => {
    const report = CapacityRecommendationService.generate();
    expect(report.overallRecommendation.length).toBeGreaterThan(0);
  });
});
