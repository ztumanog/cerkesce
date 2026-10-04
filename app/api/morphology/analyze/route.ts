import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { MorphologyAnalyzer, KnownRoot } from '@/domain/morphology/MorphologyAnalyzer';

let cachedData: {
  roots: any[];
  morphemes: any[];
  lexemes: any[];
  freqKbd: Record<string, number>;
  freqAdy: Record<string, number>;
} | null = null;

function loadData() {
  if (cachedData) return cachedData;

  const rootsPath = path.resolve('./public/data/linguistic/roots.json');
  const morphemesPath = path.resolve('./public/data/linguistic/morphemes.json');
  const lexemesPath = path.resolve('./public/data/linguistic/lexemes.json');
  const freqKbdPath = path.resolve('./data/corpus/frequency/lexeme_freq_kbd.json');
  const freqAdyPath = path.resolve('./data/corpus/frequency/lexeme_freq_ady.json');

  cachedData = {
    roots: fs.existsSync(rootsPath) ? JSON.parse(fs.readFileSync(rootsPath, 'utf-8')) : [],
    morphemes: fs.existsSync(morphemesPath) ? JSON.parse(fs.readFileSync(morphemesPath, 'utf-8')) : [],
    lexemes: fs.existsSync(lexemesPath) ? JSON.parse(fs.readFileSync(lexemesPath, 'utf-8')) : [],
    freqKbd: fs.existsSync(freqKbdPath) ? JSON.parse(fs.readFileSync(freqKbdPath, 'utf-8')) : {},
    freqAdy: fs.existsSync(freqAdyPath) ? JSON.parse(fs.readFileSync(freqAdyPath, 'utf-8')) : {},
  };
  return cachedData;
}

export async function POST(req: NextRequest) {
  const { word } = await req.json();

  if (!word || typeof word !== 'string') {
    return NextResponse.json({ error: 'Kelime gerekli' }, { status: 400 });
  }

  const data = loadData();
  const normalized = word.trim();

  // Frekans bilgisi
  const freqKbd = data.freqKbd[normalized] ?? 0;
  const freqAdy = data.freqAdy[normalized] ?? 0;

  // 1. ONCE: lexemes.json'da tam eslesme var mi?
  const exactLexemes = data.lexemes.filter((l: any) => l.form === normalized);

  if (exactLexemes.length > 0) {
    const first = exactLexemes[0];
    return NextResponse.json({
      word: normalized,
      prefixes: [],
      root: first.form,
      prefixCount: 0,
      method: 'dictionary',
      confidence: 1.0,
      source: first.literalMeaning,
      knownRootCount: data.lexemes.length,
      lexeme: {
        id: first.id,
        form: first.form,
        ipa: first.ipa,
        literalMeaning: first.literalMeaning,
        partOfSpeech: first.partOfSpeech,
        dialectVariants: first.dialectVariants,
        wordFamilyId: first.wordFamilyId,
        notes: first.notes,
      },
      wordFamily: [],
      lemma: first.form,
      lemmaPos: first.partOfSpeech === 'verb' ? 'VERB' : 'NOUN',
      lemmaConfidence: 1.0,
      personArguments: [],
      lemmaPrefixes: [],
      lemmaSuffixes: [],
      rootMatches: [],
      frequency: { kabardian: freqKbd, adyghe: freqAdy },
      allMeanings: exactLexemes.map((l: any) => ({
        id: l.id,
        literalMeaning: l.literalMeaning,
        partOfSpeech: l.partOfSpeech,
        ipa: l.ipa,
        notes: l.notes,
      })),
    });
  }

  // 2. Tam eslesme yoksa, MorphologyAnalyzer kullan
  const knownRoots: KnownRoot[] = data.lexemes
    .filter((l: any) => l.form)
    .map((l: any) => ({
      form: l.form,
      meaning: l.literalMeaning && l.literalMeaning !== '?' ? l.literalMeaning : undefined,
      partOfSpeech: l.partOfSpeech,
    }));

  const analyzer = new MorphologyAnalyzer(knownRoots, data.roots, data.morphemes, data.lexemes);
  const result = analyzer.analyze(normalized);

  return NextResponse.json({
    word: normalized,
    prefixes: result.prefixes,
    root: result.root,
    prefixCount: result.prefixCount,
    method: result.method,
    confidence: result.confidence,
    source: result.source,
    rootExtractor: result.rootExtractor,
    nounCase: result.nounCase,
    morphemes: result.morphemes,
    knownRootCount: analyzer.getKnownRootCount(),
    lexeme: null,
    wordFamily: [],
    lemma: result.root,
    lemmaPos: result.method === 'dictionary' ? 'NOUN' : 'NOUN/LEMMA',
    lemmaConfidence: result.confidence,
    personArguments: [],
    lemmaPrefixes: result.prefixes,
    lemmaSuffixes: [],
    rootMatches: [],
    frequency: { kabardian: freqKbd, adyghe: freqAdy },
    allMeanings: [],
  });
}
