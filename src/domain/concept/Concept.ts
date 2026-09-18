import { ConceptID } from '@/domain/concept/value-objects/ConceptID';
import { ConceptRelation } from '@/domain/concept/types/ConceptRelation';

export interface ConceptProps {
  id: ConceptID;
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
    this.id = props.id;
    this.preferredLabel = props.preferredLabel ?? '';
    this.description = props.description ?? '';
    this.relations = props.relations ?? [];
  }

  public static create(id: ConceptID, preferredLabel: string, description: string = ''): Concept {
    return new Concept({ id, preferredLabel, description, relations: [] });
  }
}
