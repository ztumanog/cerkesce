import { describe, it, expect, beforeEach } from 'vitest';
import { IncidentManagementService } from '../../infra/operations/IncidentManagementService';

describe('Sprint 8.5.3 - Incident Management', () => {
  beforeEach(() => {
    IncidentManagementService.clear();
  });

  it('Incident olusturur', () => {
    const inc = IncidentManagementService.create('Test incident', 'SEV2', 'runbook.md');
    expect(inc.id).toBeDefined();
    expect(inc.severity).toBe('SEV2');
    expect(inc.status).toBe('open');
  });

  it('Incident resolve eder', () => {
    const inc = IncidentManagementService.create('Test', 'SEV3');
    const resolved = IncidentManagementService.resolve(inc.id);
    expect(resolved?.status).toBe('resolved');
    expect(resolved?.resolvedAt).toBeDefined();
  });

  it('Rapor uretir', () => {
    IncidentManagementService.create('A', 'SEV1');
    IncidentManagementService.create('B', 'SEV2');
    const report = IncidentManagementService.getReport();
    expect(report.total).toBe(2);
    expect(report.open).toBe(2);
    expect(report.bySeverity.SEV1).toBe(1);
    expect(report.bySeverity.SEV2).toBe(1);
  });
});
