// src/domain/linguistic/DialectConverter.ts



export type DialectPair = readonly [adyghe: string, kabardian: string];

import { HUVAJ_ADY_TO_KBD, HUVAJ_KBD_TO_ADY } from "./huvajLexicon";

const PALOCHKA = "\u04C0"; // Ӏ

/**
 * Doğrulanmış Adıgece–Kabardeyce çiftleri.
 */
export const VERIFIED_PAIRS: readonly DialectPair[] = [
  ["о", "уэ"], ["тэ", "дэ"], ["шъо", "фэ"], ["цу", "вы"], 
  ["шӀуэ", "фӀы"], ["машӀуэ", "мафӀэ"], ["фабэ", "хуабэ"], 
  ["мафэ", "махуэ"], ["Ӏуфын", "Ӏухун"]
] as const;

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

  convertWord(word: string): string {
    const key = normalizeKey(word);
    const exactMatch = this.adyToKbd.get(key);
    if (exactMatch) return exactMatch;
    return convertAdyToKbd(word);
  }

  convertWordReverse(word: string): string {
    const key = normalizeKey(word);
    const exactMatch = this.kbdToAdy.get(key);
    if (exactMatch) return exactMatch;
    return convertKbdToAdy(word);
  }
}

// ---------------------------------------------------------
// SAF KURAL MOTORU - YAMALANMIŞ VE DÜZELTİLMİŞ SÜRÜM
// ---------------------------------------------------------

const EXACT: Record<string, string> = {
  "о": "уэ", "тэ": "дэ", "шъо": "фэ", "цуы": "вы", "цу": "вы",
  "цуынды": "вынд", "жъуагъуэ": "вагъуэ", "куэцы": "гуэдз",
  "гъупчъэ": "гъубжэ", "хьандзу": "хьэвэ", "шӀуэ": "фӀы", "машӀуэ": "мафӀэ",
  "чъыгы": "жыг", "гъо": "гъуэ", "ко": "куэ", "мэлы": "мэл",
  "гукӀэгъу": "гущӀэгъу", "гупшысэ": "гупсысэ", "шъхьащэ": "щхьэшэ",
  "нэшъу": "нэф", "гушӀо": "гуфӀэ", "фыжьы": "хужь", "машӀо": "мафӀэ",
  "къэушъорэзыхь": "къэуфэрэзыхь", "амдэз": "андез",
  "абэдзабзэ": "абазэбзэ", "абдзах": "абэдзэхэ", "хьаолый": "хьэулей",
  "тецохъон": "тепщхьэн", "егъэлые": "егъэлей", "егъэлыен": "егъэлеин",
  "гуао": "гуауэ", "фэмыӏаз": "хуэмыӏэзэ", "фэмысагъ": "хуэмыса",
  "тегъолъхьан": "тегъуэлъхьэн", "абадзэ": "абазэ", "къэуцухь": "къэувыхь",
  "хыгучӏ": "хыгущӏ", "лыпцэ": "лыпцӏэ", "цэ": "дзэ",
  "мэлэкӏэн": "мэжэлӏэн", "пчъагъ": "бжыгъэ", "пкъыцэ": "хьэдзэ",
  "пӏэлъэгъурыщэф": "пӏалъэгъурыщэху",
  "адыгэ": "апс", "къоеплъыжь": "кхъуейплъыжь", "мэтэкъуай": "матэкхъуей",
  "цӏэпапкӏ": "цӏэпапщӏэ", "фэгъэгъу": "хуэгъэгъу", "зэтедыен": "зэтедиен",
  "афэгъэгъун": "яхуэгъэгъун",
  "къо": "кхъуэ", "къухьэ": "кхъухь", "къухьэлъатэ": "кхъухьлъатэ",
  "къухьэтет": "кхъухьтет", "лъэгъун": "лъагъун", "лъэгъуныгъэ": "лъагъуныгъэ",
  "фэгъэгъун": "хуэгъэгъун", "ныбджэгъу": "ныбжьэгъу",
  "кӏэтых": "щӏэтхэщ", "шэнышӏу": "щэныфӏэ", "шэнышӏуагъ": "щэныфӏагъэ",
  "нэхъой": "нэхъуей", "адыгэй": "адыгей", "гъэшӏэгъоны": "гъэщӏэгъуэн",
  "унагъо": "унагъуэ", "иеу": "ейуэ", "ий": "ейщ",
  "шэныдж": "щэныджэ", "шэный": "щэнӏей", "нэпэнчъ": "напэншэ",
  "нэхъоинчъ": "нэхъуеиншэ", "тегы": "тегъуэ",
  "фэшӏ": "хуэщӏ", "фэшӏу": "хуэфӏ", "фэшӏэу": "хуэщӏыу", "фэшӏоу": "хуэфӏыу",
  "лӏыкӏо": "лӏыкӏуэ", "тӏэсхъэчӏэх": "тӏасхъэщӏэх",
  "теуфагъ": "теухуа", "теуфагъэу": "теухуауэ",
  "къысфэжъугъэгъу": "къысхуэвгъэгъу",
};

