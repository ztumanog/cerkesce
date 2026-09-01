import { RelationDirection, RelationProps, RelationType } from '../types/ConceptRelation';

export class ConceptRelation {
  private readonly props: RelationProps;

  private constructor(props: RelationProps) {
    this.props = Object.freeze({ ...props });
  }

  public static create(props: RelationProps): ConceptRelation {
    if (!props.targetConceptId || props.targetConceptId.trim() === '') {
      throw new Error('Relation targetConceptId cannot be empty');
    }
    return new ConceptRelation(props);
  }

  get id(): string {
    return this.props.id;
  }

  get targetConceptId(): string {
    return this.props.targetConceptId;
  }

  get type(): RelationType {
    return this.props.type;
  }

  get direction(): RelationDirection {
    return this.props.direction;
  }

  public equals(other: ConceptRelation): boolean {
    if (!(other instanceof ConceptRelation)) return false;
    return this.props.id === other.props.id;
  }
}