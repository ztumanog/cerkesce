import { ConceptId } from '@/domain/shared/value-objects/ConceptId';
import { ConceptRelation } from '@/domain/concept/types/ConceptRelation';

export interface ConceptProps {
  id: ConceptId | string;
  preferredLabel?: string;
  description?: string;
  relations?: ConceptRelation[];
}

export class Concept {
  readonly id: ConceptId;
  readonly preferredLabel: string;
  readonly description: string;
  readonly relations: ConceptRelation[];

  constructor(props: ConceptProps) {
    const rawId =
      typeof props.id === 'string'
        ? props.id
        : props.id.value;

    this.id = ConceptId.create(rawId);
    this.preferredLabel = props.preferredLabel ?? '';
    this.description = props.description ?? '';
    this.relations = props.relations ?? [];
  }

  public static create(
    id: ConceptId | string,
    preferredLabel: string,
    description: string = ''
  ): Concept {
    return new Concept({ id, preferredLabel, description, relations: [] });
  }
}