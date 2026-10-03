export interface GraphEntity {
  id: string;
  type: 'adr' | 'phase' | 'service' | 'concept';
  name: string;
  properties: Record<string, string>;
}

export interface GraphRelation {
  from: string;
  to: string;
  type: 'depends_on' | 'implements' | 'documents' | 'relates_to';
}

export interface GraphPath {
  nodes: string[];
  length: number;
}

export interface KnowledgeGraphReport {
  timestamp: string;
  entities: number;
  relations: number;
  components: number;
  status: 'ok' | 'warning' | 'critical';
}

export class KnowledgeGraphService {
  private static entities: Map<string, GraphEntity> = new Map();
  private static relations: GraphRelation[] = [];

  static addEntity(entity: GraphEntity): void {
    this.entities.set(entity.id, entity);
  }

  static addRelation(relation: GraphRelation): void {
    this.relations.push(relation);
  }

  static findPath(from: string, to: string): GraphPath | null {
    const visited = new Set<string>();
    const queue: { node: string; path: string[] }[] = [{ node: from, path: [from] }];

    while (queue.length > 0) {
      const { node, path } = queue.shift()!;
      if (node === to) {
        return { nodes: path, length: path.length - 1 };
      }
      if (visited.has(node)) continue;
      visited.add(node);

      for (const rel of this.relations) {
        if (rel.from === node && !visited.has(rel.to)) {
          queue.push({ node: rel.to, path: [...path, rel.to] });
        }
        if (rel.to === node && !visited.has(rel.from)) {
          queue.push({ node: rel.from, path: [...path, rel.from] });
        }
      }
    }

    return null;
  }

  static getReport(): KnowledgeGraphReport {
    const components = this.countComponents();
    const status = this.entities.size === 0 ? 'warning' : 'ok';

    return {
      timestamp: new Date().toISOString(),
      entities: this.entities.size,
      relations: this.relations.length,
      components,
      status,
    };
  }

  private static countComponents(): number {
    const visited = new Set<string>();
    let count = 0;

    for (const id of this.entities.keys()) {
      if (visited.has(id)) continue;
      count++;
      const queue = [id];
      while (queue.length > 0) {
        const node = queue.shift()!;
        if (visited.has(node)) continue;
        visited.add(node);
        for (const rel of this.relations) {
          if (rel.from === node && !visited.has(rel.to)) queue.push(rel.to);
          if (rel.to === node && !visited.has(rel.from)) queue.push(rel.from);
        }
      }
    }

    return count;
  }

  static clear(): void {
    this.entities.clear();
    this.relations = [];
  }
}
