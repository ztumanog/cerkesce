// _scripts/parser_v4_cli.ts
import { LemmaBuilderV2 } from '../src/domain/morphology/LemmaBuilderV2';
import { readFileSync, writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const BASE = resolve(__dirname, '..');

const lexemes = JSON.parse(readFileSync(resolve(BASE, 'public/data/linguistic/lexemes.json'), 'utf-8'));
console.log(`Lexemes: ${lexemes.length}`);

// Iki map: orijinal + lowercase
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

// Hem orijinal hem lowercase dene
function lookup(form: string): any {
  return lexMap.get(form) || lexMapLower.get(form.toLowerCase());
}
function has(form: string): boolean {
  return lexMap.has(form) || lexMapLower.has(form.toLowerCase());
}

function iyiTr(tr: string): boolean {
  if (!tr || tr.length < 2) return false;
  const bad = ['alfabe','harf','буква','пятьдесят','шестая','of жэн','of жын','that','painted','Maddeler','Kestane rengi','Ocak kirişi','алфавит'];
  const low = tr.toLowerCase();
  for (const b of bad) if (low.includes(b.toLowerCase())) return false;
  return true;
}

function trOf(form: string): string {
  const l = lookup(form);
  if (!l) return '';
  const t = l.translations || {};
  const tr = (t.tr || l.literalMeaning || '').split(',')[0].trim();
  return iyiTr(tr) ? tr : '';
}

// Greedy longest component match — min 3 harf
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

const SUFFIXES = ['ныгъэ','ныгъ','агъэ','агъ','гъэ','гъ','шхуэ','щӀэ','жь','щ'];
function stripSuffix(word: string): { stem: string; suffix: string } | null {
  for (const ek of SUFFIXES) {
    if (word.endsWith(ek) && word.length > ek.length + 1) {
      const stem = word.slice(0, -ek.length);
      if (has(stem) && trOf(stem)) return { stem, suffix: ek };
    }
  }
  return null;
}

function normalizeStem(form: string): string[] {
  const variants = [form];
  if (form.endsWith('пс')) variants.push(form + 'ы');
  if (form.endsWith('фI') || form.endsWith('фӀ')) variants.push(form + 'ы');
  if (form.endsWith('бгъа')) variants.push(form.slice(0, -1) + 'э');
  if (form.includes('ш')) variants.push(form.replace(/ш/g, 'щ'));
  // Palochka varyantlari
  const palochkaVariants = [
    form.replace(/\u04C0/g, '\u04CF'),
    form.replace(/\u04CF/g, '\u04C0'),
  ];
  for (const v of palochkaVariants) if (v !== form) variants.push(v);
  // Lowercase
  variants.push(form.toLowerCase());
  return [...new Set(variants)];
}

const builder = new LemmaBuilderV2();
const inputPath = process.argv[2];
const kelimeler = JSON.parse(readFileSync(resolve(BASE, inputPath), 'utf-8'));

const sonuclar: any[] = [];
for (const k of kelimeler) {
  const form = typeof k === 'string' ? k : k.form;
  if (has(form) && trOf(form)) { sonuclar.push({ form, method: 'exact', tr: trOf(form) }); continue; }
  const variants = normalizeStem(form);
  let nHit: string | null = null;
  for (const v of variants) if (v !== form && has(v) && trOf(v)) { nHit = v; break; }
  if (nHit) { sonuclar.push({ form, method: 'normalize', variant: nHit, tr: trOf(nHit) }); continue; }
  const parts = greedyParts(form).filter(p => has(p) && trOf(p));
  if (parts.length >= 2) {
    const trs = parts.map(p => trOf(p)).filter(Boolean);
    sonuclar.push({ form, method: 'greedy', parts, tr: trs.join(' + ') }); continue;
  }
  const ss = stripSuffix(form);
  if (ss) { sonuclar.push({ form, method: 'suffix', stem: ss.stem, suffix: ss.suffix, tr: trOf(ss.stem) + ' +' + ss.suffix }); continue; }
  try {
    const res = builder.buildLemma(form);
    sonuclar.push({ form, method: 'v2', lemma: res.lemma, confidence: res.confidenceScore });
  } catch (e) {
    sonuclar.push({ form, method: 'error', error: String(e) });
  }
}

writeFileSync(resolve(BASE, '_ts_v4_sonuc.json'), JSON.stringify(sonuclar, null, 2), 'utf-8');
console.log('\nIlk 30:');
for (const s of sonuclar.slice(0, 30)) {
  if (s.method === 'exact') console.log(`  ${s.form.padEnd(20)} [✅ exact] ${s.tr}`);
  else if (s.method === 'normalize') console.log(`  ${s.form.padEnd(20)} [✅ norm:${s.variant}] ${s.tr}`);
  else if (s.method === 'greedy') console.log(`  ${s.form.padEnd(20)} [✅ greedy] ${s.parts.join('+')} = ${s.tr}`);
  else if (s.method === 'suffix') console.log(`  ${s.form.padEnd(20)} [✅ suffix] ${s.stem}+${s.suffix} = ${s.tr}`);
  else if (s.method === 'v2') console.log(`  ${s.form.padEnd(20)} [⚠️ v2] ${s.lemma} (conf: ${s.confidence})`);
  else console.log(`  ${s.form.padEnd(20)} [❌ ${s.method}]`);
}
