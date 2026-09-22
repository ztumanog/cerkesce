/**
 * @file src/services/ConceptFacade.ts
 * @description Kavram Cephesi - Çapraz Dilli Arama ve Kavram Yönetimi
 * @layer Service/Facade
 * @generated 2026-09-18
 */

import { InMemoryConceptRepository } from '../repository/InMemoryConceptRepository';
import { MeaningConceptLinker } from '../domain/concept/services/MeaningConceptLinker';
import { MeaningGraph } from '../domain/concept/services/MeaningGraph';
import { ConceptID } from '../domain/concept/value-objects/ConceptID';
import { Concept } from '../domain/concept/Concept';

/**
 * Çapraz dilli arama sonucu
 */
export interface CrossLingualSearchResult {
  conceptId: string;
  relatedMeaningIds: string[];
}

/**
 * Kavram Cephesi
 * 
 * Sorumluluklar:
 * - Çapraz dilli anlam araması
 * - Kavram ID'sine göre arama
 * - Anlam-Kavram bağlantılarını yönetme
 */
export class ConceptFacade {
  constructor(
    private readonly repo: InMemoryConceptRepository,
    private readonly linker: MeaningConceptLinker,
    private readonly graph: MeaningGraph
  ) {} // ✅ Kapanış brace eklendi

  /**
   * Anlam ID'sine göre çapraz dilli kavramları arar
   * 
   * @param meaningId - Anlam ID'si
   * @returns Çapraz dilli arama sonucu veya null
   */
  async searchCrossLingualByMeaning(
    meaningId: string
  ): Promise<CrossLingualSearchResult | null> {
    const conceptIds = this.linker.getConceptsByMeaningId(meaningId);
    if (conceptIds.length === 0) return null;

    const conceptId = conceptIds[0];
    const relatedMeaningIds = this.linker.getMeaningsByConceptId(conceptId);

    return { conceptId, relatedMeaningIds };
  }

  /**
   * Kavram ID'sine göre kavramı arar
   * 
   * @param id - Kavram ID'si
   * @returns Bulunan Concept veya null
   */
  async findConceptById(id: string): Promise<Concept | null> {
    const conceptId = ConceptID.create(id);
    return this.repo.findById(conceptId.getValue()) as any;
  }
}



