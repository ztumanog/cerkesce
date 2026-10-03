import { describe, it, expect } from 'vitest';
import { CapacityScalingService } from '../../infra/operations/CapacityScalingService';

describe('Track A.5 - CapacityScalingService', () => {
  it('Rapor uretir', () => {
    const report = CapacityScalingService.getReport();
    expect(report.timestamp).toBeDefined();
    expect(report.policies.length).toBeGreaterThan(0);
  });

  it('Yuksek CPU scale up', () => {
    const report = CapacityScalingService.getReport({ cpu: 85, memory: 50 });
    const scaleUp = report.decisions.find(d => d.action === 'scale_up');
    expect(scaleUp).toBeDefined();
  });

  it('Dusuk CPU scale down', () => {
    const report = CapacityScalingService.getReport({ cpu: 20, memory: 50 });
    const scaleDown = report.decisions.find(d => d.action === 'scale_down');
    expect(scaleDown).toBeDefined();
  });

  it('Normal CPU no change', () => {
    const report = CapacityScalingService.getReport({ cpu: 50, memory: 50 });
    const noChange = report.decisions.filter(d => d.action === 'no_change');
    expect(noChange.length).toBeGreaterThan(0);
  });
});
