import { NextRequest, NextResponse } from 'next/server';
import { loadDictionaryData } from '@/lib/dictionaryLoader';

function normalizeDialectParam(val: string): string {
  const v = (val || '').toLowerCase();
  if (v === 'eastern' || v === 'dogu' || v === 'doğu') return 'kbd';
  if (v === 'western' || v === 'bati' || v === 'batı') return 'ady';
  return v;
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const q = (searchParams.get('q') || '').trim().toLowerCase();
    const mode = searchParams.get('mode') || 'baslayan';
    const dialect = normalizeDialectParam(searchParams.get('dialect') || 'tumu');
    const targetLang = (searchParams.get('targetLang') || 'hepsi').toLowerCase();
    const sourcesParam = searchParams.get('sources') || '';
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '20', 10);

    if (!q) {
      return NextResponse.json({ success: true, results: [], data: [], total: 0, page, limit });
    }

    const dictionaryData = await loadDictionaryData();
    const entries = dictionaryData.entries || [];

    const isNoFilter = (val: string) => !val || val === 'tumu' || val === 'hepsi' || val === 'all';

    const sourceList = sourcesParam.split(',').map((s) => s.trim().toLowerCase()).filter(Boolean);
    const noSourceFilter = sourceList.length === 0 || sourceList.includes('all') || sourceList.includes('tumu');

    let filtered = entries.filter((item: any) => {
      const w = String(item.kelime || item.word || '').toLowerCase();
      const t = String(item.anlam || item.translation || '').toLowerCase();

      let matches = false;
      if (mode === 'tam') {
        matches = w === q;
      } else if (mode === 'baslayan') {
        matches = w.startsWith(q);
      } else {
        matches = w.includes(q) || t.includes(q);
      }

      if (matches && !isNoFilter(dialect)) {
        matches = String(item.dialect || '').toLowerCase() === dialect;
      }

      if (matches && !isNoFilter(targetLang)) {
        const srcLang = String(item.sourceLanguage || '').toLowerCase();
        const tgtLang = String(item.targetLanguage || '').toLowerCase();
        matches = srcLang === targetLang || tgtLang === targetLang;
      }

      if (matches && !noSourceFilter) {
        const itemSource = String(item.sourceFile || '').toLowerCase();
        matches = sourceList.some((s) => itemSource === s || itemSource.includes(s));
      }

      return matches;
    });

    const groupedMap = new Map<string, any>();
    for (const entry of filtered) {
      const key = String(entry.kelime || entry.word || '').toLowerCase();
      if (!key) continue;

      const existing = groupedMap.get(key);
      const anlam = entry.anlam || entry.translation || '';
      const kaynak = {
        sözlük: entry.dictionaryName || entry.sourceFile,
        anlam,
        dialect: entry.dialect,
      };

      if (existing) {
        if (anlam && !existing.anlamlar.includes(anlam)) existing.anlamlar.push(anlam);
        if (!existing.kaynaklar.some((k: any) => k.sözlük === kaynak.sözlük)) existing.kaynaklar.push(kaynak);
      } else {
        groupedMap.set(key, {
          kelime: entry.kelime || entry.word,
          anaKelime: entry.kelime || entry.word,
          anlamlar: anlam ? [anlam] : [],
          kaynaklar: [kaynak],
          dialect: entry.dialect,
        });
      }
    }

    const grouped = Array.from(groupedMap.values());
    const total = grouped.length;
    const startIndex = (page - 1) * limit;
    const paginated = grouped.slice(startIndex, startIndex + limit);

    return NextResponse.json({ success: true, results: paginated, data: paginated, total, page, limit });
  } catch (error: any) {
    console.error('[API /search] Hata:', error);
    return NextResponse.json({ success: false, error: error?.message || 'Arama hatası' }, { status: 500 });
  }
}
