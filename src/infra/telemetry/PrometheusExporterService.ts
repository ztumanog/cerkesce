import { MetricsService } from './MetricsService';

export class PrometheusExporterService {
  public static getPrometheusMetrics(): string {
    const lines: string[] = [];

    // Counter Metrics
    const discoveryTotal = MetricsService.getCounter('discovery_request_total');
    lines.push('# HELP discovery_request_total Total number of knowledge discovery queries processed.');
    lines.push('# TYPE discovery_request_total counter');
    lines.push(`discovery_request_total ${discoveryTotal}`);

    // Latency Metrics
    const avgLatency = MetricsService.getAverageLatency('discovery_latency_ms');
    lines.push('# HELP discovery_latency_ms Average execution latency of discovery pipeline in milliseconds.');
    lines.push('# TYPE discovery_latency_ms gauge');
    lines.push(`discovery_latency_ms ${avgLatency}`);

    return lines.join('\n') + '\n';
  }
}