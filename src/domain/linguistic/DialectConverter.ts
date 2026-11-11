import { convertAdyToKbd, convertKbdToAdy } from "@/lib/dialectConverter";

export type DialectPair = readonly [adyghe: string, kabardian: string];

const PALOCHKA = "\u04C0"; // Ӏ





/**
 * Doğrulanmış Adıgece–Kabardeyce çiftleri.
 * Veri: public/data/linguistic/dialect_pairs.json (koda gömülü değil).
 * Dosya geçersizse sessizce boş listeyle devam etmez, hata fırlatır.
 */
// loadPairs kaldirildi - JSON'suz, VERIFIED_PAIRS kod icinde

export const VERIFIED_PAIRS: readonly DialectPair[] = [["о", "уэ"], ["тэ", "дэ"], ["шъо", "фэ"], ["цу", "вы"], ["шӀуэ", "фӀы"], ["машӀуэ", "мафӀэ"], ["фабэ", "хуабэ"], ["мафэ", "махуэ"], ["Ӏуфын", "Ӏухун"]] as const;
export const PAIR_SOURCES: readonly string[] = ["Kod ici saf kural motoru"];

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

    // Tam eslesme yoksa saf kural motorunu kullan (JSON'suz, kod ici kurallar)
    // Ornek: "фабэ" -> "хуабэ", "шъхьэ" -> "щхьэ", "Ӏуфын" -> "Ӏухун"
    return convertAdyToKbd(word);
  }

  /**
   * Kabardeyce -> Adıgece dönüşümü
   */
  convertWordReverse(word: string): string {
    
    
    const key = normalizeKey(word);
    const exactMatch = this.kbdToAdy.get(key);
    if (exactMatch) return exactMatch;

    // Tam eslesme yoksa saf kural motoru (ters yon)
    return convertKbdToAdy(word);
  }
}
