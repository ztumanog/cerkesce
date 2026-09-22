/**
 * @file src/utils/cleanHtml.tsx
 * @description HTML etiketlerini ve entity'leri temizleyerek düz metne çevirir.
 *
 * ADR-P4-005: SourceContentNormalizer tarafından çağrılır.
 * Bağımlılık yok — server + client güvenli.
 */

const ENTITY_MAP: Record<string, string> = {
  '&nbsp;': ' ',
  '&amp;': '&',
  '&lt;': '<',
  '&gt;': '>',
  '&quot;': '"',
  '&#39;': "'",
  '&apos;': "'",
  '&cent;': '¢',
  '&pound;': '£',
  '&yen;': '¥',
  '&euro;': '€',
  '&copy;': '©',
  '&reg;': '®',
};

/**
 * HTML etiketlerini ve entity'leri temizleyerek düz metne çevirir.
 *
 * @example
 * temizleHtml("<div style='margin-left:1em'>псы,</div>")
 * // → "псы,"
 *
 * temizleHtml("<div>a</div><div>b</div>")
 * // → "a\nb"
 */
export function temizleHtml(html: string): string {
  if (!html || typeof html !== 'string') {
    return '';
  }

  // 1. Blok etiketlerini yeni satıra çevir
  let text = html
    .replace(/<\/(?:h[1-6]|p|div|li|tr)>/gi, '\n')
    .replace(/<br\s*\/?>/gi, '\n');

  // 2. Kalan tüm HTML etiketlerini sil
  text = text.replace(/<[^>]*>/g, '');

  // 3. HTML entity'leri çöz
  text = text.replace(/&[a-zA-Z0-9#]+;/g, (entity) => {
    if (ENTITY_MAP[entity]) {
      return ENTITY_MAP[entity];
    }

    if (entity.startsWith('&#')) {
      const isHex = entity.startsWith('&#x') || entity.startsWith('&#X');
      const code = isHex
        ? parseInt(entity.slice(3, -1), 16)
        : parseInt(entity.slice(2, -1), 10);
      return !isNaN(code) ? String.fromCharCode(code) : entity;
    }

    return entity;
  });

  // 4. Fazla boşlukları ve satır sonlarını düzenle
  return text
    .replace(/[ \t]+/g, ' ')
    .replace(/\n\s*\n/g, '\n\n')
    .trim();
}