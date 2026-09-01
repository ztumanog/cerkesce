/**
 * @file src/services/ConceptGraphEngine.ts
 * @description Semantic graph engine for Phase 3 Concept Model
 * 
 * Implements ADR-0009: Concept Model & Semantic Relationships
 * 
 * Features:
 * - Property graph data structure
 * - 5 relationship types (SYNONYMY, ANTONYMY, HYPERNYMY, HYPONYMY, MERONYMY)
 * - Graph traversal algorithms (DFS, BFS)
 * - Relationship strength scoring
 * - Multi-language support
 */

/**
 * ===== TYPE DEFINITIONS (ADR-0009 Compliant) =====
 */

/**
 * Relationship types from ADR-0009
 */
export enum RelationshipType {
  SYNONYMY = "SYNONYMY",      // Eş anlamlılık: head ≈ skull
  ANTONYMY = "ANTONYMY",      // Zıtlık: head ↔ tail
  HYPERNYMY = "HYPERNYMY",    // Üst kavram: head → body_part
  HYPONYMY = "HYPONYMY",      // Alt kavram: head ← skull
  MERONYMY = "MERONYMY",      // Parça-bütün: head ⊂ body
}

/**
 * Concept types from ADR-0009
 */
export enum ConceptType {
  ENTITY = "ENTITY",          // Somut nesne
  ABSTRACT = "ABSTRACT",      // Soyut kavram
  ACTION = "ACTION",          // Eylem/Fiil
  PROPERTY = "PROPERTY",      // Özellik/Sıfat
  RELATION = "RELATION",      // İlişki
}

/**
 * Semantic relationship between concepts
 */
export interface ConceptRelationship {
  id: string;                          // Unique relationship ID
  targetConceptId: string;             // Target concept
  type: RelationshipType;              // Type of relationship
  strength: number;                    // 0-1, relationship strength

  // Language-specific relationships
  language?: string;                   // "TR", "RU", etc.
  context?: string;                    // Usage context

  metadata: {
    createdAt: Date;
    evidence: string[];                // Supporting evidence
    confidence: number;                // 0-1
  };
}

/**
 * Concept entry in the semantic graph
 */
export interface ConceptEntry {
  id: string;                          // UUID: "concept-head-001"
  label: string;                       // Primary label: "head"
  definition: string;                  // Semantic definition

  // Multi-language support
  labels: Record<string, string>;      // { "TR": "baş", "RU": "голова" }
  definitions: Record<string, string>; // Language-specific definitions

  // Semantic metadata
  conceptType: ConceptType;            // ENTITY, ABSTRACT, ACTION, etc.
  domain: string;                      // "anatomy", "architecture", etc.

  // Relationships (edges in semantic graph)
  relationships: ConceptRelationship[];

  // Tracking
  metadata: {
    createdAt: Date;
    updatedAt: Date;
    frequency: number;                 // Usage frequency
    confidence: number;                // 0-1, mapping confidence
    source: "MANUAL" | "AUTO" | "HYBRID";
  };
}

/**
 * Graph traversal result
 */
export interface TraversalResult {
  nodes: ConceptEntry[];               // Visited nodes
  edges: ConceptRelationship[];         // Traversed edges
  distance: Map<string, number>;        // Distance from start
  parent: Map<string, string | null>;   // Parent node (for path reconstruction)
}

/**
 * ===== CONCEPT GRAPH ENGINE =====
 */

export class ConceptGraphEngine {
  private nodes: Map<string, ConceptEntry> = new Map();
  private adjacencyList: Map<string, ConceptRelationship[]> = new Map();

  /**
   * Add a concept to the graph
   */
  public addConcept(concept: ConceptEntry): void {
    if (this.nodes.has(concept.id)) {
      throw new Error(`Concept ${concept.id} already exists`);
    }

    this.nodes.set(concept.id, concept);
    this.adjacencyList.set(concept.id, concept.relationships);
  }

