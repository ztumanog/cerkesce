import { describe, it, expect } from 'vitest';
import { GovernanceRecommendationService } from '../../infra/operations/GovernanceRecommendationService';

describe('Sprint 10.3 - GovernanceRecommendationService', () => {
  it('Rapor uretir', () => {
    const report = GovernanceRecommendationService.generate();
    expect(report.timestamp).toBeDefined();
    expect(report.status).toMatch(/^(ok|warning|critical)$/);
    expect(Array.isArray(report.recommendations)).toBe(true);
  });

  it('Total issues hesaplanir', () => {
    const report = GovernanceRecommendationService.generate();
    expect(report.totalIssues).toBe(report.recommendations.length);
  });

  it('Kategoriler', () => {
    const report = GovernanceRecommendationService.generate();
    for (const rec of report.recommendations) {
      expect(['adr', 'phase', 'doc']).toContain(rec.category);
    }
  });
});
