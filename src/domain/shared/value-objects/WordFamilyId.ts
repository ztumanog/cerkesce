import { ValueObject } from './ValueObject';

interface WordFamilyIdProps {
  value: string;
}

export class WordFamilyId extends ValueObject<WordFamilyIdProps> {
  private static readonly CANONICAL_WF_REGEX = /^WF-[A-Z0-9_-]{1,60}$/;

  private constructor(props: WordFamilyIdProps) {
    super(props);
  }

  public static create(rawId: string): WordFamilyId {
    if (!rawId || typeof rawId !== 'string') {
      throw new Error('WordFamilyId boş olamaz.');
    }

    let cleaned = rawId.trim().toUpperCase().replace(/\s+/g, '-');
    if (cleaned.startsWith('FAM_')) {
      cleaned = 'WF-' + cleaned.slice(4);
    } else if (!cleaned.startsWith('WF-')) {
      cleaned = 'WF-' + cleaned;
    }

    if (!this.CANONICAL_WF_REGEX.test(cleaned)) {
      throw new Error(`Geçersiz WordFamilyId formatı (WF-... olmalı): "${rawId}"`);
    }

    return new WordFamilyId({ value: cleaned });
  }

  get value(): string {
    return this.props.value;
  }
}