import { describe, it, expect, beforeEach } from 'vitest';
import { RecommendationTuningService } from '../../infra/intelligence/RecommendationTuningService';

describe('Track B.1 - RecommendationTuningService', () => {
  beforeEach(() => {
    RecommendationTuningService.clear();
  });

  it('Oneri ekler', () => {
    const rec = RecommendationTuningService.add({
      category: 'capacity',
      message: 'Scale up',
      priority: 'high',
      confidence: 0.9,
    });
    expect(rec.id).toBeDefined();
  });

  it('Tune eder ve siralar', () => {
    RecommendationTuningService.add({
      category: 'capacity',
      message: 'Low priority',
      priority: 'low',
      confidence: 0.8,
    });
    RecommendationTuningService.add({
      category: 'capacity',
      message: 'High priority',
      priority: 'high',
      confidence: 0.9,
    });
    const result = RecommendationTuningService.tune();
    expect(result.tunedRecommendations[0].priority).toBe('high');
    expect(result.tunedRecommendations[0].rank).toBe(1);
  });

  it('Min confidence filtreler', () => {
    RecommendationTuningService.add({
      category: 'test',
      message: 'Low conf',
      priority: 'medium',
      confidence: 0.3,
    });
    RecommendationTuningService.add({
      category: 'test',
      message: 'High conf',
      priority: 'medium',
      confidence: 0.9,
    });
    const result = RecommendationTuningService.tune({ minConfidence: 0.5 });
    expect(result.tunedRecommendations.length).toBe(1);
  });

  it('Bos liste warning', () => {
    const result = RecommendationTuningService.tune();
    expect(result.status).toBe('warning');
  });
});
