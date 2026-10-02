import { AdrValidator } from './AdrValidator';
import { PhaseStatusValidator } from './PhaseStatusValidator';
import { DocumentationConsistencyChecker } from './DocumentationConsistencyChecker';

export interface GovernanceReport {
  timestamp: string;
  adr: {
    total: number;
    status: string;
    missing: number;
    orphaned: number;
    duplicates: number;
  };
  phases: {
    total: number;
    status: string;
    inconsistencies: number;
  };
  docs: {
    total: number;
    status: string;
    brokenReferences: number;
  };
  overallStatus: 'ok' | 'warning' | 'error';
}

export class GovernanceReportService {
  static generate(): GovernanceReport {
    const adr = AdrValidator.validate();
    const phases = PhaseStatusValidator.validate();
    const docs = DocumentationConsistencyChecker.check();

    const statuses = [adr.status, phases.status, docs.status];
    const overallStatus = statuses.includes('error')
      ? 'error'
      : statuses.includes('warning') ? 'warning' : 'ok';

    return {
      timestamp: new Date().toISOString(),
      adr: {
        total: adr.totalIndexed,
        status: adr.status,
        missing: adr.missing.length,
        orphaned: adr.orphaned.length,
        duplicates: adr.duplicates.length,
      },
      phases: {
        total: phases.phases.length,
        status: phases.status,
        inconsistencies: phases.inconsistencies.length,
      },
      docs: {
        total: docs.totalDocs,
        status: docs.status,
        brokenReferences: docs.brokenReferences.length,
      },
      overallStatus,
    };
  }

  static toMarkdown(report: GovernanceReport): string {
    const lines: string[] = [];
    lines.push('# Governance Report');
    lines.push('');
    lines.push(`**Tarih:** ${report.timestamp}`);
    lines.push(`**Durum:** ${report.overallStatus.toUpperCase()}`);
    lines.push('');
    lines.push('## ADR Katalogu');
    lines.push(`- Toplam: ${report.adr.total}`);
    lines.push(`- Durum: ${report.adr.status}`);
    lines.push(`- Eksik: ${report.adr.missing}`);
    lines.push(`- Yetim: ${report.adr.orphaned}`);
    lines.push(`- Duplicate: ${report.adr.duplicates}`);
    lines.push('');
    lines.push('## Faz Durumu');
    lines.push(`- Toplam: ${report.phases.total}`);
    lines.push(`- Durum: ${report.phases.status}`);
    lines.push(`- Tutarsizlik: ${report.phases.inconsistencies}`);
    lines.push('');
    lines.push('## Dokumantasyon');
    lines.push(`- Toplam: ${report.docs.total}`);
    lines.push(`- Durum: ${report.docs.status}`);
    lines.push(`- Kirik Referans: ${report.docs.brokenReferences}`);
    return lines.join('\n');
  }
}
