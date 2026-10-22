import * as fs from "fs";

const LEXICON = "public/data/linguistic/lexemes.json";
const SRC_ADY_AR = "public/data/2.Ady-Ara.json";
const SRC_KBD_AR = "public/data/13.Kbd-Ar-Jonty.json";
const MIN_PREFIX_LEN = 4;

function convertKbdToAdy(word: string): string {
  let c = word;
  c = c.replace(/щӀ/g, "шӀ");
  c = c.replace(/йӀ/g, "шӀ");
  c = c.replace(/щ/g, "шъ");
  c = c.replace(/й/g, "шъ");
  c = c.replace(/жь/g, "жъ");
  c = c.replace(/ху/g, "ф");
  return c;
}

function stripHtml(html: string): string {
  if (!html) return "";
  return html
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, " ")
    .trim();
}

console.log("[1/4] Yukleniyor...");
const lexRaw = JSON.parse(fs.readFileSync(LEXICON, "utf8"));
const lex = Array.isArray(lexRaw) ? lexRaw : lexRaw.lexemes;
const ady = JSON.parse(fs.readFileSync(SRC_ADY_AR, "utf8"));
const kbd = JSON.parse(fs.readFileSync(SRC_KBD_AR, "utf8"));

const kbdEntries: Array<{ key: string; ar: string }> = [];
for (const [k, v] of Object.entries(kbd.words as Record<string, any>)) {
  const defs = v.definitions || [];
  const meanings = defs.map((d: any) => d.meaning || "").filter((s: string) => s.trim());
  if (meanings.length > 0) kbdEntries.push({ key: k, ar: meanings.join("; ").trim() });
}
const adyEntries: Array<{ key: string; ar: string }> = [];
for (const [k, v] of Object.entries(ady.words as Record<string, any>)) {
  const plain = stripHtml(v.full_definition_in_html || "");
  if (plain.length > 0) adyEntries.push({ key: k, ar: plain });
}
console.log(`  Jonty (AR dolu): ${kbdEntries.length}`);
console.log(`  Lash  (AR dolu): ${adyEntries.length}`);

function buildPrefixIndex(entries: Array<{ key: string; ar: string }>) {
  const idx = new Map<string, Array<{ key: string; ar: string }>>();
  for (const e of entries) {
    const max = Math.min(e.key.length, 8);
    for (let n = MIN_PREFIX_LEN; n <= max; n++) {
      const p = e.key.slice(0, n);
      const list = idx.get(p) || [];
      list.push(e);
      idx.set(p, list);
    }
  }
  return idx;
}

console.log("[2/4] Prefix index kuruluyor...");
const kbdIdx = buildPrefixIndex(kbdEntries);
const adyIdx = buildPrefixIndex(adyEntries);
console.log(`  Jonty prefix: ${kbdIdx.size}`);
console.log(`  Lash  prefix: ${adyIdx.size}`);

console.log("[3/4] Dolduruluyor...");
let filled = 0;
let skippedMulti = 0;
let skippedNo = 0;
const examples: string[] = [];

let i = 0;
for (const entry of lex) {
  i++;
  if (i % 5000 === 0) console.log(`  ...${i}/${lex.length} (dolan: ${filled})`);

  const curAr = entry.translations?.ar || "";
  if (curAr.trim() !== "") continue;

  const kbdForm: string = entry.form || entry.dialectVariants?.kabardian || "";
  let adyForm: string = entry.dialectVariants?.adyghe || "";
  if (!adyForm) adyForm = convertKbdToAdy(kbdForm);

  let found: string | null = null;
  let src: string | null = null;

  if (kbdForm.length >= MIN_PREFIX_LEN) {
    const prefix = kbdForm.slice(0, Math.min(kbdForm.length, 8));
    const list = kbdIdx.get(prefix) || [];
       const matches = list.filter((e) => e.key.startsWith(kbdForm) && (e.key.length - kbdForm.length) <= 1);
    if (matches.length === 1) { found = matches[0].ar; src = "Jonty-prefix"; }
    else if (matches.length > 1) { skippedMulti++; continue; }
  }

  if (!found && adyForm.length >= MIN_PREFIX_LEN) {
    const prefix = adyForm.slice(0, Math.min(adyForm.length, 8));
    const list = adyIdx.get(prefix) || [];
        const matches = list.filter((e) => e.key.startsWith(adyForm) && (e.key.length - adyForm.length) <= 1);
    if (matches.length === 1) { found = matches[0].ar; src = "Lash-prefix"; }
    else if (matches.length > 1) { skippedMulti++; continue; }
  }

  if (found) {
    if (!entry.translations) entry.translations = {};
    entry.translations.ar = found;
    filled++;
    if (examples.length < 10) examples.push(`  + ${kbdForm} -> ${found} (${src})`);
  } else {
    skippedNo++;
  }
}

if (examples.length > 0) {
  console.log("\n  Ornek eslesmeler:");
  for (const ex of examples) console.log(ex);
}

console.log("[4/4] Yaziliyor...");
const ts = new Date().toISOString().replace(/[:.]/g, "-").slice(0, 19);
const backup = `${LEXICON}.bak.${ts}`;
fs.copyFileSync(LEXICON, backup);
console.log(`  Yedek: ${backup}`);

const out = Array.isArray(lexRaw) ? lex : { ...lexRaw, lexemes: lex };
fs.writeFileSync(LEXICON, JSON.stringify(out, null, 2), "utf8");
console.log("  Yazildi.");

let arNow = 0;
for (const e of lex) if (e.translations?.ar?.trim()) arNow++;
const pct = ((arNow / lex.length) * 100).toFixed(2);

console.log("\n=== SONUC ===");
console.log(`  Dolan           : ${filled}`);
console.log(`  Coklu eslesme   : ${skippedMulti} (atlandi)`);
console.log(`  Eslesme yok     : ${skippedNo} (atlandi)`);
console.log("");
console.log(`  AR: ${arNow}/${lex.length} = %${pct}`);
console.log(`  Once: %23.36 | Simdi: %${pct} | Hedef: %30`);