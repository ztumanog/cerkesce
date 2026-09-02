import { describe, it, expect } from 'vitest';
import { SourceRegistry } from '@/lib/source-registry';
import { DictionaryLoader } from '@/lib/dictionaryLoader';
import { dictionaryService } from '@/lib/dictionaryService';

describe('HOTFIX-001 Data Loading Pipeline Verification', () => {
  it('V-001 & V-002: Ensures source-registry and loader return active items', () => {
    const activeSources = SourceRegistry.getActiveSources();
    expect(activeSources.length).toBeGreaterThan(0);

    const entries = DictionaryLoader.loadEntries();
    expect(entries.length).toBeGreaterThan(0);
  });

  it('V-003: Ensures dictionaryService serves cached dictionary entries to UI', () => {
    const entries = dictionaryService.getEntries();
    const dicts = dictionaryService.getDictionaries();

    expect(entries.length).toBeGreaterThan(0);
    expect(dicts.length).toBeGreaterThan(0);
  });
});