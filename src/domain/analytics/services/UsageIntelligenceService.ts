export interface SearchEvent {
  query: string;
  timestamp: number;
  resultCount: number;
  dialect?: string;
}

export interface UsageSummary {
  totalSearches: number;
  uniqueQueries: number;
  topQueries: Array<{ query: string; count: number }>;
  topRoots: Array<{ root: string; count: number }>;
  averageResultCount: number;
  zeroResultRate: number;
}

export interface TrendPoint {
  label: string;
  count: number;
}

export class UsageIntelligenceService {
  private events: SearchEvent[] = [];

  record(event: SearchEvent): void {
    this.events.push(event);
  }

  getSummary(since?: number): UsageSummary {
    const filtered = since ? this.events.filter(e => e.timestamp >= since) : this.events;
    const queryCounts = new Map<string, number>();
    let totalResults = 0;
    let zeroResults = 0;
    for (const e of filtered) {
      const q = e.query.trim().toLowerCase();
      queryCounts.set(q, (queryCounts.get(q) ?? 0) + 1);
      totalResults += e.resultCount;
      if (e.resultCount === 0) zeroResults++;
    }
    const topQueries = [...queryCounts.entries()].sort((a,b)=>b[1]-a[1]).slice(0,10).map(([query,count])=>({query,count}));
    const rootCounts = new Map<string, number>();
    for (const [query, count] of queryCounts.entries()) {
      const m = query.match(/^[\u0400-\u04FF\u04C0\u04CF]{2,4}/);
      if (m) rootCounts.set(m[0], (rootCounts.get(m[0]) ?? 0) + count);
    }
    const topRoots = [...rootCounts.entries()].sort((a,b)=>b[1]-a[1]).slice(0,10).map(([root,count])=>({root,count}));
    return { totalSearches: filtered.length, uniqueQueries: queryCounts.size, topQueries, topRoots, averageResultCount: filtered.length > 0 ? totalResults/filtered.length : 0, zeroResultRate: filtered.length > 0 ? zeroResults/filtered.length : 0 };
  }

  getTrend(intervalMs: number = 3600000, buckets: number = 24): TrendPoint[] {
    const now = Date.now();
    return Array.from({length: buckets}, (_, i) => {
      const start = now - (buckets - i) * intervalMs;
      const end = start + intervalMs;
      return { label: new Date(start).toISOString().slice(11,16), count: this.events.filter(e => e.timestamp >= start && e.timestamp < end).length };
    });
  }

  clear(): void { this.events = []; }
  getEventCount(): number { return this.events.length; }
}
