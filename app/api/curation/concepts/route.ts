// app/api/curation/concepts/route.ts
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const lexPath = path.join(
      process.cwd(),
      'public', 'data', 'linguistic', 'lexemes.json'
    );
    const raw = fs.readFileSync(lexPath, 'utf-8');
    const parsed = JSON.parse(raw);
    const lexemes = Array.isArray(parsed) ? parsed : (parsed.lexemes || []);

    // Her conceptId icin: lexeme sayisi, ornek formlar
    const conceptMap: Record<string, {
      target: string | null;
      circassianCandidates: string[];
      confidence: string;
      review: boolean;
      verdict?: string;
      lexemeCount: number;
    }> = {};

    for (const lex of lexemes) {
      const cid = lex.conceptId;
      if (!cid) continue;

      if (!conceptMap[cid]) {
        conceptMap[cid] = {
          target: null,
          circassianCandidates: [],
          confidence: 'HIGH',
          review: false,
          lexemeCount: 0,
        };
      }

      conceptMap[cid].lexemeCount += 1;
      // Ilk 5 formu ekle (aday olarak)
      if (conceptMap[cid].circassianCandidates.length < 5 && lex.form) {
        if (!conceptMap[cid].circassianCandidates.includes(lex.form)) {
          conceptMap[cid].circassianCandidates.push(lex.form);
        }
      }
    }

    // Sirala: lexeme sayisina gore azalan
    const sorted: Record<string, any> = { _meta: { total: Object.keys(conceptMap).length } };
    const entries = Object.entries(conceptMap).sort(
      (a, b) => b[1].lexemeCount - a[1].lexemeCount
    );
    for (const [k, v] of entries) {
      sorted[k] = v;
    }

    return NextResponse.json(sorted);
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message, _meta: { total: 0 } },
      { status: 500 }
    );
  }
}