  /**
   * Get a concept by ID
   */
  public getConcept(id: string): ConceptEntry | null {
    return this.nodes.get(id) ?? null;
  }

  /**
   * Add a relationship between two concepts
   */
  public addRelationship(
    sourceId: string,
    targetId: string,
    type: RelationshipType,
    strength: number = 0.8,
    language?: string
  ): ConceptRelationship {
    const source = this.getConcept(sourceId);
    if (!source) {
      throw new Error(`Source concept ${sourceId} not found`);
    }

    const target = this.getConcept(targetId);
    if (!target) {
      throw new Error(`Target concept ${targetId} not found`);
    }

    const relationship: ConceptRelationship = {
      id: `rel-${sourceId}-${targetId}-${type}`,
      targetConceptId: targetId,
      type,
      strength,
      language,
      metadata: {
        createdAt: new Date(),
        evidence: [],
        confidence: strength,
      },
    };

    source.relationships.push(relationship);
    this.adjacencyList.set(sourceId, source.relationships);

    // Add reverse relationship for bidirectional types
    if (this.isBidirectional(type)) {
      const reverseType = this.getReverseType(type);
      const reverseRel: ConceptRelationship = {
        id: `rel-${targetId}-${sourceId}-${reverseType}`,
        targetConceptId: sourceId,
        type: reverseType,
        strength,
        language,
        metadata: {
          createdAt: new Date(),
          evidence: [],
          confidence: strength,
        },
      };

      target.relationships.push(reverseRel);
      this.adjacencyList.set(targetId, target.relationships);
    }

    return relationship;
  }

  /**
   * Get relationships by type
   */
  public getRelationshipsByType(
    conceptId: string,
    type: RelationshipType
  ): ConceptRelationship[] {
    const concept = this.getConcept(conceptId);
    if (!concept) return [];

    return concept.relationships.filter((r) => r.type === type);
  }

  /**
   * BFS traversal from a starting concept
   */
  public bfsTraversal(startId: string): TraversalResult {
    const concept = this.getConcept(startId);
    if (!concept) {
      return {
        nodes: [],
        edges: [],
        distance: new Map(),
        parent: new Map(),
      };
    }

    const visited = new Set<string>();
    const queue: string[] = [startId];
    const distance = new Map<string, number>();
    const parent = new Map<string, string | null>();
    const nodes: ConceptEntry[] = [];
    const edges: ConceptRelationship[] = [];

    distance.set(startId, 0);
    parent.set(startId, null);

    while (queue.length > 0) {
      const currentId = queue.shift()!;

      if (visited.has(currentId)) continue;
      visited.add(currentId);

      const current = this.getConcept(currentId);
      if (current) {
        nodes.push(current);

        // Process relationships
        for (const rel of current.relationships) {
          edges.push(rel);

          if (!visited.has(rel.targetConceptId)) {
            distance.set(
              rel.targetConceptId,
              (distance.get(currentId) ?? 0) + 1
            );
            parent.set(rel.targetConceptId, currentId);
            queue.push(rel.targetConceptId);
          }
        }
      }
    }

    return { nodes, edges, distance, parent };
  }

  /**
   * DFS traversal from a starting concept
   */
  public dfsTraversal(startId: string): TraversalResult {
    const concept = this.getConcept(startId);
    if (!concept) {
      return {
        nodes: [],
        edges: [],
        distance: new Map(),
        parent: new Map(),
      };
    }

    const visited = new Set<string>();
    const distance = new Map<string, number>();
    const parent = new Map<string, string | null>();
    const nodes: ConceptEntry[] = [];
    const edges: ConceptRelationship[] = [];

    const dfs = (id: string, depth: number) => {
      if (visited.has(id)) return;
      visited.add(id);

      const current = this.getConcept(id);
      if (current) {
        nodes.push(current);
        distance.set(id, depth);

        for (const rel of current.relationships) {
          edges.push(rel);
          if (!visited.has(rel.targetConceptId)) {
            parent.set(rel.targetConceptId, id);
            dfs(rel.targetConceptId, depth + 1);
          }
        }
      }
    };

    distance.set(startId, 0);
    parent.set(startId, null);
    dfs(startId, 0);

    return { nodes, edges, distance, parent };
  }

