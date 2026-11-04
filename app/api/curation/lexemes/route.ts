import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { createHash } from 'crypto';

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
