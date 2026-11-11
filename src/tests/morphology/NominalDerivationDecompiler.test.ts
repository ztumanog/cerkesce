import { describe, it, expect } from 'vitest';
import { NominalDerivationDecompiler } from '@/domain/morphology/NominalDerivationDecompiler';

describe('NominalDerivationDecompiler', () => {
  const decompiler = new NominalDerivationDecompiler();

  it('soyut isim ekini (-ныгъэ) gövdeden doğru ayırmalıdır', () => {
    const res = decompiler.parse('цӀыхуныгъэ');
    expect(res.derivationType).toBe('abstract');
    expect(res.stem).toBe('цӀыху');
    expect(res.suffix).toBe('ныгъэ');
  });

  it('büyüklük ekini (-шхуэ) ve küçültme ekini (-цӀыкӀу) tespit etmelidir', () => {
    const big = decompiler.parse('унэшхуэ');
    expect(big.derivationType).toBe('magnificative');
    expect(big.stem).toBe('унэ');

    const small = decompiler.parse('щӀалэцӀыкӀу');
    expect(small.derivationType).toBe('diminutive');
    expect(small.stem).toBe('щӀалэ');
  });
});