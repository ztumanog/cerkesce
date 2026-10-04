export interface AggregatedAlert {
  key: string;
  type: string;
  severity: 'info' | 'warning' | 'critical';
  count: number;
  firstSeen: string;
  lastSeen: string;
  messages: string[];
}

export interface AggregationResult {
  aggregated: AggregatedAlert[];
  totalRaw: number;
  totalAggregated: number;
  reductionPercent: number;
  status: 'ok' | 'warning' | 'critical';
}

export class AlertAggregationService {
  private static alerts: Array<{
    type: string;
    severity: 'info' | 'warning' | 'critical';
    message: string;
    timestamp: string;
    source: string;
  }> = [];

  static add(alert: {
    type: string;
    severity: 'info' | 'warning' | 'critical';
    message: string;
    source: string;
  }): void {
    this.alerts.push({
      ...alert,
      timestamp: new Date().toISOString(),
    });
  }

  static aggregate(windowMinutes: number = 15): AggregationResult {
    const now = Date.now();
    const windowMs = windowMinutes * 60 * 1000;

    const recent = this.alerts.filter(a => now - new Date(a.timestamp).getTime() <= windowMs);
    const groups: Record<string, AggregatedAlert> = {};

    for (const alert of recent) {
      const key = `${alert.type}-${alert.source}`;
      if (!groups[key]) {
        groups[key] = {
          key,
          type: alert.type,
          severity: alert.severity,
          count: 0,
          firstSeen: alert.timestamp,
          lastSeen: alert.timestamp,
          messages: [],
        };
      }
      groups[key].count++;
      groups[key].lastSeen = alert.timestamp;
      if (!groups[key].messages.includes(alert.message)) {
        groups[key].messages.push(alert.message);
      }
    }

    const aggregated = Object.values(groups);
    const totalRaw = recent.length;
    const totalAggregated = aggregated.length;
    const reductionPercent = totalRaw > 0
      ? Math.round(((totalRaw - totalAggregated) / totalRaw) * 100)
      : 0;

    const status = reductionPercent > 50 ? 'ok' : 'warning';

    return {
      aggregated,
      totalRaw,
      totalAggregated,
      reductionPercent,
      status,
    };
  }
  static getReport(): AggregationResult {
    return this.aggregate();
  }


  static clear(): void {
    this.alerts = [];
  }
}

