import { ConceptID } from '@/domain/concept/value-objects/ConceptID';
import { ConceptId } from '@/domain/shared/value-objects/ConceptId';
import { ConceptRelation } from '@/domain/concept/types/ConceptRelation';

export interface ConceptProps {
  id: ConceptID | ConceptId | string;
  preferredLabel?: string;
  description?: string;
  relations?: ConceptRelation[];
}

export class Concept {
  readonly id: ConceptID;
  readonly preferredLabel: string;
  readonly description: string;
  readonly relations: ConceptRelation[];

  constructor(props: ConceptProps) {
    const rawId =
      typeof props.id === 'string'
        ? props.id
        : props.id instanceof ConceptID
          ? props.id.getValue()
          : props.id?.value;

    const canonical = ConceptId.create(rawId);
    this.id = props.id instanceof ConceptID ? props.id : ConceptID.create(canonical.value);
    this.preferredLabel = props.preferredLabel ?? '';
    this.description = props.description ?? '';
    this.relations = props.relations ?? [];
  }

  public static create(
    id: ConceptID | ConceptId | string,
    preferredLabel: string,
    description: string = ''
  ): Concept {
    return new Concept({ id, preferredLabel, description, relations: [] });
  }
}