/**
 * @file src/domain/concept/types/ConceptRelation.ts
 * @description Kavram İlişkisi Tip Tanımları
 * @layer Domain/Types
 */

export enum RelationType {
  SYNONYM = 'SYNONYM',
  ANTONYM = 'ANTONYM',
  RELATED = 'RELATED',
  HYPERNYM = 'HYPERNYM',
  HYPONYM = 'HYPONYM',
  PART_OF = 'PART_OF',
  HOLONYM = 'HOLONYM',
}

export enum RelationDirection {
  FORWARD = 'FORWARD',
  BACKWARD = 'BACKWARD',
  BIDIRECTIONAL = 'BIDIRECTIONAL',

  // Legacy/test compatibility
  DIRECTED = 'FORWARD',
  UNDIRECTED = 'BIDIRECTIONAL',
}

export interface RelationProps {
  id: string;
  targetConceptId: string;
  type: RelationType;
  direction: RelationDirection;
  weight?: number;
}

export class ConceptRelation {
  public readonly id: string;
  public readonly targetConceptId: string;
  public readonly type: RelationType;
  public readonly direction: RelationDirection;
  public readonly weight?: number;

  private constructor(props: RelationProps) {
    this.id = props.id;
    this.targetConceptId = props.targetConceptId;
    this.type = props.type;
    this.direction = props.direction;
    this.weight = props.weight;
  }

  public static create(props: RelationProps): ConceptRelation {
    if (!props.id || props.id.trim() === '') {
      throw new Error('Relation id boş olamaz');
    }

    if (!props.targetConceptId || props.targetConceptId.trim() === '') {
      throw new Error('targetConceptId boş olamaz');
    }

    return new ConceptRelation(props);
  }
}
