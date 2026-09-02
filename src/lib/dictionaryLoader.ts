import { DictionaryItem, AktifSozlukItem, ManifestData } from '@/types/dictionary';
import { normalizeDictionaryItem } from './dictionaryUtils';
import rawWords from '@/data/dictionaryData.json';
import rawDicts from '@/data/dictionaries.json';

export const loadDictionaryData = (): {
  entries: DictionaryItem[];
  sources: AktifSozlukItem[];
  manifest: ManifestData;
} => {
  const entries: DictionaryItem[] = (rawWords as any[]).map((item, idx) =>
    normalizeDictionaryItem(item, idx)
  );

  const sources: AktifSozlukItem[] = (rawDicts as any[]).map((dict, idx) => ({
    id: dict.file || `dict-${idx + 1}`,
    ad: dict.title || dict.originalTitle || 'İsimsiz Sözlük',
    aktif: true,
    kayitSayisi: dict.total_words || 0,
    lehce: dict.dialect || 'tumu',
    yazar: dict.author || '',
    file: dict.file,
  }));

  const manifest: ManifestData = {
    toplamKelime: entries.length,
    sozlukler: sources,
  };

  return { entries, sources, manifest };
};

export default loadDictionaryData;