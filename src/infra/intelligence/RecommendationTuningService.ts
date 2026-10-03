export interface Recommendation {
  id: string;
  category: string;
  message: string;
  priority: 'low' | 'medium' | 'high';
  confidence: number;
  timestamp: string;
}

export interface TuningParameters {
  minConfidence: number;
  priorityWeights: {
    low: number;
    medium: number;
    high: number;
  };
}

export interface TunedRecommendation extends Recommendation {
  tunedScore: number;
  rank: number;
}

export interface TuningResult {
  timestamp: string;
  totalRecommendations: number;
  tunedRecommendations: TunedRecommendation[];
  parameters: TuningParameters;
  status: 'ok' | 'warning' | 'critical';
}

export class RecommendationTuningService {
  private static recommendations: Recommendation[] = [];
  private static defaultParams: TuningParameters = {
    minConfidence: 0.5,
    priorityWeights: { low: 1, medium: 2, high: 3 },
  };

  static add(rec: Omit<Recommendation, 'id' | 'timestamp'>): Recommendation {
    const newRec: Recommendation = {
      ...rec,
      id: `REC-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      timestamp: new Date().toISOString(),
    };
    this.recommendations.push(newRec);
    return newRec;
  }

  static tune(params?: Partial<TuningParameters>): TuningResult {
    const p: TuningParameters = {
      ...this.defaultParams,
      ...params,
      priorityWeights: {
        ...this.defaultParams.priorityWeights,
        ...(params?.priorityWeights || {}),
      },
    };

    const filtered = this.recommendations.filter(r => r.confidence >= p.minConfidence);

    const tuned: TunedRecommendation[] = filtered
      .map(r => ({
        ...r,
        tunedScore: r.confidence * p.priorityWeights[r.priority],
        rank: 0,
      }))
      .sort((a, b) => b.tunedScore - a.tunedScore)
      .map((r, i) => ({ ...r, rank: i + 1 }));

    const status = tuned.length === 0 ? 'warning' : 'ok';

    return {
      timestamp: new Date().toISOString(),
      totalRecommendations: this.recommendations.length,
      tunedRecommendations: tuned,
      parameters: p,
      status,
    };
  }

  static clear(): void {
    this.recommendations = [];
  }
}
