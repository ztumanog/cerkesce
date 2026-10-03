export interface Region {
  id: string;
  name: string;
  status: 'active' | 'standby' | 'inactive';
  latencyMs: number;
  healthScore: number;
}

export interface RegionReadiness {
  regionId: string;
  ready: boolean;
  checks: {
    name: string;
    passed: boolean;
    details: string;
  }[];
  overallScore: number;
}

export interface MultiRegionReport {
  timestamp: string;
  regions: Region[];
  readiness: RegionReadiness[];
  activeRegions: number;
  readyRegions: number;
  status: 'ok' | 'warning' | 'critical';
}

export class MultiRegionReadinessService {
  private static regions: Region[] = [
    { id: 'eu-west-1', name: 'EU West', status: 'active', latencyMs: 50, healthScore: 95 },
    { id: 'us-east-1', name: 'US East', status: 'standby', latencyMs: 120, healthScore: 85 },
    { id: 'ap-south-1', name: 'AP South', status: 'inactive', latencyMs: 200, healthScore: 60 },
  ];

  static getReport(): MultiRegionReport {
    const readiness: RegionReadiness[] = this.regions.map(region => {
      const checks = [
        { name: 'Health', passed: region.healthScore >= 80, details: `Score: ${region.healthScore}` },
        { name: 'Latency', passed: region.latencyMs <= 150, details: `${region.latencyMs}ms` },
        { name: 'Status', passed: region.status !== 'inactive', details: region.status },
      ];

      const passedCount = checks.filter(c => c.passed).length;
      const overallScore = Math.round((passedCount / checks.length) * 100);

      return {
        regionId: region.id,
        ready: overallScore >= 67,
        checks,
        overallScore,
      };
    });

    const activeRegions = this.regions.filter(r => r.status === 'active').length;
    const readyRegions = readiness.filter(r => r.ready).length;

    const status = readyRegions === this.regions.length ? 'ok'
      : readyRegions > 0 ? 'warning' : 'critical';

    return {
      timestamp: new Date().toISOString(),
      regions: this.regions,
      readiness,
      activeRegions,
      readyRegions,
      status,
    };
  }

  static clear(): void {
    this.regions = [];
  }
}
