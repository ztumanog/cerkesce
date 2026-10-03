import { ExternalSystemFederationService } from './ExternalSystemFederationService';
import { CrossPlatformMetricsService } from './CrossPlatformMetricsService';
import { KnowledgeExchangeService } from './KnowledgeExchangeService';
import { GovernanceFederationService } from './GovernanceFederationService';

export interface EcosystemInsight {
  area: string;
  insight: string;
  priority: 'low' | 'medium' | 'high';
  action: string;
}

export interface EcosystemDashboard {
  timestamp: string;
  status: 'ok' | 'warning' | 'critical';
  federation: ReturnType<typeof ExternalSystemFederationService.getReport>;
  metrics: ReturnType<typeof CrossPlatformMetricsService.getReport>;
  exchange: ReturnType<typeof KnowledgeExchangeService.getReport>;
  governance: ReturnType<typeof GovernanceFederationService.audit>;
  insights: EcosystemInsight[];
  summary: string;
}

export class EcosystemDashboardService {
  static getDashboard(): EcosystemDashboard {
    const federation = ExternalSystemFederationService.getReport();
    const metrics = CrossPlatformMetricsService.getReport();
    const exchange = KnowledgeExchangeService.getReport();
    const governance = GovernanceFederationService.audit();

    const insights: EcosystemInsight[] = [];

    if (federation.status !== 'ok') {
      insights.push({
        area: 'Federation',
        insight: `${federation.totalSystems} sistem, ${federation.activeSystems} aktif`,
        priority: federation.status === 'critical' ? 'high' : 'medium',
        action: 'Dis sistemleri kontrol edin',
      });
    }

    if (metrics.status !== 'ok') {
      insights.push({
        area: 'Metrics',
        insight: `${metrics.totalMetrics} metrik toplandi`,
        priority: 'medium',
        action: 'Metrik toplamayi artirin',
      });
    }

    if (exchange.failed > 0) {
      insights.push({
        area: 'Exchange',
        insight: `${exchange.failed} basarisiz transfer`,
        priority: 'high',
        action: 'Basarisiz transferleri inceleyin',
      });
    }

    if (governance.status !== 'ok') {
      insights.push({
        area: 'Governance',
        insight: `Ortalama uyumluluk: %${governance.averageCompliance}`,
        priority: governance.status === 'critical' ? 'high' : 'medium',
        action: 'Yonetisim uyumlulugunu artirin',
      });
    }

    const statuses = [federation.status, metrics.status, exchange.status, governance.status];
    const status = statuses.includes('critical') ? 'critical'
      : statuses.includes('warning') ? 'warning' : 'ok';

    const summary = status === 'ok'
      ? 'Ekosistem saglikli'
      : `${insights.length} ekosistem icgorusu mevcut`;

    return {
      timestamp: new Date().toISOString(),
      status,
      federation,
      metrics,
      exchange,
      governance,
      insights,
      summary,
    };
  }
}
