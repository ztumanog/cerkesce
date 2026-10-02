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

  /**
   * TSV formatinda export eder (Tab-separated).
   */
  static exportNetworkTsv(network: GenericConceptNetworkDTO): string {
    const lines: string[] = [];
    lines.push('type\tid\tsource\ttarget\tlabel\trelationType');

    for (const node of network.nodes) {
      const label = (node.label || '').replace(/\t/g, ' ');
      lines.push(`node\t${node.id}\t\t\t${label}\t`);
    }

    for (const edge of network.edges) {
      const rel = edge.relationType || '';
      lines.push(`edge\t\t${edge.source}\t${edge.target}\t\t${rel}`);
    }

    return lines.join('\n');
  }

  /**
   * Pipe-separated format.
   */
  static exportNetworkPipe(network: GenericConceptNetworkDTO): string {
    const lines: string[] = [];
    lines.push('type|id|source|target|label|relationType');

    for (const node of network.nodes) {
      const label = (node.label || '').replace(/\|/g, '/');
      lines.push(`node|${node.id}|||${label}|`);
    }

    for (const edge of network.edges) {
      const rel = edge.relationType || '';
      lines.push(`edge||${edge.source}|${edge.target}||${rel}`);
    }

    return lines.join('\n');
  }
}