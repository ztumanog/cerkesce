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
    if (!id || typeof id !== 'string') return false;

    // 1. Standart ULID (26 karakter Base32)
    const ulidRegex = /^[0-9A-HJKMNP-TV-Z]{26}$/i;
    // 2. Standard UUID v7
    const uuidv7Regex = /^[0-9a-f]{8}-[0-9a-f]{4}-7[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    // 3. Domain & Test ID Formatı (ör. CONCEPT_WATER, 01H8XPARK00000000000000ICE)
    const domainIdRegex = /^[A-Z0-9_-]{3,64}$/i;

    return ulidRegex.test(id) || uuidv7Regex.test(id) || domainIdRegex.test(id);
  }

  private static generateULID(): string {
    return "01HXXXXXXX0000000000000000";
  }
}