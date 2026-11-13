import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

function readJsonSafe(filePath: string) {
  if (!fs.existsSync(filePath)) return null;
  return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
}

const ROOT_ALIASES: Record<string, string> = {
  'R-SHX': 'R-SHKH',
  'R-F1E': 'R-FIY',
  'R-LHEGHE': 'R-LA_1',
};

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const rawParams = await params;
    const rawId = decodeURIComponent(rawParams.id || '').trim();
    const id = ROOT_ALIASES[rawId] || rawId;

    if (!id) {
      return NextResponse.json({ error: 'Geçersiz kök kimliği' }, { status: 400 });
    }

    const dataDir = path.join(process.cwd(), 'public', 'data', 'linguistic');

    const lexRaw = readJsonSafe(path.join(dataDir, 'lexemes.json'));
    const lexemes: any[] = Array.isArray(lexRaw) ? lexRaw : lexRaw?.lexemes ?? [];

    const rootsRaw = readJsonSafe(path.join(dataDir, 'roots.json'));
    const rootsList: any[] = Array.isArray(rootsRaw) ? rootsRaw : rootsRaw?.roots ?? [];
    const rootMeta = rootsList.find((r: any) => r.id === id || r.rootId === id) || null;

    const members = lexemes
      .filter((l: any) => Array.isArray(l.rootIds) && l.rootIds.includes(id))
      .map((l: any) => ({
        id: l.id,
        form: l.form || l.text || '',
        literalMeaning: l.literalMeaning || '',
        translations: l.translations || {},
        partOfSpeech: l.partOfSpeech || null,
        dialect: l.dialect || null,
        dialectVariants: l.dialectVariants || null,
        ipa: l.ipa || null,
        wordFamilyId: l.wordFamilyId || null,
        conceptId: l.conceptId || null,
        corpusFrequency: l.corpusFrequency ?? 0,
      }));

    if (!rootMeta && members.length === 0) {
      return NextResponse.json(
        { error: `Kanonik kök bulunamadı: ${rawId}`, id: rawId },
        { status: 404 }
      );
    }

    const conceptTrRaw = readJsonSafe(path.join(dataDir, 'concept-tr.json')) || {};

    const familyMap = new Map<string, { id: string; count: number; sampleForms: string[] }>();
    for (const m of members) {
      if (!m.wordFamilyId) continue;
      const fid = String(m.wordFamilyId);
      const ex = familyMap.get(fid);
      if (ex) {
        ex.count += 1;
        if (ex.sampleForms.length < 4 && m.form && !ex.sampleForms.includes(m.form)) {
          ex.sampleForms.push(m.form);
        }
      } else {
        familyMap.set(fid, { id: fid, count: 1, sampleForms: m.form ? [m.form] : [] });
      }
    }

    const conceptMap = new Map<string, { id: string; labelTr: string; count: number }>();
    for (const m of members) {
      if (!m.conceptId) continue;
      const cid = String(m.conceptId);
      const ex = conceptMap.get(cid);
      if (ex) {
        ex.count += 1;
      } else {
        const trEntry = conceptTrRaw[cid] || conceptTrRaw[cid.toLowerCase()];
        const labelTr = typeof trEntry === 'string' ? trEntry : trEntry?.tr || trEntry?.label || '';
        conceptMap.set(cid, { id: cid, labelTr, count: 1 });
      }
    }

    return NextResponse.json({
      id,
      ...(rawId !== id ? { requestedId: rawId } : {}),
      root: rootMeta,
      families: Array.from(familyMap.values()).sort((a, b) => b.count - a.count),
      concepts: Array.from(conceptMap.values()).sort((a, b) => b.count - a.count),
      members,
      count: members.length,
    });
  } catch (error) {
    console.error('Root API hatası:', error);
    return NextResponse.json({ error: 'Sunucu hatası' }, { status: 500 });
  }
}
