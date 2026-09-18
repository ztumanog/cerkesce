export interface ConceptNetworkNodeDTO {
  id: string;
  label: string;
  nodeType: 'ROOT' | 'CONCEPT';
  depth: number;
  score?: number;
  cluster?: string;
  isExpanded?: boolean;
}

export interface ConceptNetworkEdgeDTO {
  source: string;
  target: string;
  relationType: string;
  weight?: number;
}

export interface ConceptNetworkDTO {
  nodes: ConceptNetworkNodeDTO[];
  edges: ConceptNetworkEdgeDTO[];
  metadata: {
    nodeCount: number;
    edgeCount?: number;
    isTruncated?: boolean;
    rootConceptId?: string;
    [key: string]: any;
  };
}