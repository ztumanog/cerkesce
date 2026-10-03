export interface SlaTarget {
  name: string;
  target: number;
  current: number;
  window: string;
}

export interface UptimeRecord {
  service: string;
  period: string;
  uptimePercent: number;
  downtimeMinutes: number;
  timestamp: string;
}

export interface AvailabilityReport {
  timestamp: string;
  slaTargets: SlaTarget[];
  uptimeRecords: UptimeRecord[];
  overallAvailability: number;
  status: 'ok' | 'warning' | 'critical';
}

export class AvailabilityEngineeringService {
  private static slaTargets: SlaTarget[] = [
    { name: 'API Gateway', target: 99.9, current: 99.95, window: '30d' },
    { name: 'Discovery Engine', target: 99.5, current: 99.7, window: '30d' },
    { name: 'Analytics', target: 99.0, current: 98.5, window: '30d' },
  ];

  private static uptimeRecords: UptimeRecord[] = [];

  static recordUptime(record: Omit<UptimeRecord, 'timestamp'>): void {
    this.uptimeRecords.push({
      ...record,
      timestamp: new Date().toISOString(),
    });
  }

  static getReport(): AvailabilityReport {
    const overallAvailability = this.slaTargets.length > 0
      ? this.slaTargets.reduce((sum, t) => sum + t.current, 0) / this.slaTargets.length
      : 0;

    const breached = this.slaTargets.filter(t => t.current < t.target).length;
    const status = breached > 1 ? 'critical' : breached === 1 ? 'warning' : 'ok';

    return {
      timestamp: new Date().toISOString(),
      slaTargets: this.slaTargets,
      uptimeRecords: this.uptimeRecords,
      overallAvailability: Math.round(overallAvailability * 100) / 100,
      status,
    };
  }

  static clear(): void {
    this.uptimeRecords = [];
  }
}
