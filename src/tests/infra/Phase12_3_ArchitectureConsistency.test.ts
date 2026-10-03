import { describe, it, expect } from 'vitest';
import { ArchitectureConsistencyAdvisor } from '../../infra/intelligence/ArchitectureConsistencyAdvisor';

describe('Sprint 12.3 - ArchitectureConsistencyAdvisor', () => {
  it('Rapor uretir', () => {
    const report = ArchitectureConsistencyAdvisor.analyze();
    expect(report.timestamp).toBeDefined();
    expect(Array.isArray(report.issues)).toBe(true);
    expect(report.status).toMatch(/^(ok|warning|critical)$/);
  });

  it('Consistency score hesaplanir', () => {
    const report = ArchitectureConsistencyAdvisor.analyze();
    expect(report.consistencyScore).toBeGreaterThanOrEqual(0);
  });

  it('Issue severity', () => {
    const report = ArchitectureConsistencyAdvisor.analyze();
    for (const i of report.issues) {
      expect(['low', 'medium', 'high']).toContain(i.severity);
    }
  });
});
