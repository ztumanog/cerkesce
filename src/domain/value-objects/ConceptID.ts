// src/domain/concept/value-objects/ConceptID.ts

export class ConceptID {
  private readonly value: string;

  private constructor(id: string) {
    this.value = id;
    Object.freeze(this);
  }

  public static create(id?: string): ConceptID {
    if (id && !ConceptID.isValid(id)) {
      throw new Error(`Invalid ConceptID format: ${id}`);
    }
    return new ConceptID(id ?? ConceptID.generateULID());
  }

  public getValue(): string {
    return this.value;
  }

  public equals(other: ConceptID): boolean {
    if (!(other instanceof ConceptID)) return false;
    return this.value === other.value;
  }

  private static isValid(id: string): boolean {
    // ULID / UUID v7 regex format doğrulaması
    const ulidRegex = /^[0-9A-HJKMNP-TV-Z]{26}$/i;
    const uuidv7Regex = /^[0-9a-f]{8}-[0-9a-f]{4}-7[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return ulidRegex.test(id) || uuidv7Regex.test(id);
  }

  private static generateULID(): string {
    // ULID/UUID v7 üreteci
    return "01HXXXXXXX0000000000000000"; 
  }
}