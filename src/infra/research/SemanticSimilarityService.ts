export interface SemanticPair {
  id1: string;
  id2: string;
  similarity: number;
  level: 'low' | 'medium' | 'high' | 'very_high';
}

export interface SimilarityMatrix {
  ids: string[];
  matrix: number[][];
  averageSimilarity: number;
}

export interface SemanticSimilarityReport {
  timestamp: string;
  totalPairs: number;
  pairs: SemanticPair[];
  matrix: SimilarityMatrix | null;
  status: 'ok' | 'warning' | 'critical';
}

export class SemanticSimilarityService {
  private static vectors: Map<string, number[]> = new Map();

  static add(id: string, vector: number[]): void {
    this.vectors.set(id, vector);
  }

  static similarity(id1: string, id2: string): SemanticPair | null {
    const v1 = this.vectors.get(id1);
    const v2 = this.vectors.get(id2);
    if (!v1 || !v2) return null;

    const sim = this.cosine(v1, v2);
    const level = sim >= 0.9 ? 'very_high'
      : sim >= 0.7 ? 'high'
        : sim >= 0.4 ? 'medium' : 'low';

    return { id1, id2, similarity: Math.round(sim * 10000) / 10000, level };
  }

  static matrix(): SimilarityMatrix {
    const ids = Array.from(this.vectors.keys());
    const matrix: number[][] = [];
    let total = 0;
    let count = 0;

    for (const id1 of ids) {
      const row: number[] = [];
      for (const id2 of ids) {
        const sim = id1 === id2 ? 1 : this.cosine(this.vectors.get(id1)!, this.vectors.get(id2)!);
        row.push(Math.round(sim * 10000) / 10000);
        if (id1 !== id2) { total += sim; count++; }
      }
      matrix.push(row);
    }

    return {
      ids,
      matrix,
      averageSimilarity: count > 0 ? Math.round((total / count) * 10000) / 10000 : 0,
    };
  }

  private static cosine(a: number[], b: number[]): number {
    const len = Math.min(a.length, b.length);
    let dot = 0, ma = 0, mb = 0;
    for (let i = 0; i < len; i++) {
      dot += a[i] * b[i];
      ma += a[i] * a[i];
      mb += b[i] * b[i];
    }
    const d = Math.sqrt(ma) * Math.sqrt(mb);
    return d > 0 ? dot / d : 0;
  }

  static getReport(): SemanticSimilarityReport {
    const pairs: SemanticPair[] = [];
    const ids = Array.from(this.vectors.keys());

    for (let i = 0; i < ids.length; i++) {
      for (let j = i + 1; j < ids.length; j++) {
        const pair = this.similarity(ids[i], ids[j]);
        if (pair) pairs.push(pair);
      }
    }

    const status = this.vectors.size === 0 ? 'warning' : 'ok';

    return {
      timestamp: new Date().toISOString(),
      totalPairs: pairs.length,
      pairs,
      matrix: this.vectors.size > 0 ? this.matrix() : null,
      status,
    };
  }

  static clear(): void {
    this.vectors.clear();
  }
}
