import { RankedRelatedConceptDTO } from './RankedRelatedConceptDTO';
import { TraversalNode } from './TraversalNode';

export interface DiscoveryResultDTO {
  conceptId?: string;
  rootConceptId?: string;
  query?: string;
  canonicalName?: string;

  relatedConcepts?: RankedRelatedConceptDTO[];
  rankedRelatedConcepts?: RankedRelatedConceptDTO[];

  traversalNodes?: TraversalNode[];
  contextClusters?: unknown[];
  meanings?: unknown[];
  variants?: unknown[];
  graphMetadata?: Record<string, unknown>;

  executionTimeMs?: number;
}