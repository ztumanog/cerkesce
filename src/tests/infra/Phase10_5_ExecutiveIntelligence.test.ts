import { describe, it, expect } from 'vitest';
import { ExecutiveIntelligenceService } from '../../infra/operations/ExecutiveIntelligenceService';

describe('Sprint 10.5 - ExecutiveIntelligenceService', () => {
  it('Dashboard uretir', () => {
    const dash = ExecutiveIntelligenceService.getDashboard();
    expect(dash.timestamp).toBeDefined();
    expect(dash.status).toMatch(/^(ok|warning|critical)$/);
    expect(dash.summary).toBeDefined();
    expect(dash.details).toBeDefined();
  });

  it('Tum alt sistemler entegre', () => {
    const dash = ExecutiveIntelligenceService.getDashboard();
    expect(dash.details.capacity).toBeDefined();
    expect(dash.details.governance).toBeDefined();
    expect(dash.details.risk).toBeDefined();
  });

  it('Oneriler uretir', () => {
    const dash = ExecutiveIntelligenceService.getDashboard();
    expect(dash.topRecommendations.length).toBeGreaterThan(0);
  });

  it('Summary alanlari', () => {
    const dash = ExecutiveIntelligenceService.getDashboard();
    expect(dash.summary.capacity).toBeDefined();
    expect(dash.summary.governance).toBeDefined();
    expect(dash.summary.risk).toBeDefined();
    expect(dash.summary.alerts).toBeDefined();
  });
});
