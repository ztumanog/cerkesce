import { isValidCanonicalConceptId } from '../../shared/value-objects/ConceptId';

export class ConceptID {
  private readonly value: string;

  private constructor(id: string) {
    this.value = id;
    Object.freeze(this);
  }

  public static create(id: string): ConceptID {
    if (!id || !isValidCanonicalConceptId(id)) {
      throw new Error(`Invalid ConceptID format: ${id}`);
    }
    return new ConceptID(id);
  }

  public getValue(): string {
    return this.value;
  }

  public equals(other: ConceptID): boolean {
    if (!(other instanceof ConceptID)) return false;
    return this.value === other.value;
  }

  public toString(): string {
    return this.value;
  }
}
