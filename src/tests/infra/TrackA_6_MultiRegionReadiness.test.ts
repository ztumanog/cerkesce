import { describe, it, expect } from 'vitest';
import { MultiRegionReadinessService } from '../../infra/operations/MultiRegionReadinessService';

describe('Track A.6 - MultiRegionReadinessService', () => {
  it('Rapor uretir', () => {
    const report = MultiRegionReadinessService.getReport();
    expect(report.timestamp).toBeDefined();
    expect(report.regions.length).toBeGreaterThan(0);
    expect(report.status).toMatch(/^(ok|warning|critical)$/);
  });

  it('Active region sayisi', () => {
    const report = MultiRegionReadinessService.getReport();
    expect(report.activeRegions).toBeGreaterThan(0);
  });

  it('Ready region kontrolu', () => {
    const report = MultiRegionReadinessService.getReport();
    expect(report.readyRegions).toBeGreaterThanOrEqual(0);
  });

  it('Region readiness detaylari', () => {
    const report = MultiRegionReadinessService.getReport();
    const euRegion = report.readiness.find(r => r.regionId === 'eu-west-1');
    expect(euRegion).toBeDefined();
    expect(euRegion?.ready).toBe(true);
  });
});
