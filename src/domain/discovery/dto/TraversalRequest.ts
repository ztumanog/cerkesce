import { TraversalDepth } from '../types/TraversalDepth';

export interface TraversalRequest {
  rootConceptId: string;
  maxDepth?: TraversalDepth;
}