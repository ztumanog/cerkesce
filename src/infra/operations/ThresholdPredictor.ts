import { TrendPoint, TrendAnalyzer } from './TrendAnalyzer';

export interface ThresholdPrediction {
  metric: string;
  currentValue: number;
  threshold: number;
  daysToThreshold: number | null;
  trend: 'upward' | 'downward' | 'stable';
  confidence: number;
  message: string;
}

export class ThresholdPredictor {
  static predict(
    metric: string,
    points: TrendPoint[],
    threshold: number,
    dailyGrowth?: number
  ): ThresholdPrediction {
    const trend = TrendAnalyzer.analyze(metric, points);
    const currentValue = points.length > 0 ? points[points.length - 1].value : 0;

    let daysToThreshold: number | null = null;
    let message = '';

    if (trend.trend === 'stable' || currentValue === 0) {
      message = `${metric}: Sabit trend, esik asimi beklenmiyor`;
    } else {
      const growthRate = dailyGrowth ?? Math.abs(trend.slope);
      if (growthRate > 0) {
        const distance = threshold - currentValue;
        if (trend.trend === 'upward' && distance > 0) {
          daysToThreshold = Math.round(distance / growthRate);
          message = `${metric}: ${daysToThreshold} gun icinde esik asilacak`;
        } else if (trend.trend === 'upward' && distance <= 0) {
          daysToThreshold = 0;
          message = `${metric}: Esik zaten asilmis`;
        } else {
          message = `${metric}: Esik asimi beklenmiyor`;
        }
      } else {
        message = `${metric}: Hesaplama yapilamadi`;
      }
    }

    return {
      metric,
      currentValue,
      threshold,
      daysToThreshold,
      trend: trend.trend,
      confidence: trend.confidence,
      message,
    };
  }
}
