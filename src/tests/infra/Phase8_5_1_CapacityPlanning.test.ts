import { describe, it, expect } from 'vitest';
import { CapacityPlanningService } from '../../infra/operations/CapacityPlanningService';

describe('Sprint 8.5.1 - Capacity Planning', () => {
  it('Capacity metrikleri dondurur', () => {
    const metrics = CapacityPlanningService.getMetrics();
    expect(metrics.timestamp).toBeDefined();
    expect(metrics.cpu.cores).toBeGreaterThan(0);
    expect(metrics.memory.totalMB).toBeGreaterThan(0);
    expect(metrics.uptime.seconds).toBeGreaterThan(0);
    expect(metrics.status).toMatch(/^(ok|warning|critical)$/);
  });

  it('Memory kullanimi hesaplanir', () => {
    const metrics = CapacityPlanningService.getMetrics();
    expect(metrics.memory.usagePercent).toBeGreaterThan(0);
    expect(metrics.memory.usagePercent).toBeLessThanOrEqual(100);
  });

  it('CPU kullanimi hesaplanir', () => {
    const metrics = CapacityPlanningService.getMetrics();
    expect(metrics.cpu.usagePercent).toBeGreaterThanOrEqual(0);
  });
});
