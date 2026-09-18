export enum RelationType {
  SYNONYM = 'SYNONYM',
  ANTONYM = 'ANTONYM',
  RELATED = 'RELATED'
}

export interface GraphEdge {
  sourceConceptId: string;
  targetConceptId: string;
  relationType: string;
}

export interface GraphTraversalResult {
  rootId: string;
  depth1: string[];
  depth2: string[];
}

export class MeaningGraph {
  private concepts: Map<string, any> = new Map();
  private edges: GraphEdge[] = [];
  private adjacencyMap: Map<string, Set<string>> = new Map();
  private repository: any = null;

  constructor(repository?: any) {
    if (repository) {
      this.repository = repository;
    }
  }

  public setRepository(repository: any): void {
    this.repository = repository;
  }

  public extractId(input: any): string {
    if (!input) return '';
    if (typeof input === 'string') return input;
    if (typeof input.getValue === 'function') return String(input.getValue());
    if (input.value !== undefined && input.value !== null) return this.extractId(input.value);
    if (input.conceptId) return this.extractId(input.conceptId);
    if (input.id) return this.extractId(input.id);
    if (typeof input.toString === 'function' && input.toString() !== '[object Object]') return input.toString();
    return String(input);
  }

  private normalizeRelation(type: any): string {
    if (!type) return 'RELATED';
    if (typeof type === 'object') {
      if (typeof type.getValue === 'function') type = type.getValue();
      else if (type.value) type = type.value;
      else if (type.type) type = type.type;
      else if (type.name) type = type.name;
    }
    const strType = String(type).toUpperCase();
    if (strType.includes('SYNONYM')) return 'SYNONYM';
    if (strType.includes('ANTONYM')) return 'ANTONYM';
    if (strType.includes('RELATED')) return 'RELATED';
    return strType;
  }

  private getRelationArray(concept: any): any[] {
    if (!concept) return [];
    if (typeof concept.getRelations === 'function') {
      const rels = concept.getRelations();
      return Array.isArray(rels) ? rels : [];
    }
    if (Array.isArray(concept.relations)) return concept.relations;
    if (Array.isArray(concept.edges)) return concept.edges;
    if (Array.isArray(concept.links)) return concept.links;
    return [];
  }

  public addConcept(concept: any): void {
    const id = this.extractId(concept);
    if (!id) return;

    this.concepts.set(id, concept);
    if (!this.adjacencyMap.has(id)) {
      this.adjacencyMap.set(id, new Set());
    }

    const relations = this.getRelationArray(concept);

    for (const rel of relations) {
      const targetId = this.extractId(
        rel.targetConceptId || rel.targetId || rel.target || rel.to || rel.conceptId
      );
      const relType = this.normalizeRelation(rel.type || rel.relationType || rel.relation);

      if (targetId) {
        this.insertEdge(id, targetId, relType);
      }
    }
  }

  public getConcept(conceptId: any): any {
    const id = this.extractId(conceptId);
    return this.concepts.get(id);
  }

  public addRelation(relation: any): void {
    if (!relation) return;

    const sourceId = this.extractId(
      relation.sourceConceptId || relation.sourceId || relation.source || relation.from || relation.fromId || relation.conceptId
    );
    const targetId = this.extractId(
      relation.targetConceptId || relation.targetId || relation.target || relation.to || relation.toId || relation.relatedConceptId
    );
    const relationType = this.normalizeRelation(
      relation.relationType || relation.type || relation.relation || relation.kind
    );

    if (sourceId && targetId) {
      this.insertEdge(sourceId, targetId, relationType);
    }
  }

  public addEdge(sourceOrEdge: any, targetConceptId?: any, relationType: any = RelationType.RELATED): void {
    if (!sourceOrEdge) return;
    
    if (typeof sourceOrEdge === 'object' && targetConceptId === undefined && !sourceOrEdge.getValue) {
      this.addRelation(sourceOrEdge);
      return;
    }

    const src = this.extractId(sourceOrEdge);
    const tgt = this.extractId(targetConceptId);
    const rel = this.normalizeRelation(relationType);

    if (src && tgt) {
      this.insertEdge(src, tgt, rel);
    }
  }

