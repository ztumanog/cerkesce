import { ValueObject } from './ValueObject';
import { RootValue } from './RootValue';

export type LexemeDialect = 'KBD' | 'ADY' | 'COMMON';

interface LexemeIdentityProps {
  id: string;
  form: string;
  dialect: LexemeDialect;
}

export class LexemeIdentity extends ValueObject<LexemeIdentityProps> {
  private static readonly VALID_LEXEME_ID_REGEX = /^(L|KAV)-[A-Z0-9А-ЯЁӀ()'-]+$/i;

  private constructor(props: LexemeIdentityProps) {
    super(props);
  }

  public static normalizeDialect(raw?: string): LexemeDialect {
    if (!raw || typeof raw !== 'string') {
      throw new Error('Lexeme lehçesi (dialect) boş olamaz.');
    }
    const upper = raw.trim().toUpperCase();
    if (upper === 'KBD' || upper === 'LANG: KBD' || upper === 'KABARDIAN' || upper === 'DOGU') {
      return 'KBD';
    }
    if (upper === 'ADY' || upper === 'LANG: ADY' || upper === 'ADYGHE' || upper === 'BATI (ADIGE)') {
      return 'ADY';
    }
    if (upper === 'COMMON' || upper === 'TUMU' || upper === 'BOTH') {
      return 'COMMON';
    }
    throw new Error(`Geçersiz veya sızıntı Lexeme lehçesi: "${raw}"`);
  }

  public static create(id: string, rawForm: string, rawDialect: string): LexemeIdentity {
    const cleanId = id?.trim();
    if (!cleanId || !this.VALID_LEXEME_ID_REGEX.test(cleanId)) {
      throw new Error(`Geçersiz Lexeme ID formatı: "${id}"`);
    }

    const dialect = this.normalizeDialect(rawDialect);
    const normalizedForm = RootValue.normalizeCyrillic(rawForm);
    if (!normalizedForm) {
      throw new Error(`Lexeme form alanı boş olamaz (ID: ${cleanId})`);
    }

    return new LexemeIdentity({
      id: cleanId,
      form: normalizedForm,
      dialect,
    });
  }

  get id(): string { return this.props.id; }
  get form(): string { return this.props.form; }
  get dialect(): LexemeDialect { return this.props.dialect; }
  get deduplicationKey(): string { return `${this.props.dialect}:${this.props.form}`; }
}