import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

function readJsonSafe(filePath: string) {
  if (!fs.existsSync(filePath)) return null;
  return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
}

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const rawParams = await params;
    const id = decodeURIComponent(rawParams.id || '').trim();
    const dataDir = path.join(process.cwd(), 'public', 'data', 'linguistic');

    const lexRaw = readJsonSafe(path.join(dataDir, 'lexemes.json'));
    const lexemes: any[] = Array.isArray(lexRaw) ? lexRaw : lexRaw?.lexemes ?? [];

    const wfRaw = readJsonSafe(path.join(dataDir, 'word_families.json'));
    const families: any[] = Array.isArray(wfRaw) ? wfRaw : wfRaw?.families ?? wfRaw?.wordFamilies ?? [];
    const familyMeta = families.find((f: any) => f.id === id || f.familyId === id) || null;

    const rootsRaw = readJsonSafe(path.join(dataDir, 'roots.json'));
    const rootsList: any[] = Array.isArray(rootsRaw) ? rootsRaw : rootsRaw?.roots ?? [];

    const conceptTrRaw = readJsonSafe(path.join(dataDir, 'concept-tr.json')) || {};

    const members = lexemes
      .filter((l: any) => l.wordFamilyId === id)
      .map((l: any) => ({
        id: l.id,
        form: l.form || l.text || '',
        literalMeaning: l.literalMeaning || '',
        translations: l.translations || {},
        partOfSpeech: l.partOfSpeech || null,
        dialect: l.dialect || null,
        dialectVariants: l.dialectVariants || null,
        ipa: l.ipa || null,
        conceptId: l.conceptId || null,
        rootIds: Array.isArray(l.rootIds) ? l.rootIds : [],
        corpusFrequency: l.corpusFrequency ?? 0,
      }));

    if (!familyMeta && members.length === 0) {
      return NextResponse.json(
        { error: 'Kelime ailesi bulunamadı.', id, familyId: id },
        { status: 404 }
      );
    }

    // Bağlı Kökler (Root)
    const rootIdSet = new Set<string>();
    if (familyMeta?.rootId) rootIdSet.add(familyMeta.rootId);
    if (Array.isArray(familyMeta?.rootIds)) familyMeta.rootIds.forEach((r: string) => rootIdSet.add(r));
    members.forEach((m) => m.rootIds.forEach((r: string) => rootIdSet.add(r)));

    const roots = Array.from(rootIdSet).map((rId) => {
      const found = rootsList.find((r: any) => r.id === rId || r.rootId === rId);
      return {
        id: rId,
        form: found?.form || found?.root || found?.headword || rId,
        meaning: found?.meaning || found?.gloss || found?.translations?.tr || '',
      };
    });

    // Bağlı Kavramlar (Concept)
    const conceptMap = new Map<string, { id: string; labelTr: string; count: number }>();
    for (const m of members) {
      if (!m.conceptId) continue;
      const cid = String(m.conceptId);
      const existing = conceptMap.get(cid);
      if (existing) {
        existing.count += 1;
      } else {
        const trEntry = conceptTrRaw[cid] || conceptTrRaw[cid.toLowerCase()];
        const labelTr = typeof trEntry === 'string' ? trEntry : trEntry?.tr || trEntry?.label || '';
        conceptMap.set(cid, { id: cid, labelTr, count: 1 });
      }
    }

    const headword =
      familyMeta?.headword ||
      familyMeta?.form ||
      familyMeta?.title ||
      members[0]?.form ||
      id;

    const glossTr =
      familyMeta?.glossTr ||
      familyMeta?.meaning ||
      familyMeta?.translations?.tr ||
      members[0]?.translations?.tr ||
      '';

    return NextResponse.json({
      id,
      familyId: familyMeta?.familyId || familyMeta?.id || id,
      headword,
      glossTr,
      family: familyMeta,
      root: roots[0] || null,
      roots,
      concepts: Array.from(conceptMap.values()).sort((a, b) => b.count - a.count),
      members,
      count: members.length,
    });
  } catch (error) {
    console.error('Family API hatası:', error);
    return NextResponse.json({ error: 'Sunucu hatası' }, { status: 500 });
  }
}
