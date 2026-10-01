import { describe, it, expect } from 'vitest';
import { NumeralDecompiler } from '@/domain/morphology/NumeralDecompiler';

describe('P4-011: NumeralDecompiler', () => {
  const decompiler = new NumeralDecompiler();

  // ============================================
  // ASAL SAYILAR (cardinal)
  // ============================================

  it('NM-001: зы -> cardinal 1', () => {
    const r = decompiler.decompile('зы');
    expect(r.type).toBe('cardinal');
    expect(r.value).toBe(1);
  });

  it('NM-002: тIу -> cardinal 2', () => {
    const r = decompiler.decompile('тIу');
    expect(r.type).toBe('cardinal');
    expect(r.value).toBe(2);
  });

  it('NM-003: щы -> cardinal 3', () => {
    const r = decompiler.decompile('щы');
    expect(r.type).toBe('cardinal');
    expect(r.value).toBe(3);
  });

  it('NM-004: пIлIы -> cardinal 4', () => {
    const r = decompiler.decompile('пIлIы');
    expect(r.type).toBe('cardinal');
    expect(r.value).toBe(4);
  });

  it('NM-005: тху -> cardinal 5', () => {
    const r = decompiler.decompile('тху');
    expect(r.type).toBe('cardinal');
    expect(r.value).toBe(5);
  });

  it('NM-006: хы -> cardinal 6', () => {
    const r = decompiler.decompile('хы');
    expect(r.type).toBe('cardinal');
    expect(r.value).toBe(6);
  });

  it('NM-007: блы -> cardinal 7', () => {
    const r = decompiler.decompile('блы');
    expect(r.type).toBe('cardinal');
    expect(r.value).toBe(7);
  });

  it('NM-008: и -> cardinal 8', () => {
    const r = decompiler.decompile('и');
    expect(r.type).toBe('cardinal');
    expect(r.value).toBe(8);
  });

  it('NM-009: бгъу -> cardinal 9', () => {
    const r = decompiler.decompile('бгъу');
    expect(r.type).toBe('cardinal');
    expect(r.value).toBe(9);
  });

  it('NM-010: пIщIы -> cardinal 10', () => {
    const r = decompiler.decompile('пIщIы');
    expect(r.type).toBe('cardinal');
    expect(r.value).toBe(10);
  });

  it('NM-011: тIошI -> cardinal 20', () => {
    const r = decompiler.decompile('тIошI');
    expect(r.type).toBe('cardinal');
    expect(r.value).toBe(20);
  });

  it('NM-012: щэ -> cardinal 100', () => {
    const r = decompiler.decompile('щэ');
    expect(r.type).toBe('cardinal');
    expect(r.value).toBe(100);
  });

  it('NM-013: isCardinal', () => {
    expect(decompiler.isCardinal('зы')).toBe(true);
    expect(decompiler.isCardinal('япэ')).toBe(false);
  });

  it('NM-014: getValue', () => {
    expect(decompiler.getValue('зы')).toBe(1);
    expect(decompiler.getValue('тху')).toBe(5);
    expect(decompiler.getValue('xyz')).toBeUndefined();
  });

  // ============================================
  // SIRA SAYILARI (ordinal)
  // ============================================

  it('NM-015: япэ -> ordinal', () => {
    const r = decompiler.decompile('япэ');
    expect(r.type).toBe('ordinal');
  });

  it('NM-016: етIуанэ -> ordinal', () => {
    const r = decompiler.decompile('етIуанэ');
    expect(r.type).toBe('ordinal');
  });

  it('NM-017: ещанэ -> ordinal', () => {
    const r = decompiler.decompile('ещанэ');
    expect(r.type).toBe('ordinal');
  });

  it('NM-018: isOrdinal', () => {
    expect(decompiler.isOrdinal('япэ')).toBe(true);
    expect(decompiler.isOrdinal('зы')).toBe(false);
  });

  // ============================================
  // KESIR SAYILARI (fractional)
  // ============================================

  it('NM-019: щанэ -> fractional', () => {
    const r = decompiler.decompile('щанэ');
    expect(r.type).toBe('fractional');
  });

  it('NM-020: ханэ -> fractional', () => {
    const r = decompiler.decompile('ханэ');
    expect(r.type).toBe('fractional');
  });

  it('NM-021: плIанэ -> fractional', () => {
    const r = decompiler.decompile('плIанэ');
    expect(r.type).toBe('fractional');
  });

  it('NM-022: isFractional', () => {
    expect(decompiler.isFractional('щанэ')).toBe(true);
    expect(decompiler.isFractional('зы')).toBe(false);
  });

  // ============================================
  // ULCESTIRME SAYILARI (distributive)
  // ============================================

  it('NM-023: зырыз -> distributive', () => {
    const r = decompiler.decompile('зырыз');
    expect(r.type).toBe('distributive');
  });

  it('NM-024: тIурытIу -> distributive', () => {
    const r = decompiler.decompile('тIурытIу');
    expect(r.type).toBe('distributive');
  });

  it('NM-025: щырыщ -> distributive', () => {
    const r = decompiler.decompile('щырыщ');
    expect(r.type).toBe('distributive');
  });

  it('NM-026: isDistributive', () => {
    expect(decompiler.isDistributive('зырыз')).toBe(true);
    expect(decompiler.isDistributive('зы')).toBe(false);
  });

  // ============================================
  // KENAR DURUMLAR
  // ============================================

  it('NM-027: bos form -> bare, confidence 0', () => {
    const r = decompiler.decompile('');
    expect(r.type).toBe('bare');
    expect(r.confidence).toBe(0);
  });

  it('NM-028: bilinmeyen form -> bare', () => {
    const r = decompiler.decompile('xyzabc');
    expect(r.type).toBe('bare');
    expect(r.confidence).toBe(0.5);
  });

  // ============================================
  // TOPLU
  // ============================================

  it('NM-029: decompileBatch', () => {
    const results = decompiler.decompileBatch(['зы', 'япэ', 'щанэ', 'зырыз']);
    expect(results.length).toBe(4);
    expect(results[0].type).toBe('cardinal');
    expect(results[1].type).toBe('ordinal');
    expect(results[2].type).toBe('fractional');
    expect(results[3].type).toBe('distributive');
  });

  it('NM-030: getTypes 5 tip doner', () => {
    const types = decompiler.getTypes();
    expect(types.length).toBe(5);
  });
});
