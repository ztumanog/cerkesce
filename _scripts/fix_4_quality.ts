import * as fs from "fs";

const LEXICON = "public/data/linguistic/lexemes.json";

const fixes: Record<string, string> = {
  "изэрыгуэн": "يزدحم / يكتظ / ينحشر",
  "гуфӀэ":    "فرح / سرور / سعادة",
  "едэн":     "يخيط",
  "турнир":   "دورة / دورة رياضية",
};

console.log("[1/3] Yukleniyor...");
const raw = JSON.parse(fs.readFileSync(LEXICON, "utf8"));
const lex: any[] = Array.isArray(raw) ? raw : raw.lexemes;
console.log(`  Toplam: ${lex.length}`);

console.log("[2/3] 4 duzeltme uygulaniyor...");
let fixed = 0;
const notFound: string[] = [];
for (const form of Object.keys(fixes)) {
  const entry = lex.find((e) => e.form === form || e.dialectVariants?.kabardian === form || e.dialectVariants?.adyghe === form);
  if (!entry) { notFound.push(form); console.log(`  x ${form}`); continue; }
  if (!entry.translations) entry.translations = {};
  const old = entry.translations.ar || "(bos)";
  entry.translations.ar = fixes[form];
  console.log(`  + ${form}`);
  console.log(`      Eski: ${old}`);
  console.log(`      Yeni: ${fixes[form]}`);
  fixed++;
}

if (notFound.length > 0) {
  console.log(`\n  Bulunamayan: ${notFound.join(", ")}`);
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
console.log(`  Duzeltilen  : ${fixed}`);
console.log(`  Bulunamayan : ${notFound.length}`);
console.log(`  AR: ${arNow}/${lex.length} = %${pct}`);
console.log(`  Once: %25.60 | Simdi: %${pct} (kalite artti, oran ayni)`);