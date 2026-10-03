import { CapacityPlanningService } from './CapacityPlanningService';
import { SlaSloService } from './SlaSloService';
import { IncidentManagementService } from './IncidentManagementService';
import { AuditComplianceService } from './AuditComplianceService';
import { GovernanceDashboardService } from '../governance/GovernanceDashboardService';

export interface OperationalIntelligence {
  timestamp: string;
  status: 'ok' | 'warning' | 'critical';
  capacity: ReturnType<typeof CapacityPlanningService.getMetrics>;
  slo: ReturnType<typeof SlaSloService.getReport>;
  incidents: ReturnType<typeof IncidentManagementService.getReport>;
  audit: ReturnType<typeof AuditComplianceService.audit>;
  governance: ReturnType<typeof GovernanceDashboardService.getDashboard>;
}

export class OperationalIntelligenceService {
  static getDashboard(): OperationalIntelligence {
    const capacity = CapacityPlanningService.getMetrics();
    const slo = SlaSloService.getReport();
    const incidents = IncidentManagementService.getReport();
    const audit = AuditComplianceService.audit();
    const governance = GovernanceDashboardService.getDashboard();

    const statuses = [capacity.status, slo.status, audit.status, governance.status];
    const status = statuses.includes('critical') ? 'critical'
      : statuses.includes('warning') ? 'warning' : 'ok';

    return {
      timestamp: new Date().toISOString(),
      status,
      capacity,
      slo,
      incidents,
      audit,
      governance,
    };
  }
}
