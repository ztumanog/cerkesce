import { describe, it, expect } from 'vitest';
import { CapacityForecastingService } from '../../../domain/analytics/services/CapacityForecastingService';

describe('Sprint 9.2 - Capacity Forecasting', () => {
  it('Forecast uretir', () => {
    const forecast = CapacityForecastingService.forecast();
    expect(forecast.timestamp).toBeDefined();
    expect(forecast.forecasts.length).toBeGreaterThan(0);
    expect(forecast.status).toMatch(/^(ok|warning|critical)$/);
  });

  it('Projeksiyonlar artar', () => {
    const forecast = CapacityForecastingService.forecast();
    const first = forecast.forecasts[0];
    const last = forecast.forecasts[forecast.forecasts.length - 1];
    expect(last.estimatedMemoryMB).toBeGreaterThan(first.estimatedMemoryMB);
  });

  it('Confidence hesaplanir', () => {
    const forecast = CapacityForecastingService.forecast();
    for (const f of forecast.forecasts) {
      expect(f.confidence).toBeGreaterThan(0);
      expect(f.confidence).toBeLessThanOrEqual(1);
    }
  });
});
