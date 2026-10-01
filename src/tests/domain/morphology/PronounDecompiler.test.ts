import { describe, it, expect } from 'vitest';
import { PronounDecompiler } from '@/domain/morphology/PronounDecompiler';

describe('P4-010: PronounDecompiler', () => {
  const decompiler = new PronounDecompiler();

  // ============================================
  // SAHIS ZAMIRLERI (personal)
  // ============================================

  it('PR-001: сэ -> personal 1sg', () => {
    const r = decompiler.decompile('сэ');
    expect(r.type).toBe('personal');
    expect(r.person).toBe('1sg');
  });

  it('PR-002: уэ -> personal 2sg', () => {
    const r = decompiler.decompile('уэ');
    expect(r.type).toBe('personal');
    expect(r.person).toBe('2sg');
  });

  it('PR-003: дэ -> personal 1pl', () => {
    const r = decompiler.decompile('дэ');
    expect(r.type).toBe('personal');
    expect(r.person).toBe('1pl');
  });

  it('PR-004: фэ -> personal 2pl', () => {
    const r = decompiler.decompile('фэ');
    expect(r.type).toBe('personal');
    expect(r.person).toBe('2pl');
  });

  it('PR-005: ар -> personal 3sg', () => {
    const r = decompiler.decompile('ар');
    expect(r.type).toBe('personal');
    expect(r.person).toBe('3sg');
  });

  it('PR-006: isPersonal', () => {
    expect(decompiler.isPersonal('сэ')).toBe(true);
    expect(decompiler.isPersonal('унэ')).toBe(false);
  });

  // ============================================
  // IYELIK ZAMIRLERI (possessive)
  // ============================================

  it('PR-007: сыйэ -> possessive 1sg', () => {
    const r = decompiler.decompile('сыйэ');
    expect(r.type).toBe('possessive');
    expect(r.person).toBe('1sg');
  });

  it('PR-008: уыйэ -> possessive 2sg', () => {
    const r = decompiler.decompile('уыйэ');
    expect(r.type).toBe('possessive');
    expect(r.person).toBe('2sg');
  });

  it('PR-009: йыйэ -> possessive 3sg', () => {
    const r = decompiler.decompile('йыйэ');
    expect(r.type).toBe('possessive');
    expect(r.person).toBe('3sg');
  });

  it('PR-010: дыйэ -> possessive 1pl', () => {
    const r = decompiler.decompile('дыйэ');
    expect(r.type).toBe('possessive');
    expect(r.person).toBe('1pl');
  });

  it('PR-011: фыйэ -> possessive 2pl', () => {
    const r = decompiler.decompile('фыйэ');
    expect(r.type).toBe('possessive');
    expect(r.person).toBe('2pl');
  });

  it('PR-012: isPossessive', () => {
    expect(decompiler.isPossessive('сыйэ')).toBe(true);
    expect(decompiler.isPossessive('сэ')).toBe(false);
  });

  // ============================================
  // ISARET ZAMIRLERI (demonstrative)
  // ============================================

  it('PR-013: мы -> demonstrative (yakin)', () => {
    const r = decompiler.decompile('мы');
    expect(r.type).toBe('demonstrative');
  });

  it('PR-014: мо -> demonstrative (uzak)', () => {
    const r = decompiler.decompile('мо');
    expect(r.type).toBe('demonstrative');
  });

  it('PR-015: а -> demonstrative (belirli)', () => {
    const r = decompiler.decompile('а');
    expect(r.type).toBe('demonstrative');
  });

  it('PR-016: isDemonstrative', () => {
    expect(decompiler.isDemonstrative('мы')).toBe(true);
    expect(decompiler.isDemonstrative('сэ')).toBe(false);
  });

  // ============================================
  // SORU ZAMIRLERI (interrogative)
  // ============================================

  it('PR-017: хэт -> interrogative (insan)', () => {
    const r = decompiler.decompile('хэт');
    expect(r.type).toBe('interrogative');
  });

  it('PR-018: сыд -> interrogative (sey)', () => {
    const r = decompiler.decompile('сыд');
    expect(r.type).toBe('interrogative');
  });

  it('PR-019: isInterrogative', () => {
    expect(decompiler.isInterrogative('хэт')).toBe(true);
    expect(decompiler.isInterrogative('сэ')).toBe(false);
  });

  // ============================================
  // BELIRSIZ ZAMIRLER (indefinite)
  // ============================================

  it('PR-020: гуэрэ -> indefinite', () => {
    const r = decompiler.decompile('гуэрэ');
    expect(r.type).toBe('indefinite');
  });

  it('PR-021: зыгуэрэ -> indefinite', () => {
    const r = decompiler.decompile('зыгуэрэ');
    expect(r.type).toBe('indefinite');
  });

  // ============================================
  // KENAR DURUMLAR
  // ============================================

  it('PR-022: bos form -> bare, confidence 0', () => {
    const r = decompiler.decompile('');
    expect(r.type).toBe('bare');
    expect(r.confidence).toBe(0);
  });

  it('PR-023: bilinmeyen form -> bare', () => {
    const r = decompiler.decompile('xyzabc');
    expect(r.type).toBe('bare');
    expect(r.confidence).toBe(0.5);
  });

  // ============================================
  // TOPLU
  // ============================================

  it('PR-024: decompileBatch', () => {
    const results = decompiler.decompileBatch(['сэ', 'сыйэ', 'мы', 'хэт']);
    expect(results.length).toBe(4);
    expect(results[0].type).toBe('personal');
    expect(results[1].type).toBe('possessive');
    expect(results[2].type).toBe('demonstrative');
    expect(results[3].type).toBe('interrogative');
  });

  it('PR-025: getTypes 6 tip doner', () => {
    const types = decompiler.getTypes();
    expect(types.length).toBe(6);
  });
});
