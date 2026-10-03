export interface FederatedGovernance {
  platformId: string;
  adrCount: number;
  phaseCount: number;
  complianceScore: number;
  lastAudit: string;
  status: 'ok' | 'warning' | 'critical';
}

export interface FederationAudit {
  timestamp: string;
  platforms: FederatedGovernance[];
  averageCompliance: number;
  bestPlatform: string;
  worstPlatform: string;
  status: 'ok' | 'warning' | 'critical';
}

export class GovernanceFederationService {
  private static platforms: Map<string, FederatedGovernance> = new Map();

  static register(platform: Omit<FederatedGovernance, 'lastAudit'>): FederatedGovernance {
    const newPlatform: FederatedGovernance = {
      ...platform,
      lastAudit: new Date().toISOString(),
    };
    this.platforms.set(platform.platformId, newPlatform);
    return newPlatform;
  }

  static audit(): FederationAudit {
    const platforms = Array.from(this.platforms.values());

    if (platforms.length === 0) {
      return {
        timestamp: new Date().toISOString(),
        platforms: [],
        averageCompliance: 0,
        bestPlatform: '',
        worstPlatform: '',
        status: 'warning',
      };
    }

    const averageCompliance = platforms.reduce((sum, p) => sum + p.complianceScore, 0) / platforms.length;
    const sorted = [...platforms].sort((a, b) => b.complianceScore - a.complianceScore);
    const bestPlatform = sorted[0].platformId;
    const worstPlatform = sorted[sorted.length - 1].platformId;

    const criticalCount = platforms.filter(p => p.status === 'critical').length;
    const warningCount = platforms.filter(p => p.status === 'warning').length;

    const status = criticalCount > 0 ? 'critical'
      : warningCount > 0 ? 'warning' : 'ok';

    return {
      timestamp: new Date().toISOString(),
      platforms,
      averageCompliance: Math.round(averageCompliance * 100) / 100,
      bestPlatform,
      worstPlatform,
      status,
    };
  }

  static clear(): void {
    this.platforms.clear();
  }
}
