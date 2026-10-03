import { describe, it, expect } from 'vitest';
import { GovernanceAnalyticsService } from '../../../domain/analytics/services/GovernanceAnalyticsService';

describe('Sprint 9.4 - Governance Analytics', () => {
  it('Rapor uretir', () => {
    const report = GovernanceAnalyticsService.getReport();
    expect(report.timestamp).toBeDefined();
    expect(report.metrics.adrCount).toBeGreaterThan(0);
    expect(report.status).toMatch(/^(ok|warning|critical)$/);
  });

  it('Phase durations', () => {
    const report = GovernanceAnalyticsService.getReport();
    expect(report.phaseDurations.length).toBeGreaterThan(0);
    const phase1 = report.phaseDurations.find(p => p.phase === 'Phase 1');
    expect(phase1).toBeDefined();
  });

  it('Metrikler hesaplanir', () => {
    const report = GovernanceAnalyticsService.getReport();
    expect(report.metrics.adrCount).toBeGreaterThan(0);
    expect(report.metrics.docCompliance).toBeGreaterThan(0);
  });
});
