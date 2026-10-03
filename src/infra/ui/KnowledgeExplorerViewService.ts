import { PhaseStatusValidator } from '../governance/PhaseStatusValidator';
import { AdrValidator } from '../governance/AdrValidator';

export interface KnowledgeWidget {
  id: string;
  title: string;
  value: string;
  status: 'ok' | 'warning' | 'critical';
  details: string;
}

export interface KnowledgeExplorerView {
  timestamp: string;
  widgets: KnowledgeWidget[];
  overallStatus: 'ok' | 'warning' | 'critical';
  summary: string;
}

export class KnowledgeExplorerViewService {
  static getView(): KnowledgeExplorerView {
    const phaseResult = PhaseStatusValidator.validate();
    const adrResult = AdrValidator.validate();

    const phaseCount = phaseResult.phases.length;
    const adrCount = adrResult.totalIndexed;
    const inconsistencyCount = phaseResult.inconsistencies.length;

    const widgets: KnowledgeWidget[] = [
      {
        id: 'phase',
        title: 'Phase Nodes',
        value: `${phaseCount}`,
        status: phaseResult.status === 'ok' ? 'ok'
              : phaseResult.status === 'warning' ? 'warning' : 'critical',
        details: `${inconsistencyCount} tutarsizlik`,
      },
      {
        id: 'adr',
        title: 'ADR Nodes',
        value: `${adrCount}`,
        status: adrResult.status === 'ok' ? 'ok'
              : adrResult.status === 'warning' ? 'warning' : 'critical',
        details: `${adrResult.missing.length} eksik, ${adrResult.orphaned.length} yetim`,
      },
      {
        id: 'graph',
        title: 'Knowledge Graph',
        value: `${adrCount + phaseCount} node`,
        status: 'ok',
        details: `${inconsistencyCount} edge`,
      },
      {
        id: 'kb',
        title: 'Knowledge Base',
        value: `${phaseCount + adrCount} kayit`,
        status: inconsistencyCount === 0 ? 'ok' : 'warning',
        details: `${inconsistencyCount} incident, 0 solution`,
      },
    ];

    const statuses = widgets.map(w => w.status);
    const overallStatus = statuses.includes('critical') ? 'critical'
      : statuses.includes('warning') ? 'warning' : 'ok';

    const summary = overallStatus === 'ok'
      ? 'Bilgi katmani saglikli'
      : `${widgets.filter(w => w.status !== 'ok').length} widget uyari veriyor`;

    return {
      timestamp: new Date().toISOString(),
      widgets,
      overallStatus,
      summary,
    };
  }
}
