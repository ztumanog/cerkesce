import { describe, it, expect } from 'vitest';
import { AdrRecommendationAssistant } from '../../infra/intelligence/AdrRecommendationAssistant';

describe('Sprint 12.1 - AdrRecommendationAssistant', () => {
  it('Rapor uretir', () => {
    const report = AdrRecommendationAssistant.generate();
    expect(report.timestamp).toBeDefined();
    expect(Array.isArray(report.recommendations)).toBe(true);
    expect(report.status).toMatch(/^(ok|warning|critical)$/);
  });

  it('Toplam sorun', () => {
    const report = AdrRecommendationAssistant.generate();
    expect(report.totalIssues).toBe(report.recommendations.length);
  });

  it('Oneri tipleri', () => {
    const report = AdrRecommendationAssistant.generate();
    for (const r of report.recommendations) {
      expect(['missing', 'duplicate', 'orphaned', 'outdated']).toContain(r.type);
    }
  });

  it('Confidence degeri', () => {
    const report = AdrRecommendationAssistant.generate();
    for (const r of report.recommendations) {
      expect(r.confidence).toBeGreaterThan(0);
      expect(r.confidence).toBeLessThanOrEqual(1);
    }
  });
});
