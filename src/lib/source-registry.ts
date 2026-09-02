import dictionarySources from '@/data/dictionarySources.json';
import type { AktifSozlukItem } from '@/types/dictionary';

export class SourceRegistry {
  public static getActiveSources(): AktifSozlukItem[] {
    if (!Array.isArray(dictionarySources)) return [];
    return dictionarySources.map((s: any) => ({
      file: s.file,
      title: s.title,
      dialect: (s.dialect === 'western' ? 'BATI' : 'DOGU') as any,
      author: s.author,
      year: s.year,
      total_words: s.total_words,
      active: true,
    }));
  }
}