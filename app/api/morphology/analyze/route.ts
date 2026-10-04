import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { MorphologyAnalyzer, KnownRoot } from '@/domain/morphology/MorphologyAnalyzer';
import { LemmaBuilderV2 } from '@/domain/morphology/LemmaBuilderV2';

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

  // 1. Tam eslesme kontrolu
  const exactLexeme = data.lexemes.find((l: any) => l.form === normalized);

  if (exactLexeme) {
    return NextResponse.json({
      word: normalized,
      prefixes: [],
      root: exactLexeme.form,
      prefixCount: 0,
      method: 'dictionary',
      confidence: 1.0,
      source: exactLexeme.literalMeaning,
      knownRootCount: data.lexemes.length,
      lexeme: {
        id: exactLexeme.id,
        form: exactLexeme.form,
        ipa: exactLexeme.ipa,
        literalMeaning: exactLexeme.literalMeaning,
        partOfSpeech: exactLexeme.partOfSpeech,
        dialectVariants: exactLexeme.dialectVariants,
        wordFamilyId: exactLexeme.wordFamilyId,
        notes: exactLexeme.notes,
      },
      wordFamily: [],
      lemma: exactLexeme.form,
      lemmaPos: exactLexeme.partOfSpeech === 'verb' ? 'VERB' : 'NOUN',
      lemmaConfidence: 1.0,
      personArguments: [],
      lemmaPrefixes: [],
      lemmaSuffixes: [],
      rootMatches: [],
      frequency: {
        kabardian: freqKbd,
        adyghe: freqAdy,
      },
    });
  }

  // 2. Parser
  const knownRoots: KnownRoot[] = data.lexemes
    .filter((l: any) => l.form)
    .map((l: any) => ({
      form: l.form,
      meaning: l.literalMeaning && l.literalMeaning !== '?' ? l.literalMeaning : undefined,
      partOfSpeech: l.partOfSpeech,
    }));

  const analyzer = new MorphologyAnalyzer(knownRoots, data.roots, data.morphemes, data.lexemes);
  const result = analyzer.analyze(normalized);

  const lemmaBuilder = new LemmaBuilderV2();
  const lemmaResult = lemmaBuilder.buildLemma(normalized);

  const lexeme = exactLexeme;

  let wordFamily: any[] = [];
  if (lexeme?.derivation?.rootIds?.length) {
    wordFamily = data.lexemes.filter((l: any) =>
      l.derivation?.rootIds?.some((rid: string) =>
        lexeme.derivation.rootIds.includes(rid)
      ) && l.id !== lexeme.id
    );
  }

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
    lexeme: lexeme ? {
      id: lexeme.id,
      form: lexeme.form,
      ipa: lexeme.ipa,
      literalMeaning: lexeme.literalMeaning,
      partOfSpeech: lexeme.partOfSpeech,
      dialectVariants: lexeme.dialectVariants,
      wordFamilyId: lexeme.wordFamilyId,
      notes: lexeme.notes,
    } : null,
    wordFamily: wordFamily.map((l: any) => ({
      id: l.id,
      form: l.form,
      literalMeaning: l.literalMeaning,
      partOfSpeech: l.partOfSpeech,
      rule: l.derivation?.rule,
    })),
    lemma: lemmaResult.lemma,
    lemmaPos: lemmaResult.pos,
    lemmaConfidence: lemmaResult.confidenceScore,
    personArguments: lemmaResult.morphemeBreakdown.personArguments,
    lemmaPrefixes: lemmaResult.morphemeBreakdown.prefixes,
    lemmaSuffixes: lemmaResult.morphemeBreakdown.suffixes,
    rootMatches: lemmaResult.rootMatches,
    frequency: {
      kabardian: freqKbd,
      adyghe: freqAdy,
    },
  });
}
