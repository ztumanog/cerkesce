import { OperationalIntelligenceService } from '../operations/OperationalIntelligenceService';
import { PredictiveAlertDashboardService } from '../operations/PredictiveAlertDashboardService';
import { HealthCheckService } from '../http/HealthCheckService';

export interface OperationsWidget {
  id: string;
  title: string;
  value: string;
  status: 'ok' | 'warning' | 'critical';
  details: string;
}

export interface OperationsDashboardView {
  timestamp: string;
  widgets: OperationsWidget[];
  overallStatus: 'ok' | 'warning' | 'critical';
  summary: string;
}

export class OperationsDashboardViewService {
  static getView(): OperationsDashboardView {
    const ops = OperationalIntelligenceService.getDashboard();
    const alerts = PredictiveAlertDashboardService.getReport([]);
    const health = HealthCheckService.getHealthStatus();

    const widgets: OperationsWidget[] = [
      {
        id: 'health',
        title: 'Health',
        value: health.status,
        status: health.status === 'UP' ? 'ok' : 'critical',
        details: `Version: ${health.version}`,
      },
      {
        id: 'capacity',
        title: 'Capacity',
        value: `%${ops.capacity.memory.usagePercent}`,
        status: ops.capacity.status === 'ok' ? 'ok' : ops.capacity.status === 'warning' ? 'warning' : 'critical',
        details: `${ops.capacity.cpu.cores} cores`,
      },
      {
        id: 'slo',
        title: 'SLO',
        value: ops.slo.status.toUpperCase(),
        status: ops.slo.status === 'ok' ? 'ok' : ops.slo.status === 'warning' ? 'warning' : 'critical',
        details: `Availability: %${ops.slo.availability.current}`,
      },
      {
        id: 'alerts',
        title: 'Alerts',
        value: `${alerts.totalAlerts}`,
        status: alerts.status === 'ok' ? 'ok' : alerts.status === 'warning' ? 'warning' : 'critical',
        details: `${alerts.bySeverity.critical} critical`,
      },
    ];

    const statuses = widgets.map(w => w.status);
    const overallStatus = statuses.includes('critical') ? 'critical'
      : statuses.includes('warning') ? 'warning' : 'ok';

    const summary = overallStatus === 'ok'
      ? 'Operasyonlar saglikli'
      : `${widgets.filter(w => w.status !== 'ok').length} widget uyari veriyor`;

    return {
      timestamp: new Date().toISOString(),
      widgets,
      overallStatus,
      summary,
    };
  }
}
