import { describe, it, expect } from 'vitest';
import { SyntaxAnalyzer } from '@/domain/morphology/SyntaxAnalyzer';

describe('P4-019: SyntaxAnalyzer', () => {
  const analyzer = new SyntaxAnalyzer();

  // BARE
  it('SY-001: tek obek -> BARE', () => {
    const r = analyzer.analyze(['унэ']);
    expect(r.type).toBe('BARE');
    expect(r.predicate).toBe('унэ');
  });

  it('SY-002: bos dizi -> BARE, confidence 0', () => {
    const r = analyzer.analyze([]);
    expect(r.type).toBe('BARE');
    expect(r.confidence).toBe(0);
  });

  // SV
  it('SY-003: ozne + yuklem -> SV', () => {
    const r = analyzer.analyze(['сабийм', 'къ1ежых']);
    expect(r.type).toBe('SV');
    expect(r.subject).toBe('сабийм');
    expect(r.predicate).toBe('къ1ежых');
  });

  // SOV / ERGATIVE
  it('SY-004: ergatif cumle -> ERGATIVE', () => {
    const r = analyzer.analyze(['пшъашъэм', 'тхылъыр', 'ехы']);
    expect(r.isErgative).toBe(true);
    expect(r.subject).toBe('пшъашъэм');
  });

  it('SY-005: ergatif ek -м', () => {
    const r = analyzer.analyze(['лIым', 'жыгър', 'илъэгъуащ']);
    expect(r.isErgative).toBe(true);
  });

  it('SY-006: isErgative', () => {
    expect(analyzer.isErgative(['лIым', 'жыгър', 'илъэгъуащ'])).toBe(true);
    expect(analyzer.isErgative(['сабийм', 'къ1ежых'])).toBe(false);
  });

  // AFFECTIVE
  it('SY-007: affektif -> AFFECTIVE', () => {
    const r = analyzer.analyze(['сэ', 'йы1эн']);
    expect(r.type).toBe('AFFECTIVE');
  });

  it('SY-008: affektif prefix фэ', () => {
    const r = analyzer.analyze(['сэ', 'фэ']);
    expect(r.type).toBe('AFFECTIVE');
  });

  // PREDICATE
  it('SY-009: predicate son token', () => {
    const r = analyzer.analyze(['зы', 'унэ']);
    expect(r.predicate).toBe('унэ');
  });

  it('SY-010: getPredicate', () => {
    expect(analyzer.getPredicate(['сабийм', 'къ1ежых'])).toBe('къ1ежых');
  });

  // SUBJECT
  it('SY-011: getSubject', () => {
    const r = analyzer.analyze(['сабийм', 'къ1ежых']);
    expect(r.subject).toBe('сабийм');
  });

  it('SY-012: subject null (bare)', () => {
    const r = analyzer.analyze(['унэ']);
    expect(r.subject).toBeNull();
  });

  // OBJECT
  it('SY-013: object doner', () => {
    const r = analyzer.analyze(['пшъашъэм', 'тхылъыр', 'ехы']);
    expect(r.object).toBeDefined();
  });

  // YARDIMCI
  it('SY-014: getTypes 7 tip doner', () => {
    const types = analyzer.getTypes();
    expect(types.length).toBe(7);
  });

  it('SY-015: tip listesi dogru', () => {
    const types = analyzer.getTypes();
    expect(types).toContain('SOV');
    expect(types).toContain('OSV');
    expect(types).toContain('SV');
    expect(types).toContain('OV');
    expect(types).toContain('ERGATIVE');
    expect(types).toContain('AFFECTIVE');
    expect(types).toContain('BARE');
  });

  it('SY-016: confidence 0-1 arasi', () => {
    const r = analyzer.analyze(['сабийм', 'къ1ежых']);
    expect(r.confidence).toBeGreaterThanOrEqual(0);
    expect(r.confidence).toBeLessThanOrEqual(1);
  });

  it('SY-017: isErgative false - bare', () => {
    expect(analyzer.isErgative(['унэ'])).toBe(false);
  });

  it('SY-018: SV tip dogru', () => {
    const r = analyzer.analyze(['лIыр', 'макIуэ']);
    expect(r.type).toBe('SV');
  });

  // TOPLU
  it('SY-019: analyzeBatch', () => {
    const results = analyzer.analyzeBatch([
      ['сабийм', 'къ1ежых'],
      ['пшъашъэм', 'тхылъыр', 'ехы'],
    ]);
    expect(results.length).toBe(2);
    expect(results[0].type).toBe('SV');
    expect(results[1].isErgative).toBe(true);
  });

  it('SY-020: subject ve predicate doner', () => {
    const r = analyzer.analyze(['сабийм', 'къ1ежых']);
    expect(r.subject).toBeDefined();
    expect(r.predicate).toBeDefined();
  });

  it('SY-021: iki obek -> SV', () => {
    const r = analyzer.analyze(['лIыр', 'макIуэ']);
    expect(r.type).toBe('SV');
  });

  it('SY-022: uc obek -> SOV/ERGATIVE', () => {
    const r = analyzer.analyze(['пшъашъэм', 'тхылъыр', 'ехы']);
    expect(r.type).toBe('ERGATIVE');
  });

  it('SY-023: object null (SV)', () => {
    const r = analyzer.analyze(['сабийм', 'къ1ежых']);
    expect(r.object).toBeNull();
  });

  it('SY-024: tip listesi 7 eleman', () => {
    expect(analyzer.getTypes().length).toBe(7);
  });
});
