import { describe, it, expect } from 'vitest';
import { MorphologyAnalyzer } from '@/domain/morphology/MorphologyAnalyzer';

describe('Derin Bileşik & Palochka Morfoloji Testleri', () => {
  const analyzer = new MorphologyAnalyzer();

  it('"псыхуэлӀэкӀэ" kelimesini [пс] + -ы + хуэ- + [лӀ] + -э + -кӀэ olarak derin ayrıştırmalıdır', () => {
    const res = analyzer.analyze('псыхуэлӀэкӀэ');
    expect(res.source).toBe('compound');
    expect(res.morphemes?.some(m => m.morpheme === 'пс')).toBe(true);
    expect(res.morphemes?.some(m => m.morpheme === 'хуэ')).toBe(true);
    expect(res.morphemes?.some(m => m.morpheme === 'лӀ')).toBe(true);
    expect(res.morphemes?.some(m => m.morpheme === 'кӀэ')).toBe(true);
  });
});