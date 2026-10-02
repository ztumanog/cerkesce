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

  /**
   * Phase 8.1.4: Prometheus formatinda export
   */
  public static toPrometheus(): string {
    const lines: string[] = [];

    // Counters
    this.counters.forEach((value, name) => {
      lines.push(`# HELP ${name} Counter metric`);
      lines.push(`# TYPE ${name} counter`);
      lines.push(`${name} ${value}`);
    });

    // Histogram'lar (average olarak)
    const histogramNames = new Set(this.histograms.map(h => h.name));
    histogramNames.forEach(name => {
      const avg = this.getAverageLatency(name);
      const count = this.histograms.filter(h => h.name === name).length;
      lines.push(`# HELP ${name}_avg Average latency in ms`);
      lines.push(`# TYPE ${name}_avg gauge`);
      lines.push(`${name}_avg ${avg}`);
      lines.push(`# HELP ${name}_count Total count`);
      lines.push(`# TYPE ${name}_count counter`);
      lines.push(`${name}_count ${count}`);
    });

    return lines.join('\n') + '\n';
  }

  /**
   * JSON formatinda ozet
   */
  public static toJSON() {
    return {
      counters: Object.fromEntries(this.counters),
      histograms: this.histograms.reduce((acc, h) => {
        if (!acc[h.name]) acc[h.name] = { count: 0, totalMs: 0 };
        acc[h.name].count++;
        acc[h.name].totalMs += h.durationMs;
        return acc;
      }, {} as Record<string, { count: number; totalMs: number }>),
    };
  }

  public static clear(): void {
    this.counters.clear();
    this.histograms = [];
  }
}
