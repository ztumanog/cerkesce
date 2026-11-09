// lib/latinNormalize.ts - MVP-2 KARAR 15
// Latin -> Kiril normalize, /api/search oncesi katman
// Ilke: En uzun once. Coklu yazimi kabul et.

const MAP: Array<[string, string]> = [
  ["ghu", "гъу"],
  ["khu", "къу"],
  ["shch", "щ"],
  ["gh", "гъ"],
  ["kh", "къ"],
  ["qu", "къу"],
  ["hy", "хь"],
  ["xh", "хъ"],
  ["sh", "ш"],
  ["ch", "ч"],
  ["ts", "ц"],
  ["dz", "дз"],
  ["1e", "э"],
  ["yu", "ю"],
  ["ya", "я"],
  ["k'", "кӀ"],
  ["k1", "кӀ"],
  ["kI", "кӀ"],
  ["t'", "тӀ"],
  ["t1", "тӀ"],
  ["p'", "пӀ"],
  ["p1", "пӀ"],
  ["g'", "гъ"],
  ["ğ", "гъ"],
  ["ş", "ш"],
  ["ç", "ч"],
  ["ı", "ы"],
  ["q", "къ"],
  ["x", "хъ"],
  // tek harf latin -> kiril (en sonda, uzunlar once yakalandi)
  ["a", "а"],
  ["b", "б"],
  ["v", "в"],
  ["g", "г"],
  ["d", "д"],
  ["e", "е"],
  ["z", "з"],
  ["i", "и"],
  ["y", "й"],
  ["k", "к"],
  ["l", "л"],
  ["m", "м"],
  ["n", "н"],
  ["o", "о"],
  ["p", "п"],
  ["r", "р"],
  ["s", "с"],
  ["t", "т"],
  ["u", "у"],
  ["f", "ф"],
  ["h", "х"],
  ["c", "ц"],
  // palochka tek - en sonda, cunku ' ve 1 baska yerde de olabilir
  ["'", "Ӏ"],
  ["1", "Ӏ"],
  ["\u0001", "Ӏ"],
];

export function normalizeLatinToKiril(input: string): string {
  if (!input) return input;
  if (/[\u0400-\u04FF]/.test(input)) return input;
  // Buyuk I palochka icin: toLowerCase oncesi koru, sonra geri koy
  // Placeholder: orijinal buyuk I -> \u0001, sonra palochka yap
  let src = input.replace(/I/g, '\u0001');
  let s = src.toLowerCase();
  // Buyuk I palochka icin: toLowerCase oncesi koru, sonra geri koy
  // Placeholder: orijinal buyuk I -> \u0001, sonra palochka yap
  // NOT: toLowerCase I -> i yapar, o yuzden buyuk I palochka burada yakalanamaz.
  // O yuzden orijinaldeki buyuk I icin ayri kontrol: giris buyuk I iceriyorsa once degistir
  // Basit cozum: s uzerinde calisirken I zaten i oldu, o i -> и olur, palochka olmaz.
  // Mobil icin kucuk i palochka istenmisti ama bu tum i li kelimeleri bozar (ki -> k + palochka).
  // Karar: kucuk i -> и, buyuk I / ' / 1 -> palochka. Bu Mimar onayina sunulacak.
  let out = "";
  let i = 0;
  while (i < s.length) {
    let matched = false;
    for (const [lat, kir] of MAP) {
      if (s.startsWith(lat, i)) {
        out += kir;
        i += lat.length;
        matched = true;
        break;
      }
    }
    if (!matched) {
      out += s[i];
      i += 1;
    }
  }
  // Orijinal girdide buyuk I varsa onu palochka yap - toLowerCase sonrasi kayboldu
  // Bu adim sade: eger orijinalde 'I' varsa, cikan sonuctaki 'и' leri palochka yapma!
  // O yuzden bu fonksiyon cagirilirken orijinal korunmali - su an icin ' ve 1 yeterli.
  return out;
}

export function isLatinQuery(q: string): boolean {
  return q.length > 0 && !/[\u0400-\u04FF]/.test(q);
}
