import { describe, it, expect, beforeEach } from 'vitest';
import { ConfidenceScoringService } from '../../infra/intelligence/ConfidenceScoringService';

describe('Track B.2 - ConfidenceScoringService', () => {
  beforeEach(() => {
    ConfidenceScoringService.clear();
  });

  it('Yuksek confidence hesaplar', () => {
    const score = ConfidenceScoringService.calculate({
      dataQuality: 0.95,
      historicalAccuracy: 0.9,
      sampleSize: 0.85,
      recency: 0.9,
    });
    expect(score.level).toBe('very_high');
    expect(score.score).toBeGreaterThan(0.85);
  });

  it('Dusuk confidence', () => {
    const score = ConfidenceScoringService.calculate({
      dataQuality: 0.3,
      historicalAccuracy: 0.4,
      sampleSize: 0.5,
      recency: 0.4,
    });
    expect(score.level).toBe('low');
  });

  it('Explanation uretir', () => {
    const score = ConfidenceScoringService.calculate({
      dataQuality: 0.8,
      historicalAccuracy: 0.8,
      sampleSize: 0.8,
      recency: 0.8,
    });
    expect(score.explanation.length).toBeGreaterThan(0);
  });

  it('Rapor uretir', () => {
    ConfidenceScoringService.calculate({
      dataQuality: 0.8,
      historicalAccuracy: 0.8,
      sampleSize: 0.8,
      recency: 0.8,
    });
    const report = ConfidenceScoringService.getReport();
    expect(report.scores.length).toBe(1);
    expect(report.averageScore).toBeGreaterThan(0);
  });
});
