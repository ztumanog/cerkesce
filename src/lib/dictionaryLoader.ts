import fs from 'fs';
import path from 'path';

let cachedEntries: any[] | null = null;

function inferLang(fileName: string, pos: 0 | 1): string | undefined {
  const part = fileName.replace(/\.json$/i, '').split('-')[pos]?.toLowerCase().replace(/^\d+\./, '').trim();
  if (!part) return undefined;
  if (part.startsWith('tu') || part.startsWith('tur')) return 'tr';
  if (part.startsWith('en')) return 'en';
  if (part.startsWith('kbd')) return 'kbd';
  if (part.startsWith('ady')) return 'ady';
  if (part.startsWith('rus') || part.startsWith('ru')) return 'ru';
  if (part.startsWith('ar')) return 'ar';
  return part;
}

export function loadDictionaryData(): { entries: any[] } {
  if (cachedEntries) return { entries: cachedEntries };

  const dataPath = path.join(process.cwd(), 'public', 'data');
  const manifestPath = path.join(dataPath, 'dictionaries.json');
  const entries: any[] = [];

  if (!fs.existsSync(dataPath)) return { entries };

  const manifestMap = new Map<string, any>();
  if (fs.existsSync(manifestPath)) {
    try {
      const mRaw = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'));
      if (Array.isArray(mRaw)) {
        for (const m of mRaw) {
          if (m?.file) manifestMap.set(m.file, m);
        }
      }
    } catch {}
  }

  try {
    const files = fs
      .readdirSync(dataPath)
      .filter((f) => f.endsWith('.json') && !f.startsWith('dictionaries'));

    for (const file of files) {
      try {
        const fullPath = path.join(dataPath, file);
        const raw = fs.readFileSync(fullPath, 'utf-8');
        if (!raw?.trim()) continue;
        const parsed = JSON.parse(raw);
        const meta = manifestMap.get(file) || {};

        const enrich = (item: any, fallbackWord?: string) => ({
          ...item,
          word: item.word || item.kelime || item.spelling || item.headword || fallbackWord || '',
          kelime: item.kelime || item.word || item.spelling || item.headword || fallbackWord || '',
          sourceFile: item.sourceFile || file,
          dictionaryName: item.dictionaryName || meta.title || parsed?.title || file.replace('.json', ''),
          author: item.author || meta.author || '',
          year: item.year || meta.year || '',
          dialect: item.dialect || meta.dialect || '',
          sourceLanguage: item.sourceLanguage || meta.sourceLanguage || inferLang(file, 0) || '',
          targetLanguage: item.targetLanguage || meta.targetLanguage || inferLang(file, 1) || '',
        });

        if (Array.isArray(parsed)) {
          for (const item of parsed) {
            if (item && typeof item === 'object') entries.push(enrich(item));
          }
        } else if (parsed && typeof parsed === 'object') {
          const words = parsed.words ?? parsed.entries ?? parsed.items ?? parsed.data;
          if (words && typeof words === 'object' && !Array.isArray(words)) {
            for (const [key, val] of Object.entries(words)) {
              if (val && typeof val === 'object') {
                entries.push(enrich(val, key));
              }
            }
          } else if (Array.isArray(words)) {
            for (const item of words) {
              if (item && typeof item === 'object') entries.push(enrich(item));
            }
          }
        }
      } catch (e) {
        console.warn(`[dictionaryLoader] ${file} okunamadi:`, e);
      }
    }
  } catch (error) {
    console.warn('[dictionaryLoader] Genel hata:', error);
  }

  cachedEntries = entries;
  return { entries };
}

export default { loadDictionaryData };
