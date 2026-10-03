import { GovernanceDashboardService } from '../governance/GovernanceDashboardService';
import { AdrRecommendationAssistant } from '../intelligence/AdrRecommendationAssistant';
import { GovernanceRiskEngine } from '../intelligence/GovernanceRiskEngine';
import { ReleaseReadinessAdvisor } from '../intelligence/ReleaseReadinessAdvisor';

export interface GovernanceWidget {
  id: string;
  title: string;
  value: string;
  status: 'ok' | 'warning' | 'critical';
  details: string;
}

export interface GovernanceDashboardView {
  timestamp: string;
  widgets: GovernanceWidget[];
  overallStatus: 'ok' | 'warning' | 'critical';
  summary: string;
}

export class GovernanceDashboardViewService {
  static getView(): GovernanceDashboardView {
    const govDash = GovernanceDashboardService.getDashboard();
    const adrRec = AdrRecommendationAssistant.generate();
    const risk = GovernanceRiskEngine.evaluate();
    const readiness = ReleaseReadinessAdvisor.assess();

    const widgets: GovernanceWidget[] = [
      {
        id: 'adr',
        title: 'ADR Status',
        value: `${adrRec.totalIssues} sorun`,
        status: adrRec.status === 'ok' ? 'ok' : adrRec.status === 'warning' ? 'warning' : 'critical',
        details: `${adrRec.recommendations.length} oneri`,
      },
      {
        id: 'phase',
        title: 'Phase Status',
        value: `${govDash.status.toUpperCase()}`,
        status: govDash.status === 'ok' ? 'ok' : govDash.status === 'warning' ? 'warning' : 'critical',
        details: 'Faz durumu',
      },
      {
        id: 'risk',
        title: 'Governance Risk',
        value: `Skor: ${risk.totalRiskScore}`,
        status: risk.status === 'ok' ? 'ok' : risk.status === 'warning' ? 'warning' : 'critical',
        details: `${risk.risks.length} risk`,
      },
      {
        id: 'compliance',
        title: 'Release Readiness',
        value: `%${readiness.percentage}`,
        status: readiness.status === 'ready' ? 'ok' : readiness.status === 'warning' ? 'warning' : 'critical',
        details: `${readiness.checks.length} kontrol`,
      },
    ];

    const statuses = widgets.map(w => w.status);
    const overallStatus = statuses.includes('critical') ? 'critical'
      : statuses.includes('warning') ? 'warning' : 'ok';

    const summary = overallStatus === 'ok'
      ? 'Yonetisim sistemi saglikli'
      : `${widgets.filter(w => w.status !== 'ok').length} widget uyari veriyor`;

    return {
      timestamp: new Date().toISOString(),
      widgets,
      overallStatus,
      summary,
    };
  }
}
