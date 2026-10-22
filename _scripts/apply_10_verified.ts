import * as fs from "fs";

const LEXICON = "public/data/linguistic/lexemes.json";

type Entry = {
  tr: string; en: string; ar: string; ru: string;
  root: string; family: string; concept: string;
};

const data: Record<string, Entry> = {
  "щхьэгу": {
    tr: "Başın tepesi, baş tacı", en: "Crown of the head, top of the head",
    ar: "قمة الرأس / هامة", ru: "Макушка / темечко",
    root: "щхьэ + гу", family: "East Circassian (Kabardian)", concept: "Anatomy / Body Part"
  },
  "Ӏэгу": {
    tr: "Avuç içi, el ayası", en: "Palm of the hand",
    ar: "راحة اليد / كَفّ", ru: "Ладонь",
    root: "Ӏэ + гу", family: "Common Circassian", concept: "Anatomy / Body Part"
  },
  "анэш": {
    tr: "Dayı (annenin erkek kardeşi)", en: "Maternal uncle",
    ar: "خال (أخ الأم)", ru: "Дядя (по матери)",
    root: "анэ + ш", family: "Common Circassian", concept: "Kinship / Family"
  },
  "лъэныкъо": {
    tr: "Taraf, yön, kenar, bölge", en: "Side, direction, region, aspect",
    ar: "جانب / ناحية / طرف", ru: "Сторона / направление / край",
    root: "лъэ + ныкъо", family: "West Circassian (Adyghe)", concept: "Spatial / Direction"
  },
  "пкъыгъу": {
    tr: "Mevsim, cisim, unsur/bileşen", en: "Season, element, component, object",
    ar: "فَصْل / جِسْم / عُنْصُر", ru: "Время года / элемент / предмет",
    root: "пкъы + -гъуэ", family: "Common Circassian", concept: "Time / Nature / Element"
  },
  "нэщхъ": {
    tr: "Üzgün, kederli, suratsız", en: "Sad, gloomy, melancholy",
    ar: "حزين / كئيب", ru: "Печальный / грустный",
    root: "нэ + щхъ", family: "Common Circassian", concept: "Emotion / Quality"
  },
  "гушхуэ": {
    tr: "Özgüven, cesaret, yüreklilik", en: "Confidence, courage, bravery",
    ar: "ثقة / شجاعة", ru: "Смелость / уверенность",
    root: "гу + шхуэ", family: "East Circassian (Kabardian)", concept: "Emotion / Character"
  },
  "пэпцӀ": {
    tr: "Sivri uçlu, sivri burunlu", en: "Pointed, sharp-tipped",
    ar: "مُدَبَّب / حَادّ الطَّرَف", ru: "Заостренный / остроконечный",
    root: "пэ + пцӀ", family: "Common Circassian", concept: "Shape / Attribute"
  },
  "цыджан": {
    tr: "Yün hırka, yün kazak", en: "Woolen sweater, wool jacket",
    ar: "سُترة صوفية", ru: "Шерстяной свитер / кофта",
    root: "цы + джанэ", family: "Common Circassian", concept: "Clothing / Material"
  },
  "хьэзырыпс": {
    tr: "Gönüllü olarak, seve seve, amade", en: "Voluntarily, willingly, obediently",
    ar: "طَوْعاً / بِكُلِّ طَاعَة", ru: "Охотно / добровольно",
    root: "хьэзыр + псэ", family: "Common Circassian", concept: "Manner / Adverb"
  }
};

console.log("[1/3] Yukleniyor...");
const raw = JSON.parse(fs.readFileSync(LEXICON, "utf8"));
const lex: any[] = Array.isArray(raw) ? raw : raw.lexemes;
console.log(`  Toplam: ${lex.length}`);

console.log("[2/3] 10 kelime yaziliyor...");
let written = 0;
const notFound: string[] = [];
for (const kbd of Object.keys(data)) {
  const entry = lex.find((e) => e.form === kbd || e.dialectVariants?.kabardian === kbd);
  if (!entry) { notFound.push(kbd); console.log(`  x ${kbd}`); continue; }
  if (!entry.translations) entry.translations = {};
  entry.translations.ar = data[kbd].ar;
  entry.translations.tr = data[kbd].tr;
  entry.translations.en = data[kbd].en;
  entry.translations.ru = data[kbd].ru;
  entry.root = data[kbd].root;
  entry.wordFamily = data[kbd].family;
  entry.conceptId = data[kbd].concept;
  written++;
  console.log(`  + ${kbd}`);
}

console.log("[3/3] Kaydediliyor...");
const ts = new Date().toISOString().replace(/[:.]/g, "-").slice(0, 19);
const backup = `${LEXICON}.bak.${ts}`;
fs.copyFileSync(LEXICON, backup);
console.log(`  Yedek: ${backup}`);

const out = Array.isArray(raw) ? lex : { ...raw, lexemes: lex };
fs.writeFileSync(LEXICON, JSON.stringify(out, null, 2), "utf8");

let arNow = 0;
for (const e of lex) if (e.translations?.ar?.trim()) arNow++;
const pct = ((arNow / lex.length) * 100).toFixed(2);
console.log("\n=== SONUC ===");
console.log(`  Yazilan     : ${written}`);
console.log(`  Bulunamayan : ${notFound.length}${notFound.length ? " -> " + notFound.join(", ") : ""}`);
console.log(`  AR: ${arNow}/${lex.length} = %${pct}`);