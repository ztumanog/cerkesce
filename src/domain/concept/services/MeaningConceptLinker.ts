import { ConceptId } from '../../shared/value-objects/ConceptId';

export interface MeaningConceptLink {
  meaningId: string;
  conceptId: string;
}

export class MeaningConceptLinker {
  private meaningToConceptsMap: Map<string, Set<string>> = new Map();
  private conceptToMeaningsMap: Map<string, Set<string>> = new Map();
  private conceptRepository: any;

  constructor(conceptRepository?: any) {
    this.conceptRepository = conceptRepository;
  }

  /**
   * Meaning ID ile kanonik Concept ID arasında M:N bağ kurar (ADR-GOV-015).
   */
  public link(meaningId: string, conceptId: string): MeaningConceptLink {
    if (!meaningId || typeof meaningId !== 'string' || !meaningId.trim()) {
      throw new Error('MeaningConceptLinker requires a non-empty meaningId.');
    }
    const canonicalConceptId = ConceptId.create(conceptId).value;

    if (!this.meaningToConceptsMap.has(meaningId)) {
      this.meaningToConceptsMap.set(meaningId, new Set());
    }
    this.meaningToConceptsMap.get(meaningId)!.add(canonicalConceptId);

    if (!this.conceptToMeaningsMap.has(canonicalConceptId)) {
      this.conceptToMeaningsMap.set(canonicalConceptId, new Set());
    }
    this.conceptToMeaningsMap.get(canonicalConceptId)!.add(meaningId);

    return { meaningId, conceptId: canonicalConceptId };
  }

  public getConceptsByMeaningId(meaningId: string): string[] {
    const concepts = this.meaningToConceptsMap.get(meaningId);
    return concepts ? Array.from(concepts) : [];
  }

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