export interface GraphNode {
  id: string;
  type: 'adr' | 'phase' | 'service' | 'test';
  label: string;
  metadata?: Record<string, unknown>;
}

export interface GraphEdge {
  from: string;
  to: string;
  relation: 'implements' | 'documents' | 'tests' | 'depends_on';
}

export interface KnowledgeGraphReport {
  timestamp: string;
  nodes: GraphNode[];
  edges: GraphEdge[];
  stats: {
    adr: number;
    phase: number;
    service: number;
    test: number;
  };
  status: 'ok' | 'warning' | 'critical';
}

export class ArchitectureKnowledgeGraphService {
  private static nodes: Map<string, GraphNode> = new Map();
  private static edges: GraphEdge[] = [];

  static addNode(node: GraphNode): void {
    this.nodes.set(node.id, node);
  }

  static addEdge(edge: GraphEdge): void {
    this.edges.push(edge);
  }

  static getNode(id: string): GraphNode | undefined {
    return this.nodes.get(id);
  }

  static getNeighbors(id: string): GraphNode[] {
    const neighbors: GraphNode[] = [];
    for (const edge of this.edges) {
      if (edge.from === id) {
        const n = this.nodes.get(edge.to);
        if (n) neighbors.push(n);
      }
      if (edge.to === id) {
        const n = this.nodes.get(edge.from);
        if (n) neighbors.push(n);
      }
    }
    return neighbors;
  }

  static getReport(): KnowledgeGraphReport {
    const allNodes = Array.from(this.nodes.values());
    const stats = {
      adr: allNodes.filter(n => n.type === 'adr').length,
      phase: allNodes.filter(n => n.type === 'phase').length,
      service: allNodes.filter(n => n.type === 'service').length,
      test: allNodes.filter(n => n.type === 'test').length,
    };

    const status = allNodes.length === 0 ? 'warning'
      : this.edges.length === 0 ? 'warning' : 'ok';

    return {
      timestamp: new Date().toISOString(),
      nodes: allNodes,
      edges: [...this.edges],
      stats,
      status,
    };
  }

  static clear(): void {
    this.nodes.clear();
    this.edges = [];
  }
}
