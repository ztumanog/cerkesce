import type { ConceptID } from '../domain/concept/value-objects/ConceptID';

export interface ConceptRelation {
  id: string;
}

export interface ConceptProps {
  id: ConceptID;
  relations: ConceptRelation[];
}