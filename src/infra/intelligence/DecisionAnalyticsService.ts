export interface DecisionRecord {
  id: string;
  category: string;
  decision: string;
  outcome: 'success' | 'failure' | 'pending';
  confidence: number;
  timestamp: string;
}

export interface DecisionMetrics {
  category: string;
  total: number;
  success: number;
  failure: number;
  pending: number;
  successRate: number;
  avgConfidence: number;
}

export interface DecisionAnalyticsReport {
  timestamp: string;
  totalDecisions: number;
  metrics: DecisionMetrics[];
  overallSuccessRate: number;
  status: 'ok' | 'warning' | 'critical';
}

export class DecisionAnalyticsService {
  private static decisions: DecisionRecord[] = [];

  static record(decision: Omit<DecisionRecord, 'id' | 'timestamp'>): DecisionRecord {
    const newDecision: DecisionRecord = {
      ...decision,
      id: `DEC-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      timestamp: new Date().toISOString(),
    };
    this.decisions.push(newDecision);
    return newDecision;
  }

  static getReport(): DecisionAnalyticsReport {
    const categories = [...new Set(this.decisions.map(d => d.category))];

    const metrics: DecisionMetrics[] = categories.map(category => {
      const catDecisions = this.decisions.filter(d => d.category === category);
      const success = catDecisions.filter(d => d.outcome === 'success').length;
      const failure = catDecisions.filter(d => d.outcome === 'failure').length;
      const pending = catDecisions.filter(d => d.outcome === 'pending').length;
      const total = catDecisions.length;

      const successRate = total > 0 ? Math.round((success / total) * 100) : 0;
      const avgConfidence = total > 0
        ? Math.round((catDecisions.reduce((sum, d) => sum + d.confidence, 0) / total) * 100) / 100
        : 0;

      return {
        category,
        total,
        success,
        failure,
        pending,
        successRate,
        avgConfidence,
      };
    });

    const totalSuccess = this.decisions.filter(d => d.outcome === 'success').length;
    const overallSuccessRate = this.decisions.length > 0
      ? Math.round((totalSuccess / this.decisions.length) * 100)
      : 0;

    const status = overallSuccessRate >= 70 ? 'ok'
      : overallSuccessRate >= 50 ? 'warning' : 'critical';

    return {
      timestamp: new Date().toISOString(),
      totalDecisions: this.decisions.length,
      metrics,
      overallSuccessRate,
      status,
    };
  }

  static clear(): void {
    this.decisions = [];
  }
}
