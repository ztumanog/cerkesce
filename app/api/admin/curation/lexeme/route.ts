import { verifyCurationAccess } from '@/lib/security/curationGuard';
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

    checkScalar('translations.tr', oldTr, changes.tr);
    checkScalar('translations.en', oldEn, changes.en);
    checkScalar('translations.ru', oldRu, changes.ru);
    checkScalar('translations.ar', oldAr, changes.ar);

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
      ...(changes.tr !== undefined ? { tr: changes.tr } : {}),
      ...(changes.en !== undefined ? { en: changes.en } : {}),
      ...(changes.ru !== undefined ? { ru: changes.ru } : {}),
      ...(changes.ar !== undefined ? { ar: changes.ar } : {}),
    };

    const updatedItem = {
      ...currentItem,
      ...(changes.form !== undefined && changes.form.trim() ? { form: changes.form.trim() } : {}),
      ...(changes.dialect !== undefined ? { dialect: changes.dialect || null } : {}),
      ...(changes.wordFamilyId !== undefined ? { wordFamilyId: changes.wordFamilyId || null } : {}),
      ...(changes.ipa !== undefined ? { ipa: changes.ipa || null } : {}),
      ...(changes.partOfSpeech !== undefined ? { partOfSpeech: changes.partOfSpeech || null } : {}),
      ...(changes.conceptId !== undefined ? { conceptId: changes.conceptId || null } : {}),
      ...(changes.rootIds !== undefined ? { rootIds: newRootsArray } : {}),
      translations: updatedTranslations,
    };

    list[targetIndex] = updatedItem;
    const finalData = isArray ? list : { ...lexemes, lexemes: list };
    fs.writeFileSync(filePath, JSON.stringify(finalData, null, 2), 'utf-8');

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

