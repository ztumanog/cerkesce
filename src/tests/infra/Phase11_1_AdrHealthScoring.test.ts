import { describe, it, expect } from 'vitest';
import { AdrHealthScoringService } from '../../infra/intelligence/AdrHealthScoringService';

describe('Sprint 11.1 - AdrHealthScoringService', () => {
  it('Rapor uretir', () => {
    const report = AdrHealthScoringService.calculate();
    expect(report.timestamp).toBeDefined();
    expect(report.totalAdrs).toBeGreaterThan(0);
    expect(report.averageScore).toBeGreaterThan(0);
    expect(report.status).toMatch(/^(ok|warning|critical)$/);
  });

  it('Health scores listesi', () => {
    const report = AdrHealthScoringService.calculate();
    expect(Array.isArray(report.healthScores)).toBe(true);
  });

  it('Average score hesaplanir', () => {
    const report = AdrHealthScoringService.calculate();
    expect(report.averageScore).toBeLessThanOrEqual(100);
  });
});
