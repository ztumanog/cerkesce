export interface ForecastPoint {
  period: string;
  estimatedRps: number;
  estimatedMemoryMB: number;
  estimatedCpuPercent: number;
  confidence: number;
}

export interface CapacityForecast {
  timestamp: string;
  current: {
    rps: number;
    memoryMB: number;
    cpuPercent: number;
  };
  forecasts: ForecastPoint[];
  status: 'ok' | 'warning' | 'critical';
  currentStatus: 'ok' | 'warning' | 'critical';
}

export class CapacityForecastingService {
  private static currentMetrics = {
    rps: 100,
    memoryMB: 21890,
    cpuPercent: 0,
  };

  static setCurrent(metrics: Partial<typeof CapacityForecastingService.currentMetrics>): void {
    this.currentMetrics = { ...this.currentMetrics, ...metrics };
  }

  static forecast(): CapacityForecast {
    const current = this.currentMetrics;
    const periods = [
      { period: '7d', multiplier: 1.1 },
      { period: '30d', multiplier: 1.5 },
      { period: '90d', multiplier: 2.5 },
      { period: '180d', multiplier: 5 },
      { period: '365d', multiplier: 10 },
    ];

    const forecasts: ForecastPoint[] = periods.map(p => {
      const estimatedRps = Math.round(current.rps * p.multiplier);
      const estimatedMemoryMB = Math.round(current.memoryMB * p.multiplier);
      const estimatedCpuPercent = Math.min(100, current.cpuPercent * p.multiplier);
      const confidence = Math.max(0.5, 1 - (p.multiplier - 1) * 0.05);

      return {
        period: p.period,
        estimatedRps,
        estimatedMemoryMB,
        estimatedCpuPercent,
        confidence: Math.round(confidence * 100) / 100,
      };
    });

    const maxMemory = Math.max(...forecasts.map(f => f.estimatedMemoryMB));
    const currentStatus = current.memoryMB > 60000 ? 'critical'
      : current.memoryMB > 30000 ? 'warning' : 'ok';
    const status = maxMemory > 100000 ? 'critical' : maxMemory > 60000 ? 'warning' : 'ok';

    return {
      timestamp: new Date().toISOString(),
      current,
      forecasts,
      status,
      currentStatus,
    };
  }
}
