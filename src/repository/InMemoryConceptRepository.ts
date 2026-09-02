export interface GraphNeighbor {
  conceptId: string;
  relationType: string;
  weight: number;
}

export class InMemoryConceptRepository {
  private concepts: Map<string, any> = new Map();

  public save(concept: any): void {
    this.concepts.set(concept.id, concept);
  }

  public findById(id: string): any {
    return this.concepts.get(id);
  }

  public getNeighbors(conceptId: string): GraphNeighbor[] {
    const concept = this.concepts.get(conceptId);
    if (!concept || !concept.relations) {
      return [];
    }

    return concept.relations.map((rel: any) => ({
      conceptId: rel.targetConceptId,
      relationType: rel.relationType,
      weight: rel.weight || 1
    }));
  }
}