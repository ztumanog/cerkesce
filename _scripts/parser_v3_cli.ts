// _scripts/parser_v3_cli.ts
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
for (const l of lexemes) {
  const f = (l.form || '').trim();
  if (f) lexMap.set(f, l);
}

function trOf(form: string): string {
  const l = lexMap.get(form);
  if (!l) return '';
  const t = l.translations || {};
  return (t.tr || l.literalMeaning || '').split(',')[0].trim();
}

// Greedy longest component match
function greedyParts(word: string): string[] {
  const parts: string[] = [];
  let rem = word;
  while (rem.length > 0) {
    let found: string | null = null;
    for (let len = rem.length; len >= 2; len--) {
      const p = rem.slice(0, len);
      if (lexMap.has(p)) { found = p; break; }
    }
    if (found) { parts.push(found); rem = rem.slice(found.length); }
    else { parts.push(rem[0]); rem = rem.slice(1); }
  }
  return parts;
}

// Suffix strip
const SUFFIXES = ['ныгъэ','ныгъ','агъэ','агъ','гъэ','гъ','шхуэ','щӀэ','жь','щ'];
function stripSuffix(word: string): { stem: string; suffix: string } | null {
  for (const ek of SUFFIXES) {
    if (word.endsWith(ek) && word.length > ek.length + 1) {
      const stem = word.slice(0, -ek.length);
      if (lexMap.has(stem)) return { stem, suffix: ek };
    }
  }
  return null;
}

// KOK NORMALIZASYONU (vowel restoration)
function normalizeStem(form: string): string[] {
  const variants = [form];
  // пс -> псы, фI -> фIы, бгъа -> бгъэ, чэнджэш -> чэнджэщ
  if (form.endsWith('пс')) variants.push(form + 'ы');
  if (form.endsWith('фI') || form.endsWith('фӀ')) variants.push(form + 'ы');
  if (form.endsWith('бгъа')) variants.push(form.slice(0, -1) + 'э');
  if (form.includes('ш')) variants.push(form.replace(/ш/g, 'щ'));
  return variants;
}

const builder = new LemmaBuilderV2();
const inputPath = process.argv[2];
const kelimeler = JSON.parse(readFileSync(resolve(BASE, inputPath), 'utf-8'));

const sonuclar: any[] = [];
for (const k of kelimeler) {
  const form = typeof k === 'string' ? k : k.form;

  // 1) Tam esleme
  if (lexMap.has(form)) {
    sonuclar.push({ form, method: 'exact', tr: trOf(form) });
    continue;
  }

  // 1.5) Normalize varyantlari dene
  const variants = normalizeStem(form);
  let normalizedHit = null;
  for (const v of variants) {
    if (v !== form && lexMap.has(v)) { normalizedHit = v; break; }
  }
  if (normalizedHit) {
    sonuclar.push({ form, method: 'normalize', variant: normalizedHit, tr: trOf(normalizedHit) });
    continue;
  }

  // 2) Greedy component
  const parts = greedyParts(form).filter(p => lexMap.has(p));
  if (parts.length >= 2) {
    const trs = parts.map(p => trOf(p)).filter(Boolean);
    sonuclar.push({ form, method: 'greedy', parts, tr: trs.join(' + ') });
    continue;
  }

  // 3) Suffix strip
  const ss = stripSuffix(form);
  if (ss) {
    sonuclar.push({ form, method: 'suffix', stem: ss.stem, suffix: ss.suffix, tr: trOf(ss.stem) + ' +' + ss.suffix });
    continue;
  }

  // 4) V2 fallback
  try {
    const res = builder.buildLemma(form);
    sonuclar.push({ form, method: 'v2', lemma: res.lemma, confidence: res.confidenceScore });
  } catch (e) {
    sonuclar.push({ form, method: 'error', error: String(e) });
  }
}

writeFileSync(resolve(BASE, '_ts_v3_sonuc.json'), JSON.stringify(sonuclar, null, 2), 'utf-8');
console.log('\nIlk 30:');
for (const s of sonuclar.slice(0, 30)) {
  if (s.method === 'exact') console.log(`  ${s.form.padEnd(20)} [✅ exact] ${s.tr}`);
  else if (s.method === 'normalize') console.log(`  ${s.form.padEnd(20)} [✅ norm:${s.variant}] ${s.tr}`);
  else if (s.method === 'greedy') console.log(`  ${s.form.padEnd(20)} [✅ greedy] ${s.parts.join('+')} = ${s.tr}`);
  else if (s.method === 'suffix') console.log(`  ${s.form.padEnd(20)} [✅ suffix] ${s.stem}+${s.suffix} = ${s.tr}`);
  else if (s.method === 'v2') console.log(`  ${s.form.padEnd(20)} [⚠️ v2] ${s.lemma} (conf: ${s.confidence})`);
  else console.log(`  ${s.form.padEnd(20)} [❌ ${s.method}]`);
}
