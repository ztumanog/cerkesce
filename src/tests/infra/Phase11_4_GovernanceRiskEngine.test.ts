import { describe, it, expect } from 'vitest';
import { GovernanceRiskEngine } from '../../infra/intelligence/GovernanceRiskEngine';

describe('Sprint 11.4 - GovernanceRiskEngine', () => {
  it('Rapor uretir', () => {
    const report = GovernanceRiskEngine.evaluate();
    expect(report.timestamp).toBeDefined();
    expect(Array.isArray(report.risks)).toBe(true);
    expect(report.status).toMatch(/^(ok|warning|critical)$/);
  });

  it('Total risk score hesaplanir', () => {
    const report = GovernanceRiskEngine.evaluate();
    expect(report.totalRiskScore).toBeGreaterThanOrEqual(0);
  });

  it('Risk level gecerli', () => {
    const report = GovernanceRiskEngine.evaluate();
    for (const r of report.risks) {
      expect(['low', 'medium', 'high', 'critical']).toContain(r.riskLevel);
    }
  });
});
