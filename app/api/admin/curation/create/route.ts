import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { form, ipa, partOfSpeech, conceptId, wordFamilyId, rootIds, notes } = body;

    if (!form) {
      return NextResponse.json({ error: 'Kelime formu (form) alanı zorunludur.' }, { status: 400 });
    }

    const filePath = path.join(process.cwd(), 'public', 'data', 'linguistic', 'lexemes.json');
    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ error: 'lexemes.json dosyası bulunamadı.' }, { status: 404 });
    }

    const rawData = fs.readFileSync(filePath, 'utf-8');
    let lexemesData = JSON.parse(rawData);
    const isArray = Array.isArray(lexemesData);
    const list = isArray ? lexemesData : lexemesData.lexemes ?? [];

    const generatedId = `L-${form.replace(/[^a-zA-Zа-яА-ЯӀӏ]/g, '').toUpperCase()}-${Date.now().toString().slice(-4)}`;

    const newLexeme = {
      id: generatedId,
      form: form.trim(),
      ipa: ipa?.trim() || '',
      partOfSpeech: partOfSpeech?.trim() || 'noun',
      conceptId: conceptId?.trim() || '',
      wordFamilyId: wordFamilyId?.trim() || 'WF-UNCLEAR',
      rootIds: typeof rootIds === 'string' ? rootIds.split(',').map((r: string) => r.trim()).filter(Boolean) : [],
      notes: notes?.trim() || ''
    };

    list.push(newLexeme);
    const finalData = isArray ? list : { ...lexemesData, lexemes: list };
    fs.writeFileSync(filePath, JSON.stringify(finalData, null, 2), 'utf-8');

    return NextResponse.json({
      success: true,
      lexeme: newLexeme,
      message: 'Yeni kelime başarıyla eklendi.'
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Kelime eklenirken hata oluştu.' }, { status: 500 });
  }
}