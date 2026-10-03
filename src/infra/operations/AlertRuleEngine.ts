import { PredictiveAlertDTO, AlertSeverity, AlertType } from '../../domain/operations/dto/PredictiveAlertDTO';

export interface AlertRule {
  type: AlertType;
  threshold: number;
  warningAt: number;
  criticalAt: number;
}

export class AlertRuleEngine {
  private static rules: AlertRule[] = [
    { type: 'cpu', threshold: 80, warningAt: 70, criticalAt: 90 },
    { type: 'memory', threshold: 80, warningAt: 70, criticalAt: 90 },
    { type: 'latency', threshold: 200, warningAt: 150, criticalAt: 500 },
    { type: 'error_budget', threshold: 1, warningAt: 0.5, criticalAt: 2 },
    { type: 'cache', threshold: 80, warningAt: 70, criticalAt: 50 },
  ];

  static evaluate(type: AlertType, currentValue: number): PredictiveAlertDTO | null {
    const rule = this.rules.find(r => r.type === type);
    if (!rule) return null;

    let severity: AlertSeverity | null = null;
    if (type === 'cache') {
      if (currentValue < rule.criticalAt) severity = 'critical';
      else if (currentValue < rule.warningAt) severity = 'warning';
    } else {
      if (currentValue >= rule.criticalAt) severity = 'critical';
      else if (currentValue >= rule.warningAt) severity = 'warning';
    }

    if (!severity) return null;

    return {
      id: `alert-${type}-${Date.now()}`,
      type,
      severity,
      message: `${type} ${severity}: current value ${currentValue}`,
      predictionDate: new Date().toISOString(),
      confidence: 1.0,
      currentValue,
      predictedValue: currentValue,
      threshold: rule.threshold,
    };
  }

  static getRules(): AlertRule[] {
    return this.rules;
  }
}
