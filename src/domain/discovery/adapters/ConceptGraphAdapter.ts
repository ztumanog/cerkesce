export interface CanonicalNetworkNode {
  id: string;
  label?: string;
  nodeType?: string;
  [key: string]: any;
}

export interface CanonicalNetworkEdge {
  source: string;
  target: string;
  relationType?: string;
  [key: string]: any;
}

export interface CanonicalNetworkDTO {
  nodes: CanonicalNetworkNode[];
  edges: CanonicalNetworkEdge[];
  metadata: {
    nodeCount: number;
    edgeCount: number;
    isTruncated: boolean;
    rootConceptId?: string;
    [key: string]: any;
  };
}

export class ConceptGraphAdapter {
  public static toCanonicalNetwork(discoveryResult: any): CanonicalNetworkDTO {
    // TODO: DiscoveryResultDTO'dan gercek node/edge listesi uretimi henuz
    // yazilmadi. Su an rootConceptId'yi kok node, relatedConcepts'i duz
    // node listesine ceviren minimal bir stub.
    const rootId = discoveryResult?.rootConceptId || discoveryResult?.conceptId || 'ROOT';
    const related = discoveryResult?.relatedConcepts || [];

    const nodes: CanonicalNetworkNode[] = [
      { id: rootId, nodeType: 'ROOT', label: rootId },
      ...related.map((r: any) => ({
        id: r.conceptId,
        nodeType: r.relationType || 'RELATED',
        label: r.conceptId
      }))
    ];

    const edges: CanonicalNetworkEdge[] = related.map((r: any) => ({
      source: r.parentConceptId || rootId,
      target: r.conceptId,
      relationType: r.relationType
    }));

    return {
      nodes,
      edges,
      metadata: {
        nodeCount: nodes.length,
        edgeCount: edges.length,
        isTruncated: false,
        rootConceptId: rootId
      }
    };
  }
}