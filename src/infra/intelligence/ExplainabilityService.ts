export interface Decision {
  id: string;
  type: string;
  outcome: string;
  inputs: Record<string, number>;
  confidence: number;
  timestamp: string;
}

export interface Explanation {
  decisionId: string;
  summary: string;
  factors: Array<{
    name: string;
    value: number;
    weight: number;
    contribution: number;
  }>;
  reasoning: string;
  confidence: number;
}

export interface ExplainabilityReport {
  timestamp: string;
  explanations: Explanation[];
  status: 'ok' | 'warning' | 'critical';
}

export class ExplainabilityService {
  private static decisions: Decision[] = [];

  static record(decision: Omit<Decision, 'id' | 'timestamp'>): Decision {
    const newDecision: Decision = {
      ...decision,
      id: `DEC-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      timestamp: new Date().toISOString(),
    };
    this.decisions.push(newDecision);
    return newDecision;
  }

  static explain(decisionId: string, weights?: Record<string, number>): Explanation | null {
    const decision = this.decisions.find(d => d.id === decisionId);
    if (!decision) return null;

    const defaultWeights: Record<string, number> = {};
    const keys = Object.keys(decision.inputs);
    keys.forEach(k => { defaultWeights[k] = 1 / keys.length; });

    const w = weights || defaultWeights;

    const factors = keys.map(name => {
      const value = decision.inputs[name];
      const weight = w[name] || 0;
      return {
        name,
        value,
        weight,
        contribution: Math.round(value * weight * 100) / 100,
      };
    }).sort((a, b) => b.contribution - a.contribution);

    const reasoning = `Karar "${decision.outcome}" sonucunu verdi cunku ` +
      factors.slice(0, 3).map(f => `${f.name} (${f.contribution})`).join(', ') +
      ' faktorleri etkili oldu.';

    const summary = `${decision.type} karari: ${decision.outcome} (guven: %${Math.round(decision.confidence * 100)})`;

    return {
      decisionId,
      summary,
      factors,
      reasoning,
      confidence: decision.confidence,
    };
  }

  static getReport(): ExplainabilityReport {
    const explanations = this.decisions
      .map(d => this.explain(d.id))
      .filter((e): e is Explanation => e !== null);

    const status = explanations.length === 0 ? 'warning' : 'ok';

    return {
      timestamp: new Date().toISOString(),
      explanations,
      status,
    };
  }

  static clear(): void {
    this.decisions = [];
  }
}
