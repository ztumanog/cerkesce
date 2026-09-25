import { NextRequest, NextResponse } from 'next/server';
import { loadDictionaryData } from '@/lib/dictionaryLoader';

export interface DictionaryEntry {
  kelime?: string;
  word?: string;
  spelling?: string;
  headword?: string;
  key?: string;
  anlam?: string;
  translation?: string;
  definition?: string;
  definitions?: { meaning?: string }[];
  full_definition_in_html?: string;
  dialect?: string;
  sourceLanguage?: string;
  targetLanguage?: string;
  sourceFile?: string;
  dictionaryName?: string;
  [key: string]: unknown;
}

interface ParsedText {
  raw: string;
  mainTokens: string[];
  parenTokens: string[];
  exampleTokens: string[];
}

interface KaynakInfo {
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

interface GroupedResult {
  kelime: string;
  anaKelime: string;
  anlamlar: string[];
  kaynaklar: KaynakInfo[];
  dialect?: string;
  score: number;
}

function normalizeDialectParam(val: string): string {
  const v = (val || '').toLowerCase();
  if (v === 'eastern' || v === 'dogu' || v === 'doğu') return 'kbd';
  if (v === 'western' || v === 'bati' || v === 'batı') return 'ady';
  return v;
}

function inferLanguageFromFile(fileName: string, position: 0 | 1): string | undefined {
  const code = fileName.replace(/\.json$/i, '').split('-')[position]?.toLowerCase();
  if (!code) return undefined;
  if (code.startsWith('tu') || code.startsWith('tur')) return 'tr';
  if (code.startsWith('en')) return 'en';
  if (code.startsWith('kbd')) return 'kbd';
  if (code.startsWith('ady')) return 'ady';
  if (code.startsWith('rus') || code.startsWith('ru')) return 'ru';
  if (code.startsWith('ar')) return 'ar';
  return code;
}

function decodeHTMLEntities(str: string): string {
  return str
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

function parseDictionaryText(text: string): ParsedText {
  if (!text) return { raw: '', mainTokens: [], parenTokens: [], exampleTokens: [] };

  const decoded = decodeHTMLEntities(text).toLowerCase();

  const parenRegex = /\((.*?)\)|\[(.*?)\]|&lt;.*?&gt;|<.*?>/g;
  const parenMatches: string[] = [];
  let m: RegExpExecArray | null;

  while ((m = parenRegex.exec(decoded)) !== null) {
    const content = m[1] || m[2] || '';
    if (content) parenMatches.push(content);
  }
  const textWithoutParen = decoded.replace(parenRegex, ' ');

  const tildeParts = textWithoutParen.split('~');
  const mainSection = tildeParts[0];
  const exampleSection = tildeParts.slice(1).join(' ');

  const tokenize = (str: string) =>
    str
      .split(/[;,/\n|:=]+/)
      .map((s) => s.replace(/^[\d\.\)\s]+/, '').trim())
      .filter(Boolean);

  return {
    raw: decoded,
    mainTokens: tokenize(mainSection),
    parenTokens: tokenize(parenMatches.join(' ')),
    exampleTokens: tokenize(exampleSection),
  };
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const q = (searchParams.get('q') || '').trim().toLowerCase();
    const mode = searchParams.get('mode') || 'baslayan';
    const dialect = normalizeDialectParam(searchParams.get('dialect') || 'tumu');
    const targetLang = (searchParams.get('targetLang') || 'hepsi').toLowerCase();
    const sourcesParam = (searchParams.get('dict') || searchParams.get('sources') || '').toLowerCase();

    const page = Math.max(1, parseInt(searchParams.get('page') || '1', 10));
    const limit = Math.max(1, parseInt(searchParams.get('limit') || '20', 10));

    if (!q) {
      return NextResponse.json({ success: true, results: [], data: [], total: 0, page, limit });
    }

    const dictionaryData = loadDictionaryData();
    const entries: DictionaryEntry[] = dictionaryData?.entries || [];

    const isNoFilter = (val: string) => !val || val === 'tumu' || val === 'hepsi' || val === 'all';

    const sourceList = sourcesParam
      .split(',')
      .map((s) => s.trim().toLowerCase().replace(/_/g, '-'))
      .filter(Boolean);
    const noSourceFilter = sourceList.length === 0 || sourceList.includes('all') || sourceList.includes('tumu');

    const scoredEntries: { entry: DictionaryEntry; score: number }[] = [];

    for (const item of entries) {
      const rawW = String(item.kelime || item.word || item.spelling || item.headword || '');
      const firstMeaning =
  Array.isArray(item.definitions)
    ? item.definitions[0]?.meaning
    : undefined;

const rawT = String(
  item.anlam ??
  item.translation ??
  item.definition ??
  firstMeaning ??
  ''
);

      const w = rawW.toLowerCase().trim();
      const t = rawT.toLowerCase().trim();

      if (!isNoFilter(dialect)) {
        if (String(item.dialect || '').toLowerCase() !== dialect) continue;
      }

      if (!isNoFilter(targetLang)) {
        const srcLang = String(item.sourceLanguage || '').toLowerCase();
        const tgtLang = String(item.targetLanguage || '').toLowerCase();
        if (srcLang !== targetLang && tgtLang !== targetLang) continue;
      }

      if (!noSourceFilter) {
        const itemSrc = String(item.sourceFile || item.dictionaryName || '').toLowerCase().replace(/_/g, '-');
        const matchesSource = sourceList.some((s) => {
          const parts = s.split('-');
          return itemSrc.includes(s) || s.includes(itemSrc) || parts.some((p) => p.length >= 4 && itemSrc.includes(p));
        });
        if (!matchesSource) continue;
      }

      const wParsed = parseDictionaryText(w);
      const tParsed = parseDictionaryText(t);

      let score = 0;

      const matchesExactly = (parsed: ParsedText) =>
        parsed.raw === q || parsed.mainTokens.some((tok) => tok === q);

      const matchesInParen = (parsed: ParsedText) =>
        parsed.parenTokens.some((tok) => tok === q);

      const matchesInExample = (parsed: ParsedText) =>
        parsed.exampleTokens.some((tok) => tok === q);

      if (mode === 'tam') {
        if (w === q || t === q || matchesExactly(wParsed) || matchesExactly(tParsed)) {
          score = 100;
        } else if (matchesInParen(wParsed) || matchesInParen(tParsed)) {
          score = 30;
        } else if (matchesInExample(wParsed) || matchesInExample(tParsed)) {
          score = 10;
        }
      } else if (mode === 'baslayan') {
        if (w === q || t === q || matchesExactly(wParsed) || matchesExactly(tParsed)) {
          score = 100;
        } else if (
          w.startsWith(q) ||
          t.startsWith(q) ||
          wParsed.mainTokens.some((tok) => tok.startsWith(q)) ||
          tParsed.mainTokens.some((tok) => tok.startsWith(q))
        ) {
          score = 80;
        } else if (
          wParsed.parenTokens.some((tok) => tok.startsWith(q)) ||
          tParsed.parenTokens.some((tok) => tok.startsWith(q))
        ) {
          score = 20;
        } else if (
          wParsed.exampleTokens.some((tok) => tok.startsWith(q)) ||
          tParsed.exampleTokens.some((tok) => tok.startsWith(q))
        ) {
          score = 10;
        }
      } else {
        if (w === q || t === q || matchesExactly(wParsed) || matchesExactly(tParsed)) {
          score = 100;
        } else if (
          wParsed.mainTokens.some((tok) => tok.includes(q)) ||
          tParsed.mainTokens.some((tok) => tok.includes(q))
        ) {
          score = 70;
        } else if (
          wParsed.parenTokens.some((tok) => tok.includes(q)) ||
          tParsed.parenTokens.some((tok) => tok.includes(q)) ||
          wParsed.exampleTokens.some((tok) => tok.includes(q)) ||
          tParsed.exampleTokens.some((tok) => tok.includes(q))
        ) {
          score = 15;
        }
      }

      if (score > 0) {
        scoredEntries.push({ entry: item, score });
      }
    }

    scoredEntries.sort((a, b) => b.score - a.score);

    const groupedMap = new Map<string, GroupedResult>();

    for (const item of scoredEntries) {
      const { entry, score } = item;
      const rawWord = entry.kelime || entry.word || entry.spelling || entry.headword || entry.key || '';
      const key = String(rawWord).toLowerCase().trim();
      if (!key) continue;

      const existing = groupedMap.get(key);
      const sourceFile = String(entry.sourceFile || '');

      const firstDefMeaning = Array.isArray(entry.definitions) && entry.definitions.length > 0 
        ? String(entry.definitions[0]?.meaning || '') 
        : '';

      const rawMeaning = String(
        entry.anlam || 
        entry.translation || 
        entry.definition || 
        firstDefMeaning || 
        entry.full_definition_in_html || 
        ''
      );

      const kaynak: KaynakInfo = {
        kelime: String(rawWord),
        sözlük: String(entry.dictionaryName || sourceFile || 'Bilinmeyen Sözlük'),
        anlam: rawMeaning,
        author: entry.author ? String(entry.author) : undefined,
        year: entry.year ? String(entry.year) : undefined,
        dialect: entry.dialect ? String(entry.dialect) : undefined,
        sourceFile,
        sourceLanguage: entry.sourceLanguage ? String(entry.sourceLanguage) : inferLanguageFromFile(sourceFile, 0),
        targetLanguage: entry.targetLanguage ? String(entry.targetLanguage) : inferLanguageFromFile(sourceFile, 1),
      };

      if (existing) {
        if (kaynak.anlam && !existing.anlamlar.includes(kaynak.anlam)) {
          existing.anlamlar.push(kaynak.anlam);
        }

        const isDuplicate = existing.kaynaklar.some((k: KaynakInfo) => {
          if (k.sourceFile && kaynak.sourceFile) {
            return k.sourceFile === kaynak.sourceFile;
          }
          return k.sözlük === kaynak.sözlük && k.anlam === kaynak.anlam;
        });

        if (!isDuplicate) {
          existing.kaynaklar.push(kaynak);
        }
      } else {
        groupedMap.set(key, {
          kelime: String(rawWord),
          anaKelime: String(rawWord),
          anlamlar: kaynak.anlam ? [kaynak.anlam] : [],
          kaynaklar: [kaynak],
          dialect: entry.dialect ? String(entry.dialect) : undefined,
          score,
        });
      }
    }

    const grouped = Array.from(groupedMap.values());
    const total = grouped.length;
    const startIndex = (page - 1) * limit;
    const paginated = grouped.slice(startIndex, startIndex + limit);

    return NextResponse.json({ success: true, results: paginated, data: paginated, total, page, limit });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Arama hatası';
    console.error('[API /search] Hata:', error);
    return NextResponse.json({ success: false, error: errorMessage }, { status: 500 });
  }
}