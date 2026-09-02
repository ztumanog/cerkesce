import { describe, it, expect, beforeEach } from 'vitest';
import { MetricsService } from '../../infra/telemetry/MetricsService';
import { PrometheusExporterService } from '../../infra/telemetry/PrometheusExporterService';

describe('Phase 10.1 - Prometheus Exporter Certification', () => {
  beforeEach(() => {
    MetricsService.clear();
  });

  it('OBS-003: Formats internal metrics into standard Prometheus exposition format', () => {
    MetricsService.incrementCounter('discovery_request_total');
    MetricsService.incrementCounter('discovery_request_total');
    MetricsService.recordLatency('discovery_latency_ms', 18.4);

    const prometheusOutput = PrometheusExporterService.getPrometheusMetrics();

    expect(prometheusOutput).toContain('# TYPE discovery_request_total counter');
    expect(prometheusOutput).toContain('discovery_request_total 2');
    expect(prometheusOutput).toContain('# TYPE discovery_latency_ms gauge');
    expect(prometheusOutput).toContain('discovery_latency_ms 18.4');
  });
});