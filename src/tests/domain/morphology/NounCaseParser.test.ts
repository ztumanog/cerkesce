import { describe, it, expect } from 'vitest';
import { NounCaseParser } from '@/domain/morphology/NounCaseParser';

describe('P4-008: NounCaseParser', () => {
  const parser = new NounCaseParser();

  // ============================================
  // TEMEL TESTLER (Mimar + gl1.pdf)
  // ============================================

  it('NC-001: щIалэхэр -> plural_nominative', () => {
    const r = parser.parse('щIалэхэр');
    expect(r.case).toBe('plural_nominative');
    expect(r.stem).toBe('щIалэ');
    expect(r.suffix).toBe('хэр');
    expect(r.isPlural).toBe(true);
  });

  it('NC-002: лIыжьымкIэ -> definite_instrumental', () => {
    const r = parser.parse('лIыжьымкIэ');
    expect(r.case).toBe('definite_instrumental');
    expect(r.stem).toBe('лIыжьы');
    expect(r.suffix).toBe('мкIэ');
    expect(r.isDefinite).toBe(true);
  });

  it('NC-003: унэуэ -> adverbial', () => {
    const r = parser.parse('унэуэ');
    expect(r.case).toBe('adverbial');
    expect(r.stem).toBe('унэ');
    expect(r.suffix).toBe('уэ');
  });

  it('NC-004: цIыхухэм -> plural_ergative', () => {
    const r = parser.parse('цIыхухэм');
    expect(r.case).toBe('plural_ergative');
    expect(r.stem).toBe('цIыху');
    expect(r.suffix).toBe('хэм');
  });

  it('NC-005: хадэ -> bare', () => {
    const r = parser.parse('хадэ');
    expect(r.case).toBe('bare');
    expect(r.stem).toBe('хадэ');
    expect(r.suffix).toBe('');
  });

  it('NC-006: уынэр -> nominative', () => {
    const r = parser.parse('уынэр');
    expect(r.case).toBe('nominative');
    expect(r.stem).toBe('уынэ');
    expect(r.suffix).toBe('р');
  });

  it('NC-007: уынэм -> ergative', () => {
    const r = parser.parse('уынэм');
    expect(r.case).toBe('ergative');
    expect(r.stem).toBe('уынэ');
    expect(r.suffix).toBe('м');
  });

  it('NC-008: сэчIэ -> instrumental', () => {
    const r = parser.parse('сэчIэ');
    expect(r.case).toBe('instrumental');
    expect(r.stem).toBe('сэ');
  });

  it('NC-009: унэхэмкIэ -> plural_instrumental', () => {
    const r = parser.parse('унэхэмкIэ');
    expect(r.case).toBe('plural_instrumental');
    expect(r.stem).toBe('унэ');
    expect(r.suffix).toBe('хэмкIэ');
  });

  it('NC-010: шакIуэхэу -> plural_adverbial', () => {
    const r = parser.parse('шакIуэхэу');
    expect(r.case).toBe('plural_adverbial');
    expect(r.isPlural).toBe(true);
  });

  // ============================================
  // SIRA / CAKISMA TESTLERI
  // ============================================

  it('NC-011: унэм -> ergative (definite_instrumental DEGIL)', () => {
    const r = parser.parse('унэм');
    expect(r.case).toBe('ergative');
  });

  it('NC-012: унэмкIэ -> definite_instrumental (-м + -кIэ DEGIL)', () => {
    const r = parser.parse('унэмкIэ');
    expect(r.case).toBe('definite_instrumental');
    expect(r.suffix).toBe('мкIэ');
  });

  it('NC-013: унэхэм -> plural_ergative (-м DEGIL)', () => {
    const r = parser.parse('унэхэм');
    expect(r.case).toBe('plural_ergative');
    expect(r.suffix).toBe('хэм');
  });

  // ============================================
  // BELIRSIZLIK TESTLERI
  // ============================================

  it('NC-014: унэ -> bare (belirsiz)', () => {
    const r = parser.parse('унэ');
    expect(r.case).toBe('bare');
    expect(r.isDefinite).toBe(false);
  });

  it('NC-015: унэр -> nominative (belirli)', () => {
    const r = parser.parse('унэр');
    expect(r.case).toBe('nominative');
    expect(r.isDefinite).toBe(true);
  });

  // ============================================
  // FARKLI KOKLER
  // ============================================

  it('NC-016: псыр -> nominative', () => {
    const r = parser.parse('псыр');
    expect(r.case).toBe('nominative');
    expect(r.stem).toBe('псы');
  });

  it('NC-017: псым -> ergative', () => {
    const r = parser.parse('псым');
    expect(r.case).toBe('ergative');
    expect(r.stem).toBe('псы');
  });

  it('NC-018: псыхэр -> plural_nominative', () => {
    const r = parser.parse('псыхэр');
    expect(r.case).toBe('plural_nominative');
    expect(r.stem).toBe('псы');
  });

  // ============================================
  // KENAR DURUMLAR
  // ============================================

  it('NC-019: bos form -> bare, confidence 0', () => {
    const r = parser.parse('');
    expect(r.case).toBe('bare');
    expect(r.confidence).toBe(0);
  });

  it('NC-020: bilinmeyen form -> bare', () => {
    const r = parser.parse('xyzabc');
    expect(r.case).toBe('bare');
    expect(r.confidence).toBe(0.5);
  });

  // ============================================
  // YARDIMCI METODLAR
  // ============================================

  it('NC-021: isPlural', () => {
    expect(parser.isPlural('щIалэхэр')).toBe(true);
    expect(parser.isPlural('унэр')).toBe(false);
  });

  it('NC-022: isDefinite', () => {
    expect(parser.isDefinite('унэр')).toBe(true);
    expect(parser.isDefinite('унэ')).toBe(false);
  });

  it('NC-023: parseBatch', () => {
    const results = parser.parseBatch(['унэр', 'унэм', 'унэ']);
    expect(results.length).toBe(3);
    expect(results[0].case).toBe('nominative');
    expect(results[1].case).toBe('ergative');
    expect(results[2].case).toBe('bare');
  });
});
