export interface MeaningDTO {
  id: string;
  language: string;
  term: string;
  definition?: string;
}

export interface VariantDTO {
  id: string;
  dialectCode: string;
  term: string;
  isFallback: boolean;
  fallbackSourceDialect?: string;
}

export interface RelatedConceptDTO {
  conceptId: string;
  relationType: 'SYNONYM' | 'ANTONYM' | 'PARENT_CHILD' | 'RELATED';
  canonicalName: string;
}

export interface DiscoveryResultDTO {
  query: string;
  conceptId?: string;
  canonicalName?: string;
  meanings: MeaningDTO[];
  variants: VariantDTO[];
  relatedConcepts: RelatedConceptDTO[];
  executionTimeMs: number;
}