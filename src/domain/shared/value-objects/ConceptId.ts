import { ValueObject } from './ValueObject';

export const CANONICAL_CONCEPT_ID_REGEX = /^[A-Z][A-Z0-9_]{1,63}$/;
const TURKISH_CHAR_REGEX = /[ÇĞİÖŞÜçğıöşü]/;
const LEGACY_ULID_REGEX = /^[0-9A-HJKMNP-TV-Z]{26}$/;
const HEX_HASH_REGEX = /^[0-9a-fA-F]{16,}$/;

export function isValidCanonicalConceptId(raw: string): boolean {
  if (!raw || typeof raw !== 'string') return false;
  if (TURKISH_CHAR_REGEX.test(raw)) return false;
  if (LEGACY_ULID_REGEX.test(raw)) return false;
  if (HEX_HASH_REGEX.test(raw)) return false;
  return CANONICAL_CONCEPT_ID_REGEX.test(raw);
}

interface ConceptIdProps {
  value: string;
}

export class ConceptId extends ValueObject<ConceptIdProps> {
  private constructor(props: ConceptIdProps) {
    super(props);
  }

  public static create(raw: string): ConceptId {
    if (!raw || typeof raw !== 'string') {
      throw new Error('ConceptId boş olamaz.');
    }

    if (TURKISH_CHAR_REGEX.test(raw)) {
      throw new Error(`ConceptId Türkçe karakter içeremez: ${raw}`);
    }

    if (LEGACY_ULID_REGEX.test(raw)) {
      throw new Error(`ADR-GOV-015 ihlali: ULID formatı yasaktır: ${raw}`);
    }

    if (HEX_HASH_REGEX.test(raw)) {
      throw new Error(`ADR-GOV-015 ihlali: Ham hex hash formatı yasaktır: ${raw}`);
    }

    if (!CANONICAL_CONCEPT_ID_REGEX.test(raw)) {
      throw new Error(`Geçersiz kanonik ConceptId formatı (UPPER_SNAKE_CASE bekleniyor): ${raw}`);
    }

    return new ConceptId({ value: raw });
  }

  public get value(): string {
    return this.props.value;
  }

  public toString(): string {
    return this.props.value;
  }
}
