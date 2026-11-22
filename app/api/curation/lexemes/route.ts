import { verifyCurationAccess } from '@/lib/security/curationGuard';
import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { createHash } from 'crypto';
import { GraphMutationService } from '@/domain/sync/services/GraphMutationService';
import { ConceptId, isValidCanonicalConceptId } from '@/domain/shared/value-objects/ConceptId';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const fields = [
  'id', 'form', 'ipa', 'literalMeaning', 'meaning', 'partOfSpeech',
  'conceptId', 'dialect', 'notes', 'translations', 'rootIds',
  'wordFamilyId'
];

export async function GET(req: NextRequest) {
  try {
    const file = path.join(
      process.cwd(), 'public', 'data', 'linguistic', 'lexemes.json'
    );
    const rows = JSON.parse(
      fs.readFileSync(file, 'utf8').replace(/^\uFEFF/, '')
    );
    if (!Array.isArray(rows)) throw new Error('Veri dizi değil.');

    const q = (req.nextUrl.searchParams.get('q') || '').toLowerCase();
    const selected = q ? rows.filter((r: any) =>
      [r.id, r.form, r.conceptId, r.translations?.tr].some(
        v => typeof v === 'string' && v.toLowerCase().includes(q)
      )
    ) : rows;

    const result = selected.map((r: any) => {
      const item: Record<string, any> = {};
      for (const k of fields) {
        if (Object.prototype.hasOwnProperty.call(r, k)) item[k] = r[k];
      }
      item._revision = createHash('sha256')
        .update(JSON.stringify(r)).digest('hex');
      return item;
    });
    return NextResponse.json(result, {
      headers: { 'Cache-Control': 'no-store' }
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || 'Okuma hatası.' }, { status: 500 }
    );
  }
}

const PATCHABLE = new Set([
  'form', 'ipa', 'literalMeaning', 'meaning', 'partOfSpeech',
  'conceptId', 'dialect', 'notes', 'translations', 'rootIds',
  'wordFamilyId',
]);

function dataFile(): string {
  return path.join(process.cwd(), 'public', 'data', 'linguistic', 'lexemes.json');
}

function rootsFile(): string {
  return path.join(process.cwd(), 'public', 'data', 'linguistic', 'roots.json');
}

function familiesFile(): string {
  return path.join(process.cwd(), 'public', 'data', 'linguistic', 'word_families.json');
}

function readRows(): any[] {
  const raw = fs.readFileSync(dataFile(), 'utf8').replace(/^\uFEFF/, '');
  const parsed = JSON.parse(raw);
  if (!Array.isArray(parsed)) throw new Error('Veri dizi değil.');
  return parsed;
}

function sha256(text: string): string {
  return createHash('sha256').update(text).digest('hex');
}

function sameJson(a: unknown, b: unknown): boolean {
  return JSON.stringify(a) === JSON.stringify(b);
}

// roots.json / word_families.json hem dizi hem { roots: [] } / { wordFamilies: [] } olabilir.
// Hangi şekildeyse o şekilde geri yaz.
function readArrayFile(file: string, keys: string[]): { rows: any[]; containerKey: string | null; data: any } {
  if (!fs.existsSync(file)) return { rows: [], containerKey: null, data: [] };
  const raw = fs.readFileSync(file, 'utf8').replace(/^\uFEFF/, '');
  if (!raw.trim()) return { rows: [], containerKey: null, data: [] };
  const parsed = JSON.parse(raw);
  if (Array.isArray(parsed)) return { rows: parsed, containerKey: null, data: parsed };
  if (parsed && typeof parsed === 'object') {
    for (const k of keys) {
      if (Array.isArray((parsed as any)[k])) {
        return { rows: (parsed as any)[k], containerKey: k, data: parsed };
      }
    }
  }
  return { rows: [], containerKey: keys[0], data: parsed };
}

function writeArrayFile(file: string, data: any, containerKey: string | null, rows: any[]) {
  const stamp = new Date().toISOString().replace(/[:.]/g, '-');
  if (fs.existsSync(file)) {
    fs.copyFileSync(file, `${file}.bak-${stamp}`);
  }
  const out = containerKey ? { ...data, [containerKey]: rows } : rows;
  fs.writeFileSync(file, JSON.stringify(out, null, 2) + '\n', 'utf8');
}

