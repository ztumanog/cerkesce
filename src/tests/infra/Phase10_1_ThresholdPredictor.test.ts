import { describe, it, expect } from 'vitest';
import { ThresholdPredictor } from '../../infra/operations/ThresholdPredictor';

describe('Sprint 10.1 - ThresholdPredictor', () => {
  it('Esik asimini tahmin eder', () => {
    const points = [
      { timestamp: 1, value: 50 },
      { timestamp: 2, value: 55 },
      { timestamp: 3, value: 60 },
      { timestamp: 4, value: 65 },
    ];
    const prediction = ThresholdPredictor.predict('memory', points, 80, 5);
    expect(prediction.daysToThreshold).toBeGreaterThan(0);
    expect(prediction.trend).toBe('upward');
  });

  it('Esik asilmis ise 0 gun', () => {
    const points = [
      { timestamp: 1, value: 85 },
      { timestamp: 2, value: 90 },
    ];
    const prediction = ThresholdPredictor.predict('cpu', points, 80, 5);
    expect(prediction.daysToThreshold).toBe(0);
  });

  it('Sabit trend tahmin yapmaz', () => {
    const points = [
      { timestamp: 1, value: 50 },
      { timestamp: 2, value: 50 },
      { timestamp: 3, value: 50 },
    ];
    const prediction = ThresholdPredictor.predict('cpu', points, 80);
    expect(prediction.daysToThreshold).toBeNull();
  });

  it('Mesaj uretir', () => {
    const points = [{ timestamp: 1, value: 50 }];
    const prediction = ThresholdPredictor.predict('memory', points, 80, 5);
    expect(prediction.message.length).toBeGreaterThan(0);
  });

  it('Confidence dondurur', () => {
    const points = [
      { timestamp: 1, value: 50 },
      { timestamp: 2, value: 60 },
    ];
    const prediction = ThresholdPredictor.predict('cpu', points, 80);
    expect(prediction.confidence).toBeGreaterThanOrEqual(0);
  });
});
