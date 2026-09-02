import { describe, it, expect } from 'vitest';
import { HealthCheckService } from '../../infra/services/HealthCheckService';
import { AppConfig } from '../../config/AppConfig';

describe('Phase 9.0 - Containerization & Operational Readiness Certification', () => {
  it('INF-001: Health check evaluates dynamic subsystem readiness and latencies', async () => {
    const health = await HealthCheckService.getHealth();

    expect(health.status).toBe('UP');
    expect(health.version).toBe(AppConfig.version);
    expect(health.checks.discoveryEngine.status).toBe('UP');
    expect(health.checks.analyticsEngine.status).toBe('UP');
    expect(health.checks.cache.status).toBe('UP');
    expect(health.checks.discoveryEngine.latencyMs).toBeGreaterThanOrEqual(0);
  });

  it('INF-002: Readiness probe returns positive state for orchestrator readiness', () => {
    const readyState = HealthCheckService.getReady();

    expect(readyState.ready).toBe(true);
    expect(readyState.uptimeSeconds).toBeGreaterThanOrEqual(0);
  });

  it('INF-003: Environment configuration matches production build targets', () => {
    expect(AppConfig.env).toBe('production');
    expect(AppConfig.apiBaseUrl).toBe('/api/v1');
    expect(AppConfig.maxViewportNodes).toBe(200);
  });
});