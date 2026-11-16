import { verifyCurationAccess } from '@/lib/security/curationGuard';
import { syncWordFamiliesFromLexemes } from "@/lib/curation/syncWordFamilies";
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

    checkScalar('form', currentItem.form, changes.form);
    checkScalar('dialect', currentItem.dialect, changes.dialect);
    checkScalar('wordFamilyId', currentItem.wordFamilyId, changes.wordFamilyId);
    checkScalar('ipa', currentItem.ipa, changes.ipa);
    checkScalar('partOfSpeech', currentItem.partOfSpeech, changes.partOfSpeech);
    checkScalar('conceptId', currentItem.conceptId, changes.conceptId);
    checkScalar('literalMeaning', currentItem.literalMeaning, changes.literalMeaning);
    checkScalar('notes', currentItem.notes, changes.notes);

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

    let newRootsArray = currentItem.rootIds ?? [];
    if (changes.rootIds !== undefined) {
      newRootsArray =
        typeof changes.rootIds === 'string'
          ? changes.rootIds
              .split(',')
              .map((r: string) => r.trim())
              .filter(Boolean)
          : Array.isArray(changes.rootIds)
            ? changes.rootIds
            : [];

      const oldRootsStr = Array.isArray(currentItem.rootIds)
        ? currentItem.rootIds.join(', ')
        : currentItem.rootId || '';
      const newRootsStr = newRootsArray.join(', ');

      if (oldRootsStr !== newRootsStr) {
        diff.push({ field: 'rootIds', oldValue: oldRootsStr, newValue: newRootsStr });
      }
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

    const updatedItem = {
      ...currentItem,
      ...(changes.form !== undefined && changes.form.trim() ? { form: changes.form.trim() } : {}),
      ...(changes.dialect !== undefined ? { dialect: changes.dialect || null } : {}),
      ...(changes.wordFamilyId !== undefined ? { wordFamilyId: changes.wordFamilyId || null } : {}),
      ...(changes.ipa !== undefined ? { ipa: changes.ipa || null } : {}),
      ...(changes.partOfSpeech !== undefined ? { partOfSpeech: changes.partOfSpeech || null } : {}),
      ...(changes.conceptId !== undefined ? { conceptId: changes.conceptId || null } : {}),
      ...(changes.literalMeaning !== undefined ? { literalMeaning: changes.literalMeaning || null } : {}),
      ...(changes.notes !== undefined ? { notes: changes.notes } : {}),
      ...(changes.rootIds !== undefined ? { rootIds: newRootsArray } : {}),
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
