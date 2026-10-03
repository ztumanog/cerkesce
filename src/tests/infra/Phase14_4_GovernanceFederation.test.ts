import { describe, it, expect, beforeEach } from 'vitest';
import { GovernanceFederationService } from '../../infra/ecosystem/GovernanceFederationService';

describe('Sprint 14.4 - GovernanceFederationService', () => {
  beforeEach(() => {
    GovernanceFederationService.clear();
  });

  it('Platform kaydeder', () => {
    const p = GovernanceFederationService.register({
      platformId: 'platform-a',
      adrCount: 10,
      phaseCount: 5,
      complianceScore: 95,
      status: 'ok',
    });
    expect(p.platformId).toBe('platform-a');
    expect(p.lastAudit).toBeDefined();
  });

  it('Audit calistirir', () => {
    GovernanceFederationService.register({
      platformId: 'a',
      adrCount: 10,
      phaseCount: 5,
      complianceScore: 95,
      status: 'ok',
    });
    GovernanceFederationService.register({
      platformId: 'b',
      adrCount: 5,
      phaseCount: 3,
      complianceScore: 80,
      status: 'warning',
    });
    const audit = GovernanceFederationService.audit();
    expect(audit.platforms.length).toBe(2);
    expect(audit.bestPlatform).toBe('a');
    expect(audit.worstPlatform).toBe('b');
  });

  it('Ortalama hesaplanir', () => {
    GovernanceFederationService.register({
      platformId: 'a',
      adrCount: 10,
      phaseCount: 5,
      complianceScore: 100,
      status: 'ok',
    });
    GovernanceFederationService.register({
      platformId: 'b',
      adrCount: 5,
      phaseCount: 3,
      complianceScore: 80,
      status: 'ok',
    });
    const audit = GovernanceFederationService.audit();
    expect(audit.averageCompliance).toBe(90);
  });

  it('Critical platform critical', () => {
    GovernanceFederationService.register({
      platformId: 'a',
      adrCount: 0,
      phaseCount: 0,
      complianceScore: 30,
      status: 'critical',
    });
    const audit = GovernanceFederationService.audit();
    expect(audit.status).toBe('critical');
  });

  it('Bos platform warning', () => {
    const audit = GovernanceFederationService.audit();
    expect(audit.status).toBe('warning');
  });
});
