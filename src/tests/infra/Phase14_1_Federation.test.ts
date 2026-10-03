import { describe, it, expect, beforeEach } from 'vitest';
import { ExternalSystemFederationService } from '../../infra/ecosystem/ExternalSystemFederationService';

describe('Sprint 14.1 - ExternalSystemFederationService', () => {
  beforeEach(() => {
    ExternalSystemFederationService.clear();
  });

  it('Sistem kaydeder', () => {
    const sys = ExternalSystemFederationService.register({
      id: 'sys-1',
      name: 'External API',
      type: 'api',
      endpoint: 'https://api.example.com',
      status: 'active',
    });
    expect(sys.id).toBe('sys-1');
    expect(sys.lastSync).toBeDefined();
  });

  it('Sistem siler', () => {
    ExternalSystemFederationService.register({
      id: 'sys-1',
      name: 'Test',
      type: 'api',
      endpoint: 'https://test.com',
      status: 'active',
    });
    const removed = ExternalSystemFederationService.unregister('sys-1');
    expect(removed).toBe(true);
  });

  it('Rapor uretir', () => {
    ExternalSystemFederationService.register({
      id: 'sys-1',
      name: 'Test',
      type: 'api',
      endpoint: 'https://test.com',
      status: 'active',
    });
    const report = ExternalSystemFederationService.getReport();
    expect(report.totalSystems).toBe(1);
    expect(report.activeSystems).toBe(1);
    expect(report.status).toBe('ok');
  });

  it('Bos sistem warning', () => {
    const report = ExternalSystemFederationService.getReport();
    expect(report.status).toBe('warning');
  });

  it('Hatali sistem critical', () => {
    ExternalSystemFederationService.register({
      id: 'sys-1',
      name: 'Test',
      type: 'api',
      endpoint: 'https://test.com',
      status: 'error',
    });
    const report = ExternalSystemFederationService.getReport();
    expect(report.status).toBe('critical');
  });
});
