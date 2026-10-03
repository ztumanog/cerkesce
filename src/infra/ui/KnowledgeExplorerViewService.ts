import { ArchitectureKnowledgeGraphService } from '../knowledge/ArchitectureKnowledgeGraphService';
import { OperationalKnowledgeBaseService } from '../knowledge/OperationalKnowledgeBaseService';

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
    const graph = ArchitectureKnowledgeGraphService.getReport();
    const kb = OperationalKnowledgeBaseService.getReport();

    const widgets: KnowledgeWidget[] = [
      {
        id: 'graph',
        title: 'Knowledge Graph',
        value: `${graph.nodes.length} node`,
        status: graph.status === 'ok' ? 'ok' : graph.status === 'warning' ? 'warning' : 'critical',
        details: `${graph.edges.length} edge`,
      },
      {
        id: 'kb',
        title: 'Knowledge Base',
        value: `${kb.totalEntries} kayit`,
        status: kb.status === 'ok' ? 'ok' : kb.status === 'warning' ? 'warning' : 'critical',
        details: `${kb.byType.incident} incident, ${kb.byType.solution} solution`,
      },
      {
        id: 'adr',
        title: 'ADR Nodes',
        value: `${graph.stats.adr}`,
        status: graph.stats.adr > 0 ? 'ok' : 'warning',
        details: 'ADR dugumleri',
      },
      {
        id: 'phase',
        title: 'Phase Nodes',
        value: `${graph.stats.phase}`,
        status: graph.stats.phase > 0 ? 'ok' : 'warning',
        details: 'Faz dugumleri',
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
