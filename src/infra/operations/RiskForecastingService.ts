export interface RiskFactor {
  category: 'operational' | 'sla' | 'technical_debt' | 'capacity';
  description: string;
  probability: number;
  impact: 'low' | 'medium' | 'high' | 'critical';
  mitigation: string;
}

export interface RiskForecastReport {
  timestamp: string;
  risks: RiskFactor[];
  riskScore: number;
  status: 'ok' | 'warning' | 'critical';
  topRisk: RiskFactor | null;
}

export class RiskForecastingService {
  static forecast(inputs?: {
    errorRate?: number;
    latencyMs?: number;
    memoryPercent?: number;
    technicalDebt?: number;
  }): RiskForecastReport {
    const m = inputs || {};
    const risks: RiskFactor[] = [];

    const errorRate = m.errorRate || 0.5;
    if (errorRate > 1) {
      risks.push({
        category: 'operational',
        description: 'Yuksek hata orani',
        probability: Math.min(1, errorRate / 5),
        impact: errorRate > 3 ? 'critical' : 'high',
        mitigation: 'Hata kaynaklarini arastir',
      });
    }

    const latency = m.latencyMs || 150;
    if (latency > 200) {
      risks.push({
        category: 'sla',
        description: 'SLA latency ihlali',
        probability: Math.min(1, latency / 500),
        impact: latency > 400 ? 'critical' : 'high',
        mitigation: 'Latency optimizasyonu yap',
      });
    }

    const memory = m.memoryPercent || 44.58;
    if (memory > 70) {
      risks.push({
        category: 'capacity',
        description: 'Memory kapasitesi riskli',
        probability: Math.min(1, memory / 100),
        impact: memory > 90 ? 'critical' : 'high',
        mitigation: 'Memory artisi planla',
      });
    }

    const debt = m.technicalDebt || 0;
    if (debt > 0) {
      risks.push({
        category: 'technical_debt',
        description: 'Teknik borc birikimi',
        probability: Math.min(1, debt / 10),
        impact: debt > 5 ? 'high' : 'medium',
        mitigation: 'Refactor planla',
      });
    }

    const riskScore = risks.reduce((sum, r) => {
      const impactWeight = { low: 1, medium: 2, high: 3, critical: 4 }[r.impact];
      return sum + r.probability * impactWeight * 10;
    }, 0);

    const status = riskScore > 50 ? 'critical' : riskScore > 20 ? 'warning' : 'ok';
    const topRisk = risks.length > 0 ? risks.sort((a, b) => b.probability - a.probability)[0] : null;

    return {
      timestamp: new Date().toISOString(),
      risks,
      riskScore: Math.round(riskScore),
      status,
      topRisk,
    };
  }
}
