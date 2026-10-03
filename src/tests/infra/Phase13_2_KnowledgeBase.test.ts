import { describe, it, expect, beforeEach } from 'vitest';
import { OperationalKnowledgeBaseService } from '../../infra/knowledge/OperationalKnowledgeBaseService';

describe('Sprint 13.2 - OperationalKnowledgeBaseService', () => {
  beforeEach(() => {
    OperationalKnowledgeBaseService.clear();
  });

  it('Kayit ekler', () => {
    const entry = OperationalKnowledgeBaseService.add({
      type: 'incident',
      title: 'Memory spike',
      description: 'Memory %90 uzerine cikti',
      tags: ['memory', 'capacity'],
    });
    expect(entry.id).toBeDefined();
    expect(entry.createdAt).toBeDefined();
  });

  it('Arama yapar', () => {
    OperationalKnowledgeBaseService.add({
      type: 'incident',
      title: 'CPU spike',
      description: 'CPU yuksek',
      tags: ['cpu'],
    });
    const results = OperationalKnowledgeBaseService.search('cpu');
    expect(results.length).toBe(1);
  });

  it('Rapor uretir', () => {
    OperationalKnowledgeBaseService.add({
      type: 'solution',
      title: 'Cache optimizasyonu',
      description: 'Redis cache hit artirildi',
      tags: ['cache'],
    });
    const report = OperationalKnowledgeBaseService.getReport();
    expect(report.timestamp).toBeDefined();
    expect(report.totalEntries).toBe(1);
    expect(report.byType.solution).toBe(1);
  });

  it('Bos KB warning', () => {
    const report = OperationalKnowledgeBaseService.getReport();
    expect(report.status).toBe('warning');
  });
});
