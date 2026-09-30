import { describe, it, expect } from 'vitest';
import { MorphemeParser } from '@/domain/morphology/MorphemeParser';
import { Morpheme } from '@/domain/linguistic/Morpheme';

describe('Phase 4.3 - Morpheme Parser', () => {
  const mockMorphemes: Morpheme[] = [
    { id: 'M-F1E', form: 'фӀэ', type: 'suffix' } as Morpheme,
    { id: 'M-GHE', form: 'гъэ', type: 'suffix' } as Morpheme,
    { id: 'M-BZHYGE', form: 'бзыгъэ', type: 'suffix' } as Morpheme,
    { id: 'M-SHXUE', form: 'шхуэ', type: 'suffix' } as Morpheme,
  ];
  const parser = new MorphemeParser(mockMorphemes);

  it('4.3.1: gufl'e -> fIe', () => {
    const r = parser.parse('гуфӀэ');
    expect(r.matched).toBe(true);
    expect(r.morphemes.length).toBeGreaterThan(0);
  });

  it('4.3.2: gubzyge -> bzyge', () => {
    const r = parser.parse('губзыгъэ');
    expect(r.matched).toBe(true);
  });

  it('4.3.3: uneshhue -> shhue', () => {
    const r = parser.parse('унэшхуэ');
    expect(r.matched).toBe(true);
  });

  it('4.3.4: batch', () => {
    const rs = parser.parseBatch(['гуфӀэ', 'губзыгъэ']);
    expect(rs.length).toBe(2);
  });
});
