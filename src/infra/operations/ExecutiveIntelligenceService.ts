import { CapacityRecommendationService } from './CapacityRecommendationService';
import { GovernanceRecommendationService } from './GovernanceRecommendationService';
import { RiskForecastingService } from './RiskForecastingService';
import { PredictiveAlertService } from './PredictiveAlertService';

export interface ExecutiveDashboard {
  timestamp: string;
  status: 'ok' | 'warning' | 'critical';
  summary: {
    capacity: string;
    governance: string;
    risk: string;
    alerts: string;
  };
  details: {
    capacity: ReturnType<typeof CapacityRecommendationService.generate>;
    governance: ReturnType<typeof GovernanceRecommendationService.generate>;
    risk: ReturnType<typeof RiskForecastingService.forecast>;
  };
  topRecommendations: string[];
}

export class ExecutiveIntelligenceService {
  static getDashboard(): ExecutiveDashboard {
    const capacity = CapacityRecommendationService.generate();
    const governance = GovernanceRecommendationService.generate();
    const risk = RiskForecastingService.forecast();
    const alerts = PredictiveAlertService.generate([]);

    const statuses = [capacity.status, governance.status, risk.status];
    const status = statuses.includes('critical') ? 'critical'
      : statuses.includes('warning') ? 'warning' : 'ok';

    const summary = {
      capacity: capacity.status === 'ok' ? 'Yeterli' : 'Artis gerekli',
      governance: governance.status === 'ok' ? 'Temiz' : `${governance.totalIssues} sorun`,
      risk: risk.status === 'ok' ? 'Dusuk' : `Skor: ${risk.riskScore}`,
      alerts: alerts.length === 0 ? 'Aktif uyari yok' : `${alerts.length} uyari`,
    };

    const topRecommendations: string[] = [];
    if (capacity.status !== 'ok') topRecommendations.push(capacity.overallRecommendation);
    if (governance.status !== 'ok') {
      const highPriority = governance.recommendations.filter(r => r.priority === 'high');
      topRecommendations.push(...highPriority.map(r => r.recommendation));
    }
    if (risk.topRisk) topRecommendations.push(risk.topRisk.mitigation);
    if (topRecommendations.length === 0) topRecommendations.push('Tum sistemler saglikli');

    return {
      timestamp: new Date().toISOString(),
      status,
      summary,
      details: { capacity, governance, risk },
      topRecommendations,
    };
  }
}
