import { ConceptID } from '@/domain/value-objects/ConceptID';

export interface ConceptProps {
  id: ConceptID;
  preferredLabel: string;
  description?: string;
}

export class Concept {
  readonly id: ConceptID;
  readonly preferredLabel: string;
  readonly description: string;

  constructor(props: ConceptProps) {
    this.id = props.id;
    this.preferredLabel = props.preferredLabel;
    this.description = props.description || '';
  }

  public static create(id: ConceptID, preferredLabel: string, description: string = ''): Concept {
    return new Concept({ id, preferredLabel, description });
  }
}