import { AdrValidator } from '../governance/AdrValidator';
import { PhaseStatusValidator } from '../governance/PhaseStatusValidator';

export interface AuditEntry {
  timestamp: string;
  category: 'adr' | 'phase' | 'deployment' | 'change';
  status: 'pass' | 'fail' | 'warning';
  message: string;
}

export interface ComplianceReport {
  timestamp: string;
  totalChecks: number;
  passed: number;
  failed: number;
  warnings: number;
  entries: AuditEntry[];
  status: 'ok' | 'warning' | 'critical';
}

export class AuditComplianceService {
  static audit(): ComplianceReport {
    const entries: AuditEntry[] = [];

    // ADR Compliance
    const adr = AdrValidator.validate();
    entries.push({
      timestamp: new Date().toISOString(),
      category: 'adr',
      status: adr.status === 'ok' ? 'pass' : 'warning',
      message: `ADR katalogu: ${adr.totalIndexed} toplam, ${adr.missing.length} eksik`,
    });

    // Phase Compliance
    const phases = PhaseStatusValidator.validate();
    entries.push({
      timestamp: new Date().toISOString(),
      category: 'phase',
      status: phases.status === 'ok' ? 'pass' : 'warning',
      message: `Faz durumu: ${phases.phases.length} faz, ${phases.inconsistencies.length} tutarsizlik`,
    });

    // Deployment Compliance
    entries.push({
      timestamp: new Date().toISOString(),
      category: 'deployment',
      status: 'warning',
      message: 'Vercel: Next.js canli, Express API deploy bekliyor',
    });

    const passed = entries.filter(e => e.status === 'pass').length;
    const failed = entries.filter(e => e.status === 'fail').length;
    const warnings = entries.filter(e => e.status === 'warning').length;

    const status = failed > 0 ? 'critical' : warnings > 0 ? 'warning' : 'ok';

    return {
      timestamp: new Date().toISOString(),
      totalChecks: entries.length,
      passed,
      failed,
      warnings,
      entries,
      status,
    };
  }
}
