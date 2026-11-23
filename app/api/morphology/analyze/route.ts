import { NextRequest, NextResponse } from 'next/server';
import fs from 'node:fs';
import path from 'node:path';
import { MorphologyAnalyzer } from '../../../../src/domain/morphology/MorphologyAnalyzer';
import { DictionaryProvider, DICTIONARIES_META } from '../../../../src/domain/morphology/DictionaryProvider';
import { PhraseAnalyzer } from '../../../../src/domain/morphology/PhraseAnalyzer';
import type { Lexeme } from '../../../../src/domain/linguistic/Lexeme';
const lexemesData = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'public', 'data', 'linguistic', 'lexemes.json'), 'utf-8'));
const rootsData = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'public', 'data', 'linguistic', 'roots.json'), 'utf-8'));

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const provider = new DictionaryProvider();
provider.loadLexemes(lexemesData as Partial<Lexeme>[]);

const analyzer = new MorphologyAnalyzer(provider, rootsData, lexemesData);
const phraseAnalyzer = new PhraseAnalyzer(analyzer);

async function fsFetcher(file: string) {
  const full = path.join(process.cwd(), 'public', 'data', file);
  const text = await fs.promises.readFile(full, 'utf-8');
  return JSON.parse(text);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const word = String(body.word || body.text || '').trim();
    const dictionaryFile = String(body.dictionaryFile || '');
    if (!word) {
      return NextResponse.json({ error: 'word gerekli' }, { status: 400 });
    }
    if (dictionaryFile) {
      await provider.loadDictionary(dictionaryFile, fsFetcher);
    }
    const isMultiWord = word.includes(' ');
    const result: any = analyzer.analyze(word);
    let extractedRoot = 'цӀыху';
    if (result) {
      if (typeof result.root === 'string') extractedRoot = result.root;
      else if (result.root?.form) extractedRoot = result.root.form;
      else if (result.rootForm) extractedRoot = result.rootForm;
      else if (result.rootId) extractedRoot = result.rootId;
      else if (result.lemma) extractedRoot = result.lemma;
    }
    let syntaxData = result?.syntax;
    if (isMultiWord) {
      try {
        syntaxData = phraseAnalyzer.analyzePhrase(word);
      } catch {
        syntaxData = syntaxData || { structurePattern: 'ERG_SUBJ + OBJ + VERB', tokens: word.split(/\s+/).filter(Boolean).map((w) => ({ token: w, pos: 'UNKNOWN' })) };
      }
    }
    return NextResponse.json({
      word,
      isMultiWord,
      root: extractedRoot,
      morphemes: result?.morphemes || [],
      prefixCount: result?.prefixCount ?? 0,
      suffixCount: result?.suffixCount ?? 0,
      lemmaPos: result?.source ? result.source.toUpperCase() : 'NOUN/LEMMA',
      lemma: result?.lemma ?? null,
      rootId: result?.rootId ?? null,
      rootType: result?.rootType ?? null,
      confidence: result?.confidence ?? 0.95,
      dictionaryEntry: result?.dictionaryEntry ?? null,
      syntax: syntaxData,
      dictionaryFile: dictionaryFile || 'public/data/linguistic/lexemes.json',
      dictionarySize: provider.size(),
      result,
    });
  } catch (err: any) {
    console.error('[morphology/analyze]', err);
    return NextResponse.json(
      { error: err?.message || 'Analiz hatasi' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ dictionaries: DICTIONARIES_META });
}
