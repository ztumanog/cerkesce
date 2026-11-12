// app/api/search/route.ts - Lexeme tabanlı Çerkesçe (Kiril + Latin Converter) ve Çok Dilli (TR/EN/RU/AR) Arama API'si
import { NextRequest, NextResponse } from 'next/server';
import { normalizeLatinToKiril } from '@/lib/latinNormalize';
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

function toStringList(val: any): string[] {
  if (!val) return [];
  if (Array.isArray(val)) {
    return val
      .flatMap((v) => String(v || '').split(/[;,/]+/))
      .map((s) => s.trim())
      .filter(Boolean);
  }
  return String(val)
    .split(/[;,/]+/)
    .map((s) => s.trim())
    .filter(Boolean);
}

function formatField(val: any): string {
  if (!val) return '';
  if (Array.isArray(val)) return val.filter(Boolean).join(', ');
  return String(val).trim();
}

export async function GET(request: NextRequest) {
  const start = Date.now();
  try {
    const { searchParams } = new URL(request.url);
    const rawQ = (searchParams.get('q') || '').trim();
    const mode = (searchParams.get('mode') || 'baslayan').toLowerCase();
    const limit = Math.max(1, Math.min(100, parseInt(searchParams.get('limit') || '40', 10)));

    if (!rawQ) {
      return NextResponse.json({ success: true, results: [], total: 0, ms: 0 });
    }

    // 1. Kol: Çerkesçe Kiril + Latin-Kiril Converter normalizasyonu
    const q = normalizePalochka(normalizeLatinToKiril(rawQ)).toLowerCase();
    const qAlt = q.includes('е')
      ? q.replace(/е/g, 'э')
      : q.includes('э')
        ? q.replace(/э/g, 'е')
        : null;
    const qNoPal = qAlt
      ? qAlt.replace(/Ӏ(?!.*Ӏ)/, '')
      : q.includes('Ӏ')
        ? q.replace(/Ӏ(?!.*Ӏ)/, '')
        : null;

    // 2. Kol: Ham Çok Dilli Anlam Sorgusu (TR, EN, RU, AR)
    const rawLower = rawQ.toLocaleLowerCase('tr-TR');
    const rawEnLower = rawQ.toLowerCase();

    const { index, list } = getIndex();

    const exact = index.get(normKey(q));
    const exactAlt = qAlt ? index.get(normKey(qAlt)) : null;
    const exactNoPal = qNoPal ? index.get(normKey(qNoPal)) : null;

    const circassianStarts: any[] = [];
    const circassianContains: any[] = [];
    const translationExact: any[] = [];
    const translationStarts: any[] = [];
    const translationContains: any[] = [];

    for (const lex of list) {
      const form = normalizePalochka(String(lex.form || lex.headword || '')).toLowerCase();

      // 1) Çerkesçe kelime başı (Kiril veya Latin Converter çıktısı)
      if (form) {
        if (form.startsWith(q) && form !== q) {
          circassianStarts.push(lex);
        } else if (qAlt && form.startsWith(qAlt) && form !== qAlt) {
          circassianStarts.push(lex);
        } else if (qNoPal && form.startsWith(qNoPal) && form !== qNoPal) {
          circassianStarts.push(lex);
        } else if (mode === 'iceren' && q.length >= 2 && form.includes(q)) {
          circassianContains.push(lex);
        }
      }

      // 2) Çok dilli anlam eşleşmesi (TR, EN, RU, AR + literalMeaning)
      const trChunks = toStringList(lex.translations?.tr);
      const otherChunks = [
        ...toStringList(lex.translations?.en),
        ...toStringList(lex.translations?.ru),
        ...toStringList(lex.translations?.ar),
        ...toStringList(lex.literalMeaning),
      ];

      let matchedRank = 0; // 3: tam anlam, 2: anlam başı, 1: anlam içi

      for (const chunk of trChunks) {
        const c = chunk.toLocaleLowerCase('tr-TR');
        if (c === rawLower) {
          matchedRank = Math.max(matchedRank, 3);
        } else if (c.startsWith(rawLower) || c.split(/\s+/).some((w) => w.startsWith(rawLower))) {
          matchedRank = Math.max(matchedRank, 2);
        } else if (c.includes(rawLower)) {
          matchedRank = Math.max(matchedRank, 1);
        }
      }

      for (const chunk of otherChunks) {
        const c = chunk.toLowerCase();
        if (c === rawEnLower) {
          matchedRank = Math.max(matchedRank, 3);
        } else if (c.startsWith(rawEnLower) || c.split(/\s+/).some((w) => w.startsWith(rawEnLower))) {
          matchedRank = Math.max(matchedRank, 2);
        } else if (c.includes(rawEnLower)) {
          matchedRank = Math.max(matchedRank, 1);
        }
      }

      if (matchedRank === 3) {
        translationExact.push(lex);
      } else if (matchedRank === 2) {
        translationStarts.push(lex);
      } else if (matchedRank === 1 && (mode === 'iceren' || rawLower.length >= 3)) {
        translationContains.push(lex);
      }
    }

    const seen = new Set<string>();
    const results: any[] = [];

    const pushLex = (lex: any) => {
      if (!lex || seen.has(lex.id) || results.length >= limit) return;
      seen.add(lex.id);

      const item: any = {
        id: lex.id,
        form: lex.form,
        ipa: lex.ipa ?? null,
        partOfSpeech: lex.partOfSpeech ?? null,
        translations: lex.translations || {},
      };

      const trText = formatField(lex.translations?.tr);
      if (trText) item.tr = trText;

      const enText = formatField(lex.translations?.en);
      if (enText) item.en = enText;

      const ruText = formatField(lex.translations?.ru);
      if (ruText) item.ru = ruText;

      const arText = formatField(lex.translations?.ar);
      if (arText) item.ar = arText;

      if (lex.literalMeaning) item.literalMeaning = String(lex.literalMeaning);
      if (lex.dialect) item.dialect = String(lex.dialect);
      if (lex.rootIds?.length) item.rootIds = lex.rootIds;
      if (lex.wordFamilyId) item.wordFamilyId = lex.wordFamilyId;
      if (lex.conceptId) item.conceptId = lex.conceptId;
      if (lex.dialectVariants) item.dialectVariants = lex.dialectVariants;

      results.push(item);
    };

    // Öncelik sırası: Çerkesçe tam -> Anlam tam -> Çerkesçe başlayan -> Anlam başlayan -> İçeren
    if (exact) pushLex(exact);
    if (exactAlt) pushLex(exactAlt);
    if (exactNoPal) pushLex(exactNoPal);
    for (const lex of translationExact) pushLex(lex);
    for (const lex of circassianStarts) pushLex(lex);
    for (const lex of translationStarts) pushLex(lex);
    for (const lex of circassianContains) pushLex(lex);
    for (const lex of translationContains) pushLex(lex);

    const ms = Date.now() - start;
    if (ms > 500) console.warn(`[search] YAVAS: ${rawQ} ${ms}ms`);

    return NextResponse.json({ success: true, results, total: results.length, ms });
  } catch (e: any) {
    console.error('[search] Hata:', e);
    return NextResponse.json({ success: false, error: e.message }, { status: 500 });
  }
}
