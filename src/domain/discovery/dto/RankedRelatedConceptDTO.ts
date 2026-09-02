import { DiscoveryRelationType } from '../types/DiscoveryRelationType';

export interface RankedRelatedConceptDTO {
  conceptId: string;
  relationType: DiscoveryRelationType | string;
  depth: number;
  score: number;
  parentConceptId?: string;
}