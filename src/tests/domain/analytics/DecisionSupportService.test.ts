import { describe, it, expect } from 'vitest';
import { DecisionSupportService } from '../../../domain/analytics/services/DecisionSupportService';

describe('Sprint 9.5 - Decision Support Dashboard', () => {
  it('Dashboard uretir', () => {
    const dash = DecisionSupportService.getDashboard();
    expect(dash.timestamp).toBeDefined();
    expect(dash.status).toMatch(/^(ok|warning|critical)$/);
    expect(dash.usage).toBeDefined();
    expect(dash.capacity).toBeDefined();
    expect(dash.operational).toBeDefined();
    expect(dash.governance).toBeDefined();
  });

  it('Oneriler uretir', () => {
    const dash = DecisionSupportService.getDashboard();
    expect(dash.recommendations.length).toBeGreaterThan(0);
  });

  it('Tum alt sistemler entegre', () => {
    const dash = DecisionSupportService.getDashboard();
    expect(dash.capacity.forecasts.length).toBeGreaterThan(0);
    expect(dash.operational.periods.length).toBeGreaterThan(0);
    expect(dash.governance.metrics.adrCount).toBeGreaterThan(0);
  });
});
