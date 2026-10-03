import { describe, it, expect } from 'vitest';
import { ErrorBudgetManagementService } from '../../infra/reliability/ErrorBudgetManagementService';

describe('Sprint 15.2 - ErrorBudgetManagementService', () => {
  it('Rapor uretir', () => {
    const report = ErrorBudgetManagementService.getReport();
    expect(report.timestamp).toBeDefined();
    expect(report.budgets.length).toBeGreaterThan(0);
    expect(report.status).toMatch(/^(ok|warning|critical)$/);
  });

  it('Total budget ve consumed', () => {
    const report = ErrorBudgetManagementService.getReport();
    expect(report.totalBudget).toBeGreaterThan(0);
    expect(report.totalConsumed).toBeGreaterThan(0);
  });

  it('Servis budget bulur', () => {
    const budget = ErrorBudgetManagementService.getBudget('API Gateway');
    expect(budget).toBeDefined();
    expect(budget?.slo).toBe(99.9);
  });

  it('Warning budget tespit eder', () => {
    const report = ErrorBudgetManagementService.getReport();
    const warning = report.budgets.find(b => b.status === 'warning');
    expect(warning).toBeDefined();
  });
});
