import { HealthCheckService } from '../http/HealthCheckService';
import { MetricsService } from './MetricsService';
import { AlertService } from './AlertService';

export interface DashboardData {
  timestamp: string;
  health: {
    status: string;
    version: string;
  };
  metrics: {
    requestsTotal: number;
    errorsTotal: number;
    avgLatencyMs: number;
  };
  alerts: {
    total: number;
    recent: Array<{ level: string; message: string; timestamp: string }>;
  };
  uptime: number;
}

export class DashboardService {
  static getDashboard(): DashboardData {
    const health = HealthCheckService.getHealthStatus();
    const recentAlerts = AlertService.getAlerts().slice(-10).map(a => ({
      level: a.level,
      message: a.message,
      timestamp: a.timestamp,
    }));

    return {
      timestamp: new Date().toISOString(),
      health: {
        status: health.status,
        version: health.version,
      },
      metrics: {
        requestsTotal: MetricsService.getCounter('http_requests_total'),
        errorsTotal: MetricsService.getCounter('http_errors_total'),
        avgLatencyMs: MetricsService.getAverageLatency('http_request_duration_ms'),
      },
      alerts: {
        total: AlertService.getAlerts().length,
        recent: recentAlerts,
      },
      uptime: process.uptime(),
    };
  }
}
