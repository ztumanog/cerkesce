import { DiscoveryRelationType } from '../types/DiscoveryRelationType';

export interface ConceptNeighbor {
  targetConceptId: string;
  relationType: DiscoveryRelationType;
}

export interface IConceptGraphRepository {
  getNeighbors(conceptId: string): ConceptNeighbor[];
}