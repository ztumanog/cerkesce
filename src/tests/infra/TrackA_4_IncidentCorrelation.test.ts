import { describe, it, expect, beforeEach } from 'vitest';
import { IncidentCorrelationService } from '../../infra/operations/IncidentCorrelationService';

describe('Track A.4 - IncidentCorrelationService', () => {
  beforeEach(() => {
    IncidentCorrelationService.clear();
  });

  it('Incident kaydeder', () => {
    const inc = IncidentCorrelationService.record({
      title: 'Memory spike',
      services: ['api', 'worker'],
      severity: 'high',
      symptoms: ['high memory'],
    });
    expect(inc.id).toBeDefined();
  });

  it('Iliskili incidentleri gruplar', () => {
    IncidentCorrelationService.record({
      title: 'Memory spike 1',
      services: ['api', 'worker'],
      severity: 'high',
      symptoms: ['high memory'],
    });
    IncidentCorrelationService.record({
      title: 'Memory spike 2',
      services: ['api', 'worker'],
      severity: 'high',
      symptoms: ['high memory'],
    });
    const report = IncidentCorrelationService.correlate();
    expect(report.groups.length).toBeGreaterThan(0);
  });

  it('Rapor uretir', () => {
    const report = IncidentCorrelationService.correlate();
    expect(report.timestamp).toBeDefined();
    expect(report.status).toMatch(/^(ok|warning|critical)$/);
  });

  it('Bos incident listesi', () => {
    const report = IncidentCorrelationService.correlate();
    expect(report.totalIncidents).toBe(0);
    expect(report.groups.length).toBe(0);
  });
});
