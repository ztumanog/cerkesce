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
  if (!id || typeof id !== 'string') return false;

  // 1. Standart ULID (26 karakter Base32 — büyük harf)
  const ulidRegex = /^[0-9A-HJKMNP-TV-Z]{26}$/;
  // 2. UUID v7
  const uuidv7Regex = /^[0-9a-f]{8}-[0-9a-f]{4}-7[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  // 3. Domain ID (sadece büyük harf, rakam ve alt çizgi — tire yok)
  const domainIdRegex = /^[A-Z0-9_]{3,64}$/;

  return ulidRegex.test(id) || uuidv7Regex.test(id) || domainIdRegex.test(id);
}

private static generateULID(): string {
  const chars = '0123456789ABCDEFGHJKMNPQRSTVWXYZ';
  const timestamp = Date.now();
  const timeChars = timestamp.toString(32).toUpperCase().padStart(10, '0').slice(-10);
  let random = '';
  for (let i = 0; i < 16; i++) {
    random += chars[Math.floor(Math.random() * chars.length)];
  }
  return timeChars + random;
}