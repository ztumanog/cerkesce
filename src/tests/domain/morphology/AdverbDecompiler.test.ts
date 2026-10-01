import { describe, it, expect } from 'vitest';
import { AdverbDecompiler } from '@/domain/morphology/AdverbDecompiler';

describe('P4-014: AdverbDecompiler', () => {
  const decompiler = new AdverbDecompiler();

  // ============================================
  // GENEL ZARF (-уэ, -у)
  // ============================================

  it('AV-001: дахэуэ -> general', () => {
    const r = decompiler.decompile('дахэуэ');
    expect(r.type).toBe('general');
    expect(r.suffix).toBe('уэ');
    expect(r.stem).toBe('дахэ');
  });

  it('AV-002: дахэу -> general (kisa)', () => {
    const r = decompiler.decompile('дахэу');
    expect(r.type).toBe('general');
    expect(r.suffix).toBe('у');
    expect(r.stem).toBe('дахэ');
  });

  it('AV-003: псынщIэуэ -> general', () => {
    const r = decompiler.decompile('псынщIэуэ');
    expect(r.type).toBe('general');
  });

  it('AV-004: псынщIэу -> general', () => {
    const r = decompiler.decompile('псынщIэу');
    expect(r.type).toBe('general');
  });

  it('AV-005: isGeneral', () => {
    expect(decompiler.isGeneral('дахэуэ')).toBe(true);
    expect(decompiler.isGeneral('унэ')).toBe(false);
  });

  // ============================================
  // YER ZARFI (-нэ)
  // ============================================

  it('AV-006: дэнэ -> place', () => {
    const r = decompiler.decompile('дэнэ');
    expect(r.type).toBe('place');
    expect(r.suffix).toBe('нэ');
  });

  it('AV-007: мыдэнэ -> place', () => {
    const r = decompiler.decompile('мыдэнэ');
    expect(r.type).toBe('place');
  });

  it('AV-008: isPlace', () => {
    expect(decompiler.isPlace('дэнэ')).toBe(true);
    expect(decompiler.isPlace('унэ')).toBe(false);
  });

  // ============================================
  // ZAMAN ZARFI (-щ)
  // ============================================

  it('AV-009: иджыщ -> time', () => {
    const r = decompiler.decompile('иджыщ');
    expect(r.type).toBe('time');
    expect(r.suffix).toBe('щ');
  });

  it('AV-010: isTime', () => {
    expect(decompiler.isTime('иджыщ')).toBe(true);
    expect(decompiler.isTime('унэ')).toBe(false);
  });

  // ============================================
  // SIRA CAKISMA
  // ============================================

  it('AV-011: -нэ once, -уэ sonra', () => {
    const r = decompiler.decompile('дэнэ');
    expect(r.type).toBe('place');
    expect(r.suffix).toBe('нэ');
  });

  it('AV-012: -уэ once, -у sonra', () => {
    const r = decompiler.decompile('дахэуэ');
    expect(r.suffix).toBe('уэ');
  });

  it('AV-013: -у kisa form', () => {
    const r = decompiler.decompile('дахэу');
    expect(r.suffix).toBe('у');
  });

  // ============================================
  // ROOT CIKARMA
  // ============================================

  it('AV-014: stem genel', () => {
    const r = decompiler.decompile('дахэуэ');
    expect(r.stem).toBe('дахэ');
  });

  it('AV-015: stem yer', () => {
    const r = decompiler.decompile('дэнэ');
    expect(r.stem).toBe('дэ');
  });

  // ============================================
  // KENAR DURUMLAR
  // ============================================

  it('AV-016: bos form -> bare, confidence 0', () => {
    const r = decompiler.decompile('');
    expect(r.type).toBe('bare');
    expect(r.confidence).toBe(0);
  });

  it('AV-017: bilinmeyen form -> bare', () => {
    const r = decompiler.decompile('xyzabc');
    expect(r.type).toBe('bare');
    expect(r.confidence).toBe(0.5);
  });

  it('AV-018: kisa stem -> bare', () => {
    const r = decompiler.decompile('у');
    expect(r.type).toBe('bare');
  });

  // ============================================
  // TOPLU
  // ============================================

  it('AV-019: decompileBatch', () => {
    const results = decompiler.decompileBatch(['дахэуэ', 'дэнэ', 'иджыщ']);
    expect(results.length).toBe(3);
    expect(results[0].type).toBe('general');
    expect(results[1].type).toBe('place');
    expect(results[2].type).toBe('time');
  });

  it('AV-020: getTypes 4 tip doner', () => {
    const types = decompiler.getTypes();
    expect(types.length).toBe(4);
  });

  it('AV-021: confidence 0-1 arasi', () => {
    const r = decompiler.decompile('дахэуэ');
    expect(r.confidence).toBeGreaterThanOrEqual(0);
    expect(r.confidence).toBeLessThanOrEqual(1);
  });

  it('AV-022: suffix doner', () => {
    expect(decompiler.decompile('дахэуэ').suffix).toBe('уэ');
    expect(decompiler.decompile('дэнэ').suffix).toBe('нэ');
    expect(decompiler.decompile('иджыщ').suffix).toBe('щ');
  });

  it('AV-023: type listesi dogru', () => {
    const types = decompiler.getTypes();
    expect(types).toContain('general');
    expect(types).toContain('place');
    expect(types).toContain('time');
    expect(types).toContain('bare');
  });

  it('AV-024: isGeneral false', () => {
    expect(decompiler.isGeneral('дэнэ')).toBe(false);
    expect(decompiler.isGeneral('иджыщ')).toBe(false);
  });
});
