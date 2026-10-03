export interface ScalingPolicy {
  service: string;
  minInstances: number;
  maxInstances: number;
  currentInstances: number;
  targetCpuPercent: number;
  targetMemoryPercent: number;
}

export interface ScalingDecision {
  service: string;
  action: 'scale_up' | 'scale_down' | 'no_change';
  currentInstances: number;
  targetInstances: number;
  reason: string;
  confidence: number;
}

export interface ScalingReport {
  timestamp: string;
  policies: ScalingPolicy[];
  decisions: ScalingDecision[];
  status: 'ok' | 'warning' | 'critical';
}

export class CapacityScalingService {
  private static policies: ScalingPolicy[] = [
    { service: 'api', minInstances: 2, maxInstances: 10, currentInstances: 4, targetCpuPercent: 70, targetMemoryPercent: 80 },
    { service: 'worker', minInstances: 1, maxInstances: 5, currentInstances: 2, targetCpuPercent: 75, targetMemoryPercent: 85 },
  ];

  static getReport(metrics?: { cpu: number; memory: number }): ScalingReport {
    const m = metrics || { cpu: 50, memory: 50 };

    const decisions: ScalingDecision[] = this.policies.map(policy => {
      let action: 'scale_up' | 'scale_down' | 'no_change' = 'no_change';
      let reason = 'Mevcut kapasite yeterli';
      let confidence = 0.5;

      if (m.cpu > policy.targetCpuPercent && policy.currentInstances < policy.maxInstances) {
        action = 'scale_up';
        reason = `CPU %${m.cpu} > hedef %${policy.targetCpuPercent}`;
        confidence = 0.9;
      } else if (m.cpu < policy.targetCpuPercent * 0.5 && policy.currentInstances > policy.minInstances) {
        action = 'scale_down';
        reason = `CPU %${m.cpu} < hedef %${policy.targetCpuPercent * 0.5}`;
        confidence = 0.7;
      }

      const targetInstances = action === 'scale_up'
        ? Math.min(policy.maxInstances, policy.currentInstances + 1)
        : action === 'scale_down'
          ? Math.max(policy.minInstances, policy.currentInstances - 1)
          : policy.currentInstances;

      return {
        service: policy.service,
        action,
        currentInstances: policy.currentInstances,
        targetInstances,
        reason,
        confidence,
      };
    });

    const hasScaleUp = decisions.some(d => d.action === 'scale_up');
    const status = hasScaleUp ? 'warning' : 'ok';

    return {
      timestamp: new Date().toISOString(),
      policies: this.policies,
      decisions,
      status,
    };
  }

  static clear(): void {
    this.policies = [];
  }
}
