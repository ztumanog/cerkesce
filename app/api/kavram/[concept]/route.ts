import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

let cachedLexemes: any[] = [];

function loadLexemes() {
  if (cachedLexemes.length > 0) return cachedLexemes;
  const lexemesPath = path.resolve('./public/data/linguistic/lexemes.json');
  if (fs.existsSync(lexemesPath)) {
    cachedLexemes = JSON.parse(fs.readFileSync(lexemesPath, 'utf-8'));
  }
  return cachedLexemes;
}

export async function GET(
  req: Request,
  { params }: { params: Promise<{ concept: string }> }
) {
  const { concept } = await params;
  const lexemes = loadLexemes();
  const conceptId = concept.toUpperCase();

  const items = lexemes
    .filter((l: any) => l.isLemma && l.conceptId === conceptId)
    .map((l: any) => ({
      id: l.id,
      form: l.form,
      ipa: l.ipa,
      translations: l.translations || {},
      literalMeaning: l.literalMeaning,
      partOfSpeech: l.partOfSpeech,
      dialectVariants: l.dialectVariants,
      sources: l.sources || [],
      examples: l.examples || [],
    }));

  return NextResponse.json({
    conceptId,
    count: items.length,
    items,
  });
}
