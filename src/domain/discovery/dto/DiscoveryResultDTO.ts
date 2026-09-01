import { RelatedConceptDTO } from './RelatedConceptDTO';

export interface DiscoveryGraphMetadata {
  maxDepth: number;
  traversedNodes: number;
}

export interface DiscoveryResultDTO {
  query: string;
  conceptId?: string;
  canonicalName?: string;
  meanings: any[];
  variants: any[];
  dialects?: any[];
  relatedConcepts?: RelatedConceptDTO[];
  graphMetadata?: DiscoveryGraphMetadata;
  executionTimeMs: number;
}