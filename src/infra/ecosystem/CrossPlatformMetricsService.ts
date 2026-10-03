export interface PlatformMetric {
  platform: string;
  metric: string;
  value: number;
  unit: string;
  timestamp: string;
}

export interface MetricComparison {
  metric: string;
  platforms: Record<string, number>;
  average: number;
  min: number;
  max: number;
  variance: number;
}

export interface CrossPlatformReport {
  timestamp: string;
  totalMetrics: number;
  comparisons: MetricComparison[];
  status: 'ok' | 'warning' | 'critical';
}

export class CrossPlatformMetricsService {
  private static metrics: PlatformMetric[] = [];

  static record(metric: Omit<PlatformMetric, 'timestamp'>): void {
    this.metrics.push({
      ...metric,
      timestamp: new Date().toISOString(),
    });
  }

  static compare(metricName: string): MetricComparison | null {
    const relevant = this.metrics.filter(m => m.metric === metricName);
    if (relevant.length === 0) return null;

    const platforms: Record<string, number> = {};
    for (const m of relevant) {
      platforms[m.platform] = m.value;
    }

    const values = Object.values(platforms);
    const average = values.reduce((a, b) => a + b, 0) / values.length;
    const min = Math.min(...values);
    const max = Math.max(...values);
    const variance = values.reduce((sum, v) => sum + Math.pow(v - average, 2), 0) / values.length;

    return {
      metric: metricName,
      platforms,
      average: Math.round(average * 100) / 100,
      min,
      max,
      variance: Math.round(variance * 100) / 100,
    };
  }

  static getReport(): CrossPlatformReport {
    const metricNames = [...new Set(this.metrics.map(m => m.metric))];
    const comparisons = metricNames
      .map(name => this.compare(name))
      .filter((c): c is MetricComparison => c !== null);

    const highVariance = comparisons.filter(c => c.variance > 100).length;
    const status = highVariance > 0 ? 'warning'
      : this.metrics.length === 0 ? 'warning' : 'ok';

    return {
      timestamp: new Date().toISOString(),
      totalMetrics: this.metrics.length,
      comparisons,
      status,
    };
  }

  static clear(): void {
    this.metrics = [];
  }
}
