import { describe, it, expect } from 'vitest';
import { MorphemeParser } from '@/domain/linguistic/MorphemeParser';
import morphemesData from '../../../../public/data/linguistic/morphemes.json';
import lexemesData from '../../../../public/data/linguistic/lexemes.json';

describe('P4-003: MorphemeParser', () => {
  const parser = new MorphemeParser(morphemesData as any);

  it('derivation.morphemeIds varsa onu kullanir', () => {
    const lexeme = (lexemesData as any[]).find(l => l.id === 'L-GUF1E');
    if (lexeme) {
      const result = parser.parse({
        lexemeId: lexeme.id,
        form: lexeme.form,
        derivation: lexeme.derivation,
      });
      expect(result.method).toBe('dictionary');
      expect(result.morphemes.length).toBeGreaterThan(0);
    }
  });

  it('formu morfemlere ayirir', () => {
    const result = parser.parse({
      lexemeId: 'UNKNOWN',
      form: 'гуфӀэ',
    });
    expect(result.morphemes.length).toBeGreaterThan(0);
  });

  it('bilinmeyen formda unknown doner', () => {
    const result = parser.parse({
      lexemeId: 'UNKNOWN',
      form: 'xyzabc',
    });
    expect(result.morphemes.some(m => m.type === 'unknown')).toBe(true);
  });

  it('toplu ayristirma yapar', () => {
    const inputs = (lexemesData as any[]).slice(0, 5).map(l => ({
      lexemeId: l.id,
      form: l.form,
      derivation: l.derivation,
    }));
    const results = parser.parseAll(inputs);
    expect(results.length).toBe(5);
  });

  it('confidence 0-1 arasinda', () => {
    const result = parser.parse({
      lexemeId: 'UNKNOWN',
      form: 'гуфӀэ',
    });
    expect(result.confidence).toBeGreaterThanOrEqual(0);
    expect(result.confidence).toBeLessThanOrEqual(1);
  });
});
