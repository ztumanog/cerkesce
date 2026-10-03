import { describe, it, expect, beforeEach } from 'vitest';
import { DecisionAnalyticsService } from '../../infra/intelligence/DecisionAnalyticsService';

describe('Track B.5 - DecisionAnalyticsService', () => {
  beforeEach(() => {
    DecisionAnalyticsService.clear();
  });

  it('Karar kaydeder', () => {
    const dec = DecisionAnalyticsService.record({
      category: 'capacity',
      decision: 'scale_up',
      outcome: 'success',
      confidence: 0.9,
    });
    expect(dec.id).toBeDefined();
  });

  it('Success rate hesaplanir', () => {
    DecisionAnalyticsService.record({ category: 'a', decision: 'd1', outcome: 'success', confidence: 0.9 });
    DecisionAnalyticsService.record({ category: 'a', decision: 'd2', outcome: 'success', confidence: 0.8 });
    DecisionAnalyticsService.record({ category: 'a', decision: 'd3', outcome: 'failure', confidence: 0.7 });
    const report = DecisionAnalyticsService.getReport();
    expect(report.metrics[0].successRate).toBe(67);
  });

  it('Kategoriler ayrisir', () => {
    DecisionAnalyticsService.record({ category: 'a', decision: 'd', outcome: 'success', confidence: 0.9 });
    DecisionAnalyticsService.record({ category: 'b', decision: 'd', outcome: 'success', confidence: 0.9 });
    const report = DecisionAnalyticsService.getReport();
    expect(report.metrics.length).toBe(2);
  });

  it('Bos liste', () => {
    const report = DecisionAnalyticsService.getReport();
    expect(report.totalDecisions).toBe(0);
    expect(report.overallSuccessRate).toBe(0);
  });
});
