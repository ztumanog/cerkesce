export class MetricsService {
  private static counters = new Map<string, number>();
  private static histograms: Array<{ name: string; durationMs: number }> = [];

  public static incrementCounter(name: string, value = 1): void {
    const current = this.counters.get(name) || 0;
    this.counters.set(name, current + value);
  }

  public static recordLatency(name: string, durationMs: number): void {
    this.histograms.push({ name, durationMs });
  }

  public static getCounter(name: string): number {
    return this.counters.get(name) || 0;
  }

  public static getAverageLatency(name: string): number {
    const records = this.histograms.filter(h => h.name === name);
    if (records.length === 0) return 0;
    const sum = records.reduce((acc, curr) => acc + curr.durationMs, 0);
    return Number((sum / records.length).toFixed(2));
  }

  public static clear(): void {
    this.counters.clear();
    this.histograms = [];
  }
}