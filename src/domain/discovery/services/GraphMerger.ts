import { ConceptNetworkDTO, ConceptNodeDTO, ConceptEdgeDTO } from '../dto/ConceptNetworkDTO';

export class GraphMerger {
  private static readonly MAX_NODES_CEILING = 500;

  /**
   * Merges an incoming concept network into an existing base network without duplicating nodes or edges.
   */
  public static mergeNetworks(
    base: ConceptNetworkDTO,
    incoming: ConceptNetworkDTO,
    expandedNodeId?: string
  ): ConceptNetworkDTO {
    if (!base) return incoming;
    if (!incoming) return base;

    const nodeMap = new Map<string, ConceptNodeDTO>();
    base.nodes.forEach((n) => nodeMap.set(n.id, { ...n }));

    // Genişletilen düğümü isExpanded = true olarak işaretle
    if (expandedNodeId && nodeMap.has(expandedNodeId)) {
      nodeMap.get(expandedNodeId)!.isExpanded = true;
    }

    // Mükerrer Olmayan Düğümleri Ekle
    let isTruncated = base.metadata.isTruncated || incoming.metadata.isTruncated;
    incoming.nodes.forEach((incomingNode) => {
      if (!nodeMap.has(incomingNode.id)) {
        if (nodeMap.size < this.MAX_NODES_CEILING) {
          nodeMap.set(incomingNode.id, { ...incomingNode });
        } else {
          isTruncated = true;
        }
      }
    });

    // Edge Deduplication Key: `${source}->${target}:${relationType}`
    const edgeMap = new Map<string, ConceptEdgeDTO>();
    const generateEdgeKey = (e: ConceptEdgeDTO) => `${e.source}->${e.target}:${e.relationType}`;

    base.edges.forEach((e) => edgeMap.set(generateEdgeKey(e), { ...e }));

    incoming.edges.forEach((incomingEdge) => {
      const key = generateEdgeKey(incomingEdge);
      // Sadece iki ucu da nodeMap'te var olan kenarları ekle
      if (!edgeMap.has(key) && nodeMap.has(incomingEdge.source) && nodeMap.has(incomingEdge.target)) {
        edgeMap.set(key, { ...incomingEdge });
      }
    });

    const mergedNodes = Array.from(nodeMap.values()).sort((a, b) => a.id.localeCompare(b.id));
    const mergedEdges = Array.from(edgeMap.values()).sort((a, b) => {
      const srcComp = a.source.localeCompare(b.source);
      return srcComp !== 0 ? srcComp : a.target.localeCompare(b.target);
    });

    return {
      nodes: mergedNodes,
      edges: mergedEdges,
      metadata: {
        ...base.metadata,
        nodeCount: mergedNodes.length,
        edgeCount: mergedEdges.length,
        isTruncated
      }
    };
  }
}
