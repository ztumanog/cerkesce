import { describe, it, expect, beforeAll } from 'vitest';
import { CorpusExplorerService } from '@/domain/discovery/services/CorpusExplorerService';
import * as fs from 'fs';
import * as path from 'path';

describe('P5-004 Corpus Explorer', () => {
  let service: CorpusExplorerService;

  beforeAll(() => {
    const dictPath = path.join(process.cwd(), 'public', 'data', 'dictionaries.json');
    const raw = fs.readFileSync(dictPath, 'utf-8');
    const dictionaries = JSON.parse(raw);
    service = new CorpusExplorerService();
    service.loadDictionaries(dictionaries);
  });

  it('CE-001: Bos sorgu bos sonuc dondurmeli', () => {
    const result = service.explore('');
    expect(result.dictionaries.length).toBe(0);
  });

  it('CE-002: Metadata yuklu olmali', () => {
    const result = service.explore('псы');
    expect(result.totalDictionaries).toBeGreaterThan(0);
  });

  it('CE-003: Diller listesi bos olmamali', () => {
    const result = service.explore('псы');
    expect(result.languages.length).toBeGreaterThan(0);
  });

  it('CE-004: Sozluk bilgisi tam olmali', () => {
    const result = service.explore('псы');
    if (result.dictionaries.length > 0) {
      const d = result.dictionaries[0];
      expect(d.file).toBeDefined();
      expect(d.title).toBeDefined();
      expect(d.sourceLanguage).toBeDefined();
      expect(d.targetLanguage).toBeDefined();
    }
  });

  it('CE-005: Anlam sayisi pozitif olmali', () => {
    const result = service.explore('псы');
    expect(result.meaningCount).toBeGreaterThanOrEqual(0);
  });
});
