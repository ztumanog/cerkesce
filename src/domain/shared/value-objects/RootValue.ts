import { ValueObject } from './ValueObject';

export type CircassianDialect = 'KBD' | 'ADY' | 'COMMON';

interface RootValueProps {
  rootId: string;
  stem: string;
  dialect: CircassianDialect;
}

export class RootValue extends ValueObject<RootValueProps> {
  // Kiril harflerine bitişik 1, I, l, ӏ karakterlerini standart Palochka (Ӏ - U+04C0) yapar
  private static readonly PALOCHKA_FIX_REGEX = /(?<=[А-Яа-яЁёӀӏ])[1Ilӏ]|(?=[А-Яа-яЁёӀӏ])[1Ilӏ]/g;
  private static readonly VALID_ROOT_ID_REGEX = /^R-[A-Z0-9_-]+$/;

  private constructor(props: RootValueProps) {
    super(props);
  }

  public static normalizeCyrillic(text: string): string {
    return text
      .normalize('NFC')
      .trim()
      .replace(/^[-–—]+|[-–—]+$/g, '')
      .toLowerCase()
      .replace(this.PALOCHKA_FIX_REGEX, '\u04C0');
  }

  public static create(rootId: string, rawStem: string, dialect: string): RootValue {
    const cleanDialect = dialect.trim().toUpperCase() as CircassianDialect;
    if (cleanDialect !== 'KBD' && cleanDialect !== 'ADY' && cleanDialect !== 'COMMON') {
      throw new Error(`Geçersiz lehçe kodu: "${dialect}"`);
    }

    const stem = this.normalizeCyrillic(rawStem);
    if (!stem) {
      throw new Error('Kök (stem) boş olamaz.');
    }

    const cleanRootId = rootId.trim().toUpperCase();
    if (!this.VALID_ROOT_ID_REGEX.test(cleanRootId)) {
      throw new Error(`Geçersiz rootId formatı (R-... olmalı): "${rootId}"`);
    }

    return new RootValue({ rootId: cleanRootId, stem, dialect: cleanDialect });
  }

  get rootId(): string { return this.props.rootId; }
  get stem(): string { return this.props.stem; }
  get dialect(): CircassianDialect { return this.props.dialect; }
  get isUnclear(): boolean { return this.props.rootId === 'R-UNCLEAR'; }
}