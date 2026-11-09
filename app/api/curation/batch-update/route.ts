import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(req: Request) {
  try {
    const { lexemeIds, targetFamilyId, targetRootId } = await req.json();

    if (!Array.isArray(lexemeIds) || lexemeIds.length === 0 || !targetFamilyId) {
      return NextResponse.json(
        { error: 'Geçersiz parametreler (lexemeIds ve targetFamilyId zorunludur).' },
        { status: 400 }
      );
    }

    const filePath = path.join(process.cwd(), 'public', 'data', 'linguistic', 'lexemes.json');
    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ error: 'lexemes.json dosyası bulunamadı.' }, { status: 404 });
    }

    const rawData = fs.readFileSync(filePath, 'utf-8');
    let lexemes = JSON.parse(rawData);
    const isArray = Array.isArray(lexemes);
    const list = isArray ? lexemes : lexemes.lexemes ?? [];

    const updatedSet = new Set(lexemeIds);
    let updatedCount = 0;

    const newList = list.map((item: any) => {
      if (updatedSet.has(item.id)) {
        updatedCount++;
        return {
          ...item,
          wordFamilyId: targetFamilyId,
          ...(targetRootId ? { rootId: targetRootId } : {}),
        };
      }
      return item;
    });

    const finalData = isArray ? newList : { ...lexemes, lexemes: newList };
    fs.writeFileSync(filePath, JSON.stringify(finalData, null, 2), 'utf-8');

    return NextResponse.json({
      success: true,
      updatedCount,
      message: `${updatedCount} adet kelime ${targetFamilyId} ailesine aktarıldı.`,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Sunucu hatası' }, { status: 500 });
  }
}