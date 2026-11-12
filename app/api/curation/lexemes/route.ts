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

// ─────────────────────────────────────────────────────────────
// PATCH /api/curation/lexemes
// Gövde: { id, expected, patch }
// - expected: istemcinin gördüğü son kayıt (optimistic concurrency)
// - patch:    yalnız izinli alanlar; rootIds dahil
// Dönen: { ok: true, record, backup, sha256 }
// ─────────────────────────────────────────────────────────────
const PATCHABLE = new Set([
  'form', 'ipa', 'literalMeaning', 'meaning', 'partOfSpeech',
  'conceptId', 'dialect', 'notes', 'translations', 'rootIds',
  'wordFamilyId',
]);

function dataFile(): string {
  return path.join(process.cwd(), 'public', 'data', 'linguistic', 'lexemes.json');
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

export async function PATCH(req: NextRequest) {
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

    // Yalnız izinli anahtarlar
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

    // conceptId kanonik format doğrulaması (ADR-GOV-015)
    if ('conceptId' in cleanPatch && cleanPatch.conceptId !== null && cleanPatch.conceptId !== '') {
      if (typeof cleanPatch.conceptId !== 'string') {
        return NextResponse.json(
          { error: 'conceptId metin olmalı.' }, { status: 400 }
        );
      }
      try {
        cleanPatch.conceptId = ConceptId.create(cleanPatch.conceptId.trim()).value;
      } catch (err: any) {
        return NextResponse.json(
          { error: err?.message || 'Geçersiz conceptId formatı.' }, { status: 400 }
        );
      }
    }

    // rootIds doğrulama (dizi, string, boşluklar temiz)
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

    // expected ile güncel kaydı karşılaştır (optimistic concurrency)
    // Sadece expected'te bulunan alanları kontrol et; _revision, __proto__ gibi
    // meta alanları yoksay.
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

    // Uygula
    const updated: Record<string, any> = { ...current };
    for (const key of Object.keys(cleanPatch)) {
      updated[key] = cleanPatch[key];
    }

    // Yedek
    const stamp = new Date().toISOString().replace(/[:.]/g, '-');
    const backupPath = `${file}.bak-${stamp}`;
    fs.copyFileSync(file, backupPath);

    // Yaz
    const nextRows = rows.slice();
    nextRows[idx] = updated;
    const serialized = JSON.stringify(nextRows, null, 2) + '\n';
    fs.writeFileSync(file, serialized, 'utf8');

    const hash = sha256(serialized);

    // Etkilenen kavram(lar) için bilgi grafiği önbelleğini geçersiz kıl
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
