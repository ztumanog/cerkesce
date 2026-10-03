export interface Scenario {
  id: string;
  name: string;
  description: string;
  parameters: Record<string, number>;
}

export interface SimulationResult {
  scenarioId: string;
  scenarioName: string;
  outcome: Record<string, number>;
  risk: 'low' | 'medium' | 'high';
  recommendation: string;
}

export interface SimulationReport {
  timestamp: string;
  totalScenarios: number;
  results: SimulationResult[];
  status: 'ok' | 'warning' | 'critical';
}

export class ScenarioSimulationService {
  private static scenarios: Scenario[] = [];

  static add(scenario: Omit<Scenario, 'id'>): Scenario {
    const newScenario: Scenario = {
      ...scenario,
      id: `SCN-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
    };
    this.scenarios.push(newScenario);
    return newScenario;
  }

  static simulate(scenarioId: string): SimulationResult | null {
    const scenario = this.scenarios.find(s => s.id === scenarioId);
    if (!scenario) return null;

    const p = scenario.parameters;
    const outcome: Record<string, number> = {};
    let riskScore = 0;

    for (const [key, value] of Object.entries(p)) {
      outcome[key] = value;
      if (value > 0.8) riskScore += 2;
      else if (value > 0.5) riskScore += 1;
    }

    const risk: SimulationResult['risk'] = riskScore > 3 ? 'high'
      : riskScore > 1 ? 'medium' : 'low';

    const recommendation = risk === 'high' ? 'Acil mudahale gerekli'
      : risk === 'medium' ? 'Izleme artirilmali' : 'Mevcut durum kabul edilebilir';

    return {
      scenarioId,
      scenarioName: scenario.name,
      outcome,
      risk,
      recommendation,
    };
  }

  static getReport(): SimulationReport {
    const results = this.scenarios
      .map(s => this.simulate(s.id))
      .filter((r): r is SimulationResult => r !== null);

    const highRisk = results.filter(r => r.risk === 'high').length;
    const status = highRisk > 0 ? 'warning'
      : results.length === 0 ? 'warning' : 'ok';

    return {
      timestamp: new Date().toISOString(),
      totalScenarios: this.scenarios.length,
      results,
      status,
    };
  }

  static clear(): void {
    this.scenarios = [];
  }
}
