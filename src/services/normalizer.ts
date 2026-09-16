/**
 * File: src/lib/normalizers/contentClassifier.ts
 * Generated: 2026-09-16
 * Layer: Normalizer
 */

export interface ClassifiedContent {
  translations: string[];
  definitions: string[];
  examples: string[];
  relatedTerms: string[];
  usages: string[]; // Drawer geriye uyumluluğu için korundu
}

export function cleanUsageLabel(text: string): string {
  if (!text) return '';
  let cleaned = text.trim();
  const labelRegex = /^(\d+|[а-яёӀa-z])\)\s*/iu;

  while (labelRegex.test(cleaned)) {
    cleaned = cleaned.replace(labelRegex, '').trim();
  }
  return cleaned;
}

export function classifyContent(rawValues: string[], lemma: string): ClassifiedContent {
  const result: ClassifiedContent = {
    translations: [],
    definitions: [],
    examples: [],
    relatedTerms: [],
    usages: [],
  };

  if (!Array.isArray(rawValues) || rawValues.length === 0) {
    return result;
  }

  const processed = new Set<string>();
  const cleanLemma = (lemma || '').trim().toLowerCase();
  const upperLemma = cleanLemma.toUpperCase();

  rawValues.forEach((raw) => {
    if (!raw) return;

    const parts = raw.split(';').map((p) => p.trim()).filter(Boolean);

    parts.forEach((part) => {
      const cleaned = cleanUsageLabel(part);
      if (!cleaned || processed.has(cleaned.toLowerCase())) return;
      processed.add(cleaned.toLowerCase());

      const upper = cleaned.toUpperCase();

      // 1. ÖRNEKLER - Esnek Kurallar
      if (
        cleaned.includes('—') ||
        cleaned.includes('->') ||
        cleaned.includes('-su ') ||
        cleaned.includes(' su ') ||
        cleaned.length > 45 ||
        (cleaned.includes('(') && cleaned.includes(')'))
      ) {
        result.examples.push(cleaned);
        return;
      }

      // 2. İLGİLİ TERİMLER (Büyük harfli alt maddeler)
      if (
        cleanLemma &&
        (upper.startsWith(upperLemma + ' ') || upper.startsWith(upperLemma + '-'))
      ) {
        result.relatedTerms.push(cleaned);
        return;
      }

      // 3. ÇEVİRİLER VEYA KULLANIMLAR
      const hasPunctuation = /[(),.;:!?]/.test(cleaned);
      const wordCount = cleaned.trim().split(/\s+/).length;
      const containsLemma =
        cleanLemma.length > 0 &&
        cleaned.toLowerCase().includes(cleanLemma) &&
        cleaned !== lemma;

      if (
        !hasPunctuation &&
        wordCount <= 3 &&
        !containsLemma &&
        result.translations.length < 3
      ) {
        result.translations.push(cleaned);
      } else {
        result.usages.push(cleaned);
      }
    });
  });

  // Hiç çeviri çıkmadıysa ilk uygun kullanımı çeviriye kaydır
  if (result.translations.length === 0 && result.usages.length > 0) {
    const fallbackTranslation = result.usages.shift();
    if (fallbackTranslation) {
      result.translations.push(fallbackTranslation);
    }
  }

  // Drawer uyumluluğu için kalan usages öğelerini relatedTerms ile birleştir
  result.relatedTerms = Array.from(
    new Set([...result.relatedTerms, ...result.usages])
  );

  return result;
}