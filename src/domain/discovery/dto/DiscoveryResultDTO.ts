import { RankedRelatedConceptDTO } from './RankedRelatedConceptDTO';
import { TraversalNode } from './TraversalNode';
import { MeaningDTO } from './MeaningDTO';
import { VariantDTO } from './VariantDTO';

export interface DiscoveryResultDTO {
  conceptId?: string;
  rootConceptId?: string;
  query?: string;
  canonicalName?: string;

  relatedConcepts?: RankedRelatedConceptDTO[];
  rankedRelatedConcepts?: RankedRelatedConceptDTO[];

  traversalNodes?: TraversalNode[];
  contextClusters?: unknown[];
  meanings?: MeaningDTO[];
  variants?: VariantDTO[];
  graphMetadata?: Record<string, unknown>;

  executionTimeMs?: number;
}
