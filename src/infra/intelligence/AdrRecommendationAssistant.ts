import { AdrValidator } from '../governance/AdrValidator';

export interface AdrRecommendation {
  type: 'missing' | 'duplicate' | 'orphaned' | 'outdated';
  adr: string;
  recommendation: string;
  confidence: number;
  priority: 'low' | 'medium' | 'high';
}

export interface AdrRecommendationReport {
  timestamp: string;
  recommendations: AdrRecommendation[];
  totalIssues: number;
  status: 'ok' | 'warning' | 'critical';
}

export class AdrRecommendationAssistant {
  static generate(): AdrRecommendationReport {
    const validation = AdrValidator.validate();
    const recommendations: AdrRecommendation[] = [];

    for (const adr of validation.missing) {
      recommendations.push({
        type: 'missing',
        adr,
        recommendation: `${adr} icin fiziksel dosya olusturun`,
        confidence: 0.95,
        priority: 'high',
      });
    }

    for (const adr of validation.orphaned) {
      recommendations.push({
        type: 'orphaned',
        adr,
        recommendation: `${adr} ADR_INDEX.md'ye ekleyin`,
        confidence: 0.9,
        priority: 'medium',
      });
    }

    for (const adr of validation.duplicates) {
      recommendations.push({
        type: 'duplicate',
        adr,
        recommendation: `${adr} duplicate kaydini temizleyin`,
        confidence: 0.95,
        priority: 'high',
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
