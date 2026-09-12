import fs from 'fs';
import path from 'path';

let cachedResult: { entries: any[] } | null = null;

function normalizeDialectValue(val: string): string {
  const v = (val || '').toLowerCase().trim();
  if (v === 'ady' || v === 'kbd') return v;
  if (
    v.includes('west') ||
    v.includes('adig') ||
    v.includes('adyg') ||
    v === 'bati' ||
    v === 'batı'
  )
    return 'ady';
  if (
    v.includes('east') ||
    v.includes('kabard') ||
    v.includes('dogu') ||
    v === 'doğu'
  )
    return 'kbd';
  return 'genel';
}

function extractRawEntries(parsed: any): any[] {
  if (Array.isArray(parsed)) return parsed;

  if (parsed && typeof parsed === 'object') {
    const candidates = ['words', 'entries', 'items', 'data'];
    for (const key of candidates) {
      const val = parsed[key];
      if (Array.isArray(val) && val.length > 0) return val;
      if (val && typeof val === 'object' && !Array.isArray(val)) {
        return Object.entries(val).map(([k, v]: [string, any]) => ({
          word: v?.spelling || v?.word || k,
          kelime: v?.spelling || v?.word || k,
          translation:
            Array.isArray(v?.definitions) && v.definitions.length > 0
              ? v.definitions
                  .map((d: any) => d?.meaning || d?.text || '')
                  .filter(Boolean)
                  .join('; ')
              : (v?.full_definition_in_html || '')
                  .replace(/<[^>]*>/g, ' ')
                  .trim(),
        }));
      }
    }
  }

  return [];
}

export function loadDictionaryData(): { entries: any[] } {
  if (cachedResult) return cachedResult;

  const manifestPath = path.join(
    process.cwd(),
    'public/data/dictionaries.json'
  );
  let manifestData: any[] = [];

  try {
    if (fs.existsSync(manifestPath)) {
      manifestData = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'));
    }
  } catch (e) {
    console.error('[LOADER ERROR] Manifest okunamadı:', e);
  }

  console.log('[LOADER] manifest count', manifestData.length);

  const allEntries: any[] = [];

  manifestData.forEach((sourceManifest: any) => {
    const fileName = sourceManifest.file;
    if (!fileName) return;

    const manifestDialect = sourceManifest.dialect || '';
    const fileNameWithExt = fileName.endsWith('.json')
      ? fileName
      : `${fileName}.json`;
    const filePath = path.join(process.cwd(), 'public/data', fileNameWithExt);

    if (!fs.existsSync(filePath)) return;

    try {
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      const parsed = JSON.parse(fileContent);
      const rawEntries = extractRawEntries(parsed);

      const enrichedEntries = rawEntries.map((entry: any) => {
        const rawItemDialect = entry.dialect || manifestDialect;
        const canonicalDialect = normalizeDialectValue(rawItemDialect);

        return {
          ...entry,
          word: entry.word || entry.kelime || '',
          kelime: entry.word || entry.kelime || '',
          translation: entry.translation || entry.anlam || '',
          anlam: entry.translation || entry.anlam || '',
          dialect: canonicalDialect,
          sourceFile: fileNameWithExt,
          dictionaryName:
            sourceManifest.title || sourceManifest.name || fileNameWithExt,
          sourceLanguage: sourceManifest.sourceLanguage,
          targetLanguage: sourceManifest.targetLanguage,
        };
      });

      allEntries.push(...enrichedEntries);
    } catch (err) {
      console.error(`[LOADER ERROR] ${fileNameWithExt} okunurken hata:`, err);
    }
  });

  console.log('[LOADER] total entries', allEntries.length);

  cachedResult = { entries: allEntries };
  return cachedResult;
}

export default { loadDictionaryData };
