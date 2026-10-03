import { AdrValidator } from '../governance/AdrValidator';
import { PhaseStatusValidator } from '../governance/PhaseStatusValidator';
import { DocumentationConsistencyChecker } from '../governance/DocumentationConsistencyChecker';

export interface GovernanceRisk {
  area: 'adr' | 'phase' | 'doc';
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  score: number;
  description: string;
  recommendation: string;
}

export interface GovernanceRiskReport {
  timestamp: string;
  risks: GovernanceRisk[];
  totalRiskScore: number;
  status: 'ok' | 'warning' | 'critical';
}

export class GovernanceRiskEngine {
  static evaluate(): GovernanceRiskReport {
    const risks: GovernanceRisk[] = [];

    // ADR riski
    const adr = AdrValidator.validate();
    const adrIssues = adr.missing.length + adr.orphaned.length + adr.duplicates.length;
    if (adrIssues > 0) {
      const score = Math.min(100, adrIssues * 5);
      const riskLevel = score > 50 ? 'critical' : score > 25 ? 'high' : score > 10 ? 'medium' : 'low';
      risks.push({
        area: 'adr',
        riskLevel,
        score,
        description: `${adrIssues} ADR sorunu`,
        recommendation: 'ADR katalogunu temizleyin',
      });
    }

    // Faz riski
    const phases = PhaseStatusValidator.validate();
    if (phases.inconsistencies.length > 0) {
      const score = Math.min(100, phases.inconsistencies.length * 10);
      const riskLevel = score > 50 ? 'critical' : score > 25 ? 'high' : 'medium';
      risks.push({
        area: 'phase',
        riskLevel,
        score,
        description: `${phases.inconsistencies.length} faz tutarsizligi`,
        recommendation: 'Faz belgelerini senkronize edin',
      });
    }

    // Dokuman riski
    const docs = DocumentationConsistencyChecker.check();
    if (docs.brokenReferences.length > 0) {
      const score = Math.min(100, docs.brokenReferences.length * 3);
      const riskLevel = score > 50 ? 'critical' : score > 25 ? 'high' : 'medium';
      risks.push({
        area: 'doc',
        riskLevel,
        score,
        description: `${docs.brokenReferences.length} kirik referans`,
        recommendation: 'Referanslari duzeltin',
      });
    }

    const totalRiskScore = risks.reduce((sum, r) => sum + r.score, 0);
    const status = totalRiskScore > 50 ? 'critical' : totalRiskScore > 20 ? 'warning' : 'ok';

    return {
      timestamp: new Date().toISOString(),
      risks,
      totalRiskScore,
      status,
    };
  }
}
