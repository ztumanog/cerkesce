import { describe, it, expect, beforeEach } from 'vitest';
import { TraceabilityMatrixService } from '../../infra/knowledge/TraceabilityMatrixService';

describe('Track C.4 - TraceabilityMatrixService', () => {
  beforeEach(() => {
    TraceabilityMatrixService.clear();
  });

  it('Entry ekler', () => {
    TraceabilityMatrixService.add({
      requirementId: 'REQ-1',
      adrId: 'ADR-1',
      testId: 'TEST-1',
      status: 'covered',
    });
    const report = TraceabilityMatrixService.getReport();
    expect(report.totalRequirements).toBe(1);
  });

  it('Coverage hesaplanir', () => {
    TraceabilityMatrixService.add({ requirementId: 'REQ-1', adrId: 'ADR-1', testId: 'T1', status: 'covered' });
    TraceabilityMatrixService.add({ requirementId: 'REQ-1', adrId: 'ADR-2', testId: 'T2', status: 'missing' });
    const report = TraceabilityMatrixService.getReport();
    expect(report.rows[0].coverage).toBe(50);
    expect(report.rows[0].status).toBe('partial');
  });

  it('Tam coverage', () => {
    TraceabilityMatrixService.add({ requirementId: 'REQ-1', adrId: 'ADR-1', testId: 'T1', status: 'covered' });
    TraceabilityMatrixService.add({ requirementId: 'REQ-1', adrId: 'ADR-2', testId: 'T2', status: 'covered' });
    const report = TraceabilityMatrixService.getReport();
    expect(report.rows[0].coverage).toBe(100);
    expect(report.rows[0].status).toBe('covered');
  });

  it('Bos matris', () => {
    const report = TraceabilityMatrixService.getReport();
    expect(report.totalRequirements).toBe(0);
    expect(report.coveragePercent).toBe(0);
  });
});
