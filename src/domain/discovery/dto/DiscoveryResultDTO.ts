import { DialectCode } from '../../dialect/types/DialectTypes';

export interface MeaningDTO {
  id: string;
  language: string;
  text: string;
}

export interface VariantDTO {
  dialectCode: DialectCode;
  spelling: string;
}

export interface RelatedConceptDTO {
  conceptId: string;
  relationType: string;
}

export interface DiscoveryResultDTO {
  query: string;
  conceptId?: string;
  meanings: MeaningDTO[];
  variants: VariantDTO[];
  relatedConcepts: RelatedConceptDTO[];
}