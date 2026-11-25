/**
 * Günün Kelimesi veri kaynağı — Gunun-Kelimesi-001.
 *
 * Havuz build-time üretilir: `node scripts/build-gunun-kelimeleri.mjs`
 * → public/data/gunun-kelimeleri.json (SSOT + Abaze İbrahim, normalize edilmiş).
 * Kart istemcide yalnız bu küçük dosyayı indirir — 58 MB'lık lexemes.json değil.
 */

import type { RawDictionaryEntry } from '@/utils/dailyWordEngine';

const HAVUZ_DOSYASI = '/data/gunun-kelimeleri.json';

interface HavuzDosyasi {
  version: string;
  aciklama?: string;
  ssot?: RawDictionaryEntry[];
  abaze?: RawDictionaryEntry[];
}

/**
 * Birleşik günün kelimesi havuzunu yükler.
 * SSOT (çevirili örnek çiftleriyle) + Abaze İbrahim örnekli maddeleri.
 * Dosya yoksa/bozuksa boş döner — bileşen yerleşik yedek listesine düşer.
 */
export async function gununKelimesiHavuzuYukle(): Promise<RawDictionaryEntry[]> {
  const response = await fetch(HAVUZ_DOSYASI);
  if (!response.ok) {
    throw new Error(`Günün kelimesi havuzu yüklenemedi: ${response.status}`);
  }

  const data = (await response.json()) as HavuzDosyasi;
  const ssot = Array.isArray(data.ssot) ? data.ssot : [];
  const abaze = Array.isArray(data.abaze) ? data.abaze : [];

  // SSOT önde: seçim motoru örnekli adayları zaten önceliklendirir
  return [...ssot, ...abaze];
}
