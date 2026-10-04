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
  static analyze(data?: {
    phasesContent?: string;
    projectStatusContent?: string;
    roadmapContent?: string;
    constitutionContent?: string;
  }): DriftPreventionReport {
    const warnings: DriftWarning[] = [];
    const d = data || {};

    // PHASES vs PROJECT_STATUS karsilastirma
    if (d.phasesContent && d.projectStatusContent) {
      const phasesHasPhase15 = d.phasesContent.includes('15');
      const projectHasPhase15 = d.projectStatusContent.includes('Phase 15');

      if (phasesHasPhase15 && !projectHasPhase15) {
        warnings.push({
          document: 'PHASES.md vs PROJECT_STATUS.md',
          issue: 'Phase 15 senkron degil',
          severity: 'high',
          recommendation: 'PROJECT_STATUS.md guncelleyin',
        });
      }
    }

    // ROADMAP vs PHASES
    if (d.roadmapContent && d.phasesContent) {
      if (!d.roadmapContent.includes('Phase 15') && d.phasesContent.includes('15')) {
        warnings.push({
          document: 'ROADMAP.md',
          issue: 'Phase 15 eksik',
          severity: 'medium',
          recommendation: 'ROADMAP.md ye Phase 15 ekleyin',
        });
      }
    }

    // CONSTITUTION kontrolu
    if (d.constitutionContent) {
      if (!d.constitutionContent.includes('v13')) {
        warnings.push({
          document: 'CONSTITUTION.md',
          issue: 'Versiyon eski',
          severity: 'low',
          recommendation: 'CONSTITUTION.md yi guncelleyin',
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
