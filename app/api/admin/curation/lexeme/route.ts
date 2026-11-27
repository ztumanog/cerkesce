import { verifyCurationAccess } from '@/lib/security/curationGuard';
import { syncWordFamiliesFromLexemes } from "../../../../../src/lib/curation/syncWordFamilies";
import { scheduleReportRefresh } from "@/infra/governance/reportRefresh";
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

function getLexemesPath() {
  return path.join(process.cwd(), 'public', 'data', 'linguistic', 'lexemes.json');
}

function getAuditLogPath() {
  return path.join(process.cwd(), 'public', 'data', 'linguistic', 'audit_log.jsonl');
}

export async function GET(req: Request) {
  const denied = verifyCurationAccess(req);
  if (denied) return denied;

  try {
    const filePath = getLexemesPath();
    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ error: 'lexemes.json dosyası bulunamadı.' }, { status: 404 });
    }
    const rawData = fs.readFileSync(filePath, 'utf-8');
    const parsed = JSON.parse(rawData);
    const lexemes = Array.isArray(parsed) ? parsed : parsed.lexemes ?? [];

    return NextResponse.json({
      success: true,
      total: lexemes.length,
      lexemes,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Sunucu hatası' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const denied = verifyCurationAccess(req);
  if (denied) return denied;

  try {
    const body = await req.json();
    const { lexemeId, changes, confirm } = body;

    if (!lexemeId || !changes) {
      return NextResponse.json(
        { error: 'Geçersiz parametreler (lexemeId ve changes zorunludur).' },
        { status: 400 }
      );
    }

    const filePath = getLexemesPath();
    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ error: 'lexemes.json dosyası bulunamadı.' }, { status: 404 });
    }

    const rawData = fs.readFileSync(filePath, 'utf-8');
    const lexemes = JSON.parse(rawData);
    const isArray = Array.isArray(lexemes);
    const list = isArray ? lexemes : lexemes.lexemes ?? [];

    const targetIndex = list.findIndex((item: any) => item.id === lexemeId);
    if (targetIndex === -1) {
      return NextResponse.json({ error: `ID'si ${lexemeId} olan kelime bulunamadı.` }, { status: 404 });
    }

    const currentItem = list[targetIndex];
    const diff: { field: string; oldValue: any; newValue: any }[] = [];

    const checkScalar = (field: string, oldVal: any, newVal: any) => {
      if (newVal !== undefined && String(newVal ?? '') !== String(oldVal ?? '')) {
        diff.push({ field, oldValue: oldVal ?? '', newValue: newVal });
      }
    };

    const scalarFields = [
      'form',
      'dialect',
      'wordFamilyId',
      'ipa',
      'partOfSpeech',
      'conceptId',
      'meaning',
      'literalMeaning',
      'notes',
      'status',
      'etymologyType',
      'source',
      'etymology',
      'dialectNote',
      'audioUrl',
      'scientificName',
    ] as const;

    for (const field of scalarFields) {
      checkScalar(field, currentItem[field], changes[field]);
    }

    if (changes.isLemma !== undefined) {
      const oldVal = Boolean(currentItem.isLemma);
      const newVal = Boolean(changes.isLemma);
      if (oldVal !== newVal) {
        diff.push({ field: 'isLemma', oldValue: oldVal, newValue: newVal });
      }
    }

    let parsedFreq: number | null | undefined = undefined;
    if (changes.corpusFrequency !== undefined) {
      const rawFreq = changes.corpusFrequency;
      parsedFreq =
        rawFreq === '' || rawFreq === null
          ? null
          : Number.isFinite(Number(rawFreq))
            ? Number(rawFreq)
            : (currentItem.corpusFrequency ?? null);
      const oldFreq = currentItem.corpusFrequency ?? null;
      if (oldFreq !== parsedFreq) {
        diff.push({ field: 'corpusFrequency', oldValue: oldFreq ?? '', newValue: parsedFreq ?? '' });
      }
    }

    const oldTr = Array.isArray(currentItem.translations?.tr)
      ? currentItem.translations.tr.join(', ')
      : currentItem.translations?.tr ?? '';
    const oldEn = Array.isArray(currentItem.translations?.en)
      ? currentItem.translations.en.join(', ')
      : currentItem.translations?.en ?? '';
    const oldRu = Array.isArray(currentItem.translations?.ru)
      ? currentItem.translations.ru.join(', ')
      : currentItem.translations?.ru ?? '';
    const oldAr = Array.isArray(currentItem.translations?.ar)
      ? currentItem.translations.ar.join(', ')
      : currentItem.translations?.ar ?? '';

    const trVal = changes.tr ?? changes.translations?.tr;
    const enVal = changes.en ?? changes.translations?.en;
    const ruVal = changes.ru ?? changes.translations?.ru;
    const arVal = changes.ar ?? changes.translations?.ar;
    checkScalar('translations.tr', oldTr, trVal);
    checkScalar('translations.en', oldEn, enVal);
    checkScalar('translations.ru', oldRu, ruVal);
    checkScalar('translations.ar', oldAr, arVal);

    const parseCsvOrArray = (val: any): string[] => {
      if (Array.isArray(val)) return val.map((r) => String(r).trim()).filter(Boolean);
      if (typeof val === 'string') return val.split(',').map((r) => r.trim()).filter(Boolean);
      return [];
    };

    let newRootsArray = currentItem.rootIds ?? [];
    if (changes.rootIds !== undefined) {
      newRootsArray = parseCsvOrArray(changes.rootIds);
      if (newRootsArray.length > 0) {
        const rootsPath = path.join(process.cwd(), 'public', 'data', 'linguistic', 'roots.json');
        if (!fs.existsSync(rootsPath)) {
          return NextResponse.json({ error: 'roots.json dosyası bulunamadı.' }, { status: 500 });
        }
        const rootsRaw = fs.readFileSync(rootsPath, 'utf-8').replace(/^\uFEFF/, '');
        const rootsList = JSON.parse(rootsRaw);
        const validRootIds = new Set(
          Array.isArray(rootsList) ? rootsList.map((r: any) => String(r?.id || '')).filter(Boolean) : []
        );
        const invalidRootIds = newRootsArray.filter((rid: string) => !validRootIds.has(rid));
        if (invalidRootIds.length > 0) {
          return NextResponse.json(
            { error: `Geçersiz rootId (roots.json içinde bulunamadı): ${invalidRootIds.join(', ')}` },
            { status: 400 }
          );
        }
      }
      const oldRootsStr = Array.isArray(currentItem.rootIds)
        ? currentItem.rootIds.join(', ')
        : currentItem.rootId || '';
      const newRootsStr = newRootsArray.join(', ');
      if (oldRootsStr !== newRootsStr) {
        diff.push({ field: 'rootIds', oldValue: oldRootsStr, newValue: newRootsStr });
      }
    }

    const checkJsonField = (field: string, oldVal: any, newVal: any, fallbackOld: any) => {
      if (newVal === undefined) return;
      const beforeNorm = JSON.stringify(oldVal ?? fallbackOld);
      const afterNorm = JSON.stringify(newVal);
      if (beforeNorm !== afterNorm) {
        diff.push({ field, oldValue: oldVal ?? fallbackOld, newValue: newVal });
      }
    };

    checkJsonField('senses', currentItem.senses, changes.senses, []);
    checkJsonField('examples', currentItem.examples, changes.examples, []);
    checkJsonField('dialectVariants', currentItem.dialectVariants, changes.dialectVariants, {});
    checkJsonField('derivation', currentItem.derivation, changes.derivation, {});
    checkJsonField('sources', currentItem.sources, changes.sources, []);

    let newTagsArray: string[] | undefined = undefined;
    if (changes.tags !== undefined) {
      newTagsArray = parseCsvOrArray(changes.tags);
      checkJsonField('tags', currentItem.tags, newTagsArray, []);
    }

    if (!confirm) {
      return NextResponse.json({
        dryRun: true,
        diff,
      });
    }

    const updatedTranslations = {
      ...(currentItem.translations || {}),
      ...(trVal !== undefined ? { tr: trVal } : {}),
      ...(enVal !== undefined ? { en: enVal } : {}),
      ...(ruVal !== undefined ? { ru: ruVal } : {}),
      ...(arVal !== undefined ? { ar: arVal } : {}),
    };

    const nextPartOfSpeech = changes.partOfSpeech !== undefined ? changes.partOfSpeech || null : undefined;
    const nextConceptId = changes.conceptId !== undefined ? changes.conceptId || null : undefined;

    let syncedConceptIds: any = undefined;
    if (
      nextConceptId !== undefined &&
      nextConceptId &&
      Array.isArray(currentItem.conceptIds) &&
      currentItem.conceptIds.length > 0
    ) {
      syncedConceptIds = [
        nextConceptId,
        ...currentItem.conceptIds.filter((c: any) => c !== nextConceptId),
      ];
    }

    const updatedItem = {
      ...currentItem,
      ...(changes.form !== undefined && String(changes.form).trim() ? { form: String(changes.form).trim() } : {}),
      ...(changes.dialect !== undefined ? { dialect: changes.dialect || null } : {}),
      ...(changes.wordFamilyId !== undefined ? { wordFamilyId: changes.wordFamilyId || null } : {}),
      ...(changes.ipa !== undefined ? { ipa: changes.ipa || null } : {}),
      ...(nextPartOfSpeech !== undefined ? { partOfSpeech: nextPartOfSpeech, pos: nextPartOfSpeech } : {}),
      ...(nextConceptId !== undefined ? { conceptId: nextConceptId } : {}),
      ...(syncedConceptIds !== undefined ? { conceptIds: syncedConceptIds } : {}),
      ...(changes.meaning !== undefined ? { meaning: changes.meaning } : {}),
      ...(changes.literalMeaning !== undefined ? { literalMeaning: changes.literalMeaning || null } : {}),
      ...(changes.notes !== undefined ? { notes: changes.notes } : {}),
      ...(changes.status !== undefined ? { status: changes.status || null } : {}),
      ...(changes.etymologyType !== undefined ? { etymologyType: changes.etymologyType || null } : {}),
      ...(changes.source !== undefined ? { source: changes.source || null } : {}),
      ...(changes.etymology !== undefined ? { etymology: changes.etymology || null } : {}),
      ...(changes.dialectNote !== undefined ? { dialectNote: changes.dialectNote || null } : {}),
      ...(changes.audioUrl !== undefined ? { audioUrl: changes.audioUrl || null } : {}),
      ...(changes.scientificName !== undefined ? { scientificName: changes.scientificName || null } : {}),
      ...(changes.isLemma !== undefined ? { isLemma: Boolean(changes.isLemma) } : {}),
      ...(parsedFreq !== undefined ? { corpusFrequency: parsedFreq } : {}),
      ...(changes.rootIds !== undefined ? { rootIds: newRootsArray, rootId: newRootsArray[0] ?? null } : {}),
      ...(changes.senses !== undefined ? { senses: changes.senses } : {}),
      ...(changes.examples !== undefined ? { examples: changes.examples } : {}),
      ...(changes.dialectVariants !== undefined ? { dialectVariants: changes.dialectVariants } : {}),
      ...(changes.derivation !== undefined ? { derivation: changes.derivation } : {}),
      ...(changes.sources !== undefined ? { sources: changes.sources } : {}),
      ...(newTagsArray !== undefined ? { tags: newTagsArray } : {}),
      translations: updatedTranslations,
    };

    list[targetIndex] = updatedItem;
    // Aile senkronu - wordFamilyId degistiyse aile dosyasini guncelle
    try {
      const newFam = changes.wordFamilyId;
      const oldFam = currentItem.wordFamilyId;
      if (typeof newFam === "string" && newFam && newFam !== oldFam) {
        const famPath = path.join(process.cwd(), "public/data/linguistic/word_families.json");
        if (fs.existsSync(famPath)) {
          const famRaw = fs.readFileSync(famPath, "utf-8");
          const famData = JSON.parse(famRaw);
          const famList = Array.isArray(famData) ? famData : (famData.families ?? famData.wordFamilies ?? []);
          const famById = new Map(famList.map((f: any) => [String(f.id), f]));
          let famChanged = false;
          if (oldFam && famById.has(String(oldFam))) { const of: any = famById.get(String(oldFam)); if (Array.isArray(of.lexemeIds)) { const ix = of.lexemeIds.indexOf(lexemeId); if (ix !== -1) { of.lexemeIds.splice(ix, 1); famChanged = true; } } }
          if (famById.has(newFam)) { const nf: any = famById.get(newFam); if (!Array.isArray(nf.lexemeIds)) nf.lexemeIds = []; if (!nf.lexemeIds.includes(lexemeId)) { nf.lexemeIds.push(lexemeId); famChanged = true; } }
          if (famChanged) { const famStamp = new Date().toISOString().replace(/[:.]/g, "-"); fs.copyFileSync(famPath, famPath + ".bak-" + famStamp); const famOut = Array.isArray(famData) ? famList : { ...famData, families: famList }; fs.writeFileSync(famPath, JSON.stringify(famOut, null, 2), "utf-8"); }
        }
      }
    } catch {}

    const finalData = isArray ? list : { ...lexemes, lexemes: list };
    fs.writeFileSync(filePath, JSON.stringify(finalData, null, 2), 'utf-8');
    syncWordFamiliesFromLexemes(list, [currentItem.wordFamilyId, updatedItem.wordFamilyId].filter(Boolean));

    // ADR-GOV-016 Seçenek C: veri değişti — governance raporları arka planda yenilenir
    scheduleReportRefresh();

    try {
      const logEntry = JSON.stringify({
        timestamp: new Date().toISOString(),
        action: 'CURATION_LEXEME_UPDATE',
        lexemeId,
        form: updatedItem.form,
        diff,
      });
      fs.appendFileSync(getAuditLogPath(), logEntry + '\n', 'utf-8');
    } catch {}

    return NextResponse.json({
      applied: true,
      appliedFields: diff.map((d) => d.field),
      lexeme: updatedItem,
      message: 'Kayıt başarıyla güncellendi ve denetim günlüğüne işlendi.',
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Sunucu hatası' }, { status: 500 });
  }
}
