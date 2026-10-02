export class GraphMerger {
  static merge(a: any, b: any) {
    return {
      nodes: [...(a.nodes || []), ...(b.nodes || [])],
      edges: [...(a.edges || []), ...(b.edges || [])]
    };
  }

  static mergeNetworks(a: any, b: any, expandedNodeId: string) {
    const MAX_NODES = 500;

    // 1. Node merge (duplicate onleme)
    const existingIds = new Set((a.nodes || []).map((n: any) => n.id));
    const newNodes = (b.nodes || []).filter((n: any) => !existingIds.has(n.id));
    const mergedNodes = (a.nodes || []).map((n: any) =>
      n.id === expandedNodeId ? { ...n, isExpanded: true } : n
    );

    let allNodes = [...mergedNodes, ...newNodes];
    let isTruncated = false;

    // 2. Guardrail: 500 node siniri
    if (allNodes.length > MAX_NODES) {
      allNodes = allNodes.slice(0, MAX_NODES);
      isTruncated = true;
    }

    // 3. Edge merge (duplicate onleme)
    const allEdges = [...(a.edges || []), ...(b.edges || [])];
    const seenEdges = new Set<string>();
    const uniqueEdges = allEdges.filter((e: any) => {
      const key = `${e.source}|${e.target}|${e.relationType || e.type || ''}`;
      if (seenEdges.has(key)) return false;
      seenEdges.add(key);
      return true;
    });

    return {
      nodes: allNodes,
      edges: uniqueEdges,
      metadata: {
        ...(a.metadata || {}),
        ...(b.metadata || {}),
        isTruncated: isTruncated || (a.metadata?.isTruncated || false),
      },
    };
  }
}
