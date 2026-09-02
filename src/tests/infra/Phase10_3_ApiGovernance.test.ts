import { describe, it, expect, beforeEach } from 'vitest';
import { ApiKeyGovernanceService } from '../../infra/governance/ApiKeyGovernanceService';

describe('Phase 10.3 - Public API Governance Certification', () => {
  beforeEach(() => {
    ApiKeyGovernanceService.clear();
  });

  it('GOV-001: Registers API keys and enforces tier-based rate limiting policies', () => {
    const freeKey = ApiKeyGovernanceService.registerKey('key_free_123', 'FREE');
    const proKey = ApiKeyGovernanceService.registerKey('key_pro_456', 'PRO');

    expect(freeKey.rateLimitPerMin).toBe(60);
    expect(proKey.rateLimitPerMin).toBe(600);
    expect(ApiKeyGovernanceService.getPolicy('key_free_123')?.tier).toBe('FREE');
  });
});