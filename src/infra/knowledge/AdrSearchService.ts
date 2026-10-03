export interface AdrDocument {
  id: string;
  title: string;
  status: string;
  phase: number;
  content: string;
  tags: string[];
}

export interface SearchResult {
  adr: AdrDocument;
  relevance: number;
  matchedTerms: string[];
}

export interface AdrSearchReport {
  timestamp: string;
  totalAdrs: number;
  lastQuery: string;
  lastResults: SearchResult[];
  status: 'ok' | 'warning' | 'critical';
}

export class AdrSearchService {
  private static adrs: AdrDocument[] = [];

  static index(adr: AdrDocument): void {
    this.adrs.push(adr);
  }

  static search(query: string): SearchResult[] {
    const terms = query.toLowerCase().split(/\s+/).filter(t => t.length > 0);

    return this.adrs
      .map(adr => {
        const searchable = `${adr.title} ${adr.content} ${adr.tags.join(' ')}`.toLowerCase();
        const matchedTerms = terms.filter(t => searchable.includes(t));
        const relevance = terms.length > 0 ? matchedTerms.length / terms.length : 0;

        return { adr, relevance, matchedTerms };
      })
      .filter(r => r.relevance > 0)
      .sort((a, b) => b.relevance - a.relevance);
  }

  static getReport(query: string = ''): AdrSearchReport {
    const results = query ? this.search(query) : [];

    return {
      timestamp: new Date().toISOString(),
      totalAdrs: this.adrs.length,
      lastQuery: query,
      lastResults: results,
      status: this.adrs.length === 0 ? 'warning' : 'ok',
    };
  }

  static clear(): void {
    this.adrs = [];
  }
}
