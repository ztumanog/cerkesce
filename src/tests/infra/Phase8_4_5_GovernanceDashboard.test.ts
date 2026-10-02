import { describe, it, expect } from 'vitest';
import { GovernanceDashboardService } from '../../infra/governance/GovernanceDashboardService';

describe('Sprint 8.4.5 - Governance Dashboard', () => {
  it('Dashboard verisi dondurur', () => {
    const dashboard = GovernanceDashboardService.getDashboard();
    expect(dashboard.timestamp).toBeDefined();
    expect(dashboard.status).toMatch(/^(ok|warning|error)$/);
    expect(dashboard.report).toBeDefined();
    expect(dashboard.summary).toBeDefined();
  });

  it('Summary alanlari', () => {
    const dashboard = GovernanceDashboardService.getDashboard();
    expect(dashboard.summary.adr).toContain('ADR');
    expect(dashboard.summary.phases).toContain('Faz');
    expect(dashboard.summary.docs).toContain('Dokuman');
    expect(dashboard.summary.overall).toBeDefined();
  });

  it('Overall status dogru', () => {
    const dashboard = GovernanceDashboardService.getDashboard();
    expect(['ok', 'warning', 'error']).toContain(dashboard.status);
  });
});
