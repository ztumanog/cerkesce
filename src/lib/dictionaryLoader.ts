import fs from 'fs';
import path from 'path';

export function loadDictionaryData(): { entries: any[] } {
  const dataPath = path.join(process.cwd(), 'public', 'data');
  const manifestPath = path.join(dataPath, 'dictionaries.json');
  const entries: any[] = [];

  if (!fs.existsSync(dataPath)) return { entries };

  try {
    const files = fs
      .readdirSync(dataPath)
      .filter((f) => f.endsWith('.json') && f !== 'dictionaries.json');

    for (const file of files) {
      try {
        const fullPath = path.join(dataPath, file);
        const raw = fs.readFileSync(fullPath, 'utf-8');
        if (!raw?.trim()) continue;
        const parsed = JSON.parse(raw);

        if (Array.isArray(parsed)) {
          entries.push(...parsed.filter((i) => i && typeof i === 'object'));
        } else if (parsed && typeof parsed === 'object') {
          // { title, id, words: { "su": {...} } } yapisi
          const words = parsed.words ?? parsed.entries ?? parsed.items ?? parsed.data;
          if (words && typeof words === 'object' && !Array.isArray(words)) {
            for (const [key, val] of Object.entries(words)) {
              if (val && typeof val === 'object') {
                entries.push({
                  ...(val as object),
                  word: (val as any).spelling || key,
                  kelime: (val as any).spelling || key,
                  sourceFile: file,
                  dictionaryName: parsed.title || file.replace('.json', ''),
                });
              }
            }
          } else if (Array.isArray(words)) {
            entries.push(...words.filter((i) => i && typeof i === 'object'));
          }
        }
      } catch (e) {
        console.warn(`[dictionaryLoader] ${file} okunamadı:`, e);
      }
    }
  } catch (error) {
    console.warn('[dictionaryLoader] Genel hata:', error);
  }

  return { entries };
}

export default { loadDictionaryData };
