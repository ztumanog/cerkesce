/**
 * CsvExporterService
 * Phase 7.0.5: Reporting
 *
 * CSV export:
 * - Network -> CSV
 * - Node listesi
 * - Edge listesi
 */

import { GenericConceptNetworkDTO } from './ExportEngineService';

export class CsvExporterService {
  /**
   * Network'u CSV olarak export eder.
   */
  static exportNetwork(network: GenericConceptNetworkDTO): string {
    const lines: string[] = [];

    // Header
    lines.push('type,id,source,target,label,relationType');

    // Nodes
    for (const node of network.nodes) {
      const label = (node.label || '').replace(/,/g, ';');
      lines.push(`node,${node.id},,,${label},`);
    }

    // Edges
    for (const edge of network.edges) {
      const rel = edge.relationType || '';
      lines.push(`edge,,${edge.source},${edge.target},,${rel}`);
    }

    return lines.join('\n');
  }

  /**
   * Sadece dugumleri CSV olarak export eder.
   */
  static exportNodes(network: GenericConceptNetworkDTO): string {
    const lines: string[] = ['id,label'];

    for (const node of network.nodes) {
      const label = (node.label || '').replace(/,/g, ';');
      lines.push(`${node.id},${label}`);
    }

    return lines.join('\n');
  }

  /**
   * Sadece kenarlari CSV olarak export eder.
   */
  static exportEdges(network: GenericConceptNetworkDTO): string {
    const lines: string[] = ['source,target,relationType'];

    for (const edge of network.edges) {
      const rel = edge.relationType || '';
      lines.push(`${edge.source},${edge.target},${rel}`);
    }

    return lines.join('\n');
  }
}
