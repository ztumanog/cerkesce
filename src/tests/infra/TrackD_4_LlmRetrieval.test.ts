import { describe, it, expect, beforeEach } from 'vitest';
import { LlmRetrievalService } from '../../infra/research/LlmRetrievalService';

describe('Track D.4 - LlmRetrievalService', () => {
  beforeEach(() => {
    LlmRetrievalService.clear();
  });

  it('Dokuman ekler', () => {
    LlmRetrievalService.addDocument({
      id: 'doc-1',
      content: 'Memory management strategy',
      metadata: {},
    });
    const report = LlmRetrievalService.getReport();
    expect(report.totalDocuments).toBe(1);
  });

  it('Retrieval yapar', () => {
    LlmRetrievalService.addDocument({ id: 'd1', content: 'memory optimization', metadata: {} });
    const results = LlmRetrievalService.retrieve('memory');
    expect(results.length).toBe(1);
  });

  it('Snippet uretir', () => {
    LlmRetrievalService.addDocument({ id: 'd1', content: 'A'.repeat(50) + ' memory test', metadata: {} });
    const results = LlmRetrievalService.retrieve('memory');
    expect(results[0].snippet.length).toBeGreaterThan(0);
  });

  it('TopK sinirlama', () => {
    for (let i = 0; i < 5; i++) {
      LlmRetrievalService.addDocument({ id: `d${i}`, content: 'memory ' + i, metadata: {} });
    }
    const results = LlmRetrievalService.retrieve('memory', 2);
    expect(results.length).toBe(2);
  });

  it('Bos dokuman warning', () => {
    const report = LlmRetrievalService.getReport();
    expect(report.status).toBe('warning');
  });
});
