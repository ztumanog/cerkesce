export type AlertSeverity = 'info' | 'warning' | 'critical';
export type AlertType = 'cpu' | 'memory' | 'latency' | 'error_budget' | 'cache';

export interface PredictiveAlertDTO {
  id: string;
  type: AlertType;
  severity: AlertSeverity;
  message: string;
  predictionDate: string;
  confidence: number;
  currentValue: number;
  predictedValue: number;
  threshold: number;
}