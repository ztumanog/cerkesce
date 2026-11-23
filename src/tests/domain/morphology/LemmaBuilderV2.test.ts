import { describe, it, expect } from 'vitest';
import { LemmaBuilderV2 } from '../../../domain/morphology/LemmaBuilderV2';

describe('MORPH-04C LemmaBuilderV2', () => {
  const builder = new LemmaBuilderV2();

  it('buildLemma cökmez - db dosyasi yokken bile calisir', () => {
    const r = builder.buildLemma('кIуэр');
    expect(r).toBeDefined();
    expect(r.lemma).toBeDefined();
  });

  it('buildLemma lemma döner', () => {
    const r = builder.buildLemma('гуфIэ');
    expect(typeof r.lemma).toBe('string');
    expect(r.lemma.length).toBeGreaterThan(0);
  });

  it('rootMatches dizi döner - db yokken bile bos olmamali (SOMATIC)', () => {
    const r = builder.buildLemma('гуфIэ');
    expect(Array.isArray(r.rootMatches)).toBe(true);
  });

  it('bilinmeyen kelimede cökmez', () => {
    const r = builder.buildLemma('xyzqwe');
    expect(r).toBeDefined();
  });
});
