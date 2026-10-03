export interface KnowledgeEntry {
  id: string;
  type: 'incident' | 'solution' | 'runbook';
  title: string;
  description: string;
  tags: string[];
  createdAt: string;
  resolvedAt?: string;
}

export interface KnowledgeSearchResult {
  entry: KnowledgeEntry;
  relevance: number;
}

export interface KnowledgeBaseReport {
  timestamp: string;
  totalEntries: number;
  byType: {
    incident: number;
    solution: number;
    runbook: number;
  };
  recentEntries: KnowledgeEntry[];
  status: 'ok' | 'warning' | 'critical';
}

export class OperationalKnowledgeBaseService {
  private static entries: KnowledgeEntry[] = [];

  static add(entry: Omit<KnowledgeEntry, 'id' | 'createdAt'>): KnowledgeEntry {
    const newEntry: KnowledgeEntry = {
      ...entry,
      id: `KB-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      createdAt: new Date().toISOString(),
    };
    this.entries.push(newEntry);
    return newEntry;
  }

  static search(query: string): KnowledgeSearchResult[] {
    const lower = query.toLowerCase();
    return this.entries
      .filter(e =>
        e.title.toLowerCase().includes(lower) ||
        e.description.toLowerCase().includes(lower) ||
        e.tags.some(t => t.toLowerCase().includes(lower))
      )
      .map(e => ({ entry: e, relevance: 1.0 }))
      .sort((a, b) => b.relevance - a.relevance);
  }

  static getReport(): KnowledgeBaseReport {
    const byType = {
      incident: this.entries.filter(e => e.type === 'incident').length,
      solution: this.entries.filter(e => e.type === 'solution').length,
      runbook: this.entries.filter(e => e.type === 'runbook').length,
    };

    const recentEntries = [...this.entries]
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
      .slice(0, 10);

    const status = this.entries.length === 0 ? 'warning'
      : this.entries.length < 5 ? 'warning' : 'ok';

    return {
      timestamp: new Date().toISOString(),
      totalEntries: this.entries.length,
      byType,
      recentEntries,
      status,
    };
  }

  static clear(): void {
    this.entries = [];
  }
}
