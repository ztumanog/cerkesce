import { DictionaryLoader } from './dictionaryLoader';
import type { DictionaryRawItem } from '@/types/dictionary';

export class DictionaryService {
  private static cachedEntries: DictionaryRawItem[] | null = null;

  public static getEntries(): DictionaryRawItem[] {
    if (!this.cachedEntries) {
      this.cachedEntries = DictionaryLoader.loadEntries() || [];
    }
    return this.cachedEntries;
  }

  public static getDictionaries(): string[] {
    const entries = this.getEntries();
    if (!entries || !Array.isArray(entries)) return [];
    return Array.from(new Set(entries.map(e => e.dictionaryName || 'Genel Sözlük')));
  }

  public static clearCache(): void {
    this.cachedEntries = null;
  }
}

export default DictionaryService;