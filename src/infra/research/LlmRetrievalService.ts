export interface LlmDocument {
  id: string;
  content: string;
  metadata: Record<string, string>;
}

export interface RetrievalResult {
  document: LlmDocument;
  score: number;
  snippet: string;
}

export interface LlmRetrievalReport {
  timestamp: string;
  totalDocuments: number;
  lastQuery: string;
  lastResults: RetrievalResult[];
  status: 'ok' | 'warning' | 'critical';
}

export class LlmRetrievalService {
  private static documents: LlmDocument[] = [];

  static addDocument(doc: LlmDocument): void {
    this.documents.push(doc);
  }

  static retrieve(query: string, topK: number = 3): RetrievalResult[] {
    const terms = query.toLowerCase().split(/\s+/).filter(t => t.length > 0);

    return this.documents
      .map(doc => {
        const lower = doc.content.toLowerCase();
        const matched = terms.filter(t => lower.includes(t)).length;
        const score = terms.length > 0 ? matched / terms.length : 0;

        const firstMatch = terms.length > 0
          ? Math.max(0, lower.indexOf(terms[0]) - 30)
          : 0;
        const snippet = doc.content.slice(firstMatch, firstMatch + 100);

        return { document: doc, score, snippet };
      })
      .filter(r => r.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, topK);
  }

  static getReport(query: string = ''): LlmRetrievalReport {
    const results = query ? this.retrieve(query) : [];

    return {
      timestamp: new Date().toISOString(),
      totalDocuments: this.documents.length,
      lastQuery: query,
      lastResults: results,
      status: this.documents.length === 0 ? 'warning' : 'ok',
    };
  }

  static clear(): void {
    this.documents = [];
  }
}
