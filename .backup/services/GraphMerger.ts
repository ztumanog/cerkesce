// src/domain/discovery/services/GraphMerger.ts
export class GraphMerger {
  static merge(a: any, b: any) {
    return {
      nodes: [...(a.nodes || []), ...(b.nodes || [])],
      edges: [...(a.edges || []), ...(b.edges || [])]
    };
  }

  // presentation/components/NetworkExplorerPage.tsx bu imzayi kullaniyor:
  // GraphMerger.mergeNetworks(networkDTO, subGraphData, nodeId)
  static mergeNetworks(a: any, b: any, expandedNodeId: string) {
    const existingIds = new Set((a.nodes || []).map((n: any) => n.id));
    const newNodes = (b.nodes || []).filter((n: any) => !existingIds.has(n.id));
    const mergedNodes = (a.nodes || []).map((n: any) =>
      n.id === expandedNodeId ? { ...n, isExpanded: true } : n
    );

    return {
      nodes: [...mergedNodes, ...newNodes],
      edges: [...(a.edges || []), ...(b.edges || [])],
      metadata: { ...(a.metadata || {}), ...(b.metadata || {}) }
    };
  }
}