import { TranslationService } from '@/services/TranslationService';
import { ConceptCandidateDTO } from '../dto/ConceptCandidateDTO';

/**
 * ConceptCandidateResolver
 * 
 * Query → TranslationEntry[] → groupId → conceptId → ConceptCandidateDTO[]
 * 
 * Mimar kararı: TranslationGroup → Concept köprüsü.
 * TranslationEntry.concept geçici köprüydü, artık TranslationGroup üzerinden gidiyoruz.
 */
export class ConceptCandidateResolver {
  constructor(private translationService: TranslationService) {}

  public async resolve(query: string): Promise<ConceptCandidateDTO[]> {
    if (!query || !query.trim()) return [];

    const entries = await this.translationService.search(query);
    const candidates: ConceptCandidateDTO[] = [];
    const seen = new Set<string>();

    for (const entry of entries) {
      // Öncelik: TranslationGroup üzerinden conceptId
      const conceptId = (entry as any).conceptId || (entry as any).concept;
      
      if (conceptId && !seen.has(conceptId)) {
        seen.add(conceptId);
        candidates.push({
          conceptId,
          confidence: 1.0,
        });
      }
    }

    return candidates;
  }
}
