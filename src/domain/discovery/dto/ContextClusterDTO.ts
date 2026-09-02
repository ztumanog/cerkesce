import { RankedRelatedConceptDTO } from './RankedRelatedConceptDTO';

export interface ContextClusterDTO {
  clusterId: string;
  label: string;
  concepts: RankedRelatedConceptDTO[];
}