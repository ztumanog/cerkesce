import { describe, it, expect, beforeEach } from 'vitest';
import { EmbeddingResearchService } from '../../infra/research/EmbeddingResearchService';

describe('Track D.1 - EmbeddingResearchService', () => {
  beforeEach(() => {
    EmbeddingResearchService.clear();
  });

  it('Embedding uretir', () => {
    const result = EmbeddingResearchService.embed('id-1', 'test text');
    expect(result.vector.length).toBe(128);
    expect(result.dimensions).toBe(128);
  });

  it('Norm hesaplanir', () => {
    const result = EmbeddingResearchService.embed('id-1', 'test');
    expect(result.norm).toBeGreaterThan(0);
  });

  it('Rapor uretir', () => {
    EmbeddingResearchService.embed('id-1', 'test');
    const report = EmbeddingResearchService.getReport();
    expect(report.totalEmbeddings).toBe(1);
    expect(report.dimensions).toBe(128);
  });

  it('Bos embedding warning', () => {
    const report = EmbeddingResearchService.getReport();
    expect(report.status).toBe('warning');
  });
});
