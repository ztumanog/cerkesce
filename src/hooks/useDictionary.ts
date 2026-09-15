import { NextRequest, NextResponse } from 'next/server';
import { loadDictionaryData } from '@/lib/dictionaryLoader';

function normalizeDialectParam(val: string): string {
  const v = (val || '').toLowerCase();
  if (v === 'eastern' || v === 'dogu' || v === 'doğu') return 'kbd';
  if (v === 'western' || v === 'bati' || v === 'batı') return 'ady';
  return v;
}

function decodeHTMLEntities(str: string): string {
  return str
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

// --- HASSAS VERİ AYIKLAMA (HTML VE DEFINITIONS DIZI DESTEĞI) ---

function extractRawWord(item: any): string {
  let w = String(item.spelling || item.word || item.kelime || item.headword || '').trim();
  if (!w && Array.isArray(item.definitions) && item.definitions.length > 0) {
    w = String(item.definitions[0]?.tanim || item.definitions[0]?.meaning || '').trim();
  }
  return w;
}

function extractRawDefinition(item: any): string {
  const def0 = Array.isArray(item.definitions) && item.definitions.length > 0 ? item.definitions[0] : null;
  
  let def = String(
    def0?.meaning ||
    def0?.tanim ||
    item.anlam ||
    item.translation ||
    item.definition ||
    item.meaning ||
    item.tanim ||
    ''
  ).trim();

  // Düz metin tanım yoksa HTML etiketlerini ayıklayarak aramaya dahil et (ab, aba vb. için)
  if (!def && item.full_definition_in_html) {
    def = String(item.full_definition_in_html)
      .replace(/<[^>]*>/g, ' ')
      .replace(/&nbsp;/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }
  return def;
}

interface ParsedText {
  raw: string;
  mainTokens: string[];
  parenTokens: string[];
  exampleTokens: string[];
}

function parseDictionaryText(text: string): ParsedText {
  if (!text) return { raw: '', mainTokens: [], parenTokens: [], exampleTokens: [] };

  const decoded = decodeHTMLEntities(text).toLowerCase();

  const parenRegex = /\((.*?)\)|\[(.*?)\]|&lt;.*?&gt;|<.*?>/g;
  const parenMatches: string[] = [];
  let m;
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

    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '50', 10);

    if (!q) {
      return NextResponse.json({ success: true, results: [], data: [], total: 0, page, limit });
    }

    const dictionaryData = loadDictionaryData();
    const entries = dictionaryData.entries || [];

    const isNoFilter = (val: string) => !val || val === 'tumu' || val === 'hepsi' || val === 'all';

    const sourceList = sourcesParam
      .split(',')
      .map((s) => s.trim().toLowerCase().replace(/_/g, '-'))
      .filter(Boolean);
    const noSourceFilter = sourceList.length === 0 || sourceList.includes('all') || sourceList.includes('tumu');

    const scoredEntries: { entry: any; score: number }[] = [];

    for (const item of entries) {
      // definitions[0] ve full_definition_in_html alanlarını kapsayan ayıklama
      const rawW = extractRawWord(item);
      const rawT = extractRawDefinition(item);

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
          tParsed.parenTokens.includes(q) ||
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

    // Puanlama sırasına göre dizme
    scoredEntries.sort((a, b) => b.score - a.score);

    // Ham nesneleri (entry) doğrudan aktar (gruplama frontend'de yapılacak)
    const rawMatchedEntries = scoredEntries.map((s) => ({
      ...s.entry,
      score: s.score,
    }));

    const total = rawMatchedEntries.length;
    const startIndex = (page - 1) * limit;
    const paginated = rawMatchedEntries.slice(startIndex, startIndex + limit);

    return NextResponse.json({ success: true, results: paginated, data: paginated, total, page, limit });
  } catch (error: any) {
    console.error('[API /search] Hata:', error);
    return NextResponse.json({ success: false, error: error?.message || 'Arama hatası' }, { status: 500 });
  }
}