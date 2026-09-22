/**
 * @file src/lib/normalizers/sourceMetadataResolver.ts
 * @description dictionaries.json'dan kaynak metadata'sı çözer.
 *
 * Eşleştirme: `entry.kaynaklar[i].sourceFile` === `dictionaries.json[j].file`
 *   → title, shortLabel, author, year, sourceLanguage, targetLanguage
 *
 * Fallback: yok. `file` bulunamazsa ham key gösterilir.
 */

import dictionariesData from '../../data/dictionaries.json';

export interface DictionaryMeta {
  id: string;
  file: string;
  title: string;
  displayName?: string;
  shortLabel?: string;
  shortLabelKiril?: string;
  author?: string;
  year?: string | number;
  sourceLanguage?: string;
  targetLanguage?: string;
  dialect?: string;
}

interface RawDictionaryItem {
  file?: string;
  title?: string;
  displayName?: string;
  shortLabel?: string;
  shortLabelKiril?: string;
  author?: string;
  year?: string | number;
  sourceLanguage?: string;
  targetLanguage?: string;
  dialect?: string;
  [key: string]: any;
}

let fileMap: Map<string, DictionaryMeta> | null = null;

function initFileMap(): Map<string, DictionaryMeta> {
  if (fileMap) return fileMap;

  fileMap = new Map();

  if (Array.isArray(dictionariesData)) {
    (dictionariesData as RawDictionaryItem[]).forEach((item) => {
      if (!item.file) return;

      const meta: DictionaryMeta = {
        id: item.file,
        file: item.file,
        title: item.title || item.file,
        displayName: item.displayName,
        shortLabel: item.shortLabel,
        shortLabelKiril: item.shortLabelKiril,
        author: item.author,
        year: item.year,
        sourceLanguage: (item.sourceLanguage || '').toLowerCase(),
        targetLanguage: (item.targetLanguage || '').toLowerCase(),
        dialect: item.dialect,
      };

      fileMap!.set(item.file.toLowerCase(), meta);
      fileMap!.set(item.file.toLowerCase().replace('.json', ''), meta);
    });
  }

  return fileMap;
}

export function resolveSourceMetadata(rawSourceKey: string): DictionaryMeta {
  if (!rawSourceKey) {
    return {
      id: 'unknown',
      file: '',
      title: 'Bilinmeyen Kaynak',
    };
  }

  const map = initFileMap();
  const cleanKey = rawSourceKey.trim().toLowerCase();

  if (map.has(cleanKey)) {
    return map.get(cleanKey)!;
  }

  const withoutJson = cleanKey.replace('.json', '');
  if (map.has(withoutJson)) {
    return map.get(withoutJson)!;
  }

  return {
    id: cleanKey,
    file: rawSourceKey,
    title: rawSourceKey,
  };
}
