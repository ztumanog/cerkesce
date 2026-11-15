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

/**
 * Veri temizliği için: HTML etiketlerini SİLER, iç metni bırakır.
 * temizleHtml'den farklı: o render için etiketi KORUR, bu veri için SİLER.
 * <<...>> çapraz göndermelere dokunmaz, boş kalırsa "" döner.
 */
export function stripHtmlTags(html: string): string {
  if (!html || typeof html !== "string") return "";
  // <<...>> koruması: geçici yer tutucu
  const placeholders: string[] = [];
  let text = html.replace(/<<[^>]+>>/g, (m) => {
    placeholders.push(m);
    return `__CROSSREF_${placeholders.length - 1}__`;
  });
  // Gerçek HTML etiketleri: <div, </div, <font ..., yarım </d, <b vb.
  text = text.replace(/<\s*\/?\s*(div|font|span|i|b|br|p|a|u)(?:\s[^<>]*)?\/?>?|<\/\s*(d|di|div|fon|font|sp|spa|span)\s*$/gi, "");
  placeholders.forEach((orig, i) => {
    text = text.replace(`__CROSSREF_${i}__`, orig);
  });
  return text.replace(/[ \t]+/g, " ").trim();
}
