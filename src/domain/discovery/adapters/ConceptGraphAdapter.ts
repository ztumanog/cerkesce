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
    schemaVersion: string;
    isDirected: boolean;
    nodeCount: number;
    edgeCount: number;
    isTruncated: boolean;
    rootConceptId?: string;
    [key: string]: any;
  };
}

export class ConceptGraphAdapter {
  public static toCanonicalNetwork(discoveryResult: any): CanonicalNetworkDTO {
    const rootId = discoveryResult?.rootConceptId || discoveryResult?.conceptId || 'ROOT';
    const related = discoveryResult?.relatedConcepts || discoveryResult?.rankedRelatedConcepts || [];
    const clusterByConceptId = new Map<string, string>();

    for (const cluster of discoveryResult?.contextClusters || []) {
      const clusterId = String(cluster.clusterId || cluster.id || cluster.name || '');
      for (const concept of cluster.concepts || cluster.items || []) {
        const conceptId = typeof concept === 'string' ? concept : concept?.conceptId || concept?.id;
        if (conceptId) clusterByConceptId.set(conceptId, clusterId);
      }
    }

    const nodes: CanonicalNetworkNode[] = [
      {
        id: rootId,
        nodeType: 'ROOT',
        label: discoveryResult?.canonicalName || rootId,
        depth: 0,
      },
      ...related.map((r: any) => ({
        id: r.conceptId,
        nodeType: 'CONCEPT',
        label: r.label || r.displayName || r.conceptId,
        depth: r.depth ?? 1,
        ...(typeof r.score === 'number' ? { score: r.score } : {}),
        ...(clusterByConceptId.has(r.conceptId) ? { cluster: clusterByConceptId.get(r.conceptId) } : {}),
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
        schemaVersion: '1.0.0',
        isDirected: true,
        nodeCount: nodes.length,
        edgeCount: edges.length,
        isTruncated: false,
        rootConceptId: rootId
      }
    };
  }
}