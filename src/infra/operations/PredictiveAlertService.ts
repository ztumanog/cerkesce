import { AlertRuleEngine } from './AlertRuleEngine';
import { TrendAnalyzer, TrendPoint } from './TrendAnalyzer';
import { ThresholdPredictor } from './ThresholdPredictor';
import { PredictiveAlertDTO, AlertType } from '../../../domain/operations/dto/PredictiveAlertDTO';

export interface PredictiveAlertInput {
  type: AlertType;
  currentValue: number;
  threshold: number;
  points: TrendPoint[];
}

export class PredictiveAlertService {
  static generate(inputs: PredictiveAlertInput[]): PredictiveAlertDTO[] {
    const alerts: PredictiveAlertDTO[] = [];

    for (const input of inputs) {
      const ruleAlert = AlertRuleEngine.evaluate(input.type, input.currentValue);
      if (ruleAlert) {
        alerts.push(ruleAlert);
      }

      const trend = TrendAnalyzer.analyze(input.type, input.points);
      if (trend.trend === 'upward' && trend.confidence > 0.5) {
        const prediction = ThresholdPredictor.predict(input.type, input.points, input.threshold);

        if (prediction.daysToThreshold !== null && prediction.daysToThreshold <= 30) {
          const severity = prediction.daysToThreshold <= 7 ? 'critical'
            : prediction.daysToThreshold <= 14 ? 'warning' : 'info';

          alerts.push({
            id: `predictive-${input.type}-${Date.now()}`,
            type: input.type,
            severity,
            message: prediction.message,
            predictionDate: new Date(Date.now() + prediction.daysToThreshold * 86400000).toISOString(),
            confidence: trend.confidence,
            currentValue: input.currentValue,
            predictedValue: input.threshold,
            threshold: input.threshold,
          });
        }
      }
    }

    return alerts;
  }
}
