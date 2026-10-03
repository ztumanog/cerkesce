export interface FailureRecord {
  id: string;
  service: string;
  type: 'crash' | 'timeout' | 'error' | 'degradation';
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  timestamp: string;
}

export interface FailureCluster {
  type: string;
  count: number;
  services: string[];
  severity: string;
  recommendation: string;
}

export interface FailureAnalyticsReport {
  timestamp: string;
  totalFailures: number;
  clusters: FailureCluster[];
  bySeverity: {
    low: number;
    medium: number;
    high: number;
    critical: number;
  };
  status: 'ok' | 'warning' | 'critical';
}

export class FailureAnalyticsService {
  private static failures: FailureRecord[] = [];

  static record(failure: Omit<FailureRecord, 'id' | 'timestamp'>): FailureRecord {
    const record: FailureRecord = {
      ...failure,
      id: `FAIL-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      timestamp: new Date().toISOString(),
    };
    this.failures.push(record);
    return record;
  }

  static getReport(): FailureAnalyticsReport {
    const bySeverity = {
      low: this.failures.filter(f => f.severity === 'low').length,
      medium: this.failures.filter(f => f.severity === 'medium').length,
      high: this.failures.filter(f => f.severity === 'high').length,
      critical: this.failures.filter(f => f.severity === 'critical').length,
    };

    const clusters: FailureCluster[] = [];
    const types = [...new Set(this.failures.map(f => f.type))];

    for (const type of types) {
      const typeFailures = this.failures.filter(f => f.type === type);
      const services = [...new Set(typeFailures.map(f => f.service))];
      const highestSeverity = typeFailures
        .map(f => f.severity)
        .sort((a, b) => {
          const order = { low: 1, medium: 2, high: 3, critical: 4 };
          return order[b] - order[a];
        })[0];

      clusters.push({
        type,
        count: typeFailures.length,
        services,
        severity: highestSeverity,
        recommendation: this.getRecommendation(type),
      });
    }

    const criticalCount = bySeverity.critical;
    const status = criticalCount > 2 ? 'critical'
      : criticalCount > 0 ? 'warning'
        : this.failures.length === 0 ? 'ok' : 'ok';

    return {
      timestamp: new Date().toISOString(),
      totalFailures: this.failures.length,
      clusters,
      bySeverity,
      status,
    };
  }

  private static getRecommendation(type: string): string {
    const recs: Record<string, string> = {
      crash: 'Crash sebebini arastir, restart policy kontrol et',
      timeout: 'Timeout degerlerini artir, network kontrol et',
      error: 'Hata loglarini incele, retry mekanizmasi ekle',
      degradation: 'Performans metriklerini izle, cache optimizasyonu yap',
    };
    return recs[type] || 'Loglari incele';
  }

  static clear(): void {
    this.failures = [];
  }
}
