import type { ConceptProps, ConceptRelation } from '../../types/concept';
import { ConceptID } from './value-objects/ConceptID';

export class Concept {
  private readonly _id: ConceptID;
  private readonly _relations: ConceptRelation[];

  constructor(props: ConceptProps) {
    this._id = props.id;
    this._relations = Object.freeze([...props.relations]);
  }

  get id(): ConceptID {
    return this._id;
  }

  get relations(): readonly ConceptRelation[] {
    return this._relations;
  }

  public addRelation(relation: ConceptRelation): Concept {
    return new Concept({
      id: this._id,
      relations: [...this._relations, relation],
    });
  }

  public hasRelation(relationId: string): boolean {
    return this._relations.some(
      relation => relation.id === relationId
    );
  }

  public equals(other: Concept): boolean {
    if (!(other instanceof Concept)) return false;
    return this._id.equals(other.id);
  }
}