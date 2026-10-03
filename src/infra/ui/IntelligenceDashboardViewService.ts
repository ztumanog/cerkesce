import { ExecutiveIntelligenceService } from '../operations/ExecutiveIntelligenceService';
import { CapacityRecommendationService } from '../operations/CapacityRecommendationService';
import { DecisionSupportService } from '../../domain/analytics/services/DecisionSupportService';

export interface IntelligenceWidget {
  id: string;
  title: string;
  value: string;
  status: 'ok' | 'warning' | 'critical';
  details: string;
}

export interface IntelligenceDashboardView {
  timestamp: string;
  widgets: IntelligenceWidget[];
  overallStatus: 'ok' | 'warning' | 'critical';
  summary: string;
}

export class IntelligenceDashboardViewService {
  static getView(): IntelligenceDashboardView {
    const exec = ExecutiveIntelligenceService.getDashboard();
    const capacity = CapacityRecommendationService.generate();
    const decision = DecisionSupportService.getDashboard();

    const widgets: IntelligenceWidget[] = [
      {
        id: 'executive',
        title: 'Executive Intelligence',
        value: exec.status.toUpperCase(),
        status: exec.status === 'ok' ? 'ok' : exec.status === 'warning' ? 'warning' : 'critical',
        details: `${exec.topRecommendations.length} oneri`,
      },
      {
        id: 'capacity',
        title: 'Capacity Forecast',
        value: capacity.currentStatus.toUpperCase(),
        status: capacity.currentStatus === 'ok' ? 'ok' : capacity.currentStatus === 'warning' ? 'warning' : 'critical',
        details: `${capacity.scenarios.length} senaryo`,
      },
      {
        id: 'decision',
        title: 'Decision Support',
        value: decision.status.toUpperCase(),
        status: decision.status === 'ok' ? 'ok' : decision.status === 'warning' ? 'warning' : 'critical',
        details: `${decision.recommendations.length} karar`,
      },
      {
        id: 'risk',
        title: 'Risk Forecast',
        value: exec.details.risk.status.toUpperCase(),
        status: exec.details.risk.status === 'ok' ? 'ok' : exec.details.risk.status === 'warning' ? 'warning' : 'critical',
        details: `Skor: ${exec.details.risk.riskScore}`,
      },
    ];

    const statuses = widgets.map(w => w.status);
    const overallStatus = statuses.includes('critical') ? 'critical'
      : statuses.includes('warning') ? 'warning' : 'ok';

    const summary = overallStatus === 'ok'
      ? 'Zeka katmani saglikli'
      : `${widgets.filter(w => w.status !== 'ok').length} widget uyari veriyor`;

    return {
      timestamp: new Date().toISOString(),
      widgets,
      overallStatus,
      summary,
    };
  }
}
