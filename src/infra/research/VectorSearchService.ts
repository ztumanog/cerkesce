export interface VectorIndexEntry {
  id: string;
  vector: number[];
  metadata: Record<string, string>;
}

export interface VectorSearchResult {
  id: string;
  score: number;
  metadata: Record<string, string>;
}

export interface VectorSearchReport {
  timestamp: string;
  totalVectors: number;
  lastQuerySize: number;
  lastResults: number;
  status: 'ok' | 'warning' | 'critical';
}

export class VectorSearchService {
  private static index: VectorIndexEntry[] = [];

  static add(entry: VectorIndexEntry): void {
    this.index.push(entry);
  }

  static search(queryVector: number[], topK: number = 5): VectorSearchResult[] {
    return this.index
      .map(entry => ({
        id: entry.id,
        score: this.cosineSimilarity(queryVector, entry.vector),
        metadata: entry.metadata,
      }))
      .sort((a, b) => b.score - a.score)
      .slice(0, topK);
  }

  private static cosineSimilarity(a: number[], b: number[]): number {
    const len = Math.min(a.length, b.length);
    let dot = 0, magA = 0, magB = 0;

    for (let i = 0; i < len; i++) {
      dot += a[i] * b[i];
      magA += a[i] * a[i];
      magB += b[i] * b[i];
    }

    const denom = Math.sqrt(magA) * Math.sqrt(magB);
    return denom > 0 ? Math.round((dot / denom) * 10000) / 10000 : 0;
  }

  static getReport(querySize: number = 0): VectorSearchReport {
    const status = this.index.length === 0 ? 'warning' : 'ok';

    return {
      timestamp: new Date().toISOString(),
      totalVectors: this.index.length,
      lastQuerySize: querySize,
      lastResults: 0,
      status,
    };
  }

  static clear(): void {
    this.index = [];
  }
}
