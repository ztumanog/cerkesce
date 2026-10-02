import os from 'os';

export interface CapacityMetrics {
  timestamp: string;
  cpu: {
    cores: number;
    loadAvg: number[];
    usagePercent: number;
  };
  memory: {
    totalMB: number;
    freeMB: number;
    usedMB: number;
    usagePercent: number;
  };
  uptime: {
    seconds: number;
    hours: number;
  };
  status: 'ok' | 'warning' | 'critical';
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
      cpu: {
        cores: cpus.length,
        loadAvg,
        usagePercent: Math.round(cpuUsagePercent * 100) / 100,
      },
      memory: {
        totalMB: Math.round(totalMem / 1024 / 1024),
        freeMB: Math.round(freeMem / 1024 / 1024),
        usedMB: Math.round(usedMem / 1024 / 1024),
        usagePercent: Math.round(memUsagePercent * 100) / 100,
      },
      uptime: {
        seconds: Math.round(os.uptime()),
        hours: Math.round(os.uptime() / 3600 * 100) / 100,
      },
      status,
    };
  }
}
