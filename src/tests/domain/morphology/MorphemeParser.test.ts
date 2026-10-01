import { describe, it, expect } from 'vitest';
import { MorphemeParser } from '@/domain/morphology/MorphemeParser';
import { Morpheme } from '@/domain/linguistic/Morpheme';
import morphemesData from '../../../../public/data/linguistic/morphemes.json';
import lexemesData from '../../../../public/data/linguistic/lexemes.json';

// ============================================
// TEMEL TESTLER (linguistic/MorphemeParser.test.ts)
// ============================================

describe('P4-003: MorphemeParser — Temel', () => {
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

// ============================================
// STRING-BASED TESTLER (morphology/MorphemeParser.test.ts)
// ============================================

describe('Phase 4.3 - MorphemeParser — String-based', () => {
  const mockMorphemes: Morpheme[] = [
    { id: 'M-F1E', form: 'фӀэ', gloss: 'faktitif', type: 'grammatical' } as Morpheme,
    { id: 'M-GHE', form: 'гъэ', gloss: 'kausatif', type: 'grammatical' } as Morpheme,
    { id: 'M-BZHYGE', form: 'бзыгъэ', gloss: 'isim', type: 'lexical' } as Morpheme,
    { id: 'M-SHXUE', form: 'шхуэ', gloss: 'buyuk', type: 'lexical' } as Morpheme,
  ];
  const parser = new MorphemeParser(mockMorphemes);

  it('4.3.1: gufl e -> fIe', () => {
    const r = parser.parse('гуфӀэ');
    expect(r.morphemes.length).toBeGreaterThan(0);
  });

  it('4.3.2: gubzyge -> bzyge', () => {
    const r = parser.parse('губзыгъэ');
    expect(r.morphemes.length).toBeGreaterThan(0);
  });

  it('4.3.3: uneshhue -> shhue', () => {
    const r = parser.parse('унэшхуэ');
    expect(r.morphemes.length).toBeGreaterThan(0);
  });

  it('4.3.4: batch', () => {
    const rs = parser.parseBatch(['гуфӀэ', 'губзыгъэ']);
    expect(rs.length).toBe(2);
  });
});

// ============================================
// YENI MORFEMLER (linguistic/MorphemeParser.yeni.test.ts)
// ============================================

describe('MorphemeParser — Yeni Morfemler', () => {
  const parser = new MorphemeParser(morphemesData as any);

  it('faktitif + kok ayristirir', () => {
    const result = parser.parse({ lexemeId: 'TEST', form: 'йэуыиьэху' });
    expect(result.morphemes.length).toBeGreaterThan(0);
  });

  it('lokal preverb + kok ayristirir', () => {
    const result = parser.parse({ lexemeId: 'TEST', form: 'пэплъэн' });
    expect(result.morphemes.length).toBeGreaterThan(0);
  });

  it('birliktelik + kok ayristirir', () => {
    const result = parser.parse({ lexemeId: 'TEST', form: 'сыдэ1уащ' });
    expect(result.morphemes.length).toBeGreaterThan(0);
  });

  it('karsiliklilik + kok ayristirir', () => {
    const result = parser.parse({ lexemeId: 'TEST', form: 'зэ1уыш1ашь' });
    expect(result.morphemes.length).toBeGreaterThan(0);
  });
});

// ============================================
// ADR-0040 ENTEGRASYON
// ============================================

describe('ADR-0040: MorphemeParser entegrasyon', () => {
  const mockMorphemes: Morpheme[] = [
    { id: 'M-GU', form: 'гу', gloss: 'kalp', type: 'lexical' } as Morpheme,
    { id: 'M-PSY', form: 'псы', gloss: 'su', type: 'lexical' } as Morpheme,
  ];
  const parser = new MorphemeParser(mockMorphemes);

  it('position artarak gider', () => {
    const r = parser.parse('гупсы');
    for (let i = 0; i < r.morphemes.length; i++) {
      expect(r.morphemes[i].position).toBe(i);
    }
  });

  it('getSuccessRate doner', () => {
    const results = parser.parseBatch(['гу', 'псы']);
    expect(parser.getSuccessRate(results)).toBe(1.0);
  });
});
