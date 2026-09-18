/**
 * File: src/adapters/CytoscapeAdapter.ts
 * Generated: 2026-09-18
 * Layer: Adapter
 */

import { ConceptNetworkDTO } from '../../domain/discovery/dto/ConceptNetworkDTO';

export interface CytoscapeNodeData {
  id: string;
  label: string;
  nodeType: 'ROOT' | 'CONCEPT';
  depth: number;
  score?: number;
  cluster?: string;
  isExpanded?: boolean;
}

export interface CytoscapeEdgeData {
  id: string;
  source: string;
  target: string;
  relationType: string;
  weight?: number;
}

export interface CytoscapeElement {
  group: 'nodes' | 'edges';
  data: CytoscapeNodeData | CytoscapeEdgeData;
  classes?: string;
}

export class CytoscapeAdapter {
  public static toCytoscapeElements(dto: ConceptNetworkDTO): CytoscapeElement[] {
    if (!dto) return [];

    const nodes: CytoscapeElement[] = (dto.nodes || []).map((node) => {
      const expandedClass = node.isExpanded ? 'node-expanded' : 'node-collapsed';
      const safeNodeType = (node.nodeType || 'CONCEPT').toLowerCase();
      const safeCluster = node.cluster ?? 'default';

      return {
        group: 'nodes',
        data: {
          id: node.id,
          label: node.isExpanded ? `▼ ${node.label}` : node.label,
          nodeType: node.nodeType,
          depth: node.depth,
          score: node.score,
          cluster: node.cluster,
          isExpanded: node.isExpanded
        },
        classes: `node-type-${safeNodeType} node-depth-${node.depth} cluster-${safeCluster} ${expandedClass}`
      };
    });

    const edges: CytoscapeElement[] = (dto.edges || []).map((edge, index) => {
      const safeRelation = (edge.relationType || 'default').toLowerCase();

      return {
        group: 'edges',
        data: {
          id: `edge-${edge.source}-${edge.target}-${index}`,
          source: edge.source,
          target: edge.target,
          relationType: edge.relationType,
          weight: edge.weight
        },
        classes: `edge-relation-${safeRelation}`
      };
    });

    return [...nodes, ...edges];
  }
}