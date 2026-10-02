import { GovernanceReportService, GovernanceReport } from './GovernanceReportService';

export interface GovernanceDashboard {
  timestamp: string;
  status: 'ok' | 'warning' | 'error';
  report: GovernanceReport;
  summary: {
    adr: string;
    phases: string;
    docs: string;
    overall: string;
  };
}

export class GovernanceDashboardService {
  static getDashboard(): GovernanceDashboard {
    const report = GovernanceReportService.generate();

    const adrIcon = report.adr.status === 'ok' ? '✅' : '⚠️';
    const phasesIcon = report.phases.status === 'ok' ? '✅' : '⚠️';
    const docsIcon = report.docs.status === 'ok' ? '✅' : '⚠️';
    const overallIcon = report.overallStatus === 'ok' ? '✅' : '⚠️';

    return {
      timestamp: report.timestamp,
      status: report.overallStatus,
      report,
      summary: {
        adr: `${adrIcon} ${report.adr.total} ADR (${report.adr.missing + report.adr.orphaned + report.adr.duplicates} sorun)`,
        phases: `${phasesIcon} ${report.phases.total} Faz (${report.phases.inconsistencies} tutarsizlik)`,
        docs: `${docsIcon} ${report.docs.total} Dokuman (${report.docs.brokenReferences} kirik)`,
        overall: `${overallIcon} ${report.overallStatus.toUpperCase()}`,
      },
    };
  }
}
