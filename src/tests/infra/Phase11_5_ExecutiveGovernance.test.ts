import { describe, it, expect } from 'vitest';
import { ExecutiveGovernanceService } from '../../infra/intelligence/ExecutiveGovernanceService';

describe('Sprint 11.5 - ExecutiveGovernanceService', () => {
  it('Dashboard uretir', () => {
    const dash = ExecutiveGovernanceService.getDashboard();
    expect(dash.timestamp).toBeDefined();
    expect(dash.status).toMatch(/^(ok|warning|critical)$/);
    expect(dash.summary).toBeDefined();
    expect(dash.details).toBeDefined();
  });

  it('Tum alt sistemler entegre', () => {
    const dash = ExecutiveGovernanceService.getDashboard();
    expect(dash.details.adr).toBeDefined();
    expect(dash.details.debt).toBeDefined();
    expect(dash.details.drift).toBeDefined();
    expect(dash.details.risk).toBeDefined();
  });

  it('Aksiyonlar uretir', () => {
    const dash = ExecutiveGovernanceService.getDashboard();
    expect(dash.topActions.length).toBeGreaterThan(0);
  });
});
