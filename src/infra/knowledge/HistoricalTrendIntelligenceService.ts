export interface TrendDataPoint {
  timestamp: number;
  value: number;
  metric: string;
}

export interface TrendAnalysis {
  metric: string;
  direction: 'upward' | 'downward' | 'stable';
  changePercent: number;
  average: number;
  min: number;
  max: number;
  dataPoints: number;
  insight: string;
}

export interface HistoricalTrendReport {
  timestamp: string;
  analyses: TrendAnalysis[];
  totalMetrics: number;
  status: 'ok' | 'warning' | 'critical';
}

export class HistoricalTrendIntelligenceService {
  private static history: TrendDataPoint[] = [];

  static record(metric: string, value: number): void {
    this.history.push({
      timestamp: Date.now(),
      value,
      metric,
    });
  }

  static analyze(metric: string): TrendAnalysis {
    const points = this.history
      .filter(p => p.metric === metric)
      .sort((a, b) => a.timestamp - b.timestamp);

    if (points.length < 2) {
      return {
        metric,
        direction: 'stable',
        changePercent: 0,
        average: points[0]?.value ?? 0,
        min: points[0]?.value ?? 0,
        max: points[0]?.value ?? 0,
        dataPoints: points.length,
        insight: 'Yetersiz veri',
      };
    }

    const values = points.map(p => p.value);
    const first = values[0];
    const last = values[values.length - 1];
    const changePercent = first > 0 ? ((last - first) / first) * 100 : 0;

    const average = values.reduce((a, b) => a + b, 0) / values.length;
    const min = Math.min(...values);
    const max = Math.max(...values);

    let direction: 'upward' | 'downward' | 'stable' = 'stable';
    if (changePercent > 5) direction = 'upward';
    else if (changePercent < -5) direction = 'downward';

    const insight = direction === 'upward'
      ? `${metric} artis trendinde (%${Math.round(changePercent)})`
      : direction === 'downward'
        ? `${metric} azalis trendinde (%${Math.round(changePercent)})`
        : `${metric} stabil`;

    return {
      metric,
      direction,
      changePercent: Math.round(changePercent * 100) / 100,
      average: Math.round(average * 100) / 100,
      min,
      max,
      dataPoints: points.length,
      insight,
    };
  }

  static getReport(metrics: string[]): HistoricalTrendReport {
    const analyses = metrics.map(m => this.analyze(m));
    const critical = analyses.filter(a => Math.abs(a.changePercent) > 50).length;

    const status = critical > 0 ? 'critical'
      : analyses.some(a => Math.abs(a.changePercent) > 20) ? 'warning' : 'ok';

    return {
      timestamp: new Date().toISOString(),
      analyses,
      totalMetrics: metrics.length,
      status,
    };
  }

  static clear(): void {
    this.history = [];
  }
}
