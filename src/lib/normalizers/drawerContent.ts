import type { DictionaryEntry, DrawerContent } from '@/types/dictionary';

/**
 * Bir DictionaryEntry'yi DrawerContent'e dönüştürür.
 * DrawerContent: word, cerkesce, meanings (string[]), dialect, concept,
 * relatedTerms, idioms alanlarını içerir.
 */
export function normalizeDrawerContent(entry: DictionaryEntry | null | undefined): DrawerContent {
  if (!entry) {
    return {
      word: '',
      meanings: [],
      relatedTerms: [],
      idioms: [],
    };
  }

  // meanings: Meaning[] | string[] | undefined olabilir → string[]'e çevir
  const rawMeanings = entry.meanings;
  const meanings: string[] = Array.isArray(rawMeanings)
    ? rawMeanings
        .map((m) => {
          if (typeof m === 'string') return m;
          if (m && typeof m === 'object') {
            return (m.text ?? m.value ?? m.meaning ?? '').toString();
          }
          return '';
        })
        .map((s) => s.trim())
        .filter(Boolean)
    : entry.meaning
      ? [entry.meaning]
      : [];

  return {
    word: entry.word ?? entry.lemma ?? entry.normalizedLemma ?? '',
    cerkesce: entry.cerkesce ?? '',
    meanings,
    dialect: entry.dialect,
    concept: entry.concept,
    relatedTerms: Array.isArray(entry.relatedTerms) ? entry.relatedTerms : [],
    idioms: Array.isArray(entry.idioms) ? entry.idioms : [],
  };
}