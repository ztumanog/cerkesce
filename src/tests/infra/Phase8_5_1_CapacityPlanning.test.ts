import { describe, it, expect } from 'vitest';
import { CapacityPlanningService } from '../../infra/operations/CapacityPlanningService';

describe('Sprint 8.5.1 - Capacity Planning', () => {
  it('Capacity metrikleri dondurur', () => {
    const metrics = CapacityPlanningService.getMetrics();
    expect(metrics.cpu.cores).toBeGreaterThan(0);
    expect(metrics.memory.totalMB).toBeGreaterThan(0);
    expect(metrics.status).toMatch(/^(ok|warning|critical)$/);
  });

  it('Growth scenarios', () => {
    const scenarios = CapacityPlanningService.getGrowthScenarios(100);
    expect(scenarios.length).toBe(4);
    expect(scenarios[0].multiplier).toBe(1);
    expect(scenarios[3].multiplier).toBe(10);
    expect(scenarios[3].estimatedRps).toBe(1000);
  });

  it('Bottleneck analysis', () => {
    const bottlenecks = CapacityPlanningService.getBottlenecks();
    expect(bottlenecks.length).toBe(4);
    const logging = bottlenecks.find(b => b.layer === 'Logging');
    expect(logging).toBeDefined();
  });

  it('Full capacity report', () => {
    const report = CapacityPlanningService.getFullReport();
    expect(report.current).toBeDefined();
    expect(report.growthScenarios.length).toBe(4);
    expect(report.bottlenecks.length).toBe(4);
    expect(report.recommendations.length).toBeGreaterThan(0);
  });
});
