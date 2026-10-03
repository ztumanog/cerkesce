import fs from 'fs';
import path from 'path';

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
  static detect(): ArchitectureDriftReport {
    const findings: DriftFinding[] = [];

    const adrDir = path.resolve('./docs/architecture/adr');
    const indexFile = path.join(adrDir, 'ADR_INDEX.md');

    if (fs.existsSync(indexFile)) {
      const content = fs.readFileSync(indexFile, 'utf-8');
      const adrMatches = content.match(/\| ADR-[A-Z0-9-]+ \|/g) || [];
      const uniqueAdrs = new Set(adrMatches);

      if (adrMatches.length !== uniqueAdrs.size) {
        findings.push({
          area: 'ADR_INDEX',
          description: `${adrMatches.length - uniqueAdrs.size} duplicate kayit`,
          severity: 'high',
          recommendation: 'Duplicate ADR kayitlarini temizleyin',
        });
      }
    }

    const phasesFile = path.resolve('./docs/governance/status/PHASES.md');
    if (fs.existsSync(phasesFile)) {
      const content = fs.readFileSync(phasesFile, 'utf-8');
      if (!content.includes('CLOSED') && !content.includes('COMPLETED')) {
        findings.push({
          area: 'PHASES',
          description: 'Faz durumlari guncel degil',
          severity: 'medium',
          recommendation: 'PHASES.md guncelleyin',
        });
      }
    }

    const readmeFile = path.resolve('./README.md');
    if (fs.existsSync(readmeFile)) {
      const content = fs.readFileSync(readmeFile, 'utf-8');
      if (content.length < 500) {
        findings.push({
          area: 'README',
          description: 'README cok kisa',
          severity: 'low',
          recommendation: 'README genisletin',
        });
      }
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
