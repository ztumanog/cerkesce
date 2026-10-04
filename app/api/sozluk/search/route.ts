import { NextRequest, NextResponse } from 'next/server';
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

export async function POST(req: NextRequest) {
  try {
    const { query } = await req.json();

    if (!query || typeof query !== 'string') {
      return NextResponse.json({ error: 'Sorgu gerekli' }, { status: 400 });
    }

    const lexemes = loadLexemes();
    const searchTerm = query.toLowerCase().trim();

    const results = lexemes
      .filter((l: any) =>
        l.form?.toLowerCase().includes(searchTerm) ||
        l.literalMeaning?.toLowerCase().includes(searchTerm)
      )
      .slice(0, 20)
      .map((l: any) => ({
        lexeme: {
          id: l.id,
          form: l.form,
          ipa: l.ipa,
          literalMeaning: l.literalMeaning,
          partOfSpeech: l.partOfSpeech,
          dialectVariants: l.dialectVariants,
          wordFamilyId: l.wordFamilyId,
          notes: l.notes,
        },
        confidence: 85,
      }));

    return NextResponse.json({ results });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Sunucu hatası' }, { status: 500 });
  }
}
