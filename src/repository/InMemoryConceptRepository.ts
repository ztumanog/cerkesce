import { ConceptRepository } from '../domain/concept/repository/ConceptRepository';
import { Concept } from '../domain/concept/Concept';
import { ConceptID } from '../domain/concept/value-objects/ConceptID';

export class InMemoryConceptRepository implements ConceptRepository {
  private readonly storage: Map<string, Concept> = new Map();

  public async findById(id: ConceptID): Promise<Concept | null> {
    const concept = this.storage.get(id.getValue());
    return concept ? concept : null;
  }

  public async findMany(ids: readonly ConceptID[]): Promise<Concept[]> {
    const results: Concept[] = [];
    for (const id of ids) {
      const concept = this.storage.get(id.getValue());
      if (concept) {
        results.push(concept);
      }
    }
    return results;
  }

  public async save(concept: Concept): Promise<void> {
    this.storage.set(concept.id.getValue(), concept);
  }

  public async delete(id: ConceptID): Promise<boolean> {
    return this.storage.delete(id.getValue());
  }

  public async exists(id: ConceptID): Promise<boolean> {
    return this.storage.has(id.getValue());
  }

  public clear(): void {
    this.storage.clear();
  }
}