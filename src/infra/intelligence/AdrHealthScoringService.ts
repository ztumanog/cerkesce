import { AdrValidator } from '../governance/AdrValidator';

export interface AdrHealthScore {
  adr: string;
  score: number;
  status: 'healthy' | 'warning' | 'critical';
  factors: {
    exists: boolean;
    indexed: boolean;
    accepted: boolean;
  };
}

export interface AdrHealthReport {
  timestamp: string;
  totalAdrs: number;
  averageScore: number;
  healthScores: AdrHealthScore[];
  status: 'ok' | 'warning' | 'critical';
}

export class AdrHealthScoringService {
  static calculate(): AdrHealthReport {
    const validation = AdrValidator.validate();

    const healthScores: AdrHealthScore[] = [];

    const allAdrs = new Set([
      ...validation.missing,
      ...validation.orphaned,
      ...validation.duplicates,
    ]);

    for (const adr of allAdrs) {
      const exists = !validation.missing.includes(adr);
      const indexed = !validation.orphaned.includes(adr);
      const accepted = !validation.duplicates.includes(adr);

      let score = 0;
      if (exists) score += 40;
      if (indexed) score += 30;
      if (accepted) score += 30;

      const status = score >= 80 ? 'healthy' : score >= 50 ? 'warning' : 'critical';

      healthScores.push({
        adr,
        score,
        status,
        factors: { exists, indexed, accepted },
      });
    }

    const averageScore = healthScores.length > 0
      ? healthScores.reduce((sum, h) => sum + h.score, 0) / healthScores.length
      : 100;

    const status = averageScore >= 90 ? 'ok' : averageScore >= 70 ? 'warning' : 'critical';

    return {
      timestamp: new Date().toISOString(),
      totalAdrs: validation.totalIndexed,
      averageScore: Math.round(averageScore * 100) / 100,
      healthScores,
      status,
    };
  }
}
