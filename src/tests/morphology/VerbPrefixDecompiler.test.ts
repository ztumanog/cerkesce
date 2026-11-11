import { describe, it, expect } from 'vitest';
import { VerbPrefixDecompiler } from '@/domain/morphology/VerbPrefixDecompiler';

describe('VerbPrefixDecompiler Fiil Önek Çözümleyici', () => {
  const decompiler = new VerbPrefixDecompiler();

  it('Ettirgenlik önekini (гъэ-) doğru ayrıştırmalıdır', () => {
    const res = decompiler.parse('гъэщӀэн');
    expect(res.prefixes).toHaveLength(1);
    expect(res.prefixes[0].type).toBe('causative');
    expect(res.prefixes[0].morpheme).toBe('гъэ');
    expect(res.stem).toBe('щӀэн');
  });

  it('Dönüşlülük (зы-) ve ettirgenlik (гъэ-) öneklerini katmanlı sökebilmelidir', () => {
    const res = decompiler.parse('зыгъэщӀэн');
    expect(res.prefixes).toHaveLength(2);
    expect(res.prefixes[0].type).toBe('reflexive');
    expect(res.prefixes[1].type).toBe('causative');
    expect(res.stem).toBe('щӀэн');
  });

  it('Şahıs ve yer/yön öneklerini doğru tanımalıdır', () => {
    const res = decompiler.parse('сыдегъэщӀэн');
    expect(res.prefixes.map(p => p.type)).toEqual(['person', 'locative', 'causative']);
    expect(res.stem).toBe('щӀэн');
  });
});