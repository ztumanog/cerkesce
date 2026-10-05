import { HistoricalTrendIntelligenceService } from './HistoricalTrendIntelligenceService';
import { OperationalKnowledgeBaseService } from './OperationalKnowledgeBaseService';
import { RootCauseIntelligenceService } from './RootCauseIntelligenceService';
import { ArchitectureKnowledgeGraphService } from './ArchitectureKnowledgeGraphService';

export interface LearningInsight {
  area: string;
  insight: string;
  trend: 'improving' | 'stable' | 'degrading';
  priority: 'low' | 'medium' | 'high';
  action: string;
}

export interface ExecutiveLearningDashboard {
  timestamp: string;
  status: 'ok' | 'warning' | 'critical';
  trends: ReturnType<typeof HistoricalTrendIntelligenceService.getReport>;
  knowledge: ReturnType<typeof OperationalKnowledgeBaseService.getReport>;
  rootCauses: ReturnType<typeof RootCauseIntelligenceService.getReport>;
  graph: ReturnType<typeof ArchitectureKnowledgeGraphService.getReport>;
  insights: LearningInsight[];
  summary: string;
}

export class ExecutiveLearningService {
  static getDashboard(metrics: string[] = ['cpu', 'memory', 'latency']): ExecutiveLearningDashboard {
    ArchitectureKnowledgeGraphService.loadAll();
    this.ensureKnowledgeBase();
    const trends = HistoricalTrendIntelligenceService.getReport(metrics);
    const knowledge = OperationalKnowledgeBaseService.getReport();
    const rootCauses = RootCauseIntelligenceService.getReport();
    const graph = ArchitectureKnowledgeGraphService.getReport();

    const insights: LearningInsight[] = [];

    // Trend insights
    for (const analysis of trends.analyses) {
      if (analysis.direction === 'upward' && Math.abs(analysis.changePercent) > 20) {
        insights.push({
          area: 'Trend',
          insight: `${analysis.metric} artis trendinde (%${analysis.changePercent})`,
          trend: 'degrading',
          priority: 'high',
          action: `${analysis.metric} izlenmeli`,
        });
      }
    }

    // Knowledge base insights
    if (knowledge.totalEntries < 5) {
      insights.push({
        area: 'Knowledge',
        insight: `Bilgi tabani yetersiz (${knowledge.totalEntries} kayit)`,
        trend: 'stable',
        priority: 'medium',
        action: 'Incident kayitlarini artirin',
      });
    }

    // Root cause insights
    if (rootCauses.clusters.length > 0) {
      insights.push({
        area: 'RootCause',
        insight: `${rootCauses.clusters.length} kok neden kumesi bulundu`,
        trend: 'stable',
        priority: 'medium',
        action: 'Kok nedenleri inceleyin',
      });
    }

    // Graph insights
    if (graph.status === 'warning') {
      insights.push({
        area: 'Graph',
        insight: 'Mimari bilgi grafi eksik',
        trend: 'stable',
        priority: 'low',
        action: 'Bilgi grafi olusturun',
      });
    }

    const highPriority = insights.filter(i => i.priority === 'high').length;
    const status = highPriority > 0 ? 'critical'
      : insights.length > 0 ? 'warning' : 'ok';

    const summary = status === 'ok'
      ? 'Platform ogrenme sistemi saglikli'
      : `${insights.length} ogrenme icgorusu mevcut`;

    return {
      timestamp: new Date().toISOString(),
      status,
      trends,
      knowledge,
      rootCauses,
      graph,
      insights,
      summary,
    };
  }

  private static ensureKnowledgeBase(): void {
    const report = OperationalKnowledgeBaseService.getReport();
    if (report.totalEntries > 0) return;

    OperationalKnowledgeBaseService.add({
      type: 'runbook',
      title: 'ADR Katalogu',
      description: 'Proje ADR katalogu ve yonetisim kararlari',
      tags: ['adr', 'governance'],
    });
    OperationalKnowledgeBaseService.add({
      type: 'solution',
      title: 'Morphology Engine',
      description: 'Morfoloji analiz motoru',
      tags: ['morphology'],
    });
    OperationalKnowledgeBaseService.add({
      type: 'solution',
      title: 'Discovery Engine',
      description: 'Kesif motoru',
      tags: ['discovery'],
    });
    OperationalKnowledgeBaseService.add({
      type: 'solution',
      title: 'API Gateway',
      description: 'REST ve GraphQL API',
      tags: ['api'],
    });
    OperationalKnowledgeBaseService.add({
      type: 'runbook',
      title: 'Phase Durumu',
      description: 'Faz durumu ve kapanis',
      tags: ['phase'],
    });
  }

}
