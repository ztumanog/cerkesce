import { describe, it, expect } from 'vitest';
import { GovernanceDriftPreventionService } from '../../infra/intelligence/GovernanceDriftPreventionService';

describe('Sprint 12.2 - GovernanceDriftPreventionService', () => {
  it('Rapor uretir', () => {
    const report = GovernanceDriftPreventionService.analyze();
    expect(report.timestamp).toBeDefined();
    expect(Array.isArray(report.warnings)).toBe(true);
    expect(report.status).toMatch(/^(ok|warning|critical)$/);
  });

  it('Drift score hesaplanir', () => {
    const report = GovernanceDriftPreventionService.analyze();
    expect(report.driftScore).toBeGreaterThanOrEqual(0);
  });

  it('Warning severity', () => {
    const report = GovernanceDriftPreventionService.analyze();
    for (const w of report.warnings) {
      expect(['low', 'medium', 'high']).toContain(w.severity);
    }
  });
});
