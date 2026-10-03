export interface ConfidenceFactors {
  dataQuality: number;
  historicalAccuracy: number;
  sampleSize: number;
  recency: number;
}

export interface ConfidenceScore {
  id: string;
  score: number;
  level: 'low' | 'medium' | 'high' | 'very_high';
  factors: ConfidenceFactors;
  explanation: string;
}

export interface ConfidenceReport {
  timestamp: string;
  scores: ConfidenceScore[];
  averageScore: number;
  status: 'ok' | 'warning' | 'critical';
}

export class ConfidenceScoringService {
  private static scores: ConfidenceScore[] = [];

  static calculate(factors: ConfidenceFactors, id: string = 'default'): ConfidenceScore {
    const weights = {
      dataQuality: 0.3,
      historicalAccuracy: 0.3,
      sampleSize: 0.2,
      recency: 0.2,
    };

    const score =
      factors.dataQuality * weights.dataQuality +
      factors.historicalAccuracy * weights.historicalAccuracy +
      factors.sampleSize * weights.sampleSize +
      factors.recency * weights.recency;

    const level: ConfidenceScore['level'] =
      score >= 0.9 ? 'very_high'
        : score >= 0.7 ? 'high'
          : score >= 0.5 ? 'medium' : 'low';

    const explanation = `Score ${Math.round(score * 100)}% - ${level.replace('_', ' ')}`;

    const result: ConfidenceScore = {
      id,
      score: Math.round(score * 100) / 100,
      level,
      factors,
      explanation,
    };

    this.scores.push(result);
    return result;
  }

  static getReport(): ConfidenceReport {
    if (this.scores.length === 0) {
      return {
        timestamp: new Date().toISOString(),
        scores: [],
        averageScore: 0,
        status: 'warning',
      };
    }

    const averageScore =
      this.scores.reduce((sum, s) => sum + s.score, 0) / this.scores.length;

    const lowConfidence = this.scores.filter(s => s.level === 'low').length;
    const status = lowConfidence > 2 ? 'warning' : 'ok';

    return {
      timestamp: new Date().toISOString(),
      scores: this.scores,
      averageScore: Math.round(averageScore * 100) / 100,
      status,
    };
  }

  static clear(): void {
    this.scores = [];
  }
}
