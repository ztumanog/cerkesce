import { describe, it, expect } from 'vitest';
import { RecoveryObjectiveService } from '../../infra/operations/RecoveryObjectiveService';

describe('Sprint 8.6.2 - Recovery Objectives', () => {
  it('Rapor dondurur', () => {
    const report = RecoveryObjectiveService.getReport();
    expect(report.timestamp).toBeDefined();
    expect(Object.keys(report.objectives).length).toBeGreaterThan(0);
  });

  it('RTO/RPO degerleri', () => {
    const obj = RecoveryObjectiveService.getObjective('express-api');
    expect(obj).toBeDefined();
    expect(obj?.rto).toBeGreaterThan(0);
    expect(obj?.rpo).toBeGreaterThan(0);
  });

  it('Tier atamasi', () => {
    const obj = RecoveryObjectiveService.getObjective('nextjs-ui');
    expect(obj?.tier).toBe('critical');
  });
});
