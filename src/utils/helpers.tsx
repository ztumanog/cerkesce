// src/utils/helpers.tsx

/**
 * Nullable veya tanımsız metinleri güvenle temizleyen ve boş dizeye düşüren yardımcı fonksiyon.
 * TS2345 hatasını engellemek için dönüş daima kesin tipli `string` olarak mühürlenir.
 */
export function sanitizeString(value: string | undefined | null): string {
  if (value === undefined || value === null) {
    return '';
  }
  return value.trim();
}

/**
 * Dizi indekslerini ve token erişimlerini güvenli daraltan yardımcı fonksiyon.
 * Satır 203, 204 ve 214 üzerindeki TS2532 ("Object is possibly undefined") hatalarını çözer.
 */
export function resolveDictionaryTokens(
  tokens: ReadonlyArray<string> | undefined
): { readonly firstToken: string; readonly secondaryToken: string; readonly compositeToken: string } {
  if (!tokens || tokens.length === 0) {
    return { firstToken: '', secondaryToken: '', compositeToken: '' };
  }

  // noUncheckedIndexedAccess aktifken dizi elemanları `T | undefined` döner.
  const rawFirst = tokens[0];
  const rawSecond = tokens[1];

  const firstToken = rawFirst !== undefined ? rawFirst.toLowerCase().trim() : '';
  const secondaryToken = rawSecond !== undefined ? rawSecond.toLowerCase().trim() : '';

  const compositeToken =
    rawFirst !== undefined && rawSecond !== undefined
      ? `${firstToken}_${secondaryToken}`
      : firstToken;

  return {
    firstToken,
    secondaryToken,
    compositeToken,
  };
}

/**
 * Fonetik ve lemma biçimlendirme fonksiyonu.
 * Satır 291 üzerindeki TS2345 ("string | undefined is not assignable to string") hatasını çözer.
 */
export function formatCircassianLemma(
  rawLemma: string | undefined,
  prefix: string | undefined
): string {
  const safeLemma = sanitizeString(rawLemma);
  const safePrefix = sanitizeString(prefix);

  if (safePrefix.length > 0) {
    return `${safePrefix}-${safeLemma}`;
  }

  return safeLemma;
}
// Any türündeki veya obje/dizi yapısındaki veriyi güvenli string'e çevirir
export function metneCevir(deger: unknown): string {
  if (deger === null || deger === undefined) return '';
  if (typeof deger === 'string') return deger;
  if (Array.isArray(deger)) return deger.join(', ');
  if (typeof deger === 'object') return JSON.stringify(deger);
  return String(deger);
}

// Kaynak metinlerini biçimlendirmek için kullanılır
export function kaynagiDuzenle(kaynak?: string): string {
  if (!kaynak) return 'Bilinmeyen Kaynak';
  return kaynak.trim();
}