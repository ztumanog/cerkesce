export enum RelationType {
  SYNONYM = 'SYNONYM',
  ANTONYM = 'ANTONYM',
  HYPONYM = 'HYPONYM',
  HOLONYM = 'HOLONYM',
  RELATED = 'RELATED'
}

export enum RelationDirection {
  DIRECTED = 'DIRECTED',
  UNDIRECTED = 'UNDIRECTED'
}

export interface RelationProps {
  id: string;
  targetConceptId: string;
  type: RelationType;
  direction: RelationDirection;
}