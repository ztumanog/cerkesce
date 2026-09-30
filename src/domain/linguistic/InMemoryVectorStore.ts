/**
 * InMemoryVectorStore - Pure TypeScript Cosine Similarity
 * 
 * ADR-ROOT-001 uyumlu: Arastirma katmaninda calisir.
 * Runtime'a sokulmaz.
 * 
 * FAISS yerine Pure TS kullanilir (over-engineering onlenir).
 */

export interface VectorEntry {
  id: string;
  form: string;
  meaning: string;
  vector: Float32Array;
}

export interface SearchResult {
  entry: VectorEntry;
  score: number;
}

export class InMemoryVectorStore {
  private entries: VectorEntry[] = [];

  add(entry: VectorEntry): void {
    this.entries.push(entry);
  }

  addBatch(entries: VectorEntry[]): void {
    this.entries.push(...entries);
  }

  size(): number {
    return this.entries.length;
  }

  /**
   * Iki vektor arasinda cosine similarity hesaplar.
   * O(n) = vektor boyutu
   */
  private cosineSimilarity(a: Float32Array, b: Float32Array): number {
    let dot = 0;
    let normA = 0;
    let normB = 0;
    const len = Math.min(a.length, b.length);
    for (let i = 0; i < len; i++) {
      dot += a[i] * b[i];
      normA += a[i] * a[i];
      normB += b[i] * b[i];
    }
    if (normA === 0 || normB === 0) return 0;
    return dot / (Math.sqrt(normA) * Math.sqrt(normB));
  }

  /**
   * En benzer topK vektoru bulur.
   * O(n*m) = n vektor * m boyut
   */
  search(query: Float32Array, topK: number = 5): SearchResult[] {
    const scores: SearchResult[] = [];
    for (const entry of this.entries) {
      const score = this.cosineSimilarity(query, entry.vector);
      scores.push({ entry, score });
    }
    return scores.sort((a, b) => b.score - a.score).slice(0, topK);
  }

  /**
   * Belirli bir ID icin benzer vektorleri bulur.
   */
  searchById(id: string, topK: number = 5): SearchResult[] {
    const source = this.entries.find(e => e.id === id);
    if (!source) return [];
    return this.search(source.vector, topK + 1).filter(r => r.entry.id !== id).slice(0, topK);
  }
}
