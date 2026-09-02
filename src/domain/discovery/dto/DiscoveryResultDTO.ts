import { RankedRelatedConceptDTO } from './RankedRelatedConceptDTO';
import { ContextClusterDTO } from './ContextClusterDTO';

export interface DiscoveryResultDTO {
  query: string;
  conceptId?: string;
  canonicalName?: string;
  meanings: Array<{
    id: string;
    language: string;
    term: string;
    definition?: string;
  }>;
  variants: Array<{
    id: string;
    dialectCode: string;
    term: string;
    isFallback: boolean;
    fallbackSourceDialect?: string;
  }>;
  relatedConcepts?: RankedRelatedConceptDTO[] | any[];
  contextClusters?: ContextClusterDTO[];
  graphMetadata?: {
    traversedNodes: number;
    maxDepth: number;
  };
  executionTimeMs: number;
}