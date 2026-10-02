import { describe, it, expect } from 'vitest';
import { AuditComplianceService } from '../../infra/operations/AuditComplianceService';

describe('Sprint 8.5.4 - Audit & Compliance', () => {
  it('Audit raporu uretir', () => {
    const report = AuditComplianceService.audit();
    expect(report.timestamp).toBeDefined();
    expect(report.totalChecks).toBeGreaterThan(0);
    expect(report.entries.length).toBeGreaterThan(0);
    expect(report.status).toMatch(/^(ok|warning|critical)$/);
  });

  it('ADR ve Faz kontrolleri yapar', () => {
    const report = AuditComplianceService.audit();
    const adrEntry = report.entries.find(e => e.category === 'adr');
    const phaseEntry = report.entries.find(e => e.category === 'phase');
    expect(adrEntry).toBeDefined();
    expect(phaseEntry).toBeDefined();
  });

  it('Deployment kontrolu', () => {
    const report = AuditComplianceService.audit();
    const deployEntry = report.entries.find(e => e.category === 'deployment');
    expect(deployEntry).toBeDefined();
  });
});
