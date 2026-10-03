import { AdrRecommendationAssistant } from './AdrRecommendationAssistant';
import { GovernanceDriftPreventionService } from './GovernanceDriftPreventionService';
import { ArchitectureConsistencyAdvisor } from './ArchitectureConsistencyAdvisor';
import { ReleaseReadinessAdvisor } from './ReleaseReadinessAdvisor';

export interface PlanningInsight {
  area: string;
  insight: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  action: string;
}

export interface ExecutivePlanningReport {
  timestamp: string;
  status: 'ok' | 'warning' | 'critical';
  nextPhase: string;
  topRisk: string;
  technicalDebt: string;
  insights: PlanningInsight[];
  summary: string;
}

export class ExecutivePlanningAssistant {
  static generate(): ExecutivePlanningReport {
    const adr = AdrRecommendationAssistant.generate();
    const drift = GovernanceDriftPreventionService.analyze();
    const arch = ArchitectureConsistencyAdvisor.analyze();
    const release = ReleaseReadinessAdvisor.assess();

    const insights: PlanningInsight[] = [];

    // ADR insight
    if (adr.status !== 'ok') {
      insights.push({
        area: 'ADR',
        insight: `${adr.totalIssues} ADR sorunu mevcut`,
        priority: adr.status === 'critical' ? 'high' : 'medium',
        action: 'ADR katalogunu temizleyin',
      });
    }

    // Drift insight
    if (drift.status !== 'ok') {
      insights.push({
        area: 'Governance',
        insight: `Belge drift skoru: ${drift.driftScore}`,
        priority: drift.status === 'critical' ? 'high' : 'medium',
        action: 'Belgeleri senkronize edin',
      });
    }

    // Architecture insight
    if (arch.status !== 'ok') {
      insights.push({
        area: 'Architecture',
        insight: `Mimari tutarlilik skoru: ${arch.consistencyScore}`,
        priority: arch.status === 'critical' ? 'high' : 'medium',
        action: 'Kod-belge uyumsuzluklarini giderin',
      });
    }

    // Release insight
    if (!release.ready) {
      insights.push({
        area: 'Release',
        insight: `Surum hazirlik: %${release.percentage}`,
        priority: release.percentage < 70 ? 'high' : 'medium',
        action: 'Surum hazirlik kontrollerini tamamlayin',
      });
    }

    // Overall status
    const hasCritical = insights.some(i => i.priority === 'high' || i.priority === 'critical');
    const status = hasCritical ? 'critical'
      : insights.length > 0 ? 'warning' : 'ok';

    // Next phase onerisi
    const nextPhase = status === 'ok'
      ? 'Faz 13 planlamasi baslatilabilir'
      : 'Once mevcut sorunlar giderilmeli';

    // Top risk
    const topRisk = insights.length > 0
      ? insights[0].insight
      : 'Aktif risk yok';

    // Technical debt
    const technicalDebt = insights.filter(i => i.area === 'Architecture').length > 0
      ? 'Orta seviye'
      : 'Dusuk seviye';

    // Summary
    const summary = status === 'ok'
      ? 'Tum sistemler saglikli, sonraki faza hazir'
      : `${insights.length} alanda iyilestirme gerekli`;

    return {
      timestamp: new Date().toISOString(),
      status,
      nextPhase,
      topRisk,
      technicalDebt,
      insights,
      summary,
    };
  }
}
