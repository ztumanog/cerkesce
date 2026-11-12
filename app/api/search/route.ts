// app/api/search/route.ts - MVP-1 - Ürünün Ana Araması
// Bu geçici değil, kalıcı. Lexeme tabanlı tek arama API'si.
// NOT: Server cache var. Veri (lexemes.json) değişirse dev restart gerekir. Faz 1 için kabul edildi.

import { NextRequest, NextResponse } from 'next/server';
import { normalizeLatinToKiril } from "@/lib/latinNormalize";
import fs from 'fs';
import path from 'path';
import { normalizePalochka } from '@/domain/utils/normalizePalochka';
import { buildLexemeIndex, normKey } from '@/lib/lexemeIndex';

let cachedIndex: Map<string, any> | null = null;
let cachedList: any[] = [];

function getIndex() {
  if (cachedIndex) return { index: cachedIndex, list: cachedList };
  const p = path.join(process.cwd(), 'public', 'data', 'linguistic', 'lexemes.json');
  const raw = JSON.parse(fs.readFileSync(p, 'utf-8'));
  const list = Array.isArray(raw) ? raw : raw.lexemes ?? [];
  const index = buildLexemeIndex(list);
  cachedIndex = index;
  cachedList = list;
  return { index, list };
}

export async function GET(request: NextRequest) {
  const start = Date.now();
  try {
    const { searchParams } = new URL(request.url);
    const rawQ = (searchParams.get('q') || '').trim();
    const q = normalizePalochka(normalizeLatinToKiril(rawQ)).toLowerCase();
    const qAlt = q.includes('е') ? q.replace(/е/g, 'э') : (q.includes('э') ? q.replace(/э/g, 'е') : null);
    // Son palochkayi sil - ilk palochka lazim (щӀ), ikinci fazla olabilir (лӀ -> л)
    // qAlt uzerinden: hem е->э hem son palochka silinmis hali
    const qNoPal = qAlt ? qAlt.replace(/Ӏ(?!.*Ӏ)/, '') : (q.includes('Ӏ') ? q.replace(/Ӏ(?!.*Ӏ)/, '') : null);
    const limit = Math.max(1, Math.min(50, parseInt(searchParams.get('limit') || '20', 10)));

    if (!q) {
      return NextResponse.json({ success: true, results: [], total: 0, ms: 0 });
    }

    const { index, list } = getIndex();

    // Tam eşleşme ilk sırada - Kriter 2
    const exact = index.get(normKey(q));
    const exactAlt = qAlt ? index.get(normKey(qAlt)) : null;
    const exactNoPal = qNoPal ? index.get(normKey(qNoPal)) : null;

    const starts: any[] = [];
    for (const lex of list) {
      if (starts.length >= limit) break;
      const form = normalizePalochka(String(lex.form || lex.headword || '')).toLowerCase();
      if (form.startsWith(q) && form !== q) starts.push(lex);
    }

    if (qAlt) {
      for (const lex of list) {
        if (starts.length >= limit) break;
        const form = normalizePalochka(String(lex.form || lex.headword || '')).toLowerCase();
        if (form.startsWith(qAlt) && form !== qAlt) starts.push(lex);
      }
    }

    if (qNoPal) {
      for (const lex of list) {
        if (starts.length >= limit) break;
        const form = normalizePalochka(String(lex.form || lex.headword || '')).toLowerCase();
        if (form.startsWith(qNoPal) && form !== qNoPal) starts.push(lex);
      }
    }

    const seen = new Set<string>();
    const results: any[] = [];

    const pushLex = (lex: any) => {
      if (!lex || seen.has(lex.id)) return;
      seen.add(lex.id);
      // Boş alan gönderme - Kriter 4
      const item: any = {
        id: lex.id, // L-GUKQEUE
        form: lex.form,
        ipa: lex.ipa ?? null,
        partOfSpeech: lex.partOfSpeech ?? null,
      };
      const rawTr = lex.translations?.tr;
      const trText = Array.isArray(rawTr)
        ? rawTr.filter(Boolean).join(', ')
        : typeof rawTr === 'string'
          ? rawTr
          : '';
      if (trText.trim()) item.tr = trText.trim();

      const rawEn = lex.translations?.en;
      const enText = Array.isArray(rawEn)
        ? rawEn.filter(Boolean).join(', ')
        : typeof rawEn === 'string'
          ? rawEn
          : '';
      if (enText.trim()) item.en = enText.trim();

      if (lex.literalMeaning) item.literalMeaning = String(lex.literalMeaning);
      if (lex.dialect) item.dialect = String(lex.dialect);
      // Etiket, link değil - Kriter 6
      if (lex.rootIds?.length) item.rootIds = lex.rootIds;
      if (lex.wordFamilyId) item.wordFamilyId = lex.wordFamilyId;
      if (lex.conceptId) item.conceptId = lex.conceptId;
      if (lex.dialectVariants) item.dialectVariants = lex.dialectVariants;
      results.push(item);
    };

    if (exact) pushLex(exact);
    if (exactAlt) pushLex(exactAlt);
    if (exactNoPal) pushLex(exactNoPal);
    for (const lex of starts) pushLex(lex);

    const ms = Date.now() - start;
    if (ms > 500) console.warn(`[search] YAVAS: ${q} ${ms}ms`);

    return NextResponse.json({ success: true, results, total: results.length, ms });
  } catch (e: any) {
    console.error('[search] Hata:', e);
    return NextResponse.json({ success: false, error: e.message }, { status: 500 });
  }
}