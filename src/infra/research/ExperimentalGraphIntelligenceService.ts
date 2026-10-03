export interface GraphIntelligenceNode {
  id: string;
  type: string;
  weight: number;
  connections: string[];
}

export interface GraphIntelligenceInsight {
  type: 'cluster' | 'central' | 'bridge' | 'isolated';
  nodes: string[];
  description: string;
  confidence: number;
}

export interface ExperimentalGraphReport {
  timestamp: string;
  totalNodes: number;
  insights: GraphIntelligenceInsight[];
  status: 'ok' | 'warning' | 'critical';
}

export class ExperimentalGraphIntelligenceService {
  private static nodes: Map<string, GraphIntelligenceNode> = new Map();

  static addNode(node: GraphIntelligenceNode): void {
    this.nodes.set(node.id, node);
  }

  static detectCentralNodes(threshold: number = 3): GraphIntelligenceInsight {
    const central = Array.from(this.nodes.values())
      .filter(n => n.connections.length >= threshold);

    return {
      type: 'central',
      nodes: central.map(n => n.id),
      description: `${central.length} merkezi dugum tespit edildi`,
      confidence: central.length > 0 ? 0.9 : 0.5,
    };
  }

  static detectIsolatedNodes(): GraphIntelligenceInsight {
    const isolated = Array.from(this.nodes.values())
      .filter(n => n.connections.length === 0);

    return {
      type: 'isolated',
      nodes: isolated.map(n => n.id),
      description: `${isolated.length} izole dugum tespit edildi`,
      confidence: 0.95,
    };
  }

  static detectClusters(): GraphIntelligenceInsight {
    const types: Record<string, string[]> = {};
    for (const node of this.nodes.values()) {
      if (!types[node.type]) types[node.type] = [];
      types[node.type].push(node.id);
    }

    const largest = Object.entries(types)
      .sort((a, b) => b[1].length - a[1].length)[0];

    return {
      type: 'cluster',
      nodes: largest ? largest[1] : [],
      description: largest ? `${largest[0]} tipinde ${largest[1].length} dugum` : 'Kume yok',
      confidence: largest ? Math.min(1, largest[1].length / 5) : 0,
    };
  }

  static getReport(): ExperimentalGraphReport {
    if (this.nodes.size === 0) {
      return {
        timestamp: new Date().toISOString(),
        totalNodes: 0,
        insights: [],
        status: 'warning',
      };
    }

    const insights = [
      this.detectCentralNodes(),
      this.detectIsolatedNodes(),
      this.detectClusters(),
    ];

    return {
      timestamp: new Date().toISOString(),
      totalNodes: this.nodes.size,
      insights,
      status: 'ok',
    };
  }

  static clear(): void {
    this.nodes.clear();
  }
}
