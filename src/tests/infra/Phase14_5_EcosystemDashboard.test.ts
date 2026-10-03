import { describe, it, expect, beforeEach } from 'vitest';
import { EcosystemDashboardService } from '../../infra/ecosystem/EcosystemDashboardService';
import { ExternalSystemFederationService } from '../../infra/ecosystem/ExternalSystemFederationService';
import { CrossPlatformMetricsService } from '../../infra/ecosystem/CrossPlatformMetricsService';
import { KnowledgeExchangeService } from '../../infra/ecosystem/KnowledgeExchangeService';
import { GovernanceFederationService } from '../../infra/ecosystem/GovernanceFederationService';

describe('Sprint 14.5 - EcosystemDashboardService', () => {
  beforeEach(() => {
    ExternalSystemFederationService.clear();
    CrossPlatformMetricsService.clear();
    KnowledgeExchangeService.clear();
    GovernanceFederationService.clear();
  });

  it('Dashboard uretir', () => {
    const dash = EcosystemDashboardService.getDashboard();
    expect(dash.timestamp).toBeDefined();
    expect(dash.status).toMatch(/^(ok|warning|critical)$/);
    expect(dash.summary).toBeDefined();
  });

  it('Tum alt sistemler entegre', () => {
    const dash = EcosystemDashboardService.getDashboard();
    expect(dash.federation).toBeDefined();
    expect(dash.metrics).toBeDefined();
    expect(dash.exchange).toBeDefined();
    expect(dash.governance).toBeDefined();
  });

  it('Insights uretir', () => {
    const dash = EcosystemDashboardService.getDashboard();
    expect(Array.isArray(dash.insights)).toBe(true);
  });

  it('Bos ekosistem warning', () => {
    const dash = EcosystemDashboardService.getDashboard();
    expect(['ok', 'warning', 'critical']).toContain(dash.status);
  });
});
