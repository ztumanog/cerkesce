import { describe, it, expect } from 'vitest';
import { AppConfig } from '../../config/AppConfig';
import { ApiClientService } from '../../ui/services/ApiClientService';
import { AuthService } from '../../domain/security/services/AuthService';

describe('Phase 8.2 - Release Candidate (RC-1) Certification', () => {
  it('RC-001: Environment config is primed for production deployment', () => {
    expect(AppConfig.env).toBe('production');
    expect(AppConfig.version).toBe('8.2.0-rc1');
    expect(AppConfig.apiBaseUrl).toBe('/api/v1');
  });

  it('RC-002: System integrity check validates security and API layers in sequence', async () => {
    // 1. Auth Flow
    const authRes = AuthService.login({ username: 'admin_sys', passwordHash: 'secret' });
    expect(authRes.accessToken).toBeDefined();

    // 2. Discovery API
    const network = await ApiClientService.fetchConceptNetwork('circassian');
    expect(network.nodes.length).toBeGreaterThan(0);

    // 3. Analytics Bridge
    const analytics = await ApiClientService.fetchNetworkAnalytics(network);
    expect(analytics.density).toBeGreaterThanOrEqual(0);
  });
});