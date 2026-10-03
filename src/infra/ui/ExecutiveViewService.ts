import { GovernanceDashboardViewService } from './GovernanceDashboardViewService';
import { OperationsDashboardViewService } from './OperationsDashboardViewService';
import { IntelligenceDashboardViewService } from './IntelligenceDashboardViewService';
import { KnowledgeExplorerViewService } from './KnowledgeExplorerViewService';

export interface ExecutiveWidget {
  id: string;
  title: string;
  value: string;
  status: 'ok' | 'warning' | 'critical';
  details: string;
}

export interface ExecutiveView {
  timestamp: string;
  widgets: ExecutiveWidget[];
  overallStatus: 'ok' | 'warning' | 'critical';
  summary: string;
  totalWidgets: number;
}

export class ExecutiveViewService {
  static getView(): ExecutiveView {
    const gov = GovernanceDashboardViewService.getView();
    const ops = OperationsDashboardViewService.getView();
    const intel = IntelligenceDashboardViewService.getView();
    const knowledge = KnowledgeExplorerViewService.getView();

    const widgets: ExecutiveWidget[] = [
      {
        id: 'governance',
        title: 'Governance',
        value: gov.overallStatus.toUpperCase(),
        status: gov.overallStatus,
        details: gov.summary,
      },
      {
        id: 'operations',
        title: 'Operations',
        value: ops.overallStatus.toUpperCase(),
        status: ops.overallStatus,
        details: ops.summary,
      },
      {
        id: 'intelligence',
        title: 'Intelligence',
        value: intel.overallStatus.toUpperCase(),
        status: intel.overallStatus,
        details: intel.summary,
      },
      {
        id: 'knowledge',
        title: 'Knowledge',
        value: knowledge.overallStatus.toUpperCase(),
        status: knowledge.overallStatus,
        details: knowledge.summary,
      },
    ];

    const statuses = widgets.map(w => w.status);
    const overallStatus = statuses.includes('critical') ? 'critical'
      : statuses.includes('warning') ? 'warning' : 'ok';

    const summary = overallStatus === 'ok'
      ? 'Tum sistemler saglikli'
      : `${widgets.filter(w => w.status !== 'ok').length} alan uyari veriyor`;

    return {
      timestamp: new Date().toISOString(),
      widgets,
      overallStatus,
      summary,
      totalWidgets: widgets.length,
    };
  }
}
