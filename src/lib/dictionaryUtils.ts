import { DictionaryItem } from '@/types/dictionary';

export const normalizeDictionaryItem = (raw: any, index: number): DictionaryItem => {
  const word = raw.word || raw.kelime || raw.madde || '';
  const translation = raw.translation || raw.tanim || raw.definition || raw.meaning || raw.anlam || '';
  const dialect = raw.dialect || raw.targetLanguage || raw.hedefDil || raw.toLang || raw.hedef_dil || 'tumu';
  const dictionaryName = raw.dictionaryName || raw.kaynak_sozluk || raw.kaynakSozluk || raw.dictionaryId || raw.file || 'Genel Sözlük';

  return {
    id: raw.id || `entry-${index + 1}`,
    word,
    translation,
    dialect,
    dictionaryName,
    file: raw.file,
    etimoloji: raw.etimoloji,
    kaynak: dictionaryName,
  };
};