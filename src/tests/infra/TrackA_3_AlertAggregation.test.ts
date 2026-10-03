import { describe, it, expect, beforeEach } from 'vitest';
import { AlertAggregationService } from '../../infra/operations/AlertAggregationService';

describe('Track A.3 - AlertAggregationService', () => {
  beforeEach(() => {
    AlertAggregationService.clear();
  });

  it('Alert ekler', () => {
    AlertAggregationService.add({
      type: 'memory',
      severity: 'warning',
      message: 'Memory high',
      source: 'api',
    });
    const result = AlertAggregationService.aggregate();
    expect(result.totalRaw).toBe(1);
  });

  it('Benzer alertleri gruplar', () => {
    for (let i = 0; i < 5; i++) {
      AlertAggregationService.add({
        type: 'memory',
        severity: 'warning',
        message: 'Memory high',
        source: 'api',
      });
    }
    const result = AlertAggregationService.aggregate();
    expect(result.totalRaw).toBe(5);
    expect(result.totalAggregated).toBe(1);
    expect(result.reductionPercent).toBe(80);
  });

  it('Farkli kaynaklar ayrisir', () => {
    AlertAggregationService.add({
      type: 'memory',
      severity: 'warning',
      message: 'Memory',
      source: 'api',
    });
    AlertAggregationService.add({
      type: 'memory',
      severity: 'warning',
      message: 'Memory',
      source: 'worker',
    });
    const result = AlertAggregationService.aggregate();
    expect(result.totalAggregated).toBe(2);
  });

  it('Bos liste', () => {
    const result = AlertAggregationService.aggregate();
    expect(result.totalRaw).toBe(0);
  });
});
