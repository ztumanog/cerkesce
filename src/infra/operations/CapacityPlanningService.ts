import os from 'os';

export interface CapacityMetrics {
  timestamp: string;
  cpu: { cores: number; loadAvg: number[]; usagePercent: number };
  memory: { totalMB: number; freeMB: number; usedMB: number; usagePercent: number };
  uptime: { seconds: number; hours: number };
  status: 'ok' | 'warning' | 'critical';
}

export interface GrowthScenario {
  multiplier: number;
  label: string;
  estimatedCpuPercent: number;
  estimatedMemoryPercent: number;
  estimatedRps: number;
  status: 'ok' | 'warning' | 'critical';
}

export interface BottleneckAnalysis {
  layer: string;
  currentLoad: string;
  threshold: string;
  status: 'ok' | 'warning' | 'critical';
  notes: string;
}

export interface CapacityReport {
  timestamp: string;
  current: CapacityMetrics;
  growthScenarios: GrowthScenario[];
  bottlenecks: BottleneckAnalysis[];
  recommendations: string[];
}

export class CapacityPlanningService {
  static getMetrics(): CapacityMetrics {
    const cpus = os.cpus();
    const totalMem = os.totalmem();
    const freeMem = os.freemem();
    const usedMem = totalMem - freeMem;
    const loadAvg = os.loadavg();

    const memUsagePercent = (usedMem / totalMem) * 100;
    const cpuUsagePercent = (loadAvg[0] / cpus.length) * 100;

    let status: 'ok' | 'warning' | 'critical' = 'ok';
    if (memUsagePercent > 90 || cpuUsagePercent > 90) status = 'critical';
    else if (memUsagePercent > 70 || cpuUsagePercent > 70) status = 'warning';

    return {
      timestamp: new Date().toISOString(),
      cpu: { cores: cpus.length, loadAvg, usagePercent: Math.round(cpuUsagePercent * 100) / 100 },
      memory: {
        totalMB: Math.round(totalMem / 1024 / 1024),
        freeMB: Math.round(freeMem / 1024 / 1024),
        usedMB: Math.round(usedMem / 1024 / 1024),
        usagePercent: Math.round(memUsagePercent * 100) / 100,
      },
      uptime: { seconds: Math.round(os.uptime()), hours: Math.round(os.uptime() / 3600 * 100) / 100 },
      status,
    };
  }

  static getGrowthScenarios(baseRps = 100): GrowthScenario[] {
    const current = this.getMetrics();
    const baseCpu = current.cpu.usagePercent;
    const baseMem = current.memory.usagePercent;

    const scenarios = [
      { multiplier: 1, label: 'Bugun' },
      { multiplier: 2, label: '2x' },
      { multiplier: 5, label: '5x' },
      { multiplier: 10, label: '10x' },
    ];

    return scenarios.map(s => {
      const estCpu = Math.min(100, baseCpu * s.multiplier);
      const estMem = Math.min(100, baseMem * s.multiplier);
      let status: 'ok' | 'warning' | 'critical' = 'ok';
      if (estCpu > 90 || estMem > 90) status = 'critical';
      else if (estCpu > 70 || estMem > 70) status = 'warning';

      return {
        multiplier: s.multiplier,
        label: s.label,
        estimatedCpuPercent: Math.round(estCpu * 100) / 100,
        estimatedMemoryPercent: Math.round(estMem * 100) / 100,
        estimatedRps: baseRps * s.multiplier,
        status,
      };
    });
  }

  static getBottlenecks(): BottleneckAnalysis[] {
    return [
      { layer: 'Auth Middleware', currentLoad: 'Low', threshold: '1000 req/s', status: 'ok', notes: 'JWT validation hizli' },
      { layer: 'Caching', currentLoad: 'Low', threshold: '10000 ops/s', status: 'ok', notes: 'Redis kapasitesi yeterli' },
      { layer: 'Metrics', currentLoad: 'Medium', threshold: '5000 req/s', status: 'warning', notes: 'Prometheus scrape interval 15s' },
      { layer: 'Logging', currentLoad: 'Medium', threshold: '2000 req/s', status: 'warning', notes: 'JSON log I/O siniri' },
    ];
  }

  static getFullReport(): CapacityReport {
    const current = this.getMetrics();
    const growthScenarios = this.getGrowthScenarios();
    const bottlenecks = this.getBottlenecks();

    const recommendations: string[] = [];
    if (current.memory.usagePercent > 60) {
      recommendations.push('Memory kullanimi yuksek - horizontal scaling dusunulmeli');
    }
    if (bottlenecks.some(b => b.status === 'warning')) {
      recommendations.push('Logging ve Metrics katmanlari izlenmeli');
    }
    recommendations.push('Cache hit ratio olculmeli');
    recommendations.push('Database connection pool izlenmeli');

    return { timestamp: new Date().toISOString(), current, growthScenarios, bottlenecks, recommendations };
  }
}
