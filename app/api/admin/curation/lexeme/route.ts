import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { lexemeId, changes, confirm } = body;

    if (!lexemeId || !changes) {
      return NextResponse.json({ error: 'Geçersiz parametreler (lexemeId ve changes zorunludur).' }, { status: 400 });
    }

    const filePath = path.join(process.cwd(), 'public', 'data', 'linguistic', 'lexemes.json');
    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ error: 'lexemes.json dosyası bulunamadı.' }, { status: 404 });
    }

    const rawData = fs.readFileSync(filePath, 'utf-8');
    let lexemes = JSON.parse(rawData);
    const isArray = Array.isArray(lexemes);
    const list = isArray ? lexemes : lexemes.lexemes ?? [];

    const targetIndex = list.findIndex((item: any) => item.id === lexemeId);
    if (targetIndex === -1) {
      return NextResponse.json({ error: `ID'si ${lexemeId} olan kelime bulunamadı.` }, { status: 404 });
    }

    const currentItem = list[targetIndex];
    const diff: { field: string; oldValue: any; newValue: any }[] = [];

    // 1. Word Family ID Değişimi
    if (changes.wordFamilyId !== undefined && changes.wordFamilyId !== currentItem.wordFamilyId) {
      diff.push({ field: 'wordFamilyId', oldValue: currentItem.wordFamilyId ?? '', newValue: changes.wordFamilyId });
    }

    // 2. IPA Değişimi
    if (changes.ipa !== undefined && changes.ipa !== currentItem.ipa) {
      diff.push({ field: 'ipa', oldValue: currentItem.ipa ?? '', newValue: changes.ipa });
    }

    // 3. Part of Speech Değişimi
    if (changes.partOfSpeech !== undefined && changes.partOfSpeech !== currentItem.partOfSpeech) {
      diff.push({ field: 'partOfSpeech', oldValue: currentItem.partOfSpeech ?? '', newValue: changes.partOfSpeech });
    }

    // 4. Concept ID Değişimi
    if (changes.conceptId !== undefined && changes.conceptId !== currentItem.conceptId) {
      diff.push({ field: 'conceptId', oldValue: currentItem.conceptId ?? '', newValue: changes.conceptId });
    }

    // 5. Root IDs Değişimi
    if (changes.rootIds !== undefined) {
      const newRootsArray = typeof changes.rootIds === 'string'
        ? changes.rootIds.split(',').map((r: string) => r.trim()).filter(Boolean)
        : changes.rootIds;

      const oldRootsStr = Array.isArray(currentItem.rootIds) ? currentItem.rootIds.join(', ') : (currentItem.rootId || '');
      const newRootsStr = Array.isArray(newRootsArray) ? newRootsArray.join(', ') : '';

      if (oldRootsStr !== newRootsStr) {
        diff.push({ field: 'rootIds', oldValue: oldRootsStr, newValue: newRootsStr });
      }
    }

    // DRY-RUN modunda sadece farkları döndür
    if (!confirm) {
      return NextResponse.json({
        dryRun: true,
        diff,
      });
    }

    // ONAYLANDIYSA (Confirm = true) dosyaya yaz
    const updatedRoots = typeof changes.rootIds === 'string'
      ? changes.rootIds.split(',').map((r: string) => r.trim()).filter(Boolean)
      : currentItem.rootIds;

    const updatedItem = {
      ...currentItem,
      ...(changes.wordFamilyId !== undefined ? { wordFamilyId: changes.wordFamilyId } : {}),
      ...(changes.ipa !== undefined ? { ipa: changes.ipa } : {}),
      ...(changes.partOfSpeech !== undefined ? { partOfSpeech: changes.partOfSpeech } : {}),
      ...(changes.conceptId !== undefined ? { conceptId: changes.conceptId } : {}),
      ...(changes.rootIds !== undefined ? { rootIds: updatedRoots } : {}),
    };

    list[targetIndex] = updatedItem;
    const finalData = isArray ? list : { ...lexemes, lexemes: list };
    fs.writeFileSync(filePath, JSON.stringify(finalData, null, 2), 'utf-8');

    return NextResponse.json({
      applied: true,
      appliedFields: diff.map((d) => d.field),
      message: 'Kayıt başarıyla güncellendi.',
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Sunucu hatası' }, { status: 500 });
  }
}