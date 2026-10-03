import { describe, it, expect, beforeEach } from 'vitest';
import { AvailabilityEngineeringService } from '../../infra/reliability/AvailabilityEngineeringService';

describe('Sprint 15.1 - AvailabilityEngineeringService', () => {
  beforeEach(() => {
    AvailabilityEngineeringService.clear();
  });

  it('Rapor uretir', () => {
    const report = AvailabilityEngineeringService.getReport();
    expect(report.timestamp).toBeDefined();
    expect(report.slaTargets.length).toBeGreaterThan(0);
    expect(report.status).toMatch(/^(ok|warning|critical)$/);
  });

  it('Overall availability hesaplanir', () => {
    const report = AvailabilityEngineeringService.getReport();
    expect(report.overallAvailability).toBeGreaterThan(0);
    expect(report.overallAvailability).toBeLessThanOrEqual(100);
  });

  it('Uptime kaydeder', () => {
    AvailabilityEngineeringService.recordUptime({
      service: 'api',
      period: '2026-10',
      uptimePercent: 99.9,
      downtimeMinutes: 43,
    });
    const report = AvailabilityEngineeringService.getReport();
    expect(report.uptimeRecords.length).toBe(1);
  });

  it('SLA ihlali tespit eder', () => {
    const report = AvailabilityEngineeringService.getReport();
    const analytics = report.slaTargets.find(t => t.name === 'Analytics');
    expect(analytics?.current).toBeLessThan(analytics?.target || 0);
  });
});