export function convertAdyToKbd(word: string): string {
  let w = word.trim();
  if (EXACT[w]) return EXACT[w];
  // HIBRIT: once Huvaj lexicon (4865 cift), bulamazsa kural motoru
  if (HUVAJ_ADY_TO_KBD[w]) return HUVAJ_ADY_TO_KBD[w];
  if (EXACT[w.toLowerCase()]) { 
    const v = EXACT[w.toLowerCase()]; 
    return w[0] === w[0].toUpperCase() ? v[0].toUpperCase() + v.slice(1) : v; 
  }
  
  let c = w;
  
  // 1. KORUMALI MASKELER (Spesifik olanlar önce çalışmalı)
  c = c.replace(/ч[Ӏӏ]/g, "щӀ"); // чӏ -> щӏ (genel kural, kelime basi + ortasi)
  c = c.replace(/^фэ(?=[птщшчцкбгдзжх])/, "___MASK_FE___");
  c = c.replace(/^шъо(?=[-кӀщшф])/, "___MASK_SHO___");
  
  // YENİ: шӀо -> фӀэ (Eskiden шӀ kuralına takılıp щӀо oluyordu)
  c = c.replace(/шӀо/g, "___MASK_F1E___"); 
  
  // YENİ: Ortadaki шъо -> фэ (Raw 'фэ' bırakırsak aşağıdaki /ф/ kuralı bunu 'хуэ' yapar)
  c = c.replace(/шъо/g, "___MASK_FE_MID___"); 
  
  c = c.replace(/^шъуы(?=[-кӀщшф])/, "___MASK_SHU___");
  c = c.replace(/^ты(?=[-кӀщшф])/, "___MASK_TY___");
  
  // YENİ: шъу -> ф (Raw 'ф' bırakırsak ху olur, o yüzden maskeliyoruz)
  c = c.replace(/шъуызы$/, "___MASK_FYZ___"); // шъузы -> фыз
  c = c.replace(/шъуы/g, "___MASK_FY___");
  c = c.replace(/шъу/g, "___MASK_F___");

  // шӀу -> фӀы vb.
  c = c.replace(/шӀуэ/g, "___MASK_F1Y___");
  c = c.replace(/шӀу/g, "___MASK_F1Y___");
  c = c.replace(/шӀэ/g, "___MASK_S1E___");
  c = c.replace(/шӀы/g, "___MASK_S1Y___");
  c = c.replace(/шӀ/g, "___MASK_S1___");

  // HUVAJ: 3 guvenli kural (2026-11-10)
  // 1) Kelime basi кӏ -> щӏ (30 degisen / 5 kalan, %86). Ortadaki кӏ karisik, genel yapilmaz.
  c = c.replace(/^кӏ/g, "щӏ");
  // 2) чъ -> ж (9 cift, or: чъэхын -> жэхын). Ters yon genel yapilmaz (KBD ж cogunlukla ж kalir).
  c = c.replace(/чъ/g, "ж");
  // 3) шы -> щы (16 cift, or: ӏушы -> ӏущ, пшын -> пщын).
  c = c.replace(/шы$/g, "щ"); // HUVAJ: kelime sonu шы -> щ (or: ӏушы -> ӏущ)
  c = c.replace(/шы$/g, "щ"); // HUVAJ: kelime sonu шы -> щ (or: ӏушы -> ӏущ)
  c = c.replace(/шы/g, "щы"); // HUVAJ: ortadaki шы -> щы (or: пшын -> пщын)

  // 2. STANDART DÖNÜŞÜMLER
  c = c.replace(/фын$/, "хун");
  c = c.replace(/агъ$/, "ащ");
  c = c.replace(/жъуэ/g, "вэ");
  c = c.replace(/жъу/g, "в");
  c = c.replace(/\bцуы\b/g, "вы");
  c = c.replace(/\bцу\b/g, "вы");
  c = c.replace(/-щт$/, "-нщ");
  c = c.replace(/щт$/, "нщ");
  
  c = c.replace(/о(?=[ндбгтпзсжк])/g, "уэ"); 
  c = c.replace(/офы$/, "уэху");

  // 'ф' ezici kuralı. (Maskelediğimiz yeni 'ф'ler buraya takılmayacak ve korunacak)
  c = c.replace(/фы$/, "ху");
  c = c.replace(/ф/g, "ху");

  // 3. KALINTI VE GENEL KURALLAR
  c = c.replace(/шъ/g, "щ"); // шъу artık maskelendiği için buraya sadece yalın шъ takılır
  c = c.replace(/дз/g, "з"); 
  c = c.replace(/мд/g, "нд"); 
  c = c.replace(/ао/g, "эу"); 
  c = c.replace(/чъ/g, "ж"); 
  c = c.replace(/жъ/g, "жь");

  // 4. MASKELERİ ÇÖZ
  c = c.replace(/___MASK_F1Y___/g, "фӀы");
  c = c.replace(/___MASK_F1E___/g, "фӀэ"); // Çözüm: шӀо -> фӀэ
  c = c.replace(/___MASK_S1E___/g, "щӀэ");
  c = c.replace(/___MASK_S1Y___/g, "щӀы");
  c = c.replace(/___MASK_S1___/g, "щӀ");
  c = c.replace(/___MASK_FE___/g, "фӀэ");
  c = c.replace(/___MASK_FE_MID___/g, "фэ"); // Çözüm: шъо -> фэ
  c = c.replace(/___MASK_SHO___/g, "фэ");
  c = c.replace(/___MASK_SHU___/g, "фы");
  c = c.replace(/___MASK_FYZ___/g, "фыз");   // Çözüm: шъузы -> фыз
  c = c.replace(/___MASK_FY___/g, "фы");
  c = c.replace(/___MASK_F___/g, "ф");       // Çözüm: шъу -> ф
  c = c.replace(/___MASK_TY___/g, "ды");

  c = c.replace(/хуы(?=[нмзстдкпбг]|$)/g, "ху");

  return c;
}

