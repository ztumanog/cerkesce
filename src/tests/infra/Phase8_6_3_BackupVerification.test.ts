import { describe, it, expect } from 'vitest';
import { BackupVerificationService } from '../../infra/operations/BackupVerificationService';

describe('Sprint 8.6.3 - Backup Verification', () => {
  it('Backup raporu dondurur', () => {
    const report = BackupVerificationService.verify();
    expect(report.timestamp).toBeDefined();
    expect(report.totalChecked).toBeGreaterThan(0);
    expect(report.status).toMatch(/^(ok|warning|critical)$/);
  });

  it('Check detaylari', () => {
    const report = BackupVerificationService.verify();
    expect(report.checks.length).toBeGreaterThan(0);
    expect(report.checks[0].name).toBeDefined();
  });
});
