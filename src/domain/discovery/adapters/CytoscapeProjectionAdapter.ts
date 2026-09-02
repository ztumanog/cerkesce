import { ConceptNetworkDTO } from '../dto/ConceptNetworkDTO';

export interface CytoscapeNodeData {
  id: string;
  label: string;
  score?: number;
  cluster?: string;
}

export interface CytoscapeEdgeData {
  source: string;
  target: string;
  relationType: string;
  weight?: number;
}

export interface CytoscapeNodeElement {
  data: CytoscapeNodeData;
}

export interface CytoscapeEdgeElement {
  data: CytoscapeEdgeData;
}

export interface CytoscapeGraphDTO {
  nodes: CytoscapeNodeElement[];
  edges: CytoscapeEdgeElement[];
}

export class CytoscapeProjectionAdapter {
  public static toCytoscapeFormat(network: ConceptNetworkDTO): CytoscapeGraphDTO {
    return {
      nodes: network.nodes.map(n => ({
        data: {
          id: n.id,
          label: n.label,
          score: n.score,
          cluster: n.cluster
        }
      })),
      edges: network.edges.map(e => ({
        data: {
          source: e.source,
          target: e.target,
          relationType: e.relationType,
          weight: e.weight
        }
      }))
    };
  }
}