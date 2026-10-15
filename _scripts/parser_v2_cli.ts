// _scripts/parser_v2_cli.ts
import { LemmaBuilderV2 } from '../src/domain/morphology/LemmaBuilderV2';
import { readFileSync, writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const BASE = resolve(__dirname, '..');

// lexemes.json yukle
const lexemesPath = resolve(BASE, 'public/data/linguistic/lexemes.json');
const lexemes = JSON.parse(readFileSync(lexemesPath, 'utf-8'));
console.log(`Lexemes: ${lexemes.length}`);

// Lexeme formlarini bir Map'e koy
const lexMap = new Map<string, any>();
for (const l of lexemes) {
  const f = (l.form || '').trim();
  if (f) lexMap.set(f, l);
}

// LemmaBuilderV2 olustur
const builder = new LemmaBuilderV2();

// Kelimeleri oku
const inputPath = process.argv[2];
if (!inputPath) {
  console.error('Kullanim: tsx parser_v2_cli.ts <input.json>');
  process.exit(1);
}
const kelimeler = JSON.parse(readFileSync(resolve(BASE, inputPath), 'utf-8'));
console.log(`Kelimeler: ${kelimeler.length}`);

// Parse — ONCE lexemes tam esleme, sonra LemmaBuilderV2
const sonuclar: any[] = [];
for (const k of kelimeler) {
  const form = typeof k === 'string' ? k : k.form;

  // ADIM 1: lexemes.json'da tam esleme
  const exact = lexMap.get(form);
  if (exact) {
    const t = exact.translations || {};
    sonuclar.push({
      form,
      method: 'lexemes_exact',
      confidence: 1.0,
      tr: t.tr || '',
      lemma: form,
    });
    continue;
  }

  // ADIM 2: LemmaBuilderV2
  try {
    const res = builder.buildLemma(form);
    sonuclar.push({
      form,
      method: 'lemmabuilder_v2',
      confidence: res.confidenceScore,
      lemma: res.lemma,
      pos: res.pos,
      rootMatches: res.rootMatches,
      morphemes: res.morphemeBreakdown,
    });
  } catch (e) {
    sonuclar.push({ form, method: 'error', error: String(e) });
  }
}

const outputPath = resolve(BASE, '_ts_parser_v2_sonuc.json');
writeFileSync(outputPath, JSON.stringify(sonuclar, null, 2), 'utf-8');
console.log(`Kaydedildi: ${outputPath}`);

console.log('\nIlk 30:');
for (const s of sonuclar.slice(0, 30)) {
  if (s.method === 'lexemes_exact') {
    console.log(`  ${s.form.padEnd(20)} [✅ lexemes] tr: ${s.tr}`);
  } else if (s.method === 'lemmabuilder_v2') {
    const rm = s.rootMatches?.[0];
    const anlam = rm?.meaning || rm?.meaningPrimary || rm?.matchedItem || '?';
    console.log(`  ${s.form.padEnd(20)} [⚠️ v2] lemma: ${s.lemma} | ${anlam} (conf: ${s.confidence})`);
  } else {
    console.log(`  ${s.form.padEnd(20)} [❌ ${s.method}]`);
  }
}
