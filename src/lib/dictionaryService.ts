import type { DictionaryRawItem } from '@/types/dictionary';

export class DictionaryService {
  private static cachedEntries: DictionaryRawItem[] | null = null;

  public static getEntries(): DictionaryRawItem[] {
    if (!this.cachedEntries) {
      this.cachedEntries = [];
    }
    return this.cachedEntries;
  }

  public static setEntries(entries: DictionaryRawItem[]): void {
    this.cachedEntries = entries;
  }

  public static getDictionaries(): string[] {
    const entries = this.getEntries();
    if (!entries || !Array.isArray(entries)) return [];
    return Array.from(new Set(entries.map(e => e.dictionaryName || 'Genel SÃ¶zlÃ¼k')));
  }

  public static clearCache(): void {
    this.cachedEntries = null;
  }
}

export default DictionaryService;
