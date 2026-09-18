import { DiscoveryRelationType } from '../types/DiscoveryRelationType';
import { RelatedConceptDTO } from '../dto/RelatedConceptDTO';

export interface RelatedConceptDTO {
  conceptId: string;
  relationType: DiscoveryRelationType;
  depth: number;
  parentConceptId?: string;
}

export interface CategorizedRelatedConcepts {
  synonyms: RelatedConceptDTO[];
  antonyms: RelatedConceptDTO[];
  parents: RelatedConceptDTO[];
  children: RelatedConceptDTO[];
  related: RelatedConceptDTO[];
}
