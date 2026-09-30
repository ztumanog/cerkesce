import { describe, it, expect } from 'vitest';
import { InMemoryVectorStore, VectorEntry } from '@/domain/linguistic/InMemoryVectorStore';

describe('InMemoryVectorStore (F6 Gate Revizyon)', () => {
  const store = new InMemoryVectorStore();

  const testVectors: VectorEntry[] = [
    { id: 'L-GUF1E', form: 'гуфӀэ', meaning: 'sevgi', vector: new Float32Array([0.5, 0.5, 0.5, 0.5]) },
    { id: 'L-GUGHE', form: 'гугъэ', meaning: 'umut', vector: new Float32Array([0.5, 0.5, 0.5, 0.4]) },
    { id: 'L-GUBZH', form: 'губж', meaning: 'ofke', vector: new Float32Array([0.6, 0.4, 0.5, 0.3]) },
    { id: 'L-NEF', form: 'нэф', meaning: 'isik', vector: new Float32Array([0.1, 0.2, 0.3, 0.4]) },
  ];

  store.addBatch(testVectors);

  it('F6-001: Store boyutu dogru', () => {
    expect(store.size()).toBe(4);
  });

  it('F6-002: Cosine similarity calisir', () => {
    const query = new Float32Array([0.5, 0.5, 0.5, 0.5]);
    const results = store.search(query, 3);
    expect(results.length).toBe(3);
    expect(results[0].entry.id).toBe('L-GUF1E');
  });

  it('F6-003: Arama < 1ms', () => {
    const query = new Float32Array([0.5, 0.5, 0.5, 0.5]);
    const start = performance.now();
    store.search(query, 5);
    const elapsed = performance.now() - start;
    expect(elapsed).toBeLessThan(1);
  });

  it('F6-004: searchById calisir', () => {
    const results = store.searchById('L-GUF1E', 2);
    expect(results.length).toBe(2);
    expect(results[0].entry.id).not.toBe('L-GUF1E');
  });
});
