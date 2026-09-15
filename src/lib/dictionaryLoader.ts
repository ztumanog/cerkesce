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

function extractRawEntries(parsed: any, fileName: string = ''): any[] {
  if (Array.isArray(parsed)) return parsed;
  if (parsed && typeof parsed === 'object') {
    const candidates = ['words', 'entries', 'items', 'data'];
    for (const key of candidates) {
      const val = parsed[key];
      if (Array.isArray(val) && val.length > 0) return val;
      if (val && typeof val === 'object' && !Array.isArray(val)) {
        return Object.entries(val).map(([k, v]: [string, any]) => {
          let translation = '';
          if (Array.isArray(v?.definitions) && v.definitions.length > 0) {
            translation = v.definitions
              .map((d: any) => d?.meaning || d?.text || d?.tanim || '')
              .filter(Boolean)
              .join('; ');
          }
          if (!translation && v?.full_definition_in_html) {
            translation = v.full_definition_in_html
              .replace(/<[^>]*>/g, ' ')
              .replace(/\s+/g, ' ')
              .trim();
          }
          if (!translation && v?.definition) {
            translation = String(v.definition);
          }

          return {
            word: v?.spelling || k,
            kelime: v?.spelling || k,
            anlam: translation,
            translation,
            full_definition_in_html: v?.full_definition_in_html || '',
            definitions: v?.definitions || [],
            sourceFile: fileName || parsed?.sourceFile || parsed?.id || '',
            dictionaryName: parsed?.title || fileName || 'Bilinmeyen Sözlük',
          };
        });
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
      const manifestRaw = fs.readFileSync(manifestPath, 'utf-8');
      if (manifestRaw && manifestRaw.trim()) {
        manifestData = JSON.parse(manifestRaw);
      }
    }
  } catch (e) {
    console.error('[LOADER ERROR] Manifest okunamadı:', e);
  }

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
      if (!fileContent || !fileContent.trim()) return;

      const parsed = JSON.parse(fileContent);
      const rawEntries = extractRawEntries(parsed, fileNameWithExt);

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
          title: sourceManifest.title || sourceManifest.name || entry.dictionaryName || '',
          sourceLanguage: sourceManifest.sourceLanguage,
          targetLanguage: sourceManifest.targetLanguage,
        };
      });

      allEntries.push(...enrichedEntries);
    } catch (err) {
      console.error(`[LOADER ERROR] ${fileNameWithExt} okunurken hata:`, err);
    }
  });

  // "su" Kelimesi Teşhis Logları
  const suEntries = allEntries.filter(
    (e) => (e.kelime || e.word || '').trim().toLowerCase() === 'su'
  );

  console.log(`\n=================== [LOADER - SU KELİMESİ KONTROLÜ (${suEntries.length} Kayıt)] ===================`);
  suEntries.forEach((entry, index) => {
    console.log(`[Kayıt #${index + 1}]`);
    console.log(`  sourceFile:     ${entry.sourceFile}`);
    console.log(`  dictionaryName: ${entry.dictionaryName}`);
    console.log(`  title:          ${entry.title || 'TANIMSIZ'}`);
    console.log('--------------------------------------------------');
  });

  cachedResult = { entries: allEntries };
  return cachedResult;
}

export default { loadDictionaryData };