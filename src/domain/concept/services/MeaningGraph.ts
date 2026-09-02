import { Concept } from "../Concept";

export interface ConceptRelation {
  targetConceptId: string;
  type?: string;
  [key: string]: any;
}

export interface GraphTraversalResult {
  rootId: string;
  depth1: string[];
  depth2: string[];
}

export class MeaningGraph {
  private concepts: Map<string, Concept> = new Map();

  public addConcept(concept: Concept): void {
    if (concept && concept.id) {
      this.concepts.set(concept.id.getValue(), concept);
    }
  }

  public getConcept(id: string): Concept | undefined {
    return this.concepts.get(id);
  }

  public getDirectNeighbors(conceptId: string): string[] {
    const concept = this.concepts.get(conceptId);
    if (!concept) return [];
    const relations: ConceptRelation[] = (concept as any).relations || [];
    return relations.map((rel: ConceptRelation) => rel.targetConceptId);
  }

  public traverse(rootId: string, maxDepth: number = 2): GraphTraversalResult {
    const root = this.concepts.get(rootId);
    if (!root) {
      return { rootId, depth1: [], depth2: [] };
    }

    const depth1 = this.getDirectNeighbors(rootId);
    const depth2Set = new Set<string>();

    if (maxDepth >= 2) {
      for (const d1Id of depth1) {
        const neighbors = this.getDirectNeighbors(d1Id);
        for (const nId of neighbors) {
          if (nId !== rootId && !depth1.includes(nId)) {
            depth2Set.add(nId);
          }
        }
      }
    }

    return {
      rootId,
      depth1,
      depth2: Array.from(depth2Set),
    };
  }

  public getRelationsByType(conceptId: string, relationType: string): string[] {
    const concept = this.concepts.get(conceptId);
    if (!concept) return [];
    const relations: ConceptRelation[] = (concept as any).relations || [];
    return relations
      .filter((r: ConceptRelation) => r.type === relationType)
      .map((r: ConceptRelation) => r.targetConceptId);
  }

  public addRelation(sourceId: string, targetConceptId: string, type?: string, weight?: number): void {
    const concept = this.concepts.get(sourceId);
    if (!concept) return;
    
    const relations: any[] = (concept as any).relations || [];
    relations.push({ targetConceptId, relationType: type, type, weight: weight ?? 1.0 });
    (concept as any).relations = relations;
  }}