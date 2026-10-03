import { UsageIntelligenceService } from './UsageIntelligenceService';
import { CapacityForecastingService } from './CapacityForecastingService';
import { OperationalAnalyticsService } from './OperationalAnalyticsService';
import { GovernanceAnalyticsService } from './GovernanceAnalyticsService';

export interface DecisionSupportDashboard {
  timestamp: string;
  status: 'ok' | 'warning' | 'critical';
  usage: {
    totalSearches: number;
    uniqueQueries: number;
    topQueries: Array<{ query: string; count: number }>;
    zeroResultRate: number;
  };
  capacity: ReturnType<typeof CapacityForecastingService.forecast>;
  operational: ReturnType<typeof OperationalAnalyticsService.getReport>;
  governance: ReturnType<typeof GovernanceAnalyticsService.getReport>;
  recommendations: string[];
}

export class DecisionSupportService {
  private static usageService = new UsageIntelligenceService();

  static getDashboard(): DecisionSupportDashboard {
    const usageSummary = this.usageService.getSummary();
    const capacity = CapacityForecastingService.forecast();
    const operational = OperationalAnalyticsService.getReport();
    const governance = GovernanceAnalyticsService.getReport();

    const statuses = [capacity.status, operational.status, governance.status];
    const status = statuses.includes('critical') ? 'critical'
      : statuses.includes('warning') ? 'warning' : 'ok';

    const recommendations: string[] = [];
    if (capacity.status !== 'ok') recommendations.push('Kapasite planlamasi yapilmali');
    if (operational.status !== 'ok') recommendations.push('Operasyonel metrikler izlenmeli');
    if (governance.status !== 'ok') recommendations.push('Yonetisim metrikleri gozden gecirilmeli');
    if (recommendations.length === 0) recommendations.push('Tum sistemler saglikli');

    return {
      timestamp: new Date().toISOString(),
      status,
      usage: {
        totalSearches: usageSummary.totalSearches,
        uniqueQueries: usageSummary.uniqueQueries,
        topQueries: usageSummary.topQueries,
        zeroResultRate: usageSummary.zeroResultRate,
      },
      capacity,
      operational,
      governance,
      recommendations,
    };
  }
}
