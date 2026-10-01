import { describe, it, expect } from 'vitest';
import { NominalDerivationDecompiler } from '@/domain/morphology/NominalDerivationDecompiler';

describe('P4-009: NominalDerivationDecompiler', () => {
  const decompiler = new NominalDerivationDecompiler();

  // ABSTRACT (-гъэ)
  it('ND-001: лIыгъэ -> abstract', () => {
    const r = decompiler.decompile('лIыгъэ');
    expect(r.type).toBe('abstract');
    expect(r.stem).toBe('лIы');
    expect(r.suffix).toBe('гъэ');
  });

  it('ND-002: дахэгъэ -> abstract', () => {
    const r = decompiler.decompile('дахэгъэ');
    expect(r.type).toBe('abstract');
    expect(r.stem).toBe('дахэ');
  });

  it('ND-003: цIыхугъэ -> abstract', () => {
    const r = decompiler.decompile('цIыхугъэ');
    expect(r.type).toBe('abstract');
  });

  it('ND-004: isAbstract', () => {
    expect(decompiler.isAbstract('лIыгъэ')).toBe(true);
    expect(decompiler.isAbstract('лIы')).toBe(false);
  });

  // TIME (-гъуэ)
  it('ND-005: кIуэгъуэ -> time', () => {
    const r = decompiler.decompile('кIуэгъуэ');
    expect(r.type).toBe('time');
    expect(r.stem).toBe('кIуэ');
    expect(r.suffix).toBe('гъуэ');
  });

  it('ND-006: isTime', () => {
    expect(decompiler.isTime('кIуэгъуэ')).toBe(true);
    expect(decompiler.isTime('лIы')).toBe(false);
  });

  // AGENT (-кIуэ)
  it('ND-007: тхакIуэ -> agent', () => {
    const r = decompiler.decompile('тхакIуэ');
    expect(r.type).toBe('agent');
    expect(r.stem).toBe('тха');
    expect(r.suffix).toBe('кIуэ');
  });

  it('ND-008: еджакIуэ -> agent', () => {
    const r = decompiler.decompile('еджакIуэ');
    expect(r.type).toBe('agent');
  });

  it('ND-009: isAgent', () => {
    expect(decompiler.isAgent('тхакIуэ')).toBe(true);
    expect(decompiler.isAgent('кIуэгъуэ')).toBe(false);
  });

  // COMPANION (-гъу)
  it('ND-010: ныбжьэгъу -> companion', () => {
    const r = decompiler.decompile('ныбжьэгъу');
    expect(r.type).toBe('companion');
    expect(r.stem).toBe('ныбжьэ');
  });

  it('ND-011: гъунэгъу -> companion', () => {
    const r = decompiler.decompile('гъунэгъу');
    expect(r.type).toBe('companion');
  });

  it('ND-012: isCompanion', () => {
    expect(decompiler.isCompanion('ныбжьэгъу')).toBe(true);
    expect(decompiler.isCompanion('унэ')).toBe(false);
  });

  // PLACE (-пIэ)
  it('ND-013: тIысыпIэ -> place', () => {
    const r = decompiler.decompile('тIысыпIэ');
    expect(r.type).toBe('place');
    expect(r.stem).toBe('тIысы');
  });

  it('ND-014: шхыпIэ -> place', () => {
    const r = decompiler.decompile('шхыпIэ');
    expect(r.type).toBe('place');
  });

  // QUALITY (-щ)
  it('ND-015: лъэщ -> quality', () => {
    const r = decompiler.decompile('лъэщ');
    expect(r.type).toBe('quality');
  });

  it('ND-016: пlащ -> quality', () => {
    const r = decompiler.decompile('пlащ');
    expect(r.type).toBe('quality');
  });

  // BARE
  it('ND-017: унэ -> bare', () => {
    const r = decompiler.decompile('унэ');
    expect(r.type).toBe('bare');
    expect(r.suffix).toBe('');
  });

  it('ND-018: псы -> bare', () => {
    const r = decompiler.decompile('псы');
    expect(r.type).toBe('bare');
  });

  // KENAR DURUMLAR
  it('ND-019: bos form -> bare, confidence 0', () => {
    const r = decompiler.decompile('');
    expect(r.type).toBe('bare');
    expect(r.confidence).toBe(0);
  });

  it('ND-020: bilinmeyen form -> bare', () => {
    const r = decompiler.decompile('xyzabc');
    expect(r.type).toBe('bare');
    expect(r.confidence).toBe(0.5);
  });

  // SIRA CAKISMA
  it('ND-021: -гъуэ once, -гъу sonra', () => {
    const r = decompiler.decompile('кIуэгъуэ');
    expect(r.type).toBe('time');
    expect(r.suffix).toBe('гъуэ');
  });

  it('ND-022: -гъэ abstract', () => {
    const r = decompiler.decompile('лIыгъэ');
    expect(r.type).toBe('abstract');
    expect(r.suffix).toBe('гъэ');
  });

  // TOPLU
  it('ND-023: decompileBatch', () => {
    const results = decompiler.decompileBatch(['лIыгъэ', 'ныбжьэгъу', 'унэ']);
    expect(results.length).toBe(3);
    expect(results[0].type).toBe('abstract');
    expect(results[1].type).toBe('companion');
    expect(results[2].type).toBe('bare');
  });

  it('ND-024: getTypes 7 tip doner', () => {
    const types = decompiler.getTypes();
    expect(types.length).toBe(7);
  });
});
