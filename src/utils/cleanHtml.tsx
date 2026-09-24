/**
 * @file src/utils/cleanHtml.tsx
 * @description HTML entity'lerini cozer, HTML etiketlerini KORUR.
 * ADR-P4-005 + Direct Render: HTML dogrudan render edilir.
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

export function temizleHtml(html: string): string {
  if (!html || typeof html !== 'string') {
    return '';
  }

  let text = html;

  // 1. Entity cozumle (AMA &lt; ve &gt; KORUNUR - HTML icin gerekli)
  text = text.replace(/&[a-zA-Z0-9#]+;/g, (entity) => {
    // &lt; ve &gt; KORUNUR - bunlar HTML entity olarak kalmali
    if (entity === '&lt;' || entity === '&gt;') {
      return entity;
    }
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

  // 2. Fazla bosluklari temizle (AMA HTML KORUNUR)
  text = text.replace(/[ \t]+/g, ' ').trim();

  return text;
}