  private insertEdge(src: string, tgt: string, rel: string): void {
    const exists = this.edges.some(
      (e) =>
        ((e.sourceConceptId === src && e.targetConceptId === tgt) ||
          (e.sourceConceptId === tgt && e.targetConceptId === src)) &&
        e.relationType === rel
    );

    if (!exists) {
      this.edges.push({ sourceConceptId: src, targetConceptId: tgt, relationType: rel });
    }

    if (!this.adjacencyMap.has(src)) this.adjacencyMap.set(src, new Set());
    if (!this.adjacencyMap.has(tgt)) this.adjacencyMap.set(tgt, new Set());

    this.adjacencyMap.get(src)!.add(tgt);
    this.adjacencyMap.get(tgt)!.add(src);
  }

  public getDirectNeighbors(conceptId: any): string[] {
    const id = this.extractId(conceptId);
    const neighbors = this.adjacencyMap.get(id);
    return neighbors ? Array.from(neighbors) : [];
  }

  public async getSynonyms(conceptId: any): Promise<string[]> {
    const id = this.extractId(conceptId);
    const results = new Set<string>();

    for (const edge of this.edges) {
      if (edge.relationType === 'SYNONYM') {
        if (edge.sourceConceptId === id && edge.targetConceptId !== id) results.add(edge.targetConceptId);
        if (edge.targetConceptId === id && edge.sourceConceptId !== id) results.add(edge.sourceConceptId);
      }
    }

    if (results.size === 0) {
      const concept = this.repository?.findById
        ? await this.repository.findById(id)
        : this.getConcept(id);

      if (concept) {
        const relations = this.getRelationArray(concept);
        for (const rel of relations) {
          const relType = this.normalizeRelation(rel.type || rel.relationType || rel.relation);
          if (relType === 'SYNONYM') {
            const targetId = this.extractId(
              rel.targetConceptId || rel.targetId || rel.target || rel.to || rel.conceptId
            );
            if (targetId && targetId !== id) results.add(targetId);
          }
        }
      }
    }

    return Array.from(results);
  }

  public async getAntonyms(conceptId: any): Promise<string[]> {
    const id = this.extractId(conceptId);
    const results = new Set<string>();

    for (const edge of this.edges) {
      if (edge.relationType === 'ANTONYM') {
        if (edge.sourceConceptId === id && edge.targetConceptId !== id) results.add(edge.targetConceptId);
        if (edge.targetConceptId === id && edge.sourceConceptId !== id) results.add(edge.sourceConceptId);
      }
    }

    if (results.size === 0) {
      const concept = this.repository?.findById
        ? await this.repository.findById(id)
        : this.getConcept(id);

      if (concept) {
        const relations = this.getRelationArray(concept);
        for (const rel of relations) {
          const relType = this.normalizeRelation(rel.type || rel.relationType || rel.relation);
          if (relType === 'ANTONYM') {
            const targetId = this.extractId(
              rel.targetConceptId || rel.targetId || rel.target || rel.to || rel.conceptId
            );
            if (targetId && targetId !== id) results.add(targetId);
          }
        }
      }
    }

    return Array.from(results);
  }

  public async traverse(rootId: any): Promise<GraphTraversalResult> {
    const cleanRootId = this.extractId(rootId);
    if (this.repository) {
      if (typeof this.repository.findAll === 'function') {
        const allConcepts = await this.repository.findAll();
        if (Array.isArray(allConcepts)) {
          for (const c of allConcepts) this.addConcept(c);
        }
      } else if (this.repository.items && this.repository.items instanceof Map) {
        for (const [, c] of this.repository.items.entries()) this.addConcept(c);
      }
    }

    const depth1Set = new Set<string>();
    const depth2Set = new Set<string>();
    const directNeighbors = this.getDirectNeighbors(cleanRootId);

    for (const neighbor of directNeighbors) {
      if (neighbor !== cleanRootId) depth1Set.add(neighbor);
    }

    for (const d1Id of depth1Set) {
      const secondDegree = this.getDirectNeighbors(d1Id);
      for (const d2Id of secondDegree) {
        if (d2Id !== cleanRootId && !depth1Set.has(d2Id)) depth2Set.add(d2Id);
      }
    }

    return { rootId: cleanRootId, depth1: Array.from(depth1Set), depth2: Array.from(depth2Set) };
  }
}
