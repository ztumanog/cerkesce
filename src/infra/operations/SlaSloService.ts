export interface SloTarget {
  name: string;
  target: number;
  current: number;
  status: 'ok' | 'warning' | 'breach';
}

export interface SlaSloReport {
  timestamp: string;
  availability: SloTarget;
  latency: SloTarget;
  errorRate: SloTarget;
  status: 'ok' | 'warning' | 'critical';
}

export class SlaSloService {
  private static targets = {
    availability: 99.9,
    latencyMs: 200,
    errorRate: 1.0,
  };

  static getReport(metrics?: {
    requestsTotal?: number;
    errorsTotal?: number;
    avgLatencyMs?: number;
    uptimeSeconds?: number;
  }): SlaSloReport {
    const m = metrics || {};

    const errorRate = m.requestsTotal && m.requestsTotal > 0
      ? ((m.errorsTotal || 0) / m.requestsTotal) * 100
      : 0;

    const availability = m.uptimeSeconds
      ? 99.9
      : 100;

    const latency = m.avgLatencyMs || 0;

    const makeTarget = (name: string, target: number, current: number, lowerIsBetter = true): SloTarget => {
      let status: 'ok' | 'warning' | 'breach' = 'ok';
      if (lowerIsBetter) {
        if (current > target * 2) status = 'breach';
        else if (current > target) status = 'warning';
      } else {
        if (current < target * 0.95) status = 'breach';
        else if (current < target) status = 'warning';
      }
      return { name, target, current: Math.round(current * 100) / 100, status };
    };

    const availabilityTarget = makeTarget('Availability', this.targets.availability, availability, false);
    const latencyTarget = makeTarget('Latency (ms)', this.targets.latencyMs, latency, true);
    const errorRateTarget = makeTarget('Error Rate (%)', this.targets.errorRate, errorRate, true);

    const statuses = [availabilityTarget.status, latencyTarget.status, errorRateTarget.status];
    const status = statuses.includes('breach') ? 'critical'
      : statuses.includes('warning') ? 'warning' : 'ok';

    return {
      timestamp: new Date().toISOString(),
      availability: availabilityTarget,
      latency: latencyTarget,
      errorRate: errorRateTarget,
      status,
    };
  }
}
