import { describe, it, expect } from 'vitest';
import { ArchitectureDriftDetectionService } from '../../infra/intelligence/ArchitectureDriftDetectionService';

describe('Sprint 11.3 - ArchitectureDriftDetectionService', () => {
  it('Rapor uretir', () => {
    const report = ArchitectureDriftDetectionService.detect();
    expect(report.timestamp).toBeDefined();
    expect(Array.isArray(report.findings)).toBe(true);
    expect(report.status).toMatch(/^(ok|warning|critical)$/);
  });

  it('Drift score hesaplanir', () => {
    const report = ArchitectureDriftDetectionService.detect();
    expect(report.driftScore).toBeGreaterThanOrEqual(0);
  });

  it('Finding severity', () => {
    const report = ArchitectureDriftDetectionService.detect();
    for (const f of report.findings) {
      expect(['low', 'medium', 'high']).toContain(f.severity);
    }
  });
});
