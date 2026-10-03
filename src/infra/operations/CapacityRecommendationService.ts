export interface ResourceRecommendation {
  resource: 'cpu' | 'memory' | 'cache' | 'storage';
  current: number;
  recommended: number;
  reason: string;
  priority: 'low' | 'medium' | 'high';
}

export interface CapacityScenario {
  multiplier: number;
  label: string;
  estimatedLoad: number;
  recommendations: ResourceRecommendation[];
  status: 'ok' | 'warning' | 'critical';
}

export interface CapacityRecommendationReport {
  timestamp: string;
  scenarios: CapacityScenario[];
  overallRecommendation: string;
  status: 'ok' | 'warning' | 'critical';
}

export class CapacityRecommendationService {
  static generate(
    currentLoad: { cpu: number; memory: number; cache: number; storage: number } = {
      cpu: 0,
      memory: 44.58,
      cache: 85,
      storage: 1000,
    }
  ): CapacityRecommendationReport {
    const scenarios: CapacityScenario[] = [];

    const multipliers = [2, 5, 10];

    for (const m of multipliers) {
      const recommendations: ResourceRecommendation[] = [];

      // CPU
      const cpuRec = currentLoad.cpu * m;
      if (cpuRec > 70) {
        recommendations.push({
          resource: 'cpu',
          current: currentLoad.cpu,
          recommended: Math.round(cpuRec),
          reason: `${m}x yuk icin CPU artisi gerekli`,
          priority: cpuRec > 90 ? 'high' : 'medium',
        });
      }

      // Memory
      const memRec = currentLoad.memory * m;
      if (memRec > 70) {
        recommendations.push({
          resource: 'memory',
          current: currentLoad.memory,
          recommended: Math.round(memRec),
          reason: `${m}x yuk icin memory artisi gerekli`,
          priority: memRec > 90 ? 'high' : 'medium',
        });
      }

      // Cache
      const cacheRec = currentLoad.cache;
      if (m >= 5 && cacheRec < 90) {
        recommendations.push({
          resource: 'cache',
          current: currentLoad.cache,
          recommended: Math.min(100, cacheRec + 10),
          reason: `${m}x yuk icin cache optimizasyonu`,
          priority: 'medium',
        });
      }

      // Storage
      const storageRec = currentLoad.storage * m;
      if (storageRec > 5000) {
        recommendations.push({
          resource: 'storage',
          current: currentLoad.storage,
          recommended: Math.round(storageRec),
          reason: `${m}x yuk icin storage artisi gerekli`,
          priority: storageRec > 10000 ? 'high' : 'medium',
        });
      }

      const highPriority = recommendations.filter(r => r.priority === 'high').length;
      const status = highPriority > 0 ? 'critical'
        : recommendations.length > 0 ? 'warning' : 'ok';

      scenarios.push({
        multiplier: m,
        label: `${m}x`,
        estimatedLoad: Math.round(currentLoad.cpu * m),
        recommendations,
        status,
      });
    }

    const overallStatus = scenarios.some(s => s.status === 'critical') ? 'critical'
      : scenarios.some(s => s.status === 'warning') ? 'warning' : 'ok';

    const overallRecommendation = overallStatus === 'ok'
      ? 'Mevcut kapasite tum senaryolar icin yeterli'
      : overallStatus === 'warning'
        ? 'Orta vadede kapasite artisi planlanmali'
        : 'Acil kapasite artisi gerekli';

    return {
      timestamp: new Date().toISOString(),
      scenarios,
      overallRecommendation,
      status: overallStatus,
    };
  }
}
