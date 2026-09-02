import { describe, it, expect } from 'vitest';
import { HealthCheckService } from '../../infra/http/HealthCheckService';

describe('Phase 10.2 - Operational Health Check Certification', () => {
  it('OPS-001: Returns comprehensive system health and operational readiness status', () => {
    const health = HealthCheckService.getHealthStatus();

    expect(health.status).toBe('UP');
    expect(health.version).toBe('10.1.0');
    expect(health.services.database).toBe('HEALTHY');
    expect(health.services.metrics).toBe('OPERATIONAL');
  });
});