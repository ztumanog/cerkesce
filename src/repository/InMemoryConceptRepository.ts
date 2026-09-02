import { Concept, ConceptID } from "../domain/concept";

export class InMemoryConceptRepository {
  private storage: Map<string, Concept> = new Map();

  public async findById(id: ConceptID | string): Promise<Concept | null> {
    if (!id) return null;
    const key = typeof id === "string" 
      ? id 
      : (typeof id.getValue === "function" ? id.getValue() : String(id));
      
    const concept = this.storage.get(key);
    return concept ? concept : null;
  }

  public async save(concept: Concept): Promise<void> {
    const key = typeof concept.id === "string"
      ? concept.id
      : (typeof concept.id?.getValue === "function" ? concept.id.getValue() : String(concept.id));
    this.storage.set(key, concept);
  }

  public async findAll(): Promise<Concept[]> {
    return Array.from(this.storage.values());
  }

  public clear(): void {
    this.storage.clear();
  }
}