export interface RecoveryObjective {
  rto: number;
  rpo: number;
  unit: 'minutes' | 'hours';
  tier: 'critical' | 'important' | 'standard';
}

export interface RecoveryReport {
  timestamp: string;
  objectives: Record<string, RecoveryObjective>;
  status: 'ok' | 'warning' | 'critical';
}

export class RecoveryObjectiveService {
  private static objectives: Record<string, RecoveryObjective> = {
    'nextjs-ui': { rto: 15, rpo: 5, unit: 'minutes', tier: 'critical' },
    'express-api': { rto: 30, rpo: 15, unit: 'minutes', tier: 'critical' },
    'redis-cache': { rto: 60, rpo: 60, unit: 'minutes', tier: 'important' },
    'postgres-db': { rto: 120, rpo: 30, unit: 'minutes', tier: 'critical' },
  };

  static getReport(): RecoveryReport {
    return {
      timestamp: new Date().toISOString(),
      objectives: this.objectives,
      status: 'ok',
    };
  }

  static getObjective(service: string): RecoveryObjective | undefined {
    return this.objectives[service];
  }
}
