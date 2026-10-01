import { describe, it, expect } from 'vitest';
import { ParticipleDecompiler } from '@/domain/morphology/ParticipleDecompiler';

describe('P4-013: ParticipleDecompiler', () => {
  const decompiler = new ParticipleDecompiler();

  // ============================================
  // GENEL PARTISIP (-р)
  // ============================================

  it('PT-001: кIуэр -> general', () => {
    const r = decompiler.decompile('кIуэр');
    expect(r.type).toBe('general');
    expect(r.suffix).toBe('р');
  });

  it('PT-002: тхыр -> general', () => {
    const r = decompiler.decompile('тхыр');
    expect(r.type).toBe('general');
  });

  it('PT-003: шхэр -> general', () => {
    const r = decompiler.decompile('шхэр');
    expect(r.type).toBe('general');
  });

  it('PT-004: isGeneral', () => {
    expect(decompiler.isGeneral('кIуэр')).toBe(true);
    expect(decompiler.isGeneral('унэ')).toBe(false);
  });

  // ============================================
  // PERFEKT PARTISIP (-гъэ)
  // ============================================

  it('PT-005: кIуагъэ -> perfect', () => {
    const r = decompiler.decompile('кIуагъэ');
    expect(r.type).toBe('perfect');
    expect(r.suffix).toBe('гъэ');
  });

  it('PT-006: тхыгъэ -> perfect', () => {
    const r = decompiler.decompile('тхыгъэ');
    expect(r.type).toBe('perfect');
  });

  it('PT-007: шхыгъэ -> perfect', () => {
    const r = decompiler.decompile('шхыгъэ');
    expect(r.type).toBe('perfect');
  });

  it('PT-008: isPerfect', () => {
    expect(decompiler.isPerfect('кIуагъэ')).toBe(true);
    expect(decompiler.isPerfect('унэ')).toBe(false);
  });

  // ============================================
  // STATIK PARTISIP (-щ)
  // ============================================

  it('PT-009: шыщ -> static', () => {
    const r = decompiler.decompile('шыщ');
    expect(r.type).toBe('static');
    expect(r.suffix).toBe('щ');
  });

  it('PT-010: тIысщ -> static', () => {
    const r = decompiler.decompile('тIысщ');
    expect(r.type).toBe('static');
  });

  it('PT-011: лъэщ -> static', () => {
    const r = decompiler.decompile('лъэщ');
    expect(r.type).toBe('static');
  });

  it('PT-012: isStatic', () => {
    expect(decompiler.isStatic('шыщ')).toBe(true);
    expect(decompiler.isStatic('унэ')).toBe(false);
  });

  // ============================================
  // SIRA CAKISMA
  // ============================================

  it('PT-013: -гъэ once, -р sonra', () => {
    const r = decompiler.decompile('кIуагъэ');
    expect(r.type).toBe('perfect');
    expect(r.suffix).toBe('гъэ');
  });

  it('PT-014: -р ve -щ ayri', () => {
    expect(decompiler.decompile('кIуэр').type).toBe('general');
    expect(decompiler.decompile('шыщ').type).toBe('static');
  });

  // ============================================
  // ROOT CIKARMA
  // ============================================

  it('PT-015: stem doner', () => {
    const r = decompiler.decompile('кIуагъэ');
    expect(r.stem).toBe('кIуа');
  });

  it('PT-016: stem general', () => {
    const r = decompiler.decompile('кIуэр');
    expect(r.stem).toBe('кIуэ');
  });

  // ============================================
  // KENAR DURUMLAR
  // ============================================

  it('PT-017: bos form -> bare, confidence 0', () => {
    const r = decompiler.decompile('');
    expect(r.type).toBe('bare');
    expect(r.confidence).toBe(0);
  });

  it('PT-018: bilinmeyen form -> bare', () => {
    const r = decompiler.decompile('xyzabc');
    expect(r.type).toBe('bare');
    expect(r.confidence).toBe(0.5);
  });

  it('PT-019: unli sonu -> bare', () => {
    const r = decompiler.decompile('унэ');
    expect(r.type).toBe('bare');
  });

  // ============================================
  // TOPLU
  // ============================================

  it('PT-020: decompileBatch', () => {
    const results = decompiler.decompileBatch(['кIуэр', 'кIуагъэ', 'шыщ']);
    expect(results.length).toBe(3);
    expect(results[0].type).toBe('general');
    expect(results[1].type).toBe('perfect');
    expect(results[2].type).toBe('static');
  });

  it('PT-021: getTypes 4 tip doner', () => {
    const types = decompiler.getTypes();
    expect(types.length).toBe(4);
  });

  it('PT-022: confidence 0-1 arasi', () => {
    const r = decompiler.decompile('кIуэр');
    expect(r.confidence).toBeGreaterThanOrEqual(0);
    expect(r.confidence).toBeLessThanOrEqual(1);
  });

  it('PT-023: suffix doner', () => {
    expect(decompiler.decompile('кIуэр').suffix).toBe('р');
    expect(decompiler.decompile('кIуагъэ').suffix).toBe('гъэ');
    expect(decompiler.decompile('шыщ').suffix).toBe('щ');
  });

  it('PT-024: type listesi dogru', () => {
    const types = decompiler.getTypes();
    expect(types).toContain('general');
    expect(types).toContain('perfect');
    expect(types).toContain('static');
    expect(types).toContain('bare');
  });
});