  /**
   * Find shortest path between two concepts
   */
  public findShortestPath(
    startId: string,
    targetId: string
  ): string[] | null {
    const result = this.bfsTraversal(startId);

    if (!result.distance.has(targetId)) {
      return null; // No path found
    }

    // Reconstruct path
    const path: string[] = [];
    let current: string | null = targetId;

    while (current !== null) {
      path.unshift(current);
      current = result.parent.get(current) ?? null;
    }

    return path;
  }

  /**
   * Get all related concepts by relationship type
   */
  public getRelatedConcepts(
    conceptId: string,
    type: RelationshipType
  ): ConceptEntry[] {
    const relationships = this.getRelationshipsByType(conceptId, type);
    return relationships
      .map((r) => this.getConcept(r.targetConceptId))
      .filter((c) => c !== null) as ConceptEntry[];
  }

  /**
   * Find synonyms (SYNONYMY relationships)
   */
  public getSynonyms(conceptId: string): ConceptEntry[] {
    return this.getRelatedConcepts(conceptId, RelationshipType.SYNONYMY);
  }

  /**
   * Find antonyms (ANTONYMY relationships)
   */
  public getAntonyms(conceptId: string): ConceptEntry[] {
    return this.getRelatedConcepts(conceptId, RelationshipType.ANTONYMY);
  }

  /**
   * Find parent concepts (HYPERNYMY relationships)
   */
  public getParentConcepts(conceptId: string): ConceptEntry[] {
    return this.getRelatedConcepts(conceptId, RelationshipType.HYPERNYMY);
  }

  /**
   * Find child concepts (HYPONYMY relationships)
   */
  public getChildConcepts(conceptId: string): ConceptEntry[] {
    return this.getRelatedConcepts(conceptId, RelationshipType.HYPONYMY);
  }

  /**
   * Find part concepts (MERONYMY relationships)
   */
  public getPartConcepts(conceptId: string): ConceptEntry[] {
    return this.getRelatedConcepts(conceptId, RelationshipType.MERONYMY);
  }

  /**
   * Get all concepts in the graph
   */
  public getAllConcepts(): ConceptEntry[] {
    return Array.from(this.nodes.values());
  }

  /**
   * Get graph statistics
   */
  public getStatistics(): {
    nodeCount: number;
    edgeCount: number;
    relationshipTypes: Record<RelationshipType, number>;
  } {
    const relationshipTypes: Record<RelationshipType, number> = {
      [RelationshipType.SYNONYMY]: 0,
      [RelationshipType.ANTONYMY]: 0,
      [RelationshipType.HYPERNYMY]: 0,
      [RelationshipType.HYPONYMY]: 0,
      [RelationshipType.MERONYMY]: 0,
    };

    let edgeCount = 0;

    for (const concept of this.nodes.values()) {
      for (const rel of concept.relationships) {
        relationshipTypes[rel.type]++;
        edgeCount++;
      }
    }

    return {
      nodeCount: this.nodes.size,
      edgeCount,
      relationshipTypes,
    };
  }

  /**
   * ===== HELPER METHODS =====
   */

  private isBidirectional(type: RelationshipType): boolean {
    return type === RelationshipType.SYNONYMY || type === RelationshipType.ANTONYMY;
  }

  private getReverseType(type: RelationshipType): RelationshipType {
    switch (type) {
      case RelationshipType.HYPERNYMY:
        return RelationshipType.HYPONYMY;
      case RelationshipType.HYPONYMY:
        return RelationshipType.HYPERNYMY;
      case RelationshipType.MERONYMY:
        return RelationshipType.MERONYMY; // Self-reverse
      case RelationshipType.SYNONYMY:
      case RelationshipType.ANTONYMY:
      default:
        return type;
    }
  }
}