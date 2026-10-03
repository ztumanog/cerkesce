import { describe, it, expect } from 'vitest';
import { PredictiveAlertService } from '../../infra/operations/PredictiveAlertService';

describe('Sprint 10.1 - PredictiveAlertService', () => {
  it('Alert uretir', () => {
    const inputs = [
      {
        type: 'memory' as const,
        currentValue: 75,
        threshold: 90,
        points: [
          { timestamp: 1, value: 50 },
          { timestamp: 2, value: 60 },
          { timestamp: 3, value: 70 },
        ],
      },
    ];
    const alerts = PredictiveAlertService.generate(inputs);
    expect(alerts.length).toBeGreaterThan(0);
  });

  it('Predictive alert uretir', () => {
    const inputs = [
      {
        type: 'cpu' as const,
        currentValue: 60,
        threshold: 90,
        points: [
          { timestamp: 1, value: 50 },
          { timestamp: 2, value: 55 },
          { timestamp: 3, value: 60 },
        ],
      },
    ];
    const alerts = PredictiveAlertService.generate(inputs);
    const predictive = alerts.find(a => a.id.startsWith('predictive-'));
    expect(predictive).toBeDefined();
  });

  it('Bos input', () => {
    const alerts = PredictiveAlertService.generate([]);
    expect(alerts.length).toBe(0);
  });
});
