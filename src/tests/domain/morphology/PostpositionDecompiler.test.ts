import { describe, it, expect } from 'vitest';
import { PostpositionDecompiler } from '@/domain/morphology/PostpositionDecompiler';

describe('P4-015: PostpositionDecompiler', () => {
  const decompiler = new PostpositionDecompiler();

  // ============================================
  // TEMEL EDATLAR
  // ============================================

  it('PO-001: дэжь -> yaninda', () => {
    const r = decompiler.decompile('дэжь');
    expect(r.isPostposition).toBe(true);
    expect(r.meaning).toBe('yaninda');
  });

  it('PO-002: деж -> yanina', () => {
    const r = decompiler.decompile('деж');
    expect(r.isPostposition).toBe(true);
    expect(r.meaning).toBe('yanina');
  });

  it('PO-003: пайэ -> icin', () => {
    const r = decompiler.decompile('пайэ');
    expect(r.isPostposition).toBe(true);
    expect(r.meaning).toBe('icin');
  });

  it('PO-004: пIшIондэ -> -e kadar', () => {
    const r = decompiler.decompile('пIшIондэ');
    expect(r.isPostposition).toBe(true);
    expect(r.meaning).toBe('-e kadar');
  });

  it('PO-005: лъандэрэ -> -den beri', () => {
    const r = decompiler.decompile('лъандэрэ');
    expect(r.isPostposition).toBe(true);
    expect(r.meaning).toBe('-den beri');
  });

  it('PO-006: щхьэкIэ -> hakkinda', () => {
    const r = decompiler.decompile('щхьэкIэ');
    expect(r.isPostposition).toBe(true);
    expect(r.meaning).toBe('hakkinda');
  });

  it('PO-007: пэмычI -> disinda', () => {
    const r = decompiler.decompile('пэмычI');
    expect(r.isPostposition).toBe(true);
    expect(r.meaning).toBe('disinda');
  });

  it('PO-008: нэмычI -> disinda', () => {
    const r = decompiler.decompile('нэмычI');
    expect(r.isPostposition).toBe(true);
  });

  it('PO-009: пачIэ -> icin (varyant)', () => {
    const r = decompiler.decompile('пачIэ');
    expect(r.isPostposition).toBe(true);
  });

  it('PO-010: гъунэгъу -> yakin', () => {
    const r = decompiler.decompile('гъунэгъу');
    expect(r.isPostposition).toBe(true);
  });

  // ============================================
  // YARDIMCI METODLAR
  // ============================================

  it('PO-011: isPostposition true', () => {
    expect(decompiler.isPostposition('дэжь')).toBe(true);
  });

  it('PO-012: isPostposition false', () => {
    expect(decompiler.isPostposition('унэ')).toBe(false);
    expect(decompiler.isPostposition('сэ')).toBe(false);
  });

  it('PO-013: getMeaning', () => {
    expect(decompiler.getMeaning('дэжь')).toBe('yaninda');
    expect(decompiler.getMeaning('пайэ')).toBe('icin');
    expect(decompiler.getMeaning('xyzabc')).toBe('');
  });

  // ============================================
  // KENAR DURUMLAR
  // ============================================

  it('PO-014: bos form -> false, confidence 0', () => {
    const r = decompiler.decompile('');
    expect(r.isPostposition).toBe(false);
    expect(r.confidence).toBe(0);
  });

  it('PO-015: bilinmeyen form -> false', () => {
    const r = decompiler.decompile('xyzabc');
    expect(r.isPostposition).toBe(false);
    expect(r.confidence).toBe(0.5);
  });

  it('PO-016: normal isim -> false', () => {
    const r = decompiler.decompile('унэ');
    expect(r.isPostposition).toBe(false);
  });

  it('PO-017: zamir -> false', () => {
    const r = decompiler.decompile('сэ');
    expect(r.isPostposition).toBe(false);
  });

  // ============================================
  // TOPLU
  // ============================================

  it('PO-018: decompileBatch', () => {
    const results = decompiler.decompileBatch(['дэжь', 'пайэ', 'унэ']);
    expect(results.length).toBe(3);
    expect(results[0].isPostposition).toBe(true);
    expect(results[1].isPostposition).toBe(true);
    expect(results[2].isPostposition).toBe(false);
  });

  it('PO-019: getPostpositions 10 edat doner', () => {
    const postps = decompiler.getPostpositions();
    expect(postps.length).toBe(10);
  });

  it('PO-020: edat listesi dogru', () => {
    const postps = decompiler.getPostpositions();
    expect(postps).toContain('дэжь');
    expect(postps).toContain('пайэ');
    expect(postps).toContain('пIшIондэ');
    expect(postps).toContain('лъандэрэ');
  });

  it('PO-021: confidence 0-1 arasi', () => {
    const r = decompiler.decompile('дэжь');
    expect(r.confidence).toBeGreaterThanOrEqual(0);
    expect(r.confidence).toBeLessThanOrEqual(1);
  });

  it('PO-022: meaning doner', () => {
    expect(decompiler.decompile('дэжь').meaning).toBe('yaninda');
    expect(decompiler.decompile('пайэ').meaning).toBe('icin');
  });

  it('PO-023: tum edatlar true doner', () => {
    const postps = decompiler.getPostpositions();
    postps.forEach(p => {
      expect(decompiler.isPostposition(p)).toBe(true);
    });
  });

  it('PO-024: isPostposition false - sayilar', () => {
    expect(decompiler.isPostposition('зы')).toBe(false);
    expect(decompiler.isPostposition('тIу')).toBe(false);
  });
});
