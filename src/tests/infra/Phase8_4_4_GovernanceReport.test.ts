import { describe, it, expect } from 'vitest';
import { GovernanceReportService } from '../../infra/governance/GovernanceReportService';

describe('Sprint 8.4.4 - Governance Reports', () => {
  it('Rapor uretir', () => {
    const report = GovernanceReportService.generate();
    expect(report.timestamp).toBeDefined();
    expect(report.overallStatus).toMatch(/^(ok|warning|error)$/);
    expect(report.adr.total).toBeGreaterThan(0);
    expect(report.phases.total).toBeGreaterThan(0);
    expect(report.docs.total).toBeGreaterThan(0);
  });

  it('Markdown export', () => {
    const report = GovernanceReportService.generate();
    const md = GovernanceReportService.toMarkdown(report);
    expect(md).toContain('Governance Report');
    expect(md).toContain('ADR Katalogu');
    expect(md).toContain('Faz Durumu');
    expect(md).toContain('Dokumantasyon');
  });
});
