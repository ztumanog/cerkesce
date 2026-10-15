// _scripts/parser_cli.ts
import { MorphemeParser } from '../src/domain/morphology/MorphemeParser';
import { LemmaBuilder } from '../src/domain/morphology/LemmaBuilder';
import { readFileSync, writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const BASE = resolve(__dirname, '..');

// morphemes.json yukle
const morphemesPath = resolve(BASE, 'public/data/linguistic/morphemes.json');
const morphemes = JSON.parse(readFileSync(morphemesPath, 'utf-8'));
console.log(`Morphemes: ${morphemes.length}`);

// lexemes.json yukle (tam esleme icin)
const lexemesPath = resolve(BASE, 'public/data/linguistic/lexemes.json');
const lexemes = JSON.parse(readFileSync(lexemesPath, 'utf-8'));
console.log(`Lexemes: ${lexemes.length}`);

// Parser'lari olustur
const parser = new MorphemeParser(morphemes);
const lemmaBuilder = new LemmaBuilder(lexemes);

// Kelimeleri oku
const inputPath = process.argv[2];
if (!inputPath) {
  console.error('Kullanim: tsx parser_cli.ts <input.json>');
  process.exit(1);
}
const kelimeler = JSON.parse(readFileSync(resolve(BASE, inputPath), 'utf-8'));
console.log(`Kelimeler: ${kelimeler.length}`);

// Parse — ONCE TAM ESLEME, SONRA MORFEM
const sonuclar: any[] = [];
for (const k of kelimeler) {
  const form = typeof k === 'string' ? k : k.form;

  // ADIM 1: LemmaBuilder ile tam esleme
  const lemmaResult = lemmaBuilder.resolve(form);
  if (lemmaResult.matched && lemmaResult.lemma) {
    sonuclar.push({
      form,
      method: 'exact',
      confidence: 1.0,
      morphemes: [],
      ozet: [lemmaResult.lemma.literalMeaning || form],
      lexemeId: lemmaResult.lemma.id,
    });
    continue;
  }

  // ADIM 2: MorphemeParser ile ayristir
  const out = parser.parse(form);
  const known = out.morphemes.filter(m => m.morphemeId !== null);
  const glosses = known.map(m => m.gloss || m.form).filter(Boolean);
  sonuclar.push({
    form,
    morphemes: out.morphemes.map(m => ({ id: m.morphemeId, form: m.form, type: m.type, gloss: m.gloss })),
    confidence: out.confidence,
    method: out.method,
    ozet: glosses,
  });
}

// Kaydet
const outputPath = resolve(BASE, '_ts_parser_sonuc.json');
writeFileSync(outputPath, JSON.stringify(sonuclar, null, 2), 'utf-8');
console.log(`Kaydedildi: ${outputPath}`);

// Ilk 30
console.log('\nIlk 30:');
for (const s of sonuclar.slice(0, 30)) {
  const yontem = s.method === 'exact' ? '✅ EXACT' : `⚠️ ${s.method}`;
  console.log(`  ${s.form.padEnd(20)} [${yontem}] -> ${s.ozet.join(' + ')} (conf: ${s.confidence.toFixed(2)})`);
}