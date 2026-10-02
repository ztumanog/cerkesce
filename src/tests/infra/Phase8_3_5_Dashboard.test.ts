import { describe, it, expect, beforeEach } from 'vitest';
import { DashboardService } from '../../infra/telemetry/DashboardService';
import { AlertService } from '../../infra/telemetry/AlertService';
import { MetricsService } from '../../infra/telemetry/MetricsService';

describe('Sprint 8.3.5 - Operational Dashboard', () => {
  beforeEach(() => {
    AlertService.clear();
    if (typeof (MetricsService as any).reset === 'function') {
      (MetricsService as any).reset();
    }
  });

  it('Dashboard verisi dondurur', () => {
    const data = DashboardService.getDashboard();
    expect(data.timestamp).toBeDefined();
    expect(data.health).toBeDefined();
    expect(data.metrics).toBeDefined();
    expect(data.alerts).toBeDefined();
    expect(data.uptime).toBeGreaterThan(0);
  });

  it('Health bilgisi icerir', () => {
    const data = DashboardService.getDashboard();
    expect(data.health.status).toBe('UP');
    expect(data.health.version).toBeDefined();
  });

  it('Metrics bilgisi icerir', () => {
    MetricsService.incrementCounter('http_requests_total');
    const data = DashboardService.getDashboard();
    expect(data.metrics.requestsTotal).toBeGreaterThan(0);
  });

  it('Alerts bilgisi icerir', () => {
    AlertService.warning('Test alert');
    const data = DashboardService.getDashboard();
    expect(data.alerts.total).toBe(1);
    expect(data.alerts.recent[0].level).toBe('WARNING');
  });
});
