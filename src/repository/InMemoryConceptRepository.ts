export interface IConceptRepository {
  save(concept: any): Promise<void>;
  findById(id: any): Promise<any>;
  findAll(): Promise<any[]>;
  getAll(): Promise<any[]>;
  findMany(ids: any[]): Promise<any[]>;
  exists(id: any): Promise<boolean>;
  delete(id: any): Promise<boolean>;
}

export class InMemoryConceptRepository implements IConceptRepository {
  private static instance: InMemoryConceptRepository | null = null;
  private storage: Map<string, any> = new Map();

  constructor() {
    InMemoryConceptRepository.instance = this;
  }

  public static getLastInstance(): InMemoryConceptRepository {
    if (!InMemoryConceptRepository.instance) {
      InMemoryConceptRepository.instance = new InMemoryConceptRepository();
    }
    return InMemoryConceptRepository.instance;
  }

  private extractIdStr(id: any): string {
    if (!id) return '';
    if (typeof id === 'string') return id;
    if (typeof id.getValue === 'function') return id.getValue();
    return id.value || id.id || String(id);
  }

  async save(concept: any): Promise<void> {
    const idStr = this.extractIdStr(concept.id || (concept.getId && concept.getId()));
    this.storage.set(idStr, concept);
  }

  async findById(id: any): Promise<any> {
    const idStr = this.extractIdStr(id);
    return this.storage.get(idStr) || null;
  }

  async findAll(): Promise<any[]> {
    return Array.from(this.storage.values());
  }

  async getAll(): Promise<any[]> {
    return this.findAll();
  }

  async findMany(ids: any[]): Promise<any[]> {
    const results: any[] = [];
    for (const id of ids) {
      const found = await this.findById(id);
      if (found) results.push(found);
    }
    return results;
  }

  async exists(id: any): Promise<boolean> {
    const idStr = this.extractIdStr(id);
    return this.storage.has(idStr);
  }

  async delete(id: any): Promise<boolean> {
    const idStr = this.extractIdStr(id);
    return this.storage.delete(idStr);
  }
}