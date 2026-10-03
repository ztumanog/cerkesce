export interface TrendPoint {
  timestamp: number;
  value: number;
}

export type TrendDirection = 'upward' | 'downward' | 'stable';

export interface TrendResult {
  metric: string;
  trend: TrendDirection;
  confidence: number;
  slope: number;
  dataPoints: number;
}

export class TrendAnalyzer {
  static analyze(metric: string, points: TrendPoint[]): TrendResult {
    if (points.length < 2) {
      return {
        metric,
        trend: 'stable',
        confidence: 0,
        slope: 0,
        dataPoints: points.length,
      };
    }

    const sorted = [...points].sort((a, b) => a.timestamp - b.timestamp);
    const n = sorted.length;

    let sumX = 0, sumY = 0, sumXY = 0, sumX2 = 0;
    for (let i = 0; i < n; i++) {
      sumX += i;
      sumY += sorted[i].value;
      sumXY += i * sorted[i].value;
      sumX2 += i * i;
    }

    const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);

    const meanY = sumY / n;
    let ssTot = 0, ssRes = 0;
    const intercept = (sumY - slope * sumX) / n;
    for (let i = 0; i < n; i++) {
      const predicted = slope * i + intercept;
      ssTot += Math.pow(sorted[i].value - meanY, 2);
      ssRes += Math.pow(sorted[i].value - predicted, 2);
    }

    const r2 = ssTot > 0 ? 1 - ssRes / ssTot : 0;
    const confidence = Math.max(0, Math.min(1, r2));

    let trend: TrendDirection = 'stable';
    const threshold = 0.01;
    if (Math.abs(slope) > threshold) {
      trend = slope > 0 ? 'upward' : 'downward';
    }

    return {
      metric,
      trend,
      confidence: Math.round(confidence * 100) / 100,
      slope: Math.round(slope * 1000) / 1000,
      dataPoints: n,
    };
  }
}
