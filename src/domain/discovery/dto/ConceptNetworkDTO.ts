export enum DiscoveryRelationType {
  STATE_OF = "STATE_OF",
  LOCATION_OF = "LOCATION_OF",
  PART_OF = "PART_OF",
  COMPOSITION_OF = "COMPOSITION_OF",
  RELATED = "RELATED",
  PROPERTY_OF = "PROPERTY_OF",
}

export type NodeType = "ROOT" | "CONCEPT";

export interface ConceptNodeDTO {
  id: string;
  label: string;
  nodeType: NodeType;
  depth: number;
  score?: number;
  cluster?: string;
  isExpanded?: boolean;
}

export interface ConceptEdgeDTO {
  source: string;
  target: string;
  relationType: DiscoveryRelationType | string;
  weight?: number;
}

export interface ConceptNetworkMetadata {
  rootConceptId: string;
  generatedAt: string;
  nodeCount: number;
  edgeCount: number;
  schemaVersion: string;
  isDirected: boolean;
  isTruncated: boolean;
}

export interface ConceptNetworkDTO {
  nodes: ConceptNodeDTO[];
  edges: ConceptEdgeDTO[];
  metadata: ConceptNetworkMetadata;
}
