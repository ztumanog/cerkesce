import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

let cachedLexemes: any[] = [];

function loadLexemes() {
  if (cachedLexemes.length > 0) return cachedLexemes;
  const p = path.join(process.cwd(), 'public', 'data', 'linguistic', 'lexemes.json');
  if (fs.existsSync(p)) {
    cachedLexemes = JSON.parse(fs.readFileSync(p, 'utf-8'));
  }
  return cachedLexemes;
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ wordFamilyId: string }> }
) {
  try {
    const { wordFamilyId } = await params;
    const lexemes = loadLexemes();

    const familyMembers = lexemes
      .filter((l: any) => l.wordFamilyId === wordFamilyId)
      .map((l: any) => ({
        id: l.id,
        form: l.form,
        literalMeaning: l.literalMeaning,
        partOfSpeech: l.partOfSpeech,
        ipa: l.ipa,
        conceptId: l.conceptId,
        corpusFrequency: l.corpusFrequency ?? 0,
      }));

    return NextResponse.json({
      wordFamilyId,
      members: familyMembers,
      count: familyMembers.length,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Sunucu hatası' }, { status: 500 });
  }
}