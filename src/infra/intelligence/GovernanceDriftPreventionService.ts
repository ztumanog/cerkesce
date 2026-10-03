import fs from 'fs';
import path from 'path';

export interface DriftWarning {
  document: string;
  issue: string;
  severity: 'low' | 'medium' | 'high';
  recommendation: string;
}

export interface DriftPreventionReport {
  timestamp: string;
  warnings: DriftWarning[];
  driftScore: number;
  status: 'ok' | 'warning' | 'critical';
}

export class GovernanceDriftPreventionService {
  static analyze(): DriftPreventionReport {
    const warnings: DriftWarning[] = [];

    const docs = [
      { name: 'PHASES.md', path: './docs/governance/status/PHASES.md' },
      { name: 'PROJECT_STATUS.md', path: './docs/governance/status/PROJECT_STATUS.md' },
      { name: 'ROADMAP.md', path: './docs/governance/status/ROADMAP.md' },
      { name: 'CONSTITUTION.md', path: './docs/governance/constitution/CONSTITUTION.md' },
    ];

    const contents: Record<string, string> = {};

    for (const doc of docs) {
      const fullPath = path.resolve(doc.path);
      if (!fs.existsSync(fullPath)) {
        warnings.push({
          document: doc.name,
          issue: 'Belge bulunamadi',
          severity: 'high',
          recommendation: `${doc.name} dosyasini olusturun`,
        });
        continue;
      }
      contents[doc.name] = fs.readFileSync(fullPath, 'utf-8');
    }

    // PHASES vs PROJECT_STATUS karsilastirma
    if (contents['PHASES.md'] && contents['PROJECT_STATUS.md']) {
      const phasesHasPhase11 = contents['PHASES.md'].includes('11');
      const projectHasPhase11 = contents['PROJECT_STATUS.md'].includes('Phase 11');

      if (phasesHasPhase11 && !projectHasPhase11) {
        warnings.push({
          document: 'PHASES.md vs PROJECT_STATUS.md',
          issue: 'Phase 11 senkron degil',
          severity: 'high',
          recommendation: 'PROJECT_STATUS.md\'yi guncelleyin',
        });
      }
    }

    // ROADMAP vs PHASES
    if (contents['ROADMAP.md'] && contents['PHASES.md']) {
      if (!contents['ROADMAP.md'].includes('Phase 11') && contents['PHASES.md'].includes('11')) {
        warnings.push({
          document: 'ROADMAP.md',
          issue: 'Phase 11 eksik',
          severity: 'medium',
          recommendation: 'ROADMAP.md\'ye Phase 11 ekleyin',
        });
      }
    }

    // CONSTITUTION kontrolu
    if (contents['CONSTITUTION.md']) {
      if (!contents['CONSTITUTION.md'].includes('v13')) {
        warnings.push({
          document: 'CONSTITUTION.md',
          issue: 'Versiyon eski',
          severity: 'low',
          recommendation: 'CONSTITUTION.md\'yi guncelleyin',
        });
      }
    }

    const driftScore = warnings.reduce((sum, w) => {
      const weight = { low: 1, medium: 2, high: 3 }[w.severity];
      return sum + weight * 10;
    }, 0);

    const status = driftScore > 40 ? 'critical' : driftScore > 20 ? 'warning' : 'ok';

    return {
      timestamp: new Date().toISOString(),
      warnings,
      driftScore,
      status,
    };
  }
}
