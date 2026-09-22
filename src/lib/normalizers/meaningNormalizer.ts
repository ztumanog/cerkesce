/**
 * File: src/lib/normalizers/meaningNormalizer.ts
 * Generated: 2026-09-19
 * Layer: Normalizer
 */

import type { DictionaryEntry, TranslationMeaning, Definition } from '@/types/dictionary';

/**
 * Type Guard: unknown → string[]
 */
export function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((item) => typeof item === 'string');
}

/**
 * Type Guard: unknown → TranslationMeaning[]
 */
export function isTranslationMeaningArray(value: unknown): value is TranslationMeaning[] {
  return (
    Array.isArray(value) &&
    value.every(
      (item) =>
        typeof item === 'object' &&
        item !== null &&
        'text' in item &&
        typeof (item as any).text === 'string'
    )
  );
}

/**
 * Type Guard: unknown → Definition[]
 */
export function isDefinitionArray(value: unknown): value is Definition[] {
  return (
    Array.isArray(value) &&
    value.every(
      (item) =>
        typeof item === 'object' &&
        item !== null &&
        'meaning' in item &&
        typeof (item as any).meaning === 'string' &&
        'tanim' in item &&
        typeof (item as any).tanim === 'string'
    )
  );
}

/**
 * Meaning alanını normalize et
 */
export function normalizeMeaning(entry: DictionaryEntry): string {
  const raw = entry as Record<string, any>;

  // 1. meaning alanını kontrol et
  if (typeof entry.meaning === 'string' && entry.meaning.trim()) {
    return entry.meaning;
  }

  // 2. anlam alanını kontrol et (Türkçe alias)
  if (typeof raw.anlam === 'string' && raw.anlam.trim()) {
    return raw.anlam;
  }

  // 3. definition alanını kontrol et
  if (typeof raw.definition === 'string' && raw.definition.trim()) {
    return raw.definition;
  }

  // 4. tanim alanını kontrol et (Türkçe alias)
  if (typeof raw.tanim === 'string' && raw.tanim.trim()) {
    return raw.tanim;
  }

  // 5. meanings array'inden çıkar
  if (isTranslationMeaningArray(entry.meanings) && entry.meanings.length > 0) {
    return entry.meanings.map((m: TranslationMeaning) => m.text).join('; ');
  }

  // 6. anlamlar array'inden çıkar (Türkçe alias)
  if (isStringArray(raw.anlamlar)) {
    return raw.anlamlar.join('; ');
  }

  // 7. definitions array'inden çıkar
  if (isDefinitionArray(raw.definitions) && raw.definitions.length > 0) {
    return raw.definitions.map((d: Definition) => d.meaning).join('; ');
  }

  // 8. kaynaklar'dan çıkar (Son çare)
  if (Array.isArray(raw.kaynaklar) && raw.kaynaklar.length > 0) {
    const kaynak = raw.kaynaklar[0];
    if (typeof kaynak === 'object' && kaynak !== null) {
      const meaning =
        kaynak.meaning ||
        kaynak.anlam ||
        kaynak.definition ||
        kaynak.tanim ||
        kaynak.translation;

      if (typeof meaning === 'string' && meaning.trim()) {
        return meaning;
      }
    }
  }

  return '';
}

/**
 * Anlamlar array'ini normalize et
 */
export function normalizeMeanings(entry: DictionaryEntry): TranslationMeaning[] {
  const raw = entry as Record<string, any>;

  // 1. meanings array'i varsa kullan
  if (isTranslationMeaningArray(entry.meanings)) {
    return entry.meanings;
  }

  // 2. anlamlar string array'i ise dönüştür
  if (isStringArray(raw.anlamlar)) {
    return raw.anlamlar.map((text: string) => ({
      text,
      value: text,
      lang: 'tr',
    }));
  }

  // 3. meaning string'i ise dönüştür
  const meaning = normalizeMeaning(entry);
  if (meaning) {
    return [{ text: meaning, value: meaning, lang: 'tr' }];
  }

  return [];
}

/**
 * Definitions array'ini normalize et
 */
export function normalizeDefinitions(entry: DictionaryEntry): Definition[] {
  const raw = entry as Record<string, any>;

  // 1. definitions array'i varsa kullan
  if (isDefinitionArray(raw.definitions)) {
    return raw.definitions;
  }

  // 2. meaning'den oluştur
  const meaning = normalizeMeaning(entry);
  if (meaning) {
    return [
      {
        meaning,
        tanim: meaning,
      },
    ];
  }

  return [];
}

/**
 * ✅ NORMALIZER: Tüm meaning alanlarını normalize et
 */
export function normalizeMeaningFields(entry: DictionaryEntry): {
  meaning: string;
  meanings: TranslationMeaning[];
  definitions: Definition[];
} {
  const meaning = normalizeMeaning(entry);
  const meanings = normalizeMeanings(entry);
  const definitions = normalizeDefinitions(entry);

  return {
    meaning,
    meanings,
    definitions,
  };
}