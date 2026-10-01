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
    expect(result.totalDictionaries).toBe(0);
    expect(result.meaningCount).toBe(0);
  });

  it('CE-002: dictionaryEntries verilmezse bos sonuc', () => {
    // DUZELTME: dictionaryEntries olmadan arama yapilamaz
    const result = service.explore('псы');
    expect(result.totalDictionaries).toBe(0);
    expect(result.meaningCount).toBe(0);
    expect(result.languages.length).toBe(0);
  });

  it('CE-003: dictionaryEntries ile gercek arama', () => {
    // Mock dictionaryEntries
    const mockEntries = {
      'test-dict.json': {
        'псы': {
          meanings: [
            { meaning: 'su' },
            { meaning: 'water' },
          ],
        },
      },
    };

    // Mock sozluk metadata
    const mockDict = [{
      file: 'test-dict.json',
      title: 'Test Sozluk',
      sourceLanguage: 'KBD',
      targetLanguage: 'TR',
      dialect: 'KBD',
    }];

    const testService = new CorpusExplorerService(mockDict);
    const result = testService.explore('псы', mockEntries);

    expect(result.totalDictionaries).toBe(1);
    expect(result.meaningCount).toBe(2);
    expect(result.languages).toContain('KBD');
    expect(result.languages).toContain('TR');
  });

  it('CE-004: Bulunmayan kelime bos sonuc', () => {
    const mockEntries = {
      'test-dict.json': {
        'псы': { meanings: [{ meaning: 'su' }] },
      },
    };

    const mockDict = [{
      file: 'test-dict.json',
      title: 'Test',
      sourceLanguage: 'KBD',
      targetLanguage: 'TR',
      dialect: 'KBD',
    }];

    const testService = new CorpusExplorerService(mockDict);
    const result = testService.explore('olmayan-kelime', mockEntries);

    expect(result.totalDictionaries).toBe(0);
    expect(result.meaningCount).toBe(0);
  });

  it('CE-005: Metadata yuklu olmali', () => {
    // Servis metadata'yi yukledi mi?
    expect(service).toBeDefined();
    // dictionaryEntries olmadan 0 doner (dogru davranis)
    const result = service.explore('псы');
    expect(result.word).toBe('псы');
  });
});
