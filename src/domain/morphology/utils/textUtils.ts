/**
 * TextUtils - Çerkesçe Metin ve Palochka Normalizasyonu
 * ADR-0055: Cyrillic Palochka Standardization
 */

export function normalizePalochka(text: string): string {
  if (!text) return '';
  // Farklı Palochka (U+04CF, ASCII l, 1, I) karakterlerini standart U+04C0 'Ӏ' karakterine çevirir
  return text.replace(/[ӏIl1ӀІ]/g, 'Ӏ').trim();
}