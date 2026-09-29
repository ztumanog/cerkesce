import { DiscoveryRelationType } from '../types/DiscoveryRelationType';

export interface RankedRelatedConceptDTO {
  conceptId: string;
  displayName?: string;
  displayNameTr?: string;
  relationType: DiscoveryRelationType | string;
  depth: number;
  score: number;
  parentConceptId?: string;
}
