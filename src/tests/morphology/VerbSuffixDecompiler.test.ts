import { describe, it, expect } from 'vitest';
import { VerbSuffixDecompiler } from '@/domain/morphology/VerbSuffixDecompiler';

describe('VerbSuffixDecompiler', () => {
  const decompiler = new VerbSuffixDecompiler();

  it('bildirme eki (-щ) ve geçmiş zaman ekini (-ащ / -гъащ) doğru ayrıştırmalıdır', () => {
    const resPast = decompiler.parse('ищӀащ');
    expect(resPast.stem).toBe('ищӀ');
    expect(resPast.suffixes.some(s => s.type === 'tense' || s.type === 'predicative')).toBe(true);
  });

  it('gelecek zaman ekini (-нущ) tespit etmelidir', () => {
    const resFut = decompiler.parse('ищӀэнущ');
    expect(resFut.suffixes.some(s => s.morpheme === 'нущ' || s.type === 'future_tense')).toBe(true);
  });

  it('olumsuzluk eklerini (-къым / -теп) doğru saptamalıdır', () => {
    const resNeg = decompiler.parse('ищӀакъым');
    expect(resNeg.suffixes.some(s => s.type === 'negative' || s.morpheme === 'къым')).toBe(true);
  });
});