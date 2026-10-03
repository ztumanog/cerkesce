import { AvailabilityEngineeringService } from './AvailabilityEngineeringService';
import { ErrorBudgetManagementService } from './ErrorBudgetManagementService';
import { FailureAnalyticsService } from './FailureAnalyticsService';
import { ServiceDependencyMappingService } from './ServiceDependencyMappingService';

export interface ReliabilityInsight {
  area: string;
  insight: string;
  priority: 'low' | 'medium' | 'high';
  action: string;
}

export interface ReliabilityDashboard {
  timestamp: string;
  status: 'ok' | 'warning' | 'critical';
  availability: ReturnType<typeof AvailabilityEngineeringService.getReport>;
  errorBudget: ReturnType<typeof ErrorBudgetManagementService.getReport>;
  failures: ReturnType<typeof FailureAnalyticsService.getReport>;
  dependencies: ReturnType<typeof ServiceDependencyMappingService.getReport>;
  insights: ReliabilityInsight[];
  summary: string;
}

export class ReliabilityDashboardService {
  static getDashboard(): ReliabilityDashboard {
    const availability = AvailabilityEngineeringService.getReport();
    const errorBudget = ErrorBudgetManagementService.getReport();
    const failures = FailureAnalyticsService.getReport();
    const dependencies = ServiceDependencyMappingService.getReport();

    const insights: ReliabilityInsight[] = [];

    if (availability.status !== 'ok') {
      insights.push({
        area: 'Availability',
        insight: `Ortalama erisilebilirlik: %${availability.overallAvailability}`,
        priority: availability.status === 'critical' ? 'high' : 'medium',
        action: 'SLA ihlallerini inceleyin',
      });
    }

    if (errorBudget.status !== 'ok') {
      insights.push({
        area: 'ErrorBudget',
        insight: `Butce tuketimi: ${errorBudget.totalConsumed}/${errorBudget.totalBudget}`,
        priority: errorBudget.status === 'critical' ? 'high' : 'medium',
        action: 'Hata butcesini kontrol edin',
      });
    }

    if (failures.bySeverity.critical > 0) {
      insights.push({
        area: 'Failures',
        insight: `${failures.bySeverity.critical} kritik ariza`,
        priority: 'high',
        action: 'Kritik arizalari giderin',
      });
    }

    if (dependencies.status !== 'ok') {
      insights.push({
        area: 'Dependencies',
        insight: `${dependencies.nodes.length} servis, ${dependencies.criticalPaths.length} kritik yol`,
        priority: dependencies.status === 'critical' ? 'high' : 'medium',
        action: 'Servis bagimliliklarini kontrol edin',
      });
    }

    const statuses = [availability.status, errorBudget.status, failures.status, dependencies.status];
    const status = statuses.includes('critical') ? 'critical'
      : statuses.includes('warning') ? 'warning' : 'ok';

    const summary = status === 'ok'
      ? 'Platform guvenilirligi saglikli'
      : `${insights.length} guvenilirlik icgorusu mevcut`;

    return {
      timestamp: new Date().toISOString(),
      status,
      availability,
      errorBudget,
      failures,
      dependencies,
      insights,
      summary,
    };
  }
}
