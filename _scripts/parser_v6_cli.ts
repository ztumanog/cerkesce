// _scripts/parser_v6_cli.ts
import { LemmaBuilderV2 } from '../src/domain/morphology/LemmaBuilderV2';
import { readFileSync, writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const BASE = resolve(__dirname, '..');

const lexemes = JSON.parse(readFileSync(resolve(BASE, 'public/data/linguistic/lexemes.json'), 'utf-8'));
console.log(`Lexemes: ${lexemes.length}`);

const lexMap = new Map<string, any>();
const lexMapLower = new Map<string, any>();
for (const l of lexemes) {
  const f = (l.form || '').trim();
  if (f) {
    lexMap.set(f, l);
    const low = f.toLowerCase();
    if (!lexMapLower.has(low)) lexMapLower.set(low, l);
  }
}

function lookup(form: string): any {
  return lexMap.get(form) || lexMapLower.get(form.toLowerCase());
}
function has(form: string): boolean {
  return lexMap.has(form) || lexMapLower.has(form.toLowerCase());
}

// Genisletilmis KARA LISTE
const KARA = [
  "that", "this", "with", "from", "have", "will",
  "gem", "rap", "capability", "bounce", "wound", "coiled",
  "priest", "clergyman", "relig", "bob", "see.",
  "stone", "zhy", "form", "two", "adverb",
  "spring", "kok", "HAZIR",
];

function trOf(form: string): string {
  const l = lookup(form);
  if (!l) return '';
  const t = l.translations || {};
  const tr = (t.tr || l.literalMeaning || '').split(',')[0].trim();
  if (!tr || tr.length < 2) return '';
  const low = tr.toLowerCase();
  for (const k of KARA) if (low.includes(k)) return '';
  return tr;
}

// GENISLETILMIS SUFFIX LISTESI
const SUFFIXES = [
  // Meslek/ozne eki
  'акӀуэ', 'акуэ', 'акӀо', 'ако',
  // Soyut isim
  'ныгъэ','ныгъ','агъэ','агъ','гъэ','гъ',
  // Buyutme/eski
  'шхуэ','щӀэ','щӏэ','жь','щ',
  // Vasita/olumsuzluk
  'кӀэ','кӏэ','рэп','тэп',
];

// PREVERBLER (fiil onekleri)
const PREVERBS = [
  'къы', 'къэ', 'ны', 'нэ', 'хуэ', 'ху',
  'зды', 'здэ', 'зэ', 'дэ', 'ды',
  'кӀэры', 'бгъэдэ', 'бгъуры', 'те', 'щӀэ', 'хэ',
  'и', 'блэ', 'пы', 'Ӏу', 'щы',
  'е', 'па', 'дэ', 'елъ',
];

function stripSuffix(word: string): { stem: string; suffix: string } | null {
  for (const ek of SUFFIXES) {
    if (word.endsWith(ek) && word.length > ek.length + 1) {
      const stem = word.slice(0, -ek.length);
      if (has(stem) && trOf(stem)) return { stem, suffix: ek };
    }
  }
  return null;
}

function stripPreverb(word: string): { stem: string; preverb: string } | null {
  for (const pv of PREVERBS) {
    if (word.startsWith(pv) && word.length > pv.length + 1) {
      const stem = word.slice(pv.length);
      if (has(stem) && trOf(stem)) return { stem, preverb: pv };
    }
  }
  return null;
}

// SOMATIK cift kok (гу + псэ vb.)
function somaticSplit(word: string): string[] | null {
  const SOMATIK = ['гу', 'псэ', 'нэ', 'Ӏэ', 'лъэ', 'щхьэ', 'пэ', 'дзэ', 'бзэ'];
  for (const s1 of SOMATIK) {
    if (word.startsWith(s1) && word.length > s1.length + 2) {
      const kalan = word.slice(s1.length);
      for (const s2 of SOMATIK) {
        if (kalan.startsWith(s2) && kalan.length > s2.length + 1) {
          const son = kalan.slice(s2.length);
          if (has(s1) && trOf(s1) && has(s2) && trOf(s2) && has(son) && trOf(son)) {
            return [s1, s2, son];
          }
        }
      }
    }
  }
  return null;
}

function greedyParts(word: string): string[] {
  const parts: string[] = [];
  let rem = word;
  while (rem.length > 0) {
    let found: string | null = null;
    for (let len = rem.length; len >= 3; len--) {
      const p = rem.slice(0, len);
      if (has(p) && trOf(p)) { found = p; break; }
    }
    if (found) { parts.push(found); rem = rem.slice(found.length); }
    else { parts.push(rem[0]); rem = rem.slice(1); }
  }
  return parts;
}

function normalizeStem(form: string): string[] {
  const variants = [form];
  if (form.endsWith('пс')) variants.push(form + 'ы');
  if (form.endsWith('фI') || form.endsWith('фӀ')) variants.push(form + 'ы');
  if (form.endsWith('бгъа')) variants.push(form.slice(0, -1) + 'э');
  if (form.includes('ш')) variants.push(form.replace(/ш/g, 'щ'));
  const palochkaVariants = [
    form.replace(/\u04C0/g, '\u04CF'),
    form.replace(/\u04CF/g, '\u04C0'),
  ];
  for (const v of palochkaVariants) if (v !== form) variants.push(v);
  variants.push(form.toLowerCase());
  return [...new Set(variants)];
}

const builder = new LemmaBuilderV2();
const inputPath = process.argv[2];
const kelimeler = JSON.parse(readFileSync(resolve(BASE, inputPath), 'utf-8'));

const sonuclar: any[] = [];
for (const k of kelimeler) {
  const form = typeof k === 'string' ? k : k.form;

  // 1) Exact
  if (has(form) && trOf(form)) {
    sonuclar.push({ form, method: 'exact', tr: trOf(form) });
    continue;
  }

  // 2) Normalize
  const variants = normalizeStem(form);
  let nHit: string | null = null;
  for (const v of variants) if (v !== form && has(v) && trOf(v)) { nHit = v; break; }
  if (nHit) {
    sonuclar.push({ form, method: 'normalize', variant: nHit, tr: trOf(nHit) });
    continue;
  }

  // 3) SOMATIK cift kok (YENI)
  const somatic = somaticSplit(form);
  if (somatic) {
    const trs = somatic.map(s => trOf(s)).filter(Boolean);
    if (trs.length >= 2) {
      sonuclar.push({ form, method: 'somatic', parts: somatic, tr: trs.join(' + ') });
      continue;
    }
  }

  // 4) SUFFIX (YENI: -акӀуэ dahil)
  const ss = stripSuffix(form);
  if (ss) {
    sonuclar.push({ form, method: 'suffix', stem: ss.stem, suffix: ss.suffix, tr: trOf(ss.stem) + ' +' + ss.suffix });
    continue;
  }

  // 5) PREVERB (YENI)
  const pv = stripPreverb(form);
  if (pv) {
    sonuclar.push({ form, method: 'preverb', stem: pv.stem, preverb: pv.preverb, tr: pv.preverb + '+' + trOf(pv.stem) });
    continue;
  }

  // 6) Greedy
  const parts = greedyParts(form).filter(p => has(p) && trOf(p));
  if (parts.length >= 2) {
    const trs = parts.map(p => trOf(p)).filter(Boolean);
    sonuclar.push({ form, method: 'greedy', parts, tr: trs.join(' + ') });
    continue;
  }

  // 7) V2 fallback
  try {
    const res = builder.buildLemma(form);
    sonuclar.push({ form, method: 'v2', lemma: res.lemma, confidence: res.confidenceScore });
  } catch (e) {
    sonuclar.push({ form, method: 'error', error: String(e) });
  }
}

writeFileSync(resolve(BASE, '_ts_v6_sonuc.json'), JSON.stringify(sonuclar, null, 2), 'utf-8');

const methods = sonuclar.reduce((acc: any, s: any) => { acc[s.method] = (acc[s.method] || 0) + 1; return acc; }, {});
console.log('\nYontem dagilimi:');
for (const [m, n] of Object.entries(methods)) console.log(`  ${m}: ${n}`);

const trOlan = sonuclar.filter((s: any) => ['exact','normalize','greedy','suffix','preverb','somatic'].includes(s.method) && s.tr);
console.log(`\ntr uretilebilen: ${trOlan.length}`);

console.log('\nIlk 30:');
for (const s of sonuclar.slice(0, 30)) {
  if (s.method === 'exact') console.log(`  ${s.form.padEnd(20)} [✅ exact] ${s.tr}`);
  else if (s.method === 'normalize') console.log(`  ${s.form.padEnd(20)} [✅ norm] ${s.tr}`);
  else if (s.method === 'suffix') console.log(`  ${s.form.padEnd(20)} [✅ suffix] ${s.tr}`);
  else if (s.method === 'preverb') console.log(`  ${s.form.padEnd(20)} [✅ preverb] ${s.tr}`);
  else if (s.method === 'somatic') console.log(`  ${s.form.padEnd(20)} [✅ somatic] ${s.tr}`);
  else if (s.method === 'greedy') console.log(`  ${s.form.padEnd(20)} [✅ greedy] ${s.tr}`);
  else if (s.method === 'v2') console.log(`  ${s.form.padEnd(20)} [⚠️ v2] ${s.lemma}`);
  else console.log(`  ${s.form.padEnd(20)} [❌ ${s.method}]`);
}
