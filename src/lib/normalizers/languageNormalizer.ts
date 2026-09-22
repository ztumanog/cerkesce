/**
 * File: src/lib/normalizers/languageNormalizer.ts
 * Generated: 2026-09-21
 * Layer: Normalizer
 *
 * ADR-P4-011: Canonical Language Filtering
 *
 * Hedef dil kodunu ISO 639-1'e (2 harf) çevirir.
 *   - "tr" / "tur" / "turkish" / "tu"  → TR
 *   - "en" / "eng" / "english"          → EN
 *   - "ru" / "rus" / "russian" / "рус"  → RU
 *   - "ar" / "ara" / "arabic" / "араб"  → AR
 */

export type CanonicalLanguage = 'TR' | 'EN' | 'RU' | 'AR' | 'UNKNOWN';

export function normalizeLanguage(lang?: string | null): CanonicalLanguage {
  if (!lang) return 'UNKNOWN';

  const raw = String(lang).trim().toLowerCase();

  if (['tr', 'tu', 'tur', 'turkish', 'türkçe'].includes(raw)) return 'TR';
  if (['en', 'eng', 'english'].includes(raw)) return 'EN';
  if (['ru', 'rus', 'russian', 'рус', 'русский'].includes(raw)) return 'RU';
  if (['ar', 'ara', 'arabic', 'араб', 'عربي'].includes(raw)) return 'AR';

  return 'UNKNOWN';
}

export function languageDisplayName(canonical: CanonicalLanguage): string {
  switch (canonical) {
    case 'TR':
      return 'Türkçe';
    case 'EN':
      return 'English';
    case 'RU':
      return 'Русский';
    case 'AR':
      return 'العربية';
    default:
      return 'Bilinmiyor';
  }
}
