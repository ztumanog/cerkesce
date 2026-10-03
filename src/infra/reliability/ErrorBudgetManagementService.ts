export interface ErrorBudget {
  service: string;
  slo: number;
  budget: number;
  consumed: number;
  remaining: number;
  period: string;
  status: 'ok' | 'warning' | 'exhausted';
}

export interface ErrorBudgetReport {
  timestamp: string;
  budgets: ErrorBudget[];
  totalBudget: number;
  totalConsumed: number;
  status: 'ok' | 'warning' | 'critical';
}

export class ErrorBudgetManagementService {
  private static budgets: ErrorBudget[] = [
    {
      service: 'API Gateway',
      slo: 99.9,
      budget: 0.1,
      consumed: 0.05,
      remaining: 0.05,
      period: '30d',
      status: 'ok',
    },
    {
      service: 'Discovery Engine',
      slo: 99.5,
      budget: 0.5,
      consumed: 0.3,
      remaining: 0.2,
      period: '30d',
      status: 'ok',
    },
    {
      service: 'Analytics',
      slo: 99.0,
      budget: 1.0,
      consumed: 0.85,
      remaining: 0.15,
      period: '30d',
      status: 'warning',
    },
  ];

  static getReport(): ErrorBudgetReport {
    const totalBudget = this.budgets.reduce((sum, b) => sum + b.budget, 0);
    const totalConsumed = this.budgets.reduce((sum, b) => sum + b.consumed, 0);

    const exhausted = this.budgets.filter(b => b.status === 'exhausted').length;
    const warning = this.budgets.filter(b => b.status === 'warning').length;

    const status = exhausted > 0 ? 'critical'
      : warning > 0 ? 'warning' : 'ok';

    return {
      timestamp: new Date().toISOString(),
      budgets: this.budgets,
      totalBudget: Math.round(totalBudget * 100) / 100,
      totalConsumed: Math.round(totalConsumed * 100) / 100,
      status,
    };
  }

  static getBudget(service: string): ErrorBudget | undefined {
    return this.budgets.find(b => b.service === service);
  }
}
