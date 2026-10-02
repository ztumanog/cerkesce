import { describe, it, expect } from 'vitest';
import { ErrorBudgetService } from '../../infra/operations/ErrorBudgetService';

describe('Sprint 8.6.1 - Error Budgets', () => {
  it('Error budget hesaplar', () => {
    const budget = ErrorBudgetService.calculate({
      totalRequests: 10000,
      failedRequests: 5,
    });
    expect(budget.slo).toBe(99.9);
    expect(budget.budget).toBeGreaterThan(0);
    expect(budget.status).toMatch(/^(ok|warning|exhausted)$/);
  });

  it('Dusuk hata orani ok', () => {
    const budget = ErrorBudgetService.calculate({
      totalRequests: 10000,
      failedRequests: 5,
    });
    expect(budget.status).toBe('ok');
  });

  it('Yuksek hata orani warning', () => {
    const budget = ErrorBudgetService.calculate({
      totalRequests: 10000,
      failedRequests: 90,
    });
    expect(['warning', 'exhausted']).toContain(budget.status);
  });
});
