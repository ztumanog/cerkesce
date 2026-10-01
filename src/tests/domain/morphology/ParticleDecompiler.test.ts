import { describe, it, expect } from 'vitest';
import { ParticleDecompiler } from '@/domain/morphology/ParticleDecompiler';

describe('P4-017: ParticleDecompiler', () => {
  const decompiler = new ParticleDecompiler();

  // ============================================
  // OLUMSUZ (negative)
  // ============================================

  it('PA-001: хъэуэ -> negative (hayir)', () => {
    const r = decompiler.decompile('хъэуэ');
    expect(r.type).toBe('negative');
    expect(r.meaning).toBe('hayir');
  });

  it('PA-002: хьау -> negative (varyant)', () => {
    const r = decompiler.decompile('хьау');
    expect(r.type).toBe('negative');
  });

  it('PA-003: isNegative', () => {
    expect(decompiler.isNegative('хъэуэ')).toBe(true);
    expect(decompiler.isNegative('ары')).toBe(false);
  });

  // ============================================
  // OLUMLU (affirmative)
  // ============================================

  it('PA-004: ары -> affirmative (evet)', () => {
    const r = decompiler.decompile('ары');
    expect(r.type).toBe('affirmative');
    expect(r.meaning).toBe('evet');
  });

  it('PA-005: хьуи -> affirmative (tamam)', () => {
    const r = decompiler.decompile('хьуи');
    expect(r.type).toBe('affirmative');
    expect(r.meaning).toBe('tamam');
  });

  it('PA-006: хьуишъ -> affirmative', () => {
    const r = decompiler.decompile('хьуишъ');
    expect(r.type).toBe('affirmative');
  });

  it('PA-007: isAffirmative', () => {
    expect(decompiler.isAffirmative('ары')).toBe(true);
    expect(decompiler.isAffirmative('хъэуэ')).toBe(false);
  });

  // ============================================
  // ISARET (demonstrative)
  // ============================================

  it('PA-008: мис -> demonstrative (iste)', () => {
    const r = decompiler.decompile('мис');
    expect(r.type).toBe('demonstrative');
    expect(r.meaning).toBe('iste');
  });

  it('PA-009: мес -> demonstrative (uzak)', () => {
    const r = decompiler.decompile('мес');
    expect(r.type).toBe('demonstrative');
  });

  // ============================================
  // TESVIK (imperative)
  // ============================================

  it('PA-010: йэуэ -> imperative (hadi)', () => {
    const r = decompiler.decompile('йэуэ');
    expect(r.type).toBe('imperative');
    expect(r.meaning).toBe('hadi');
  });

  it('PA-011: адэ -> imperative', () => {
    const r = decompiler.decompile('адэ');
    expect(r.type).toBe('imperative');
  });

  // ============================================
  // PEKISTIRME (intensive)
  // ============================================

  it('PA-012: дэд -> intensive (cok)', () => {
    const r = decompiler.decompile('дэд');
    expect(r.type).toBe('intensive');
    expect(r.meaning).toBe('cok');
  });

  it('PA-013: нытIэ -> intensive', () => {
    const r = decompiler.decompile('нытIэ');
    expect(r.type).toBe('intensive');
  });

  // ============================================
  // YARDIMCI METODLAR
  // ============================================

  it('PA-014: isParticle true', () => {
    expect(decompiler.isParticle('ары')).toBe(true);
    expect(decompiler.isParticle('мис')).toBe(true);
  });

  it('PA-015: isParticle false', () => {
    expect(decompiler.isParticle('унэ')).toBe(false);
    expect(decompiler.isParticle('сэ')).toBe(false);
  });

  it('PA-016: getMeaning', () => {
    expect(decompiler.getMeaning('ары')).toBe('evet');
    expect(decompiler.getMeaning('мис')).toBe('iste');
    expect(decompiler.getMeaning('xyzabc')).toBe('');
  });

  // ============================================
  // KENAR DURUMLAR
  // ============================================

  it('PA-017: bos form -> bare, confidence 0', () => {
    const r = decompiler.decompile('');
    expect(r.type).toBe('bare');
    expect(r.confidence).toBe(0);
  });

  it('PA-018: bilinmeyen form -> bare', () => {
    const r = decompiler.decompile('xyzabc');
    expect(r.type).toBe('bare');
    expect(r.confidence).toBe(0.5);
  });

  it('PA-019: normal isim -> bare', () => {
    const r = decompiler.decompile('унэ');
    expect(r.type).toBe('bare');
  });

  it('PA-020: zamir -> bare', () => {
    const r = decompiler.decompile('сэ');
    expect(r.type).toBe('bare');
  });

  // ============================================
  // TOPLU
  // ============================================

  it('PA-021: decompileBatch', () => {
    const results = decompiler.decompileBatch(['ары', 'хъэуэ', 'унэ']);
    expect(results.length).toBe(3);
    expect(results[0].type).toBe('affirmative');
    expect(results[1].type).toBe('negative');
    expect(results[2].type).toBe('bare');
  });

  it('PA-022: getParticles doner', () => {
    const particles = decompiler.getParticles();
    expect(particles.length).toBeGreaterThanOrEqual(15);
  });

  it('PA-023: parcacik listesi dogru', () => {
    const particles = decompiler.getParticles();
    expect(particles).toContain('ары');
    expect(particles).toContain('хъэуэ');
    expect(particles).toContain('мис');
    expect(particles).toContain('дэд');
  });

  it('PA-024: confidence 0-1 arasi', () => {
    const r = decompiler.decompile('ары');
    expect(r.confidence).toBeGreaterThanOrEqual(0);
    expect(r.confidence).toBeLessThanOrEqual(1);
  });
});
