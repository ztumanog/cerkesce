import { TranslationEntry } from '@/domain/translation';

export class TestDataFactory {
  static createTranslationEntry(overrides?: Partial<TranslationEntry>): TranslationEntry {
    return {
      id: 't-1',
      lemma: 'su',
      meanings: ['m-water-01'],
      language: 'tr',
      ...overrides
    };
  }
}

export function createMockEntry(overrides?: Partial<TranslationEntry>): TranslationEntry {
  return TestDataFactory.createTranslationEntry(overrides);
}

export function createEntryWithMeanings(lemma: string, meanings: string[], language: string = 'tr'): TranslationEntry {
  return {
    id: `t-${lemma}`,
    lemma,
    meanings,
    language
  };
}

export function createMultilingualEntry(lemma: string, translationsByLang: Record<string, string[]>): TranslationEntry {
  const allMeanings = Object.values(translationsByLang).flat();
  return {
    id: `t-${lemma}`,
    lemma,
    meanings: allMeanings,
    language: 'multi'
  };
}

export function createMockDictionary(specs: Array<{ lemma: string; meanings: string[] }>): TranslationEntry[] {
  return specs.map(spec => createEntryWithMeanings(spec.lemma, spec.meanings));
}