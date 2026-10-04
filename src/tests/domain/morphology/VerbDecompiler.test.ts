import { describe, it, expect } from 'vitest';
import { VerbDecompiler } from '@/domain/morphology/VerbDecompiler';

describe('P4-012: VerbDecompiler', () => {
  const decompiler = new VerbDecompiler();

  it('VB-001: zy-ky-khu-zdy-khe-ghe-kIyn -> prefix var', () => {
    const r = decompiler.decompile('зыкъыхуздыхэгъэкIын');
    expect(r.prefixCount).toBeGreaterThanOrEqual(3);
    expect(r.prefixes.length).toBeGreaterThan(0);
  });

  it('VB-002: ky-khue-ghe-t -> 2+ prefix', () => {
    const r = decompiler.decompile('къыхуэгъэт');
    expect(r.prefixCount).toBeGreaterThanOrEqual(2);
    expect(r.root).toBeDefined();
  });

  it('VB-003: ghe-kIuen -> causative var', () => {
    const r = decompiler.decompile('гъэкIуэн');
    expect(r.prefixCount).toBeGreaterThanOrEqual(1);
    expect(decompiler.hasSlot('гъэкIуэн', 'causative')).toBe(true);
  });

it('VB-004: uy-shIen -> prefix var, factitive yok', () => {
    const r = decompiler.decompile('уышIэн');
    expect(r.prefixCount).toBeGreaterThanOrEqual(1);
    expect(decompiler.hasSlot('уышIэн', 'factitive')).toBe(false);
});

  it('VB-005: Reflexive (zy-)', () => {
    expect(decompiler.hasSlot('зыкъы', 'reflexive')).toBe(true);
  });

  it('VB-006: Directional (ky-)', () => {
    expect(decompiler.hasSlot('къыху', 'directional')).toBe(true);
  });

  it('VB-007: Version (khu-)', () => {
    expect(decompiler.hasSlot('хузды', 'version')).toBe(true);
  });

  it('VB-008: Comitative (de-)', () => {
    expect(decompiler.hasSlot('дэхэ', 'comitative')).toBe(true);
  });

  it('VB-009: Locative (khe-)', () => {
    expect(decompiler.hasSlot('хэгъэ', 'locative')).toBe(true);
  });

  it('VB-010: Causative (ghe-)', () => {
    expect(decompiler.hasSlot('гъэкIуэн', 'causative')).toBe(true);
  });

 it('VB-011: Factitive (uy-) yok', () => {
    expect(decompiler.hasSlot('уышIэн', 'factitive')).toBe(false);
});

  it('VB-012: getPrefixCount', () => {
    expect(decompiler.getPrefixCount('гъэкIуэн')).toBe(1);
    expect(decompiler.getPrefixCount('къыхуэгъэт')).toBeGreaterThanOrEqual(2);
  });

it('VB-013: prefixCount 1 (у- prefix)', () => {
    const r = decompiler.decompile('унэ');
    expect(r.prefixCount).toBe(1);
});

  it('VB-014: bos form -> fallback, confidence 0', () => {
    const r = decompiler.decompile('');
    expect(r.method).toBe('fallback');
    expect(r.confidence).toBe(0);
  });

  it('VB-015: bilinmeyen form -> fallback', () => {
    const r = decompiler.decompile('xyzabc');
    expect(r.method).toBe('fallback');
    expect(r.confidence).toBe(0.5);
  });

  it('VB-016: root doner', () => {
    const r = decompiler.decompile('гъэкIуэн');
    expect(r.root).toBeDefined();
    expect(r.root.length).toBeGreaterThan(0);
  });

it('VB-017: root = нэ (у- prefix sonrasi)', () => {
    const r = decompiler.decompile('унэ');
    expect(r.root).toBe('нэ');
});

 it('VB-018: getSlots 8 slot doner', () => {
    const slots = decompiler.getSlots();
    expect(slots.length).toBe(8);
});

  it('VB-019: slot listesi dogru', () => {
    const slots = decompiler.getSlots();
    expect(slots).toContain('reflexive');
    expect(slots).toContain('directional');
    expect(slots).toContain('version');
    expect(slots).toContain('comitative');
    expect(slots).toContain('locative');
    expect(slots).toContain('causative');
    expect(slots).toContain('factitive');
  });

it('VB-020: decompileBatch', () => {
    const results = decompiler.decompileBatch(['гъэкIуэн', 'къыхуэгъэт', 'унэ']);
    expect(results.length).toBe(3);
    expect(results[0].prefixCount).toBeGreaterThanOrEqual(1);
    expect(results[2].prefixCount).toBe(1);
});

  it('VB-021: prefix sirasi dogru', () => {
    const r = decompiler.decompile('зыкъы');
    if (r.prefixes.length >= 2) {
      expect(r.prefixes[0].position).toBeLessThan(r.prefixes[1].position);
    }
  });

  it('VB-022: hasSlot false', () => {
    expect(decompiler.hasSlot('унэ', 'causative')).toBe(false);
  });

  it('VB-023: prefix formlari doner', () => {
    const r = decompiler.decompile('гъэкIуэн');
    expect(r.prefixes[0].form).toBeDefined();
    expect(r.prefixes[0].slot).toBeDefined();
  });

  it('VB-024: confidence 0-1 arasi', () => {
    const r = decompiler.decompile('гъэкIуэн');
    expect(r.confidence).toBeGreaterThanOrEqual(0);
    expect(r.confidence).toBeLessThanOrEqual(1);
  });
});
