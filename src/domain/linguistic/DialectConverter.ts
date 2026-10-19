export type DialectPair = readonly [adyghe: string, kabardian: string];

const PALOCHKA = "\u04C0"; // Ӏ

/**
 * Doğrulanmış Adıgece–Kabardeyce çiftleri (37).
 * Kaynak: Huvaj, AP, Ara, AIG, Ru&En, En_Adam, ThreeVolumes, Tharkaho, Jonty, 1960, Sukunov.
 * Not: Çoğu çift tek sözlükte iki formun birlikte geçmesine dayanır; anlam doğrulaması değildir.
 */
export const VERIFIED_PAIRS: readonly DialectPair[] = [
  ["чъыгы", "жыг"],
  ["фэщхъуныгъэ", "фӀэщхъуныгъэ"],
  ["фабэ", "хуабэ"],
  ["мафэ", "махуэ"],
  ["Ӏофы", "Ӏуэху"],
  ["цӀыфы", "цӀыху"],
  ["бжьыныф", "бжьыныху"],
  ["тэ", "дэ"],
  ["шъхьэ", "щхьэ"],
  ["дышъэ", "дыщэ"],
  ["шъынэ", "щынэ"],
  ["шъабэ", "щабэ"],
  ["жъы", "жьы"],
  ["бжъэ", "бжьэ"],
  ["жъэн", "жьэн"],
  ["шӀын", "щӀын"],
  ["шӀэн", "щӀэн"],
  ["гъашӀэ", "гъащӀэ"],
  ["о", "уэ"],
  ["он", "уэн"],
  ["од", "уэд"],
  ["кӀон", "кӀуэн"],
  ["Ӏотэн", "Ӏуэтэн"],
  ["гъо", "гъуэ"],
  ["ко", "куэ"],
  ["мэлы", "мэл"],
  ["гукӀэгъу", "гущӀэгъу"],
  ["гупшысэ", "гупсысэ"],
  ["шъхьащэ", "щхьэшэ"],
  ["нэф", "нэху"],
  ["нэшъу", "нэф"],
  ["шъыпкъэ", "щыпкъэ"],
  ["гушӀо", "гуфӀэ"],
  ["цуы", "вы"],
  ["жъуэн", "вэн"],
  ["жъуагъуэ", "вагъуэ"],
  ["фыжьы", "хужь"],
];

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

  convertWord(word: string): string {
    return this.adyToKbd.get(normalizeKey(word)) ?? word;
  }

  convertWordReverse(word: string): string {
    return this.kbdToAdy.get(normalizeKey(word)) ?? word;
  }
}
