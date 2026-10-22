import pairsData from "../../../public/data/linguistic/dialect_pairs.json";

export type DialectPair = readonly [adyghe: string, kabardian: string];

const PALOCHKA = "\u04C0"; // Ӏ

interface DialectPairRecord {
  ady: string;
  kbd: string;
}

interface DialectPairsFile {
  version: number;
  sources: string[];
  note?: string;
  pairs: DialectPairRecord[];
}

/**
 * Doğrulanmış Adıgece–Kabardeyce çiftleri.
 * Veri: public/data/linguistic/dialect_pairs.json (koda gömülü değil).
 * Dosya geçersizse sessizce boş listeyle devam etmez, hata fırlatır.
 */
function loadPairs(data: unknown): readonly DialectPair[] {
  const file = data as Partial<DialectPairsFile> | null;
  if (!file || !Array.isArray(file.pairs) || file.pairs.length === 0) {
    throw new Error("dialect_pairs.json: 'pairs' alanı boş veya geçersiz");
  }
  return file.pairs.map((p, i): DialectPair => {
    if (typeof p?.ady !== "string" || typeof p?.kbd !== "string" || !p.ady.trim() || !p.kbd.trim()) {
      throw new Error(`dialect_pairs.json: ${i}. kayıt geçersiz`);
    }
    return [p.ady, p.kbd] as const;
  });
}

export const VERIFIED_PAIRS: readonly DialectPair[] = loadPairs(pairsData);
export const PAIR_SOURCES: readonly string[] = (pairsData as DialectPairsFile).sources ?? [];

/**
 * Palochka varyantlarını tek biçime getirir:
 * Latin i/I, Ukraynaca І (U+0406), ӏ (U+04CF) -> Ӏ (U+04C0)
 */
function normalizeKey(input: string): string {
  return input
    .normalize("NFC")
    .trim()
    .toLowerCase()
    .replace(/[iI\u0406\u04CF]/g, PALOCHKA);
}

export class DialectConverter {
  private readonly adyToKbd = new Map<string, string>();
  private readonly kbdToAdy = new Map<string, string>();

  constructor(pairs: readonly DialectPair[] = VERIFIED_PAIRS) {
    for (const [ady, kbd] of pairs) {
      this.adyToKbd.set(normalizeKey(ady), kbd);
      const kbdKey = normalizeKey(kbd);
      if (!this.kbdToAdy.has(kbdKey)) {
        this.kbdToAdy.set(kbdKey, ady);
      }
    }
  }

  /**
   * Adıgece -> Kabardeyce dönüşümü
   * 1. Önce VERIFIED_PAIRS listesine bakar (tam eşleşme).
   * 2. Eşleşme yoksa, "o" harfini "уэ" ile değiştirir (Adıgece'de "o", Kabardeyce'de "уэ" olur).
   */
  convertWord(word: string): string {
    const key = normalizeKey(word);
    const exactMatch = this.adyToKbd.get(key);
    if (exactMatch) return exactMatch;

    // Tam eşleşme yoksa otomatik "o -> уэ" kuralını uygula
    // Örnek: "мафIохъу" -> "мафIуэхъу"
    return word.replace(/о/gi, "уэ").replace(/o/gi, "уэ");
  }

  /**
   * Kabardeyce -> Adıgece dönüşümü
   */
  convertWordReverse(word: string): string {
    const key = normalizeKey(word);
    const exactMatch = this.kbdToAdy.get(key);
    if (exactMatch) return exactMatch;

    // Tam eşleşme yoksa otomatik "уэ -> o" kuralını uygula
    return word.replace(/уэ/gi, "о").replace(/уэ/gi, "о");
  }
}

