import { describe, it, expect, beforeEach } from 'vitest';
import { ReliabilityDashboardService } from '../../infra/reliability/ReliabilityDashboardService';
import { AvailabilityEngineeringService } from '../../infra/reliability/AvailabilityEngineeringService';
import { FailureAnalyticsService } from '../../infra/reliability/FailureAnalyticsService';
import { ServiceDependencyMappingService } from '../../infra/reliability/ServiceDependencyMappingService';

describe('Sprint 15.5 - ReliabilityDashboardService', () => {
  beforeEach(() => {
    AvailabilityEngineeringService.clear();
    FailureAnalyticsService.clear();
    ServiceDependencyMappingService.clear();
  });

  it('Dashboard uretir', () => {
    const dash = ReliabilityDashboardService.getDashboard();
    expect(dash.timestamp).toBeDefined();
    expect(dash.status).toMatch(/^(ok|warning|critical)$/);
    expect(dash.summary).toBeDefined();
  });

  it('Tum alt sistemler entegre', () => {
    const dash = ReliabilityDashboardService.getDashboard();
    expect(dash.availability).toBeDefined();
    expect(dash.errorBudget).toBeDefined();
    expect(dash.failures).toBeDefined();
    expect(dash.dependencies).toBeDefined();
  });

  it('Insights uretir', () => {
    const dash = ReliabilityDashboardService.getDashboard();
    expect(Array.isArray(dash.insights)).toBe(true);
  });

  it('Bos sistem status', () => {
    const dash = ReliabilityDashboardService.getDashboard();
    expect(['ok', 'warning', 'critical']).toContain(dash.status);
  });
});
