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
    const elements: CytoscapeElement[] = [];

    if (!dto || !dto.nodes) return elements;

    dto.nodes.forEach((node) => {
      const expandedClass = node.isExpanded ? 'node-expanded' : 'node-collapsed';
      elements.push({
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
        classes: `node-type-${node.nodeType.toLowerCase()} node-depth-${node.depth} cluster-${node.cluster || 'default'} ${expandedClass}`
      });
    });

    dto.edges.forEach((edge, index) => {
      elements.push({
        group: 'edges',
        data: {
          id: `edge-${edge.source}-${edge.target}-${index}`,
          source: edge.source,
          target: edge.target,
          relationType: edge.relationType,
          weight: edge.weight
        },
        classes: `edge-relation-${edge.relationType.toLowerCase()}`
      });
    });

    return elements;
  }
}
