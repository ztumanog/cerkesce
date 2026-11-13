// app/api/search/route.ts - Lexeme + 35 Klasik Sözlük Birleşik Çok Dilli Arama API'si
import { NextRequest, NextResponse } from 'next/server';
import { normalizeLatinToKiril } from '@/lib/latinNormalize';
import fs from 'fs';
import path from 'path';
import { normalizePalochka } from '@/domain/utils/normalizePalochka';
import { buildLexemeIndex, normKey } from '@/lib/lexemeIndex';
import { loadDictionaryData } from '@/lib/dictionaryLoader';

export interface KaynakInfo {
  kelime: string;
  sözlük: string;
  anlam: string;
  author?: string;
  year?: string | number;
  dialect?: string;
  sourceFile?: string;
  sourceLanguage?: string;
  targetLanguage?: string;
}

let cachedIndex: Map<string, any> | null = null;
let cachedList: any[] = [];
let cachedSourcesByHeadword: Map<string, KaynakInfo[]> | null = null;
let cachedLegacyEntries: { key: string; headword: string; meaning: string; kaynak: KaynakInfo }[] | null = null;

function extractLegacyMeaning(item: any): string {
  const firstDef =
    Array.isArray(item.definitions) && item.definitions.length > 0
      ? item.definitions[0]?.meaning || item.definitions[0]?.tanim || item.definitions[0]?.text
      : '';
  const rawHtml = item.full_definition_in_html
    ? String(item.full_definition_in_html).replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
    : '';
  return String(
    item.anlam ??
      item.translation ??
      item.definition ??
      item.meaning ??
      firstDef ??
      rawHtml ??
      ''
  ).trim();
}

function getLegacySources() {
  if (cachedSourcesByHeadword && cachedLegacyEntries) {
    return { sourcesMap: cachedSourcesByHeadword, legacyList: cachedLegacyEntries };
  }

  const { entries } = loadDictionaryData();
  const sourcesMap = new Map<string, KaynakInfo[]>();
  const legacyList: { key: string; headword: string; meaning: string; kaynak: KaynakInfo }[] = [];
  const dedup = new Set<string>();

  for (const item of entries) {
    const headword = String(item.kelime || item.word || item.spelling || item.headword || '').trim();
    const meaning = extractLegacyMeaning(item);
    if (!headword || !meaning) continue;

    const k = normKey(normalizePalochka(headword).toLowerCase());
    if (!k) continue;

    const kaynak: KaynakInfo = {
      kelime: headword,
      sözlük: String(item.dictionaryName || item.sourceFile || 'Sözlük'),
      anlam: meaning,
      author: item.author || undefined,
      year: item.year || undefined,
      dialect: item.dialect || undefined,
      sourceFile: item.sourceFile || undefined,
      sourceLanguage: item.sourceLanguage || undefined,
      targetLanguage: item.targetLanguage || undefined,
    };

    const sig = `${k}|${kaynak.sourceFile}|${kaynak.anlam.slice(0, 80)}`;
    if (dedup.has(sig)) continue;
    dedup.add(sig);

    const arr = sourcesMap.get(k);
    if (arr) {
      arr.push(kaynak);
    } else {
      sourcesMap.set(k, [kaynak]);
    }

    legacyList.push({ key: k, headword, meaning, kaynak });
  }

  cachedSourcesByHeadword = sourcesMap;
  cachedLegacyEntries = legacyList;
  return { sourcesMap, legacyList };
}

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

