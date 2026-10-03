import { describe, it, expect } from 'vitest';
import { PredictiveAlertDashboardService } from '../../infra/operations/PredictiveAlertDashboardService';

describe('Sprint 10.1 - PredictiveAlertDashboard', () => {
  it('Dashboard raporu uretir', () => {
    const inputs = [
      {
        type: 'memory' as const,
        currentValue: 75,
        threshold: 90,
        points: [
          { timestamp: 1, value: 50 },
          { timestamp: 2, value: 60 },
          { timestamp: 3, value: 70 },
        ],
      },
    ];
    const report = PredictiveAlertDashboardService.getReport(inputs);
    expect(report.timestamp).toBeDefined();
    expect(report.totalAlerts).toBeGreaterThan(0);
    expect(report.status).toMatch(/^(ok|warning|critical)$/);
  });

  it('Severity dagilimi', () => {
    const report = PredictiveAlertDashboardService.getReport([]);
    expect(report.bySeverity.info).toBe(0);
    expect(report.bySeverity.warning).toBe(0);
    expect(report.bySeverity.critical).toBe(0);
  });

  it('Bos input ok status', () => {
    const report = PredictiveAlertDashboardService.getReport([]);
    expect(report.status).toBe('ok');
  });
});
