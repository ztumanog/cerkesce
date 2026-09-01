import { DiscoveryResultDTO, MeaningDTO, VariantDTO, RelatedConceptDTO } from '../dto/DiscoveryResultDTO';

export class DiscoveryAssembler {
  public static assemble(
    query: string,
    conceptId: string | undefined,
    canonicalName: string | undefined,
    meanings: MeaningDTO[],
    variants: VariantDTO[],
    relatedConcepts: RelatedConceptDTO[],
    executionTimeMs: number
  ): DiscoveryResultDTO {
    return {
      query,
      conceptId,
      canonicalName,
      meanings: meanings || [],
      variants: variants || [],
      relatedConcepts: relatedConcepts || [],
      executionTimeMs
    };
  }

  public static createEmpty(query: string, executionTimeMs: number = 0): DiscoveryResultDTO {
    return {
      query,
      meanings: [],
      variants: [],
      relatedConcepts: [],
      executionTimeMs
    };
  }
}