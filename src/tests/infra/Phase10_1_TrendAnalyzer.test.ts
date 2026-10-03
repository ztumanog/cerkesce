import { describe, it, expect } from 'vitest';
import { TrendAnalyzer } from '../../infra/operations/TrendAnalyzer';

describe('Sprint 10.1 - TrendAnalyzer', () => {
  it('Yukselen trend tespit eder', () => {
    const points = [
      { timestamp: 1, value: 10 },
      { timestamp: 2, value: 20 },
      { timestamp: 3, value: 30 },
      { timestamp: 4, value: 40 },
    ];
    const result = TrendAnalyzer.analyze('cpu', points);
    expect(result.trend).toBe('upward');
    expect(result.slope).toBeGreaterThan(0);
  });

  it('Dusen trend tespit eder', () => {
    const points = [
      { timestamp: 1, value: 40 },
      { timestamp: 2, value: 30 },
      { timestamp: 3, value: 20 },
      { timestamp: 4, value: 10 },
    ];
    const result = TrendAnalyzer.analyze('cache', points);
    expect(result.trend).toBe('downward');
  });

  it('Sabit trend', () => {
    const points = [
      { timestamp: 1, value: 50 },
      { timestamp: 2, value: 50 },
      { timestamp: 3, value: 50 },
    ];
    const result = TrendAnalyzer.analyze('memory', points);
    expect(result.trend).toBe('stable');
  });

  it('Yetersiz veri', () => {
    const result = TrendAnalyzer.analyze('cpu', []);
    expect(result.trend).toBe('stable');
    expect(result.confidence).toBe(0);
  });

  it('Confidence hesaplanir', () => {
    const points = [
      { timestamp: 1, value: 10 },
      { timestamp: 2, value: 20 },
      { timestamp: 3, value: 30 },
    ];
    const result = TrendAnalyzer.analyze('latency', points);
    expect(result.confidence).toBeGreaterThan(0);
  });
});
