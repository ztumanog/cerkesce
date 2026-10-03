import { PredictiveAlertService, PredictiveAlertInput } from './PredictiveAlertService';
import { PredictiveAlertDTO } from '../../../domain/operations/dto/PredictiveAlertDTO';

export interface AlertDashboardReport {
  timestamp: string;
  totalAlerts: number;
  bySeverity: {
    info: number;
    warning: number;
    critical: number;
  };
  alerts: PredictiveAlertDTO[];
  status: 'ok' | 'warning' | 'critical';
}

export class PredictiveAlertDashboardService {
  static getReport(inputs: PredictiveAlertInput[]): AlertDashboardReport {
    const alerts = PredictiveAlertService.generate(inputs);

    const bySeverity = {
      info: alerts.filter(a => a.severity === 'info').length,
      warning: alerts.filter(a => a.severity === 'warning').length,
      critical: alerts.filter(a => a.severity === 'critical').length,
    };

    const status = bySeverity.critical > 0 ? 'critical'
      : bySeverity.warning > 0 ? 'warning' : 'ok';

    return {
      timestamp: new Date().toISOString(),
      totalAlerts: alerts.length,
      bySeverity,
      alerts,
      status,
    };
  }
}
