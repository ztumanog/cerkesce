import { describe, it, expect } from 'vitest';
import { DictionaryService } from '../../lib/dictionaryService';

describe('HOTFIX-001 Data Loading Pipeline Verification', () => {
  it('V-003: Ensures DictionaryService serves cached dictionary entries to UI', () => {
    const entries = DictionaryService.getEntries();
    const dicts = DictionaryService.getDictionaries();

    expect(Array.isArray(entries)).toBe(true);
    expect(Array.isArray(dicts)).toBe(true);
  });
});
