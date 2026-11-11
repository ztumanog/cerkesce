import { describe, it, expect } from 'vitest';
import { PossessiveParser } from '@/domain/morphology/PossessiveParser';
import { MorphologyAnalyzer } from '@/domain/morphology/MorphologyAnalyzer';

describe('PossessiveParser & Çoğul Analiz Testleri', () => {
  const parser = new PossessiveParser();
  const analyzer = new MorphologyAnalyzer();

  it('Sahiplik önekini (си- = Benim) ve kökü doğru ayrıştırmalıdır', () => {
    const res = parser.parse('сиунэ');
    expect(res.possessive?.person).toBe('1SG');
    expect(res.possessive?.glossTr).toBe('Benim');
    expect(res.stem).toBe('унэ');
  });

  it('MorphologyAnalyzer ile "сиунэхэр" (Benim evlerim) kelimesini tam morfolojik ayrıştırmalıdır', () => {
    const res = analyzer.analyze('сиунэхэр');
    expect(res.source).toBe('noun');
    expect(res.possessive?.prefix).toBe('си');
    expect(res.plural?.isPlural).toBe(true);
    expect(res.root).toBe('унэ');
  });
});