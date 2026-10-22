import * as fs from "fs";

const LEXICON = "public/data/linguistic/lexemes.json";

// Mimar karari: lexeme once, AR sonra. Iskelet kayit.
const newLexemes = [
  {
    form: "гурыӀуэн",
    dialectVariants: { adyghe: "гурыӀуэн", kabardian: "гурыӀуэн" },
    translations: { tr: null, en: null, ru: null, ar: null },
    notes: "Mimar karari ile eklendi (2026-10-17). AR kaynak yok, sonraki sprintte.",
    isLemma: true
  },
  {
    form: "гурыӀуэжын",
    dialectVariants: { adyghe: "гурыӀуэжын", kabardian: "гурыӀуэжын" },
    translations: { tr: null, en: null, ru: null, ar: null },
    notes: "Mimar karari ile eklendi (2026-10-17). AR kaynak yok, sonraki sprintte.",
    isLemma: true
  }
];

console.log("[1/3] Yukleniyor...");
const raw = JSON.parse(fs.readFileSync(LEXICON, "utf8"));
const lex: any[] = Array.isArray(raw) ? raw : raw.lexemes;
console.log(`  Mevcut: ${lex.length}`);

console.log("[2/3] Ekleniyor...");
let added = 0;
for (const ne of newLexemes) {
  const exists = lex.find((e) => e.form === ne.form);
  if (exists) { console.log(`  = ${ne.form} (zaten var)`); continue; }
  lex.push(ne);
  console.log(`  + ${ne.form}`);
  added++;
}

console.log("[3/3] Kaydediliyor...");
const ts = new Date().toISOString().replace(/[:.]/g, "-").slice(0, 19);
const backup = `${LEXICON}.bak.${ts}`;
fs.copyFileSync(LEXICON, backup);
console.log(`  Yedek: ${backup}`);

const out = Array.isArray(raw) ? lex : { ...raw, lexemes: lex };
fs.writeFileSync(LEXICON, JSON.stringify(out, null, 2), "utf8");

console.log("\n=== SONUC ===");
console.log(`  Eklenen : ${added}`);
console.log(`  Toplam  : ${lex.length}`);