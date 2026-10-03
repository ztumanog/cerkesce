import { describe, it, expect, beforeEach } from 'vitest';
import { AdrSearchService } from '../../infra/knowledge/AdrSearchService';

describe('Track C.1 - AdrSearchService', () => {
  beforeEach(() => {
    AdrSearchService.clear();
  });

  it('ADR indeksler', () => {
    AdrSearchService.index({
      id: 'ADR-001',
      title: 'Test ADR',
      status: 'Accepted',
      phase: 1,
      content: 'Test content',
      tags: ['test'],
    });
    const report = AdrSearchService.getReport();
    expect(report.totalAdrs).toBe(1);
  });

  it('Arama yapar', () => {
    AdrSearchService.index({
      id: 'ADR-001',
      title: 'Memory management',
      status: 'Accepted',
      phase: 1,
      content: 'Memory optimization',
      tags: ['memory'],
    });
    const results = AdrSearchService.search('memory');
    expect(results.length).toBe(1);
  });

  it('Relevance hesaplanir', () => {
    AdrSearchService.index({
      id: 'ADR-001',
      title: 'Memory and CPU',
      status: 'Accepted',
      phase: 1,
      content: 'Test',
      tags: [],
    });
    const results = AdrSearchService.search('memory cpu');
    expect(results[0].relevance).toBe(1);
  });

  it('Bos arama', () => {
    const report = AdrSearchService.getReport();
    expect(report.totalAdrs).toBe(0);
  });
});
