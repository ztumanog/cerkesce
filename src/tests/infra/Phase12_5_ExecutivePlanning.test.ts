import { describe, it, expect } from 'vitest';
import { ExecutivePlanningAssistant } from '../../infra/intelligence/ExecutivePlanningAssistant';

describe('Sprint 12.5 - ExecutivePlanningAssistant', () => {
  it('Rapor uretir', () => {
    const report = ExecutivePlanningAssistant.generate();
    expect(report.timestamp).toBeDefined();
    expect(report.status).toMatch(/^(ok|warning|critical)$/);
    expect(report.nextPhase).toBeDefined();
    expect(report.summary).toBeDefined();
  });

  it('Top risk ve teknik borc', () => {
    const report = ExecutivePlanningAssistant.generate();
    expect(report.topRisk).toBeDefined();
    expect(report.technicalDebt).toBeDefined();
  });

  it('Insights listesi', () => {
    const report = ExecutivePlanningAssistant.generate();
    expect(Array.isArray(report.insights)).toBe(true);
  });

  it('Priority degerleri', () => {
    const report = ExecutivePlanningAssistant.generate();
    for (const i of report.insights) {
      expect(['low', 'medium', 'high', 'critical']).toContain(i.priority);
    }
  });
});
