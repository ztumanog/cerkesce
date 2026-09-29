import { describe, it, expect, beforeAll } from 'vitest';
import { SmartSuggestionService } from '@/domain/discovery/services/SmartSuggestionService';
import * as fs from 'fs';
import * as path from 'path';

describe('P5-003 Smart Suggestions', () => {
  let service: SmartSuggestionService;

  beforeAll(() => {
    const lexemesPath = path.join(
      process.cwd(),
      'public',
      'data',
      'linguistic',
      'lexemes.json'
    );
    const raw = fs.readFileSync(lexemesPath, 'utf-8');
    const lexemes = JSON.parse(raw);
    service = new SmartSuggestionService();
    service.loadLexemes(lexemes);
  });

  it('SS-001: пси yazinca псы onerilmeli', () => {
    const result = service.suggest('пси');
    const words = result.suggestions.map((s) => s.word);
    expect(words).toContain('псы');
  });

  it('SS-002: псa yazinca псы onerilmeli', () => {
    const result = service.suggest('псa');
    const words = result.suggestions.map((s) => s.word);
    expect(words).toContain('псы');
  });

  it('SS-003: напс yazinca нэпс onerilmeli', () => {
    const result = service.suggest('напс');
    const words = result.suggestions.map((s) => s.word);
    expect(words).toContain('нэпс');
  });

  it('SS-004: Tam eslesme kendini oneri olarak dondurmemeli', () => {
    const result = service.suggest('псы');
    const words = result.suggestions.map((s) => s.word);
    // псы kendini önermemeli
    expect(words).not.toContain('псы');
  });

  it('SS-005: Bos sorgu bos sonuc dondurmeli', () => {
    const result = service.suggest('');
    expect(result.suggestions.length).toBe(0);
  });

  it('SS-006: Cok uzak kelime onerilmemeli', () => {
    const result = service.suggest('xxxxxxxxx');
    expect(result.suggestions.length).toBe(0);
  });
});
