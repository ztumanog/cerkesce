export interface DriftFinding {
  area: string;
  description: string;
  severity: 'low' | 'medium' | 'high';
  recommendation: string;
}

export interface ArchitectureDriftReport {
  timestamp: string;
  findings: DriftFinding[];
  driftScore: number;
  status: 'ok' | 'warning' | 'critical';
}

export class ArchitectureDriftDetectionService {
  static detect(data?: {
    adrCount?: number;
    adrDuplicates?: number;
    phasesConsistent?: boolean;
    readmeLength?: number;
  }): ArchitectureDriftReport {
    const findings: DriftFinding[] = [];
    const d = data || {};

    if (d.adrDuplicates && d.adrDuplicates > 0) {
      findings.push({
        area: 'ADR_INDEX',
        description: `${d.adrDuplicates} duplicate kayit`,
        severity: 'high',
        recommendation: 'Duplicate ADR kayitlarini temizleyin',
      });
    }

    if (d.phasesConsistent === false) {
      findings.push({
        area: 'PHASES',
        description: 'Faz durumlari guncel degil',
        severity: 'medium',
        recommendation: 'PHASES.md guncelleyin',
      });
    }

    if (d.readmeLength !== undefined && d.readmeLength < 500) {
      findings.push({
        area: 'README',
        description: 'README cok kisa',
        severity: 'low',
        recommendation: 'README genisletin',
      });
    }

    const driftScore = findings.reduce((sum, f) => {
      const weight = { low: 1, medium: 2, high: 3 }[f.severity];
      return sum + weight * 10;
    }, 0);

    const status = driftScore > 40 ? 'critical' : driftScore > 20 ? 'warning' : 'ok';

    return {
      timestamp: new Date().toISOString(),
      findings,
      driftScore,
      status,
    };
  }
}
