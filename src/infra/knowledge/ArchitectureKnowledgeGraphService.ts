import fs from 'fs';
import path from 'path';

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

  /**
   * ADR_INDEX.md'den ADR'leri yukle
   */
  static loadFromAdrIndex(): number {
    const adrIndexPath = path.resolve('./docs/architecture/adr/ADR_INDEX.md');
    if (!fs.existsSync(adrIndexPath)) return 0;

    const content = fs.readFileSync(adrIndexPath, 'utf-8');
    const regex = /\| (ADR[-_][A-Z0-9_-]+) \|[^|]*\| `([^`]+\.md)`/gi;
    let match;
    let count = 0;

    while ((match = regex.exec(content)) !== null) {
      const adrId = match[1].trim();
      if (!this.nodes.has(adrId)) {
        this.addNode({
          id: adrId,
          type: 'adr',
          label: adrId,
          metadata: { file: match[2].trim() },
        });
        count++;
      }
    }

    return count;
  }

  /**
   * PHASES.md'den fazlari yukle
   */
  static loadFromPhases(): number {
    const phasesPath = path.resolve('./docs/governance/status/PHASES.md');
    if (!fs.existsSync(phasesPath)) return 0;

    const content = fs.readFileSync(phasesPath, 'utf-8');
    const regex = /^\| (\d+(?:-\d+)?) \| ([^|]+) \| ([A-Z_ ]+) \|/gm;
    let match;
    let count = 0;

    while ((match = regex.exec(content)) !== null) {
      const phaseId = 'PHASE-' + match[1].trim();
      if (!this.nodes.has(phaseId)) {
        this.addNode({
          id: phaseId,
          type: 'phase',
          label: 'Phase ' + match[1].trim() + ': ' + match[2].trim(),
          metadata: { status: match[3].trim() },
        });
        count++;
      }
    }

    return count;
  }


  /**
   * Servisleri yukle
   */
  static loadFromServices(): number {
    const services = [
      'VerbDecompiler',
      'NounCaseParser',
      'MorphemeParser',
      'RootExtractor',
      'MorphologyAnalyzer',
      'MorphologyLemmaBuilder',
      'KnowledgeExplorerViewService',
      'ExecutiveLearningService',
      'OperationalKnowledgeBaseService',
      'ArchitectureKnowledgeGraphService',
    ];
    let count = 0;
    for (const svc of services) {
      if (!this.nodes.has(svc)) {
        this.addNode({
          id: svc,
          type: 'service',
          label: svc,
        });
        count++;
      }
    }
    return count;
  }

  /**
   * Testleri yukle
   */
  static loadFromTests(): number {
    let count = 0;
    const testDir = path.resolve('./src/tests');
    if (!fs.existsSync(testDir)) return 0;

    const walk = (dir: string): string[] => {
      const files: string[] = [];
      for (const f of fs.readdirSync(dir)) {
        const full = path.join(dir, f);
        if (fs.statSync(full).isDirectory()) files.push(...walk(full));
        else if (f.endsWith('.test.ts')) files.push(f);
      }
      return files;
    };

    for (const testFile of walk(testDir)) {
      const testId = testFile.replace('.test.ts', '');
      if (!this.nodes.has(testId)) {
        this.addNode({
          id: testId,
          type: 'test',
          label: testFile,
        });
        count++;
      }
    }
    return count;
  }

  /**
   * Tum veriyi yukle
   */
  static loadAll(): void {
    this.loadFromAdrIndex();
    this.loadFromPhases();
    this.loadFromServices();
    this.loadFromTests();
    this.buildEdges();
  }

  /**
   * Dugumler arasi iliskileri olustur
   */
  private static buildEdges(): void {
    // ADR -> Phase (implements)
    const adrNodes = Array.from(this.nodes.values()).filter(n => n.type === 'adr');
    const phaseNodes = Array.from(this.nodes.values()).filter(n => n.type === 'phase');

    // Phase -> ADR (documents)
    for (const phase of phaseNodes) {
      for (const adr of adrNodes.slice(0, 3)) {
        this.addEdge({
          from: phase.id,
          to: adr.id,
          relation: 'documents',
        });
      }
    }

    // Service -> Test (tests)
    const serviceNodes = Array.from(this.nodes.values()).filter(n => n.type === 'service');
    const testNodes = Array.from(this.nodes.values()).filter(n => n.type === 'test');

    for (const service of serviceNodes) {
      for (const test of testNodes.slice(0, 5)) {
        this.addEdge({
          from: test.id,
          to: service.id,
          relation: 'tests',
        });
      }
    }
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
