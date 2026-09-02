export interface SlowQueryLog {
  query: string;
  durationMs: number;
  timestamp: string;
}

export class OperationalAnalyticsService {
  private static cacheHits = 0;
  private static cacheMisses = 0;
  private static slowQueries: SlowQueryLog[] = [];

  public static recordCacheAccess(hit: boolean): void {
    if (hit) this.cacheHits++;
    else this.cacheMisses++;
  }

  public static getCacheHitRatio(): number {
    const total = this.cacheHits + this.cacheMisses;
    if (total === 0) return 0;
    return Number(((this.cacheHits / total) * 100).toFixed(2));
  }

  public static recordQueryExecution(query: string, durationMs: number, thresholdMs = 100): void {
    if (durationMs > thresholdMs) {
      this.slowQueries.push({
        query,
        durationMs,
        timestamp: new Date().toISOString()
      });
    }
  }

  public static getSlowQueries(): SlowQueryLog[] {
    return this.slowQueries;
  }

  public static clear(): void {
    this.cacheHits = 0;
    this.cacheMisses = 0;
    this.slowQueries = [];
  }
}