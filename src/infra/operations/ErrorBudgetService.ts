export interface ErrorBudget {
  period: string;
  slo: number;
  target: number;
  budget: number;
  consumed: number;
  remaining: number;
  percentConsumed: number;
  status: 'ok' | 'warning' | 'exhausted';
}

export class ErrorBudgetService {
  private static slo = {
    availability: 99.9,
    errorRate: 1.0,
  };

  static calculate(metrics?: {
    totalRequests?: number;
    failedRequests?: number;
    period?: string;
  }): ErrorBudget {
    const m = metrics || {};
    const totalRequests = m.totalRequests || 0;
    const failedRequests = m.failedRequests || 0;
    const period = m.period || '30d';

    const target = this.slo.availability;
    const budget = (100 - target) / 100;

    const errorRate = totalRequests > 0 ? failedRequests / totalRequests : 0;
    const consumed = errorRate;
    const remaining = Math.max(0, budget - consumed);
    const percentConsumed = budget > 0 ? (consumed / budget) * 100 : 0;

    let status: 'ok' | 'warning' | 'exhausted' = 'ok';
    if (percentConsumed > 100) status = 'exhausted';
    else if (percentConsumed > 80) status = 'warning';

    return {
      period,
      slo: this.slo.availability,
      target,
      budget: Math.round(budget * 10000) / 100,
      consumed: Math.round(consumed * 10000) / 100,
      remaining: Math.round(remaining * 10000) / 100,
      percentConsumed: Math.round(percentConsumed * 100) / 100,
      status,
    };
  }
}
