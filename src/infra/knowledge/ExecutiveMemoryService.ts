export interface MemoryEntry {
  id: string;
  type: 'decision' | 'lesson' | 'insight';
  title: string;
  content: string;
  tags: string[];
  timestamp: string;
  importance: 'low' | 'medium' | 'high';
}

export interface MemoryRecall {
  entry: MemoryEntry;
  relevance: number;
}

export interface ExecutiveMemoryReport {
  timestamp: string;
  totalEntries: number;
  byType: {
    decision: number;
    lesson: number;
    insight: number;
  };
  topEntries: MemoryEntry[];
  status: 'ok' | 'warning' | 'critical';
}

export class ExecutiveMemoryService {
  private static entries: MemoryEntry[] = [];

  static remember(entry: Omit<MemoryEntry, 'id' | 'timestamp'>): MemoryEntry {
    const newEntry: MemoryEntry = {
      ...entry,
      id: `MEM-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      timestamp: new Date().toISOString(),
    };
    this.entries.push(newEntry);
    return newEntry;
  }

  static recall(query: string): MemoryRecall[] {
    const terms = query.toLowerCase().split(/\s+/).filter(t => t.length > 0);

    return this.entries
      .map(entry => {
        const searchable = `${entry.title} ${entry.content} ${entry.tags.join(' ')}`.toLowerCase();
        const matched = terms.filter(t => searchable.includes(t)).length;
        const relevance = terms.length > 0 ? matched / terms.length : 0;
        return { entry, relevance };
      })
      .filter(r => r.relevance > 0)
      .sort((a, b) => b.relevance - a.relevance);
  }

  static getReport(): ExecutiveMemoryReport {
    const byType = {
      decision: this.entries.filter(e => e.type === 'decision').length,
      lesson: this.entries.filter(e => e.type === 'lesson').length,
      insight: this.entries.filter(e => e.type === 'insight').length,
    };

    const topEntries = [...this.entries]
      .sort((a, b) => {
        const order = { low: 1, medium: 2, high: 3 };
        return order[b.importance] - order[a.importance];
      })
      .slice(0, 5);

    const status = this.entries.length === 0 ? 'warning' : 'ok';

    return {
      timestamp: new Date().toISOString(),
      totalEntries: this.entries.length,
      byType,
      topEntries,
      status,
    };
  }

  static clear(): void {
    this.entries = [];
  }
}