function collectSourcesForLex(lex: any, sourcesMap: Map<string, KaynakInfo[]>): KaynakInfo[] {
  const forms = new Set<string>();
  const addForm = (f: any) => {
    if (!f || typeof f !== 'string') return;
    const k = normKey(normalizePalochka(f).toLowerCase());
    if (k) forms.add(k);
  };

  addForm(lex.form);
  addForm(lex.headword);
  addForm(lex.dialectVariants?.adyghe);
  addForm(lex.dialectVariants?.kabardian);

  const collected: KaynakInfo[] = [];
  const seenSrc = new Set<string>();

  for (const fk of forms) {
    const list = sourcesMap.get(fk);
    if (!list) continue;
    for (const s of list) {
      const id = `${s.sourceFile}|${s.kelime}|${s.anlam.slice(0, 60)}`;
      if (seenSrc.has(id)) continue;
      seenSrc.add(id);
      collected.push(s);
    }
  }
  return collected;
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
    const { sourcesMap, legacyList } = getLegacySources();

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

      // 2) Çok dilli anlam eşleşmesi (TR, EN, RU, AR + literalMeaning + 35 sözlük kaynak anlamları)
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
    const seenForms = new Set<string>();
    const results: any[] = [];

    const pushLex = (lex: any) => {
      if (!lex || seen.has(lex.id) || results.length >= limit) return;
      seen.add(lex.id);
      const fk = normKey(normalizePalochka(String(lex.form || '')).toLowerCase());
      if (fk) seenForms.add(fk);

      const kaynaklar = collectSourcesForLex(lex, sourcesMap);

      const item: any = {
        id: lex.id,
        form: lex.form,
        ipa: lex.ipa ?? null,
        partOfSpeech: lex.partOfSpeech ?? null,
        translations: lex.translations || {},
        kaynaklar,
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
      const mergedRoots = Array.isArray(lex.rootIds) && lex.rootIds.length ? lex.rootIds : (lex.rootId ? [lex.rootId] : []);
      if (mergedRoots.length) item.rootIds = mergedRoots;
      if (lex.wordFamilyId) item.wordFamilyId = lex.wordFamilyId;
      if (lex.conceptId) item.conceptId = lex.conceptId;
      if (lex.dialectVariants) item.dialectVariants = lex.dialectVariants;

      results.push(item);
    };

    const rankTranslationMatch = (a: any, b: any) => {
      const aLemma = a.isLemma ? 1 : 0;
      const bLemma = b.isLemma ? 1 : 0;
      if (bLemma !== aLemma) return bLemma - aLemma;
      const aFreq = Number(a.corpusFrequency || 0);
      const bFreq = Number(b.corpusFrequency || 0);
      if (bFreq !== aFreq) return bFreq - aFreq;
      return String(a.form || '').length - String(b.form || '').length;
    };

    translationExact.sort(rankTranslationMatch);
    translationStarts.sort(rankTranslationMatch);
    translationContains.sort(rankTranslationMatch);

    // Öncelik sırası: Çerkesçe tam -> Anlam tam -> Çerkesçe başlayan -> Anlam başlayan -> İçeren
    if (exact) pushLex(exact);
    if (exactAlt) pushLex(exactAlt);
    if (exactNoPal) pushLex(exactNoPal);
    for (const lex of translationExact) pushLex(lex);
    for (const lex of circassianStarts) pushLex(lex);
    for (const lex of translationStarts) pushLex(lex);
    for (const lex of circassianContains) pushLex(lex);
    for (const lex of translationContains) pushLex(lex);

    // 3) Sadece 35 klasik sözlükte bulunup lexemes.json'da olmayan ek eşleşmeleri de tamamla
    if (results.length < limit) {
      const groupedLegacy = new Map<string, { headword: string; kaynaklar: KaynakInfo[] }>();
      for (const leg of legacyList) {
        if (seenForms.has(leg.key)) continue;
        const hwNorm = normalizePalochka(leg.headword).toLowerCase();
        const mTr = leg.meaning.toLocaleLowerCase('tr-TR');
        const mEn = leg.meaning.toLowerCase();

        const isCircMatch =
          hwNorm === q ||
          hwNorm.startsWith(q) ||
          (qAlt && (hwNorm === qAlt || hwNorm.startsWith(qAlt))) ||
          (mode === 'iceren' && q.length >= 2 && hwNorm.includes(q));

        const isMeaningMatch =
          mTr === rawLower ||
          mTr.startsWith(rawLower) ||
          mEn === rawEnLower ||
          mEn.startsWith(rawEnLower) ||
          ((mode === 'iceren' || rawLower.length >= 3) && (mTr.includes(rawLower) || mEn.includes(rawEnLower)));

        if (!isCircMatch && !isMeaningMatch) continue;

        const grp = groupedLegacy.get(leg.key);
        if (grp) {
          grp.kaynaklar.push(leg.kaynak);
        } else {
          groupedLegacy.set(leg.key, { headword: leg.headword, kaynaklar: [leg.kaynak] });
        }
      }

      for (const [k, grp] of groupedLegacy.entries()) {
        if (results.length >= limit) break;
        seenForms.add(k);
        const first = grp.kaynaklar[0];
        results.push({
          id: `DICT-${k}`,
          form: grp.headword,
          anlam: first?.anlam || '',
          dialect: first?.dialect || 'COMMON',
          kaynaklar: grp.kaynaklar,
        });
      }
    }

    const ms = Date.now() - start;
    if (ms > 500) console.warn(`[search] YAVAS: ${rawQ} ${ms}ms`);

    return NextResponse.json({ success: true, results, total: results.length, ms });
  } catch (e: any) {
    console.error('[search] Hata:', e);
    return NextResponse.json({ success: false, error: e.message }, { status: 500 });
  }
}
