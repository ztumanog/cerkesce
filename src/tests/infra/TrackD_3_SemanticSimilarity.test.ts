import { describe, it, expect, beforeEach } from 'vitest';
import { SemanticSimilarityService } from '../../infra/research/SemanticSimilarityService';

describe('Track D.3 - SemanticSimilarityService', () => {
  beforeEach(() => {
    SemanticSimilarityService.clear();
  });

  it('Vektor ekler', () => {
    SemanticSimilarityService.add('a', [1, 0, 0]);
    const report = SemanticSimilarityService.getReport();
    expect(report.status).toBe('ok');
  });

  it('Benzerlik hesaplanir', () => {
    SemanticSimilarityService.add('a', [1, 0, 0]);
    SemanticSimilarityService.add('b', [1, 0, 0]);
    const pair = SemanticSimilarityService.similarity('a', 'b');
    expect(pair?.similarity).toBe(1);
    expect(pair?.level).toBe('very_high');
  });

  it('Dusuk benzerlik', () => {
    SemanticSimilarityService.add('a', [1, 0, 0]);
    SemanticSimilarityService.add('b', [0, 1, 0]);
    const pair = SemanticSimilarityService.similarity('a', 'b');
    expect(pair?.similarity).toBe(0);
    expect(pair?.level).toBe('low');
  });

  it('Matris uretir', () => {
    SemanticSimilarityService.add('a', [1, 0, 0]);
    SemanticSimilarityService.add('b', [0, 1, 0]);
    const matrix = SemanticSimilarityService.matrix();
    expect(matrix.ids.length).toBe(2);
    expect(matrix.matrix.length).toBe(2);
  });

  it('Bos vektor', () => {
    const report = SemanticSimilarityService.getReport();
    expect(report.totalPairs).toBe(0);
  });
});
