import { AdrValidator } from '../governance/AdrValidator';
import { PhaseStatusValidator } from '../governance/PhaseStatusValidator';
import { DocumentationConsistencyChecker } from '../governance/DocumentationConsistencyChecker';

export interface GovernanceRecommendation {
  category: 'adr' | 'phase' | 'doc';
  issue: string;
  recommendation: string;
  priority: 'low' | 'medium' | 'high';
}

export interface GovernanceRecommendationReport {
  timestamp: string;
  recommendations: GovernanceRecommendation[];
  totalIssues: number;
  status: 'ok' | 'warning' | 'critical';
}

export class GovernanceRecommendationService {
  static generate(): GovernanceRecommendationReport {
    const recommendations: GovernanceRecommendation[] = [];

    // ADR Validation
    const adr = AdrValidator.validate();
    if (adr.missing.length > 0) {
      recommendations.push({
        category: 'adr',
        issue: `${adr.missing.length} eksik ADR`,
        recommendation: 'Eksik ADR dosyalarini olusturun',
        priority: 'high',
      });
    }
    if (adr.orphaned.length > 0) {
      recommendations.push({
        category: 'adr',
        issue: `${adr.orphaned.length} yetim ADR`,
        recommendation: 'ADR_INDEX.md\'ye ekleyin',
        priority: 'medium',
      });
    }
    if (adr.duplicates.length > 0) {
      recommendations.push({
        category: 'adr',
        issue: `${adr.duplicates.length} duplicate ADR`,
        recommendation: 'Duplicate kayitlari temizleyin',
        priority: 'high',
      });
    }

    // Phase Validation
    const phases = PhaseStatusValidator.validate();
    if (phases.inconsistencies.length > 0) {
      recommendations.push({
        category: 'phase',
        issue: `${phases.inconsistencies.length} faz tutarsizligi`,
        recommendation: 'PHASES/PROJECT_STATUS/ROADMAP senkronize edin',
        priority: 'high',
      });
    }

    // Doc Validation
    const docs = DocumentationConsistencyChecker.check();
    if (docs.brokenReferences.length > 0) {
      recommendations.push({
        category: 'doc',
        issue: `${docs.brokenReferences.length} kirik referans`,
        recommendation: 'Kirik referanslari duzeltin',
        priority: 'medium',
      });
    }

    const highPriority = recommendations.filter(r => r.priority === 'high').length;
    const status = highPriority > 0 ? 'critical'
      : recommendations.length > 0 ? 'warning' : 'ok';

    return {
      timestamp: new Date().toISOString(),
      recommendations,
      totalIssues: recommendations.length,
      status,
    };
  }
}
