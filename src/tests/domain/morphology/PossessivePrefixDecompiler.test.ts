import { describe, it, expect } from 'vitest';
import { PossessivePrefixDecompiler } from '@/domain/morphology/PossessivePrefixDecompiler';

describe('P4-006: PossessivePrefixDecompiler', () => {
  const decompiler = new PossessivePrefixDecompiler();

  // ============================================
  // BOS SORGU
  // ============================================

  it('PP-001: Bos form fallback', () => {
    const r = decompiler.decompile('');
    expect(r.prefix).toBeNull();
    expect(r.method).toBe('fallback');
  });

  // ============================================
  // BOSLUKLA AYRILMIS FORMLAR
  // ============================================

  it('PP-002: си унэ -> 1sg', () => {
    const r = decompiler.decompile('си унэ');
    expect(r.prefix).toBe('си');
    expect(r.person).toBe('1sg');
    expect(r.stem).toBe('унэ');
    expect(r.meaningTr).toBe('benim');
    expect(r.method).toBe('exact');
  });

  it('PP-003: уи унэ -> 2sg', () => {
    const r = decompiler.decompile('уи унэ');
    expect(r.prefix).toBe('уи');
    expect(r.person).toBe('2sg');
    expect(r.stem).toBe('унэ');
  });

  it('PP-004: и унэ -> 3sg', () => {
    const r = decompiler.decompile('и унэ');
    expect(r.prefix).toBe('и');
    expect(r.person).toBe('3sg');
    expect(r.stem).toBe('унэ');
  });

  it('PP-005: ди унэ -> 1pl', () => {
    const r = decompiler.decompile('ди унэ');
    expect(r.prefix).toBe('ди');
    expect(r.person).toBe('1pl');
  });

  it('PP-006: фи унэ -> 2pl', () => {
    const r = decompiler.decompile('фи унэ');
    expect(r.prefix).toBe('фи');
    expect(r.person).toBe('2pl');
  });

  it('PP-007: я унэ -> 3pl', () => {
    const r = decompiler.decompile('я унэ');
    expect(r.prefix).toBe('я');
    expect(r.person).toBe('3pl');
  });

  // ============================================
  // BITISIK FORMLAR
  // ============================================

  it('PP-008: сиунэ -> 1sg (bitisik)', () => {
    const r = decompiler.decompile('сиунэ');
    expect(r.prefix).toBe('си');
    expect(r.person).toBe('1sg');
    expect(r.stem).toBe('унэ');
    expect(r.method).toBe('prefix');
  });

  it('PP-009: уиунэ -> 2sg (bitisik)', () => {
    const r = decompiler.decompile('уиунэ');
    expect(r.prefix).toBe('уи');
    expect(r.person).toBe('2sg');
    expect(r.stem).toBe('унэ');
  });

  it('PP-010: диунэ -> 1pl (bitisik)', () => {
    const r = decompiler.decompile('диунэ');
    expect(r.prefix).toBe('ди');
    expect(r.person).toBe('1pl');
  });

  // ============================================
  // BARE FORMLAR (INHERENT_DEFINITE_BARE)
  // ============================================

  it('PP-011: унэ -> bare form', () => {
    const r = decompiler.decompile('унэ');
    expect(r.prefix).toBeNull();
    expect(r.method).toBe('bare');
    expect(r.stem).toBe('унэ');
  });

  it('PP-012: isBare kontrolu', () => {
    expect(decompiler.isBare('унэ')).toBe(true);
    expect(decompiler.isBare('си унэ')).toBe(false);
  });

  // ============================================
  // YARDIMCI METODLAR
  // ============================================

  it('PP-013: hasPossessivePrefix', () => {
    expect(decompiler.hasPossessivePrefix('си унэ')).toBe(true);
    expect(decompiler.hasPossessivePrefix('унэ')).toBe(false);
  });

  it('PP-014: getPrefixes 6 onek doner', () => {
    const prefixes = decompiler.getPrefixes();
    expect(prefixes.length).toBe(6);
  });

  it('PP-015: Toplu cozumleme', () => {
    const results = decompiler.decompileBatch(['си унэ', 'уи унэ', 'унэ']);
    expect(results.length).toBe(3);
    expect(results[0].person).toBe('1sg');
    expect(results[1].person).toBe('2sg');
    expect(results[2].method).toBe('bare');
  });
});