export async function PATCH(req: NextRequest) {
  const denied = verifyCurationAccess(req);
  if (denied) return denied;

  try {
    let body: any;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { error: 'Gövde JSON değil.' }, { status: 400 }
      );
    }

    if (!body || typeof body !== 'object') {
      return NextResponse.json(
        { error: 'Gövde nesne olmalı.' }, { status: 400 }
      );
    }

    const { id, expected, patch } = body;
    if (typeof id !== 'string' || !id) {
      return NextResponse.json(
        { error: 'id zorunlu.' }, { status: 400 }
      );
    }
    if (!expected || typeof expected !== 'object') {
      return NextResponse.json(
        { error: 'expected zorunlu.' }, { status: 400 }
      );
    }
    if (!patch || typeof patch !== 'object' || Array.isArray(patch)) {
      return NextResponse.json(
        { error: 'patch nesne olmalı.' }, { status: 400 }
      );
    }

    const cleanPatch: Record<string, unknown> = {};
    for (const key of Object.keys(patch)) {
      if (!PATCHABLE.has(key)) {
        return NextResponse.json(
          { error: `İzin verilmeyen alan: ${key}` }, { status: 400 }
        );
      }
      cleanPatch[key] = patch[key];
    }
    if (Object.keys(cleanPatch).length === 0) {
      return NextResponse.json(
        { error: 'patch boş.' }, { status: 400 }
      );
    }

    if ('conceptId' in cleanPatch && cleanPatch.conceptId !== null && cleanPatch.conceptId !== '') {
      if (typeof cleanPatch.conceptId !== 'string') {
        return NextResponse.json(
          { error: 'conceptId metin olmalı.' }, { status: 400 }
        );
      }
      try {
        cleanPatch.conceptId = ConceptId.create(cleanPatch.conceptId.trim()).value;
        cleanPatch.concept = cleanPatch.conceptId;
      } catch (err: any) {
        return NextResponse.json(
          { error: err?.message || 'Geçersiz conceptId formatı.' }, { status: 400 }
        );
      }
    }

    if ('rootIds' in cleanPatch) {
      const v = cleanPatch.rootIds;
      if (!Array.isArray(v)) {
        return NextResponse.json(
          { error: 'rootIds dizi olmalı.' }, { status: 400 }
        );
      }
      const roots = v
        .filter((x): x is string => typeof x === 'string')
        .map(s => s.trim())
        .filter(Boolean);
      cleanPatch.rootIds = roots;
    }

    const file = dataFile();
    if (!fs.existsSync(file)) {
      return NextResponse.json(
        { error: 'lexemes.json bulunamadı.' }, { status: 500 }
      );
    }

    const rows = readRows();
    const idx = rows.findIndex((r: any) => r && r.id === id);
    if (idx === -1) {
      return NextResponse.json(
        { error: `Kayıt bulunamadı: ${id}` }, { status: 404 }
      );
    }

    const current = rows[idx];

    for (const key of Object.keys(expected)) {
      if (key === '_revision' || key.startsWith('__')) continue;
      if (!(key in current)) continue;
      if (!sameJson((expected as any)[key], (current as any)[key])) {
        return NextResponse.json(
          {
            error:
              'Kayıt değişmiş. Sayfayı yenileyip tekrar dene. ' +
              `Çakışan alan: ${key}`,
            current,
          },
          { status: 409 }
        );
      }
    }

    const updated: Record<string, any> = { ...current };
    for (const key of Object.keys(cleanPatch)) {
      updated[key] = cleanPatch[key];
    }

    const stamp = new Date().toISOString().replace(/[:.]/g, '-');
    const backupPath = `${file}.bak-${stamp}`;
    fs.copyFileSync(file, backupPath);

    const nextRows = rows.slice();
    nextRows[idx] = updated;
    const serialized = JSON.stringify(nextRows, null, 2) + '\n';
    fs.writeFileSync(file, serialized, 'utf8');

    const hash = sha256(serialized);

    // --- YENİ: lexeme'in işaret ettiği kök + aile yoksa roots.json / word_families.json'a oluştur ---
    const createdRoots: string[] = [];
    const createdFamilies: string[] = [];
    try {
      const rootIds = Array.isArray(updated.rootIds) ? updated.rootIds.filter((x: any) => typeof x === 'string' && x.trim()) : [];
      const familyId = typeof updated.wordFamilyId === 'string' && updated.wordFamilyId.trim() ? updated.wordFamilyId.trim() : null;
      const trText = typeof updated.translations?.tr === 'string' && updated.translations.tr.trim()
        ? updated.translations.tr.trim()
        : (typeof updated.meaning === 'string' && updated.meaning ? updated.meaning : (updated.form || ''));

      if (rootIds.length > 0) {
        const rf = rootsFile();
        const { rows: rootRows, containerKey: rootKey, data: rootData } = readArrayFile(rf, ['roots', 'data', 'items']);
        let rootsChanged = false;
        for (const rid of rootIds) {
          const existing = rootRows.find((r: any) => r && r.id === rid);
          if (!existing) {
            rootRows.push({
              id: rid,
              form: updated.form || rid.replace(/^R-/, ''),
              primaryMeaning: trText,
              meaning: trText,
              translations: updated.translations || { tr: trText },
              conceptId: updated.conceptId || null,
              concept: updated.conceptId || null,
              wordFamilyId: familyId,
              source: `Dil Kurasyonu / ${updated.id}`,
              createdFrom: updated.id,
            });
            createdRoots.push(rid);
            rootsChanged = true;
          } else {
            if (!existing.wordFamilyId && familyId) { existing.wordFamilyId = familyId; rootsChanged = true; }
            if (!existing.conceptId && updated.conceptId) { existing.conceptId = updated.conceptId; existing.concept = updated.conceptId; rootsChanged = true; }
          }
        }
        if (rootsChanged) writeArrayFile(rf, rootData, rootKey, rootRows);
      }

      if (familyId) {
        const ff = familiesFile();
        const { rows: famRows, containerKey: famKey, data: famData } = readArrayFile(ff, ['wordFamilies', 'word_families', 'families', 'data', 'items']);
        let famChanged = false;
        const existingFam = famRows.find((r: any) => r && (r.id === familyId || r.wordFamilyId === familyId));
        if (!existingFam) {
          famRows.push({
            id: familyId,
            wordFamilyId: familyId,
            conceptId: updated.conceptId || null,
            concept: updated.conceptId || null,
            rootIds: rootIds,
            lexemeIds: [updated.id],
            source: `Dil Kurasyonu / ${updated.id}`,
          });
          createdFamilies.push(familyId);
          famChanged = true;
        } else {
          if (!Array.isArray(existingFam.rootIds)) existingFam.rootIds = [];
          if (!Array.isArray(existingFam.lexemeIds)) existingFam.lexemeIds = [];
          for (const rid of rootIds) {
            if (!existingFam.rootIds.includes(rid)) { existingFam.rootIds.push(rid); famChanged = true; }
          }
          if (!existingFam.lexemeIds.includes(updated.id)) { existingFam.lexemeIds.push(updated.id); famChanged = true; }
        }
        if (famChanged) writeArrayFile(ff, famData, famKey, famRows);
      }
    } catch (e: any) {
      // lexemes.json yazıldı ama kök/aile yazılamadıysa bunu gizleme
      return NextResponse.json(
        { error: `Lexeme yazıldı ama kök/aile yazılamadı: ${e?.message || e}`, createdRoots, createdFamilies },
        { status: 500 }
      );
    }

    const affectedConceptIds = new Set<string>();
    if (typeof current.conceptId === 'string' && isValidCanonicalConceptId(current.conceptId)) {
      affectedConceptIds.add(current.conceptId);
    }
    if (typeof updated.conceptId === 'string' && isValidCanonicalConceptId(updated.conceptId)) {
      affectedConceptIds.add(updated.conceptId);
    }
    for (const cid of affectedConceptIds) {
      GraphMutationService.applyMutation({
        mutationId: `curation_${id}_${Date.now()}`,
        conceptId: cid,
        type: 'NODE_UPDATED',
        timestamp: Date.now()
      });
    }

    return NextResponse.json(
      {
        ok: true,
        record: updated,
        backup: path.basename(backupPath),
        sha256: hash,
        createdRoots,
        createdFamilies,
      },
      { headers: { 'Cache-Control': 'no-store' } }
    );
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || 'Güncelleme hatası.' },
      { status: 500 }
    );
  }
}