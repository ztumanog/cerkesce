import { describe, it, expect } from 'vitest';
import { DisasterRecoveryService } from '../../infra/operations/DisasterRecoveryService';

describe('Sprint 8.6.5 - Disaster Recovery Drill', () => {
  it('Drill calistirir', () => {
    const drill = DisasterRecoveryService.runDrill();
    expect(drill.timestamp).toBeDefined();
    expect(drill.steps.length).toBeGreaterThan(0);
    expect(drill.status).toMatch(/^(ok|warning|critical)$/);
  });

  it('Adimlar tanimli', () => {
    const drill = DisasterRecoveryService.runDrill();
    expect(drill.steps.length).toBeGreaterThanOrEqual(5);
    const step1 = drill.steps.find(s => s.id === 'DR-001');
    expect(step1).toBeDefined();
  });

  it('Total duration hesaplanir', () => {
    const drill = DisasterRecoveryService.runDrill();
    expect(drill.totalDuration).toBeGreaterThan(0);
  });
});
