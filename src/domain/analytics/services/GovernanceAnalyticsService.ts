import { AdrValidator } from '../../../infra/governance/AdrValidator';
import { PhaseStatusValidator } from '../../../infra/governance/PhaseStatusValidator';

export interface PhaseDuration {
  phase: string;
  estimatedDays: number;
  status: string;
}

export interface GovernanceMetrics {
  adrCount: number;
  adrPerWeek: number;
  phaseCount: number;
  avgPhaseDuration: number;
  docCompliance: number;
  technicalDebt: number;
}

export interface GovernanceAnalyticsReport {
  timestamp: string;
  metrics: GovernanceMetrics;
  phaseDurations: PhaseDuration[];
  status: 'ok' | 'warning' | 'critical';
}

export class GovernanceAnalyticsService {
  static getReport(): GovernanceAnalyticsReport {
    const adr = AdrValidator.validate();
    const phases = PhaseStatusValidator.validate();

    const metrics: GovernanceMetrics = {
      adrCount: adr.totalIndexed,
      adrPerWeek: 5,
      phaseCount: phases.phases.length,
      avgPhaseDuration: 30,
      docCompliance: adr.status === 'ok' ? 100 : 80,
      technicalDebt: 0,
    };

    const phaseDurations: PhaseDuration[] = [
      { phase: 'Phase 1', estimatedDays: 30, status: 'CLOSED' },
      { phase: 'Phase 2', estimatedDays: 45, status: 'CLOSED' },
      { phase: 'Phase 3', estimatedDays: 30, status: 'CLOSED' },
      { phase: 'Phase 4', estimatedDays: 60, status: 'COMPLETED' },
      { phase: 'Phase 5', estimatedDays: 45, status: 'COMPLETED' },
      { phase: 'Phase 6', estimatedDays: 30, status: 'COMPLETED' },
      { phase: 'Phase 7', estimatedDays: 30, status: 'COMPLETED' },
      { phase: 'Phase 8', estimatedDays: 60, status: 'COMPLETED' },
    ];

    const status = adr.status === 'ok' && phases.status === 'ok' ? 'ok' : 'warning';

    return {
      timestamp: new Date().toISOString(),
      metrics,
      phaseDurations,
      status,
    };
  }
}
