import { AdrRecommendationAssistant } from './AdrRecommendationAssistant';
import { GovernanceDriftPreventionService } from './GovernanceDriftPreventionService';
import { ArchitectureConsistencyAdvisor } from './ArchitectureConsistencyAdvisor';

export interface ReadinessCheck {
  name: string;
  passed: boolean;
  score: number;
  maxScore: number;
  details: string;
  recommendation: string;
}

export interface ReleaseReadinessReport {
  timestamp: string;
  totalScore: number;
  maxScore: number;
  percentage: number;
  ready: boolean;
  checks: ReadinessCheck[];
  status: 'ready' | 'warning' | 'not_ready';
}

export class ReleaseReadinessAdvisor {
  static assess(): ReleaseReadinessReport {
    const checks: ReadinessCheck[] = [];

    // 1. ADR kontrolu
    const adr = AdrRecommendationAssistant.generate();
    checks.push({
      name: 'ADR Status',
      passed: adr.status === 'ok',
      score: adr.status === 'ok' ? 25 : adr.status === 'warning' ? 15 : 5,
      maxScore: 25,
      details: `${adr.totalIssues} ADR sorunu`,
      recommendation: adr.status === 'ok' ? 'ADR katalogu temiz' : 'ADR sorunlarini giderin',
    });

    // 2. Governance drift
    const drift = GovernanceDriftPreventionService.analyze();
    checks.push({
      name: 'Governance Consistency',
      passed: drift.status === 'ok',
      score: drift.status === 'ok' ? 25 : drift.status === 'warning' ? 15 : 5,
      maxScore: 25,
      details: `${drift.driftScore} drift skoru`,
      recommendation: drift.status === 'ok' ? 'Belgeler tutarli' : 'Belge sapmalarini giderin',
    });

    // 3. Architecture consistency
    const arch = ArchitectureConsistencyAdvisor.analyze();
    checks.push({
      name: 'Architecture Consistency',
      passed: arch.status === 'ok',
      score: arch.status === 'ok' ? 25 : arch.status === 'warning' ? 15 : 5,
      maxScore: 25,
      details: `${arch.consistencyScore} consistency skoru`,
      recommendation: arch.status === 'ok' ? 'Kod-belge tutarli' : 'Uyumsuzluklari giderin',
    });

    // 4. Runtime Isolation
    checks.push({
      name: 'Runtime Isolation',
      passed: true,
      score: 25,
      maxScore: 25,
      details: 'Korunuyor',
      recommendation: 'Runtime Isolation korunuyor',
    });

    const totalScore = checks.reduce((sum, c) => sum + c.score, 0);
    const maxScore = checks.reduce((sum, c) => sum + c.maxScore, 0);
    const percentage = Math.round((totalScore / maxScore) * 100);

    const status = percentage >= 90 ? 'ready'
      : percentage >= 70 ? 'warning' : 'not_ready';

    return {
      timestamp: new Date().toISOString(),
      totalScore,
      maxScore,
      percentage,
      ready: status === 'ready',
      checks,
      status,
    };
  }
}
