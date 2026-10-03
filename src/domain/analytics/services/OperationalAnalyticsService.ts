export interface OperationalMetrics {
  period: string;
  errorRate: number;
  avgLatencyMs: number;
  warningCount: number;
  cacheHitRatio: number;
}

export interface OperationalAnalyticsReport {
  timestamp: string;
  periods: OperationalMetrics[];
  trends: {
    errorRate: 'improving' | 'stable' | 'degrading';
    latency: 'improving' | 'stable' | 'degrading';
    cache: 'improving' | 'stable' | 'degrading';
  };
  status: 'ok' | 'warning' | 'critical';
}

export class OperationalAnalyticsService {
  static getReport(metrics?: {
    errorRate?: number;
    avgLatencyMs?: number;
    warningCount?: number;
    cacheHitRatio?: number;
  }): OperationalAnalyticsReport {
    const m = metrics || {};

    const periods: OperationalMetrics[] = [
      { period: '1h', errorRate: m.errorRate || 0.5, avgLatencyMs: m.avgLatencyMs || 150, warningCount: m.warningCount || 2, cacheHitRatio: m.cacheHitRatio || 0.85 },
      { period: '24h', errorRate: m.errorRate || 0.5, avgLatencyMs: m.avgLatencyMs || 150, warningCount: m.warningCount || 2, cacheHitRatio: m.cacheHitRatio || 0.85 },
      { period: '7d', errorRate: m.errorRate || 0.5, avgLatencyMs: m.avgLatencyMs || 150, warningCount: m.warningCount || 2, cacheHitRatio: m.cacheHitRatio || 0.85 },
      { period: '30d', errorRate: m.errorRate || 0.5, avgLatencyMs: m.avgLatencyMs || 150, warningCount: m.warningCount || 2, cacheHitRatio: m.cacheHitRatio || 0.85 },
    ];

    const avgErrorRate = periods.reduce((s, p) => s + p.errorRate, 0) / periods.length;
    const avgLatency = periods.reduce((s, p) => s + p.avgLatencyMs, 0) / periods.length;

    const status = avgErrorRate > 5 || avgLatency > 500 ? 'critical'
      : avgErrorRate > 1 || avgLatency > 200 ? 'warning' : 'ok';

    return {
      timestamp: new Date().toISOString(),
      periods,
      trends: {
        errorRate: 'stable',
        latency: 'stable',
        cache: 'stable',
      },
      status,
    };
  }
}
