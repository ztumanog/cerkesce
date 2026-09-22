/**
 * File: src/lib/dictionaryService.ts
 * Generated: 2026-09-19
 * Layer: Service
 */

import type { DictionaryEntry } from '@/types/dictionary';

export class DictionaryService {
  private static cachedEntries: DictionaryEntry[] | null = null;

  public static getEntries(): DictionaryEntry[] {
    if (!this.cachedEntries) {
      this.cachedEntries = [];
    }
    return this.cachedEntries;
  }

  public static setEntries(entries: DictionaryEntry[]): void {
    this.cachedEntries = entries;
  }

public static getDictionaries(): string[] {
    const entries = this.getEntries();
    if (!entries || !Array.isArray(entries)) return [];
    return Array.from(
      new Set(
        entries
          .map((e) => (typeof e.dictionaryName === 'string' && e.dictionaryName.length > 0 ? e.dictionaryName : 'Genel Sözlük'))
          .filter((value): value is string => value.length > 0)
      )
    );
  }
  public static clearCache(): void {
    this.cachedEntries = null;
  }
}

export default DictionaryService;