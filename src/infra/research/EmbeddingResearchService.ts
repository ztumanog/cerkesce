export interface EmbeddingVector {
  id: string;
  text: string;
  vector: number[];
  dimensions: number;
  timestamp: string;
}

export interface EmbeddingResult {
  id: string;
  vector: number[];
  dimensions: number;
  norm: number;
}

export interface EmbeddingReport {
  timestamp: string;
  totalEmbeddings: number;
  dimensions: number;
  status: 'ok' | 'warning' | 'critical';
}

export class EmbeddingResearchService {
  private static embeddings: EmbeddingVector[] = [];
  private static dimensions = 128;

  static embed(id: string, text: string): EmbeddingResult {
    const vector = this.generateVector(text, this.dimensions);
    const norm = Math.sqrt(vector.reduce((sum, v) => sum + v * v, 0));

    const embedding: EmbeddingVector = {
      id,
      text,
      vector,
      dimensions: this.dimensions,
      timestamp: new Date().toISOString(),
    };
    this.embeddings.push(embedding);

    return { id, vector, dimensions: this.dimensions, norm: Math.round(norm * 100) / 100 };
  }

  private static generateVector(text: string, dims: number): number[] {
    const vector: number[] = [];
    for (let i = 0; i < dims; i++) {
      const charCode = text.charCodeAt(i % text.length) || 0;
      vector.push(Math.sin(charCode * (i + 1)) * 0.5);
    }
    return vector.map(v => Math.round(v * 10000) / 10000);
  }

  static getReport(): EmbeddingReport {
    const status = this.embeddings.length === 0 ? 'warning' : 'ok';

    return {
      timestamp: new Date().toISOString(),
      totalEmbeddings: this.embeddings.length,
      dimensions: this.dimensions,
      status,
    };
  }

  static clear(): void {
    this.embeddings = [];
  }
}
