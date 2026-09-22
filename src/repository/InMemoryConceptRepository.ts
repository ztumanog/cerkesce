import { Concept } from '../domain/concept/Concept';

export class InMemoryConceptRepository {
  private concepts: Map<string, any> = new Map();

  private toKey(id: any): string {
    if (!id) return '';
    if (typeof id.getValue === 'function') return String(id.getValue());
    return String(id);
  }

  async save(concept: any): Promise<void> {
    this.concepts.set(this.toKey(concept.id), concept);
  }

  async findById(id: string): Promise<any | null> {
    return this.concepts.get(this.toKey(id)) || null;
  }

  async findMany(ids: string[]): Promise<any[]> {
    const results: any[] = [];
    for (const id of ids) {
      const item = this.concepts.get(this.toKey(id));
      if (item) results.push(item);
    }
    return results;
  }

  async findAll(): Promise<any[]> {
    return Array.from(this.concepts.values());
  }

  async delete(id: string): Promise<boolean> {
    return this.concepts.delete(this.toKey(id));
  }

  async exists(id: string): Promise<boolean> {
    return this.concepts.has(this.toKey(id));
  }

  async clear(): Promise<void> {
    this.concepts.clear();
  }
}