export function convertKbdToAdy(word: string): string {
  let w = word.trim();
  const REV: Record<string, string> = { "уэ": "о", "дэ": "тэ", "фэ": "шъо", "вы": "цу", "фӀы": "шӀуэ", "мафӀэ": "машӀо", "фы": "шы",
  "андез": "амдэз", "абэдзэхэ": "абдзах",
  "хьэулей": "хьаолый", "тепщхьэн": "тецохъон", "егъэлей": "егъэлые",
  "егъэлеин": "егъэлыен", "къэуфэрэзыхь": "къэушъорэзыхь",
  "гуауэ": "гуао", "хуэмыӏэзэ": "фэмыӏаз", "хуэмыса": "фэмысагъ",
  "тегъуэлъхьэн": "тегъолъхьан", "абазэ": "абадзэ", "къэувыхь": "къэуцухь",
  "хыгущӏ": "хыгучӏ", "лыпцӏэ": "лыпцэ", "дзэ": "цэ",
  "мэжэлӏэн": "мэлэкӏэн", "бжыгъэ": "пчъагъ", "хьэдзэ": "пкъыцэ",
  "пӏалъэгъурыщэху": "пӏэлъэгъурыщэф", "жыг": "чъыгы", "гъуэ": "гъо", "куэ": "ко", "мэл": "мэлы",
  "гущӀэгъу": "гукӀэгъу",  "щхьэшэ": "шъхьащэ",
  "нэф": "нэшъу", "гуфӀэ": "гушӀо", "хужь": "фыжьы", "апс": "адыгэ", "кхъуейплъыжь": "къоеплъыжь", "матэкхъуей": "мэтэкъуай",
  "цӏэпапщӏэ": "цӏэпапкӏ", "хуэгъэгъу": "фэгъэгъу", "зэтедиен": "зэтедыен",
  "яхуэгъэгъун": "афэгъэгъун",
  "кхъуэ": "къо", "кхъухь": "къухьэ", 
  "кхъухьтет": "къухьэтет", "лъагъун": "лъэгъун", "лъагъуныгъэ": "лъэгъуныгъэ",
  "хуэгъэгъун": "фэгъэгъун", "ныбжьэгъу": "ныбджэгъу",
  "щӏэтхэщ": "кӏэтых", "щэныфӏэ": "шэнышӏу", "щэныфӏагъэ": "шэнышӏуагъ",
  "нэхъуей": "нэхъой", "адыгей": "адыгэй", "гъэщӏэгъуэн": "гъэшӏэгъоны",
  "абазэбзэ": "абэдзабзэ",
  "унагъуэ": "унагъо", "ейуэ": "иеу", "ейщ": "ий",
  "щэныджэ": "шэныдж", "щэнӏей": "шэный", "напэншэ": "нэпэнчъ",
  "нэхъуеиншэ": "нэхъоинчъ",
  "хуэщӏ": "фэшӏ", "хуэфӏ": "фэшӏу", "хуэщӏыу": "фэшӏэу", "хуэфӏыу": "фэшӏоу",
  "лӏыкӏуэ": "лӏыкӏо", "тӏасхъэщӏэх": "тӏэсхъэчӏэх",
  "теухуа": "теуфагъ", "теухуауэ": "теуфагъэу",
  "къысхуэвгъэгъу": "къысфэжъугъэгъу",
  };
  if (REV[w]) return REV[w];
  // HIBRIT: once Huvaj lexicon (ters yon)
  if (HUVAJ_KBD_TO_ADY[w]) return HUVAJ_KBD_TO_ADY[w];
  
  let c = w;
  c = c.replace(/къэу/g, "___MASK_QEU___"); // къэу iki lehcede ayni, эу->ао bozmasin
  c = c.replace(/эу/g, "ао");
  c = c.replace(/нд/g, "мд");
  c = c.replace(/уэ(?=[ндбгтпзсжк])/g, "о");
  c = c.replace(/^ва/, "жъуа"); 
  c = c.replace(/хуабэ/g, "фабэ");
  c = c.replace(/махуэ/g, "мафэ");
  c = c.replace(/хун$/g, "фын");

  // YENİ: Ters yönde desteklenmeyen senaryolar onarıldı
  c = c.replace(/фӀэ/g, "шӀо"); // Kbd: фӀэ -> Ady: шӀо
  c = c.replace(/фыз/g, "шъуз");
  c = c.replace(/фы$/g, "шъуы");

  c = c.replace(/щ[Ӏӏ]э/g, "чӏэ"); // HUVAJ-180: KBD щӏэ -> ADY чӏэ
  c = c.replace(/щ[Ӏӏ]ы/g, "чӏы"); // HUVAJ-180: KBD щӏы -> ADY чӏы
  c = c.replace(/щ[Ӏӏ]/g, "чӏ"); // HUVAJ-180: KBD щӏ -> ADY чӏ (щ->шъ kuralindan ONCE)
  c = c.replace(/фӀы/g, "шӀуэ");
  // HUVAJ TERS: жын->чъын (7/0), жэхын->чъэхын (4), щы->шы (12). Hepsi щ->шъ'den ONCE.
  c = c.replace(/жэхын/g, "чъэхын");
  c = c.replace(/жэх/g, "чъэх");
  c = c.replace(/жын/g, "чъын");
  c = c.replace(/щы/g, "шы");

  c = c.replace(/щ/g, "шъ");
  c = c.replace(/жь/g, "жъ");
  c = c.replace(/ху/g, "ф");
  c = c.replace(/нщ$/g, "щт");
  c = c.replace(/^ды/g, "ты");
  c = c.replace(/___MASK_QEU___/g, "къэу"); // maskeyi ac
  c = c.replace(/^фэ/g, "шъо");
  
  return c;
}
