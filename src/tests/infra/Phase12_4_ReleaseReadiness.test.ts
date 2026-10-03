import { describe, it, expect } from 'vitest';
import { ReleaseReadinessAdvisor } from '../../infra/intelligence/ReleaseReadinessAdvisor';

describe('Sprint 12.4 - ReleaseReadinessAdvisor', () => {
  it('Rapor uretir', () => {
    const report = ReleaseReadinessAdvisor.assess();
    expect(report.timestamp).toBeDefined();
    expect(report.checks.length).toBe(4);
    expect(report.status).toMatch(/^(ready|warning|not_ready)$/);
  });

  it('Skor hesaplanir', () => {
    const report = ReleaseReadinessAdvisor.assess();
    expect(report.totalScore).toBeGreaterThanOrEqual(0);
    expect(report.percentage).toBeGreaterThanOrEqual(0);
    expect(report.percentage).toBeLessThanOrEqual(100);
  });

  it('Ready boolean', () => {
    const report = ReleaseReadinessAdvisor.assess();
    expect(typeof report.ready).toBe('boolean');
  });

  it('Check detaylari', () => {
    const report = ReleaseReadinessAdvisor.assess();
    for (const c of report.checks) {
      expect(c.name).toBeDefined();
      expect(c.score).toBeLessThanOrEqual(c.maxScore);
    }
  });
});
