import { DialectCode } from '../types/DialectTypes';
import { Variant } from '../Variant';
import { DialectResolver } from './DialectResolver';
import { isValidCanonicalConceptId } from '../../shared/value-objects/ConceptId';

export interface MeaningConceptLinkerInterface {
  getMeaningsByConceptId(conceptId: string): string[];
}

export class ConceptVariantBridge {
  constructor(
    private readonly meaningConceptLinker: MeaningConceptLinkerInterface,
    private readonly dialectResolver: DialectResolver
  ) {}

  /**
   * Phase 3 kanonik Concept ID üzerinden istenen diyalekteki varyantı O(1) fallback adımlarıyla çözer (ADR-GOV-015).
   */
  public async resolveVariantByConcept(conceptId: string, preferredDialect: DialectCode): Promise<Variant[]> {
    if (!isValidCanonicalConceptId(conceptId)) return [];

    const meaningIds = this.meaningConceptLinker.getMeaningsByConceptId(conceptId);
    if (!meaningIds || meaningIds.length === 0) return [];

    const results: Variant[] = [];

    for (const meaningId of meaningIds) {
      const variant = await this.dialectResolver.resolveBestVariant(meaningId, preferredDialect);
      if (variant) {
        results.push(variant);
      }
    }

    return results;
  }
}