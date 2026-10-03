import { describe, it, expect, beforeEach } from 'vitest';
import { VectorSearchService } from '../../infra/research/VectorSearchService';

describe('Track D.2 - VectorSearchService', () => {
  beforeEach(() => {
    VectorSearchService.clear();
  });

  it('Vektor ekler', () => {
    VectorSearchService.add({
      id: 'v1',
      vector: [1, 0, 0],
      metadata: { text: 'test' },
    });
    const report = VectorSearchService.getReport();
    expect(report.totalVectors).toBe(1);
  });

  it('Arama yapar', () => {
    VectorSearchService.add({ id: 'v1', vector: [1, 0, 0], metadata: {} });
    VectorSearchService.add({ id: 'v2', vector: [0, 1, 0], metadata: {} });
    const results = VectorSearchService.search([1, 0, 0], 2);
    expect(results[0].id).toBe('v1');
    expect(results[0].score).toBe(1);
  });

  it('TopK sinirlama', () => {
    for (let i = 0; i < 10; i++) {
      VectorSearchService.add({ id: `v${i}`, vector: [i, 1, 0], metadata: {} });
    }
    const results = VectorSearchService.search([1, 1, 0], 3);
    expect(results.length).toBe(3);
  });

  it('Bos index warning', () => {
    const report = VectorSearchService.getReport();
    expect(report.status).toBe('warning');
  });
});
