import { describe, it, expect } from 'vitest';
import { MorphologyAnalyzer } from '../../../domain/morphology/MorphologyAnalyzer';
import type { MorphologyResult } from '../../../domain/morphology/MorphologyAnalyzer';

const roots = [{ form: 'сын' }, { form: 'ужь' }, { form: 'тын' }, { form: 'нэ' }];

describe('MorphologyAnalyzer: strict=false yolunda exact yalnizca dogrulanmis kokle', () => {
  const analyzer = new MorphologyAnalyzer([], roots as any, [], [], false);

  it.each(['нэсын', 'план', 'юсыф'])('%s icin exact + yarim kok donmez', (word: string) => {
    const r: MorphologyResult = analyzer.analyze(word);
    expect(r.method === 'exact' && r.root === 'сы').toBe(false);
    expect(r.method === 'exact' && r.root === 'пл').toBe(false);
    expect(r.method === 'exact' && r.root === 'юсы').toBe(false);
  });

  it.each(['нэсын', 'юсыф'])('%s icin exact donmez (kok dogrulanamaz)', (word: string) => {
    const r: MorphologyResult = analyzer.analyze(word);
    expect(r.method).not.toBe('exact');
  });

  it('bilinmeyen form unverified doner', () => {
    const r: MorphologyResult = analyzer.analyze('сыгэ');
    expect(r.method).toBe('unverified');
    expect(r.method).not.toBe('exact');
    const firstPrefix = r.prefixes.find(() => true);
    expect(firstPrefix?.slot).toBe('person');
  });
});
