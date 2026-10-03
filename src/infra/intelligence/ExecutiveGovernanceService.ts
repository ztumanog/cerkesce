import { AdrHealthScoringService } from './AdrHealthScoringService';
import { TechnicalDebtForecastingService } from './TechnicalDebtForecastingService';
import { ArchitectureDriftDetectionService } from './ArchitectureDriftDetectionService';
import { GovernanceRiskEngine } from './GovernanceRiskEngine';

export interface ExecutiveGovernanceDashboard {
  timestamp: string;
  status: 'ok' | 'warning' | 'critical';
  summary: {
    adrHealth: string;
    technicalDebt: string;
    drift: string;
    risk: string;
  };
  details: {
    adr: ReturnType<typeof AdrHealthScoringService.calculate>;
    debt: ReturnType<typeof TechnicalDebtForecastingService.forecast>;
    drift: ReturnType<typeof ArchitectureDriftDetectionService.detect>;
    risk: ReturnType<typeof GovernanceRiskEngine.evaluate>;
  };
  topActions: string[];
}

export class ExecutiveGovernanceService {
  static getDashboard(): ExecutiveGovernanceDashboard {
    const adr = AdrHealthScoringService.calculate();
    const debt = TechnicalDebtForecastingService.forecast();
    const drift = ArchitectureDriftDetectionService.detect();
    const risk = GovernanceRiskEngine.evaluate();

    const statuses = [adr.status, debt.status, drift.status, risk.status];
    const status = statuses.includes('critical') ? 'critical'
      : statuses.includes('warning') ? 'warning' : 'ok';

    const summary = {
      adrHealth: adr.status === 'ok' ? `${adr.totalAdrs} ADR saglikli` : `${adr.totalAdrs} ADR (${adr.status})`,
      technicalDebt: debt.status === 'ok' ? 'Dusuk' : `Skor: ${debt.totalDebt}`,
      drift: drift.status === 'ok' ? 'Sapma yok' : `Skor: ${drift.driftScore}`,
      risk: risk.status === 'ok' ? 'Dusuk risk' : `Skor: ${risk.totalRiskScore}`,
    };

    const topActions: string[] = [];
    if (adr.status !== 'ok') topActions.push('ADR katalogunu temizleyin');
    if (debt.status !== 'ok') topActions.push('Teknik borcu azaltin');
    if (drift.status !== 'ok') topActions.push('Mimari sapmayi duzeltin');
    if (risk.status !== 'ok') topActions.push('Yonetisim risklerini ele alin');
    if (topActions.length === 0) topActions.push('Tum yonetisim sistemleri saglikli');

    return {
      timestamp: new Date().toISOString(),
      status,
      summary,
      details: { adr, debt, drift, risk },
      topActions,
    };
  }
}
