import { ConceptRepository } from '../domain/concept/repository/ConceptRepository';
import { MeaningConceptLinker } from '../domain/concept/services/MeaningConceptLinker';
import { MeaningGraph } from '../domain/concept/services/MeaningGraph';
import { ConceptID } from '../domain/concept/value-objects/ConceptID';

export interface CrossLingualSearchResult {
  conceptId: string;
  relatedMeaningIds: string[];
  graphDepth1: string[];
  graphDepth2: string[];
}

export class ConceptFacade {
  constructor(
    private readonly conceptRepo: ConceptRepository,
    private readonly linker: MeaningConceptLinker,
    private readonly graph: MeaningGraph
  ) {}

  /**
   * MeaningID üzerinden kavrama ulaşır, graf ağını (Depth=2) tarar 
   * ve bağlı tüm anlam ID'lerini çapraz dilli arama için döndürür.
   */
  public async searchCrossLingualByMeaning(meaningId: string): Promise<CrossLingualSearchResult | null> {
    const conceptIds = this.linker.getConceptsByMeaningId(meaningId);
    if (conceptIds.length === 0) return null;

    const primaryConceptIdStr = conceptIds[0];
    const conceptId = ConceptID.create(primaryConceptIdStr);

    const traversal = await this.graph.traverse(conceptId);
    const relatedMeaningIds = this.linker.getMeaningsByConceptId(primaryConceptIdStr);

    return {
      conceptId: primaryConceptIdStr,
      relatedMeaningIds,
      graphDepth1: traversal.depth1,
      graphDepth2: traversal.depth2,
    };
  }
}