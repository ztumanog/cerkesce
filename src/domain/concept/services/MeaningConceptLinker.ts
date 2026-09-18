// src/domain/concept/services/MeaningConceptLinker.ts

export interface MeaningConceptLink {
  meaningId: string;
  conceptId: string;
}

export class MeaningConceptLinker {
  // M:N ilişkiyi desteklemek için diziler saklıyoruz
  private meaningToConceptsMap: Map<string, Set<string>> = new Map();
  private conceptToMeaningsMap: Map<string, Set<string>> = new Map();
  private conceptRepository: any;

  constructor(conceptRepository?: any) {
    this.conceptRepository = conceptRepository;
  }

  /**
   * Meaning ID ile Concept ID arasında M:N bağ kurar.
   */
  public link(meaningId: string, conceptId: string): MeaningConceptLink {
    if (!this.meaningToConceptsMap.has(meaningId)) {
      this.meaningToConceptsMap.set(meaningId, new Set());
    }
    this.meaningToConceptsMap.get(meaningId)!.add(conceptId);

    if (!this.conceptToMeaningsMap.has(conceptId)) {
      this.conceptToMeaningsMap.set(conceptId, new Set());
    }
    this.conceptToMeaningsMap.get(conceptId)!.add(meaningId);

    return { meaningId, conceptId };
  }

  /**
   * Meaning ID'ye bağlı tüm Concept ID'leri döndürür.
   */
  public getConceptsByMeaningId(meaningId: string): string[] {
    const concepts = this.meaningToConceptsMap.get(meaningId);
    return concepts ? Array.from(concepts) : [];
  }

  /**
   * Concept ID'ye bağlı tüm Meaning ID'leri döndürür (Reverse Lookup).
   */
  public getMeaningsByConceptId(conceptId: string): string[] {
    const meanings = this.conceptToMeaningsMap.get(conceptId);
    return meanings ? Array.from(meanings) : [];
  }

  public async resolveConcept(meaningId: string): Promise<any> {
    const conceptIds = this.getConceptsByMeaningId(meaningId);
    if (conceptIds.length > 0) {
      const conceptId = conceptIds[0];
      if (this.conceptRepository && typeof this.conceptRepository.findById === 'function') {
        return await this.conceptRepository.findById(conceptId);
      }
      return { id: conceptId };
    }
    return null;
  }
}