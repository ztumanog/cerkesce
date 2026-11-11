import { NextResponse } from 'next/server';
import { MorphologyAnalyzer } from '@/domain/morphology/MorphologyAnalyzer';
import { PhraseAnalyzer } from '@/domain/morphology/PhraseAnalyzer';

const analyzer = new MorphologyAnalyzer();
const phraseAnalyzer = new PhraseAnalyzer(analyzer);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const word = body.word || body.text || '';

    if (!word.trim()) {
      return NextResponse.json({ error: 'Kelime veya cümle girilmedi.' }, { status: 400 });
    }

    const trimmed = word.trim();
    if (trimmed.includes(' ')) {
      const phraseResult = phraseAnalyzer.analyzePhrase(trimmed);
      return NextResponse.json({
        isMultiWord: true,
        word: trimmed,
        ...phraseResult,
      });
    }

    const result = analyzer.analyze(trimmed);
    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Sunucu hatası' }, { status: 500 });
  }
}