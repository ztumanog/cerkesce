import { DiscoveryRelationType } from '../types/DiscoveryRelationType';

export interface TraversalNode {
  conceptId: string;
  depth: number;
  relationType: DiscoveryRelationType;
  parentConceptId?: string;
}