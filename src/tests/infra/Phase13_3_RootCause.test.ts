import { describe, it, expect, beforeEach } from 'vitest';
import { RootCauseIntelligenceService } from '../../infra/knowledge/RootCauseIntelligenceService';

describe('Sprint 13.3 - RootCauseIntelligenceService', () => {
  beforeEach(() => {
    RootCauseIntelligenceService.clear();
  });

  it('Incident kaydeder', () => {
    const inc = RootCauseIntelligenceService.record({
      title: 'Memory spike',
      symptoms: ['high memory', 'slow response'],
      rootCause: 'Memory leak',
      resolution: 'Restart service',
    });
    expect(inc.id).toBeDefined();
    expect(inc.timestamp).toBeDefined();
  });

  it('Benzer incidentleri kumeler', () => {
    RootCauseIntelligenceService.record({
      title: 'Memory spike 1',
      symptoms: ['high memory', 'slow response'],
      rootCause: 'Memory leak',
      resolution: 'Restart',
    });
    RootCauseIntelligenceService.record({
      title: 'Memory spike 2',
      symptoms: ['high memory', 'slow response'],
      rootCause: 'Memory leak',
      resolution: 'Restart',
    });
    const clusters = RootCauseIntelligenceService.findClusters();
    expect(clusters.length).toBeGreaterThan(0);
  });

  it('Rapor uretir', () => {
    const report = RootCauseIntelligenceService.getReport();
    expect(report.timestamp).toBeDefined();
    expect(report.status).toMatch(/^(ok|warning|critical)$/);
  });

  it('Bos incident listesi', () => {
    const report = RootCauseIntelligenceService.getReport();
    expect(report.totalIncidents).toBe(0);
    expect(report.clusters.length).toBe(0);
  });
});
