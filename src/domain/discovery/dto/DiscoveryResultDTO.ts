import { RelatedConceptDTO } from './RelatedConceptDTO';
import { TraversalNode } from './TraversalNode';

export interface DiscoveryResultDTO {
  conceptId?: string;
  rootConceptId?: string;
  query?: string;
  canonicalName?: string;

  relatedConcepts?: RelatedConceptDTO[];
  rankedRelatedConcepts?: RelatedConceptDTO[];

  traversalNodes?: TraversalNode[];
  contextClusters?: unknown[];
  meanings?: unknown[];
  variants?: unknown[];
  graphMetadata?: Record<string, unknown>;

  executionTimeMs?: number;
}