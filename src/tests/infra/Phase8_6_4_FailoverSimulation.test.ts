import { describe, it, expect } from 'vitest';
import { FailoverSimulationService } from '../../infra/operations/FailoverSimulationService';

describe('Sprint 8.6.4 - Failover Simulation', () => {
  it('Simulasyon raporu dondurur', () => {
    const report = FailoverSimulationService.simulate();
    expect(report.timestamp).toBeDefined();
    expect(report.totalScenarios).toBeGreaterThan(0);
    expect(report.status).toMatch(/^(ok|warning|critical)$/);
  });

  it('Senaryolar tanimli', () => {
    const report = FailoverSimulationService.simulate();
    expect(report.scenarios.length).toBeGreaterThanOrEqual(4);
    const fs001 = report.scenarios.find(s => s.id === 'FS-001');
    expect(fs001).toBeDefined();
    expect(fs001?.service).toBe('nextjs-ui');
  });

  it('Recovery time hesaplanir', () => {
    const report = FailoverSimulationService.simulate();
    for (const s of report.scenarios) {
      expect(s.recoveryTimeMs).toBeGreaterThan(0);
    }
  });
});
