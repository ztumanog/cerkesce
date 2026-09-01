import { DialectCode } from '../../dialect/types/DialectTypes';
import { DiscoveryResultDTO, MeaningDTO, VariantDTO, RelatedConceptDTO } from '../dto/DiscoveryResultDTO';
import { ConceptFacade } from '../../../services/ConceptFacade';
import { DialectResolver } from '../../dialect/services/DialectResolver';
import { ConceptVariantBridge } from '../../dialect/services/ConceptVariantBridge';
import { TranslationService } from '../../../services/TranslationService';

export class MultilingualExplorer {
  constructor(
    private readonly translationService: TranslationService,
    private readonly conceptFacade: ConceptFacade,
    private readonly dialectResolver: DialectResolver,
    private readonly conceptVariantBridge: ConceptVariantBridge
  ) {}

  /**
   * Gerçek Orkestrasyon Use-Case'i: Kelime -> Meaning -> Variant -> Concept -> Graph
   */
  public async explore(query: string, preferredDialect: DialectCode = DialectCode.ADY_WEST): Promise<DiscoveryResultDTO> {
    const result: DiscoveryResultDTO = {
      query,
      meanings: [],
      variants: [],
      relatedConcepts: []
    };

    // 1. Kelime/Metin üzerinden Translation/Meaning arama
    const translations = this.translationService.searchByText(query);
    const meaningMap = new Map<string, MeaningDTO>();

    for (const t of translations) {
      if (!meaningMap.has(t.meaningId)) {
        meaningMap.set(t.meaningId, {
          id: t.meaningId,
          language: t.language,
          text: t.targetText
        });
      }
    }
    result.meanings = Array.from(meaningMap.values());

    // 2. Direct Meaning'ler üzerinden Variant Resolution (O(1))
    for (const meaning of result.meanings) {
      const variant = await this.dialectResolver.resolveBestVariant(meaning.id, preferredDialect);
      if (variant) {
        result.variants.push({
          dialectCode: variant.dialectCode,
          spelling: variant.spelling
        });
      }
    }

    // 3. Concept Arama ve Bağlantıları (Metin sızdırmadan yalnızca ID seviyesinde)
    const concepts = this.conceptFacade.searchConcepts(query);
    if (concepts.length > 0) {
      const primaryConcept = concepts[0];
      const conceptIdStr = primaryConcept.getId().getValue();
      result.conceptId = conceptIdStr;

      // Concept -> Variant Bridge üzerinden diyalekt varyantları
      const bridgeVariants = await this.conceptVariantBridge.resolveVariantByConcept(
        conceptIdStr,
        preferredDialect
      );

      for (const bv of bridgeVariants) {
        if (!result.variants.some(v => v.dialectCode === bv.dialectCode && v.spelling === bv.spelling)) {
          result.variants.push({
            dialectCode: bv.dialectCode,
            spelling: bv.spelling
          });
        }
      }

      // Concept Graph İlişkileri (Related Concepts)
      const graph = this.conceptFacade.getGraph();
      const relations = graph.getRelationsFrom(conceptIdStr);

      for (const rel of relations) {
        result.relatedConcepts.push({
          conceptId: rel.targetConceptId,
          relationType: rel.type
        });
      }
    }

    return result;
  }
}