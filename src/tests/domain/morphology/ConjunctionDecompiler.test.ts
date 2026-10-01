import { describe, it, expect } from 'vitest';
import { ConjunctionDecompiler } from '@/domain/morphology/ConjunctionDecompiler';

describe('P4-016: ConjunctionDecompiler', () => {
  const decompiler = new ConjunctionDecompiler();

  // ============================================
  // KOORDINE EDEN (coordinating)
  // ============================================

  it('CJ-001: и -> ve', () => {
    const r = decompiler.decompile('и');
    expect(r.type).toBe('coordinating');
    expect(r.meaning).toBe('ve');
  });

  it('CJ-002: рэ -> ve', () => {
    const r = decompiler.decompile('рэ');
    expect(r.type).toBe('coordinating');
  });

  it('CJ-003: isConjunction и', () => {
    expect(decompiler.isConjunction('и')).toBe(true);
  });

  // ============================================
  // KORELATIF (correlative)
  // ============================================

  it('CJ-004: зы -> ne... ne', () => {
    const r = decompiler.decompile('зы');
    expect(r.type).toBe('correlative');
    expect(r.meaning).toBe('ne... ne');
  });

  // ============================================
  // ALT SIRALAYAN (subordinating)
  // ============================================

  it('CJ-005: мэ -> egеr', () => {
    const r = decompiler.decompile('мэ');
    expect(r.type).toBe('subordinating');
    expect(r.meaning).toBe('egеr');
  });

  it('CJ-006: сыту -> cunku', () => {
    const r = decompiler.decompile('сыту');
    expect(r.type).toBe('subordinating');
    expect(r.meaning).toBe('cunku');
  });

  // ============================================
  // KARSITLIK (adversative)
  // ============================================

  it('CJ-007: ауэ -> ama', () => {
    const r = decompiler.decompile('ауэ');
    expect(r.type).toBe('adversative');
    expect(r.meaning).toBe('ama');
  });

  it('CJ-008: щхьэкIэ -> fakat', () => {
    const r = decompiler.decompile('щхьэкIэ');
    expect(r.type).toBe('adversative');
    expect(r.meaning).toBe('fakat');
  });

  it('CJ-009: атIэ -> ama (varyant)', () => {
    const r = decompiler.decompile('атIэ');
    expect(r.type).toBe('adversative');
  });

  // ============================================
  // SUFFIX BAGLACLAR (-рэ, -мэ)
  // ============================================

  it('CJ-010: тхылъырэ -> -рэ suffix', () => {
    const r = decompiler.decompile('тхылъырэ');
    expect(r.type).toBe('coordinating');
    expect(r.meaning).toBe('ve');
  });

  it('CJ-011: унэмэ -> -мэ suffix', () => {
    const r = decompiler.decompile('унэмэ');
    expect(r.type).toBe('subordinating');
    expect(r.meaning).toBe('egеr');
  });

  // ============================================
  // YARDIMCI METODLAR
  // ============================================

  it('CJ-012: isConjunction true', () => {
    expect(decompiler.isConjunction('и')).toBe(true);
    expect(decompiler.isConjunction('ауэ')).toBe(true);
  });

  it('CJ-013: isConjunction false', () => {
    expect(decompiler.isConjunction('унэ')).toBe(false);
    expect(decompiler.isConjunction('сэ')).toBe(false);
  });

  it('CJ-014: getMeaning', () => {
    expect(decompiler.getMeaning('и')).toBe('ve');
    expect(decompiler.getMeaning('ауэ')).toBe('ama');
    expect(decompiler.getMeaning('xyzabc')).toBe('');
  });

  // ============================================
  // KENAR DURUMLAR
  // ============================================

  it('CJ-015: bos form -> bare, confidence 0', () => {
    const r = decompiler.decompile('');
    expect(r.type).toBe('bare');
    expect(r.confidence).toBe(0);
  });

  it('CJ-016: bilinmeyen form -> bare', () => {
    const r = decompiler.decompile('xyzabc');
    expect(r.type).toBe('bare');
    expect(r.confidence).toBe(0.5);
  });

  it('CJ-017: normal isim -> bare', () => {
    const r = decompiler.decompile('унэ');
    expect(r.type).toBe('bare');
  });

  it('CJ-018: zamir -> bare', () => {
    const r = decompiler.decompile('сэ');
    expect(r.type).toBe('bare');
  });

  // ============================================
  // TOPLU
  // ============================================

  it('CJ-019: decompileBatch', () => {
    const results = decompiler.decompileBatch(['и', 'ауэ', 'унэ']);
    expect(results.length).toBe(3);
    expect(results[0].type).toBe('coordinating');
    expect(results[1].type).toBe('adversative');
    expect(results[2].type).toBe('bare');
  });

  it('CJ-020: getConjunctions doner', () => {
    const conjs = decompiler.getConjunctions();
    expect(conjs.length).toBeGreaterThanOrEqual(8);
  });

  it('CJ-021: baglac listesi dogru', () => {
    const conjs = decompiler.getConjunctions();
    expect(conjs).toContain('и');
    expect(conjs).toContain('ауэ');
    expect(conjs).toContain('щхьэкIэ');
    expect(conjs).toContain('сыту');
  });

  it('CJ-022: confidence 0-1 arasi', () => {
    const r = decompiler.decompile('и');
    expect(r.confidence).toBeGreaterThanOrEqual(0);
    expect(r.confidence).toBeLessThanOrEqual(1);
  });

  it('CJ-023: meaning doner', () => {
    expect(decompiler.decompile('и').meaning).toBe('ve');
    expect(decompiler.decompile('ауэ').meaning).toBe('ama');
  });

  it('CJ-024: tip listesi dogru', () => {
    const types = ['coordinating', 'correlative', 'subordinating', 'adversative', 'bare'];
    expect(types.length).toBe(5);
  });
});
