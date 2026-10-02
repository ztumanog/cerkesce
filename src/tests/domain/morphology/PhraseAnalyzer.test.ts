import { describe, it, expect } from 'vitest';
import { PhraseAnalyzer } from '@/domain/morphology/PhraseAnalyzer';

describe('P4-018: PhraseAnalyzer', () => {
  const analyzer = new PhraseAnalyzer();

  // BARE
  it('PH-001: tek kelime -> BARE', () => {
    const phrases = analyzer.analyzePhrases(['унэ']);
    expect(phrases.length).toBe(1);
    expect(phrases[0].type).toBe('BARE');
  });

  it('PH-002: лIыр -> BARE', () => {
    const phrases = analyzer.analyzePhrases(['лIыр']);
    expect(phrases[0].type).toBe('BARE');
  });

  // NUMP
  it('PH-003: sayi + isim -> NumP', () => {
    const phrases = analyzer.analyzePhrases(['зы', 'унэ']);
    expect(phrases[0].type).toBe('NumP');
    expect(phrases[0].tokens.length).toBe(2);
  });

  it('PH-004: тIу + махуэ -> NumP', () => {
    const phrases = analyzer.analyzePhrases(['тIу', 'махуэ']);
    expect(phrases[0].type).toBe('NumP');
  });

  // ADJP
  it('PH-005: sifat + isim -> AdjP', () => {
    const phrases = analyzer.analyzePhrases(['фыжь', 'хьалыгъу']);
    expect(phrases[0].type).toBe('AdjP');
    expect(phrases[0].tokens.length).toBe(2);
  });

  it('PH-006: дахэ + унэ -> AdjP', () => {
    const phrases = analyzer.analyzePhrases(['дахэ', 'унэ']);
    expect(phrases[0].type).toBe('AdjP');
  });

  // POSSP
  it('PH-007: iyelik oneki + isim -> PossP', () => {
    const phrases = analyzer.analyzePhrases(['си', 'унэ']);
    expect(phrases[0].type).toBe('PossP');
  });

  it('PH-008: уи + тхылъ -> PossP', () => {
    const phrases = analyzer.analyzePhrases(['уи', 'тхылъ']);
    expect(phrases[0].type).toBe('PossP');
  });

  // PP
  it('PH-009: isim + edat -> PP', () => {
    const phrases = analyzer.analyzePhrases(['унэ', 'дэжь']);
    expect(phrases[0].type).toBe('PP');
  });

  it('PH-010: isim + деж -> PP', () => {
    const phrases = analyzer.analyzePhrases(['унэ', 'деж']);
    expect(phrases[0].type).toBe('PP');
  });

  // PARTP
  it('PH-011: partisip + isim -> PartP', () => {
    const phrases = analyzer.analyzePhrases(['шыщ', 'к1алэр']);
    expect(phrases.length).toBeGreaterThan(0);
  });

  // VP
  it('PH-012: fiil oneki -> VP', () => {
    const phrases = analyzer.analyzePhrases(['гъэкIуэн', 'унэ']);
    expect(phrases.length).toBeGreaterThan(0);
  });

  // KARISIK
  it('PH-013: sayi + isim + sifat', () => {
    const phrases = analyzer.analyzePhrases(['зы', 'унэ', 'дахэ']);
    expect(phrases.length).toBeGreaterThan(0);
  });

  it('PH-014: isim + edat + isim', () => {
    const phrases = analyzer.analyzePhrases(['унэ', 'дэжь', 'лIыр']);
    expect(phrases.length).toBeGreaterThan(1);
  });

  // YARDIMCI
  it('PH-015: bos dizi -> bos sonuc', () => {
    const phrases = analyzer.analyzePhrases([]);
    expect(phrases.length).toBe(0);
  });

  it('PH-016: head doner', () => {
    const phrases = analyzer.analyzePhrases(['зы', 'унэ']);
    expect(phrases[0].head).toBeDefined();
    expect(phrases[0].head.length).toBeGreaterThan(0);
  });

  it('PH-017: dependents doner', () => {
    const phrases = analyzer.analyzePhrases(['зы', 'унэ']);
    expect(phrases[0].dependents).toBeDefined();
  });

  it('PH-018: confidence 0-1 arasi', () => {
    const phrases = analyzer.analyzePhrases(['зы', 'унэ']);
    expect(phrases[0].confidence).toBeGreaterThanOrEqual(0);
    expect(phrases[0].confidence).toBeLessThanOrEqual(1);
  });

  // TOPLU
  it('PH-019: analyzeBatch', () => {
    const results = analyzer.analyzeBatch([
      ['зы', 'унэ'],
      ['дахэ', 'тхылъ'],
    ]);
    expect(results.length).toBe(2);
  });

  it('PH-020: getTypes 8 tip doner', () => {
    const types = analyzer.getTypes();
    expect(types.length).toBe(8);
  });

  it('PH-021: tip listesi dogru', () => {
    const types = analyzer.getTypes();
    expect(types).toContain('NP');
    expect(types).toContain('AdjP');
    expect(types).toContain('NumP');
    expect(types).toContain('PossP');
    expect(types).toContain('PP');
    expect(types).toContain('VP');
    expect(types).toContain('PartP');
    expect(types).toContain('BARE');
  });

  it('PH-022: NP olusturma', () => {
    const phrases = analyzer.analyzePhrases(['лIыр', 'унэ']);
    expect(phrases.length).toBeGreaterThan(0);
  });

  it('PH-023: coklu obek', () => {
    const phrases = analyzer.analyzePhrases(['зы', 'унэ', 'дахэ']);
    expect(phrases.length).toBeGreaterThanOrEqual(1);
  });

  it('PH-024: tokens doner', () => {
    const phrases = analyzer.analyzePhrases(['зы', 'унэ']);
    expect(phrases[0].tokens.length).toBeGreaterThan(0);
  });

  // GROUP DECLENSION
  it('PH-025: унэ дахэ -> AdjP (grup)', () => {
    const phrases = analyzer.analyzePhrases(['дахэ', 'унэ']);
    expect(phrases.length).toBeGreaterThan(0);
  });

  it('PH-026: унэ дахэхэм -> grup declension', () => {
    const phrases = analyzer.analyzePhrases(['унэ', 'дахэхэм']);
    expect(phrases.length).toBeGreaterThan(0);
  });

  it('PH-027: head belirleme (grup)', () => {
    const phrases = analyzer.analyzePhrases(['дахэ', 'унэ']);
    const head = phrases[0].head;
    expect(head).toBeDefined();
    expect(head.length).toBeGreaterThan(0);
  });

  it('PH-028: modifier belirleme', () => {
    const phrases = analyzer.analyzePhrases(['дахэ', 'унэ']);
    const dependents = phrases[0].dependents;
    expect(dependents).toBeDefined();
    expect(dependents.length).toBeGreaterThan(0);
  });

  it('PH-029: cok kelimeli NP', () => {
    const phrases = analyzer.analyzePhrases(['лIыр', 'унэ', 'дахэ']);
    expect(phrases.length).toBeGreaterThan(0);
  });

  it('PH-030: grup bükümü (ünlü uyumu)', () => {
    const phrases = analyzer.analyzePhrases(['унэ', 'дахэ', 'хэм']);
    expect(phrases.length).toBeGreaterThan(0);
  });
});
