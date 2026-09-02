export interface GraphNode {
  id: string;
  label: string;
}

export interface GraphEdge {
  source: string;
  target: string;
}

export interface OptimizedGraphChunkDTO {
  nodes: GraphNode[];
  edges: GraphEdge[];
  totalNodes: number;
  totalEdges: number;
  processingTimeMs: number;
}

export class LargeGraphOptimizerService {
  public static optimizeForViewport(
    rawNodes: GraphNode[],
    rawEdges: GraphEdge[],
    maxViewportNodes = 200
  ): OptimizedGraphChunkDTO {
    const startTime = performance.now();

    const degreeMap = new Map<string, number>();
    rawNodes.forEach(n => degreeMap.set(n.id, 0));
    rawEdges.forEach(e => {
      degreeMap.set(e.source, (degreeMap.get(e.source) || 0) + 1);
      degreeMap.set(e.target, (degreeMap.get(e.target) || 0) + 1);
    });

    const sortedNodes = [...rawNodes].sort(
      (a, b) => (degreeMap.get(b.id) || 0) - (degreeMap.get(a.id) || 0)
    );

    const visibleNodes = sortedNodes.slice(0, maxViewportNodes);
    const visibleNodeIds = new Set(visibleNodes.map(n => n.id));

    const visibleEdges = rawEdges.filter(
      e => visibleNodeIds.has(e.source) && visibleNodeIds.has(e.target)
    );

    const endTime = performance.now();

    return {
      nodes: visibleNodes,
      edges: visibleEdges,
      totalNodes: rawNodes.length,
      totalEdges: rawEdges.length,
      processingTimeMs: endTime - startTime
    };
  }
}