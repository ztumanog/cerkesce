import { describe, it, expect } from 'vitest';
import { NominalDerivationDecompiler } from '../../../domain/morphology/NominalDerivationDecompiler';

describe('NominalDerivationDecompiler — Güncel Mimari Testleri', () => {
    const decompiler = new NominalDerivationDecompiler();

    it('soyut isim ekini (-ныгъэ) doğru ayrıştırır', () => {
        const result = decompiler.parse('цӀыхуныгъэ');
        expect(result.derivationType).toBe('abstract');
        expect(result.suffix).toBe('ныгъэ');
        expect(result.stem).toBe('цӀыху');
    });

    it('büyüklük ekini (-шхуэ / -ышхуэ) doğru ayrıştırır', () => {
        const result = decompiler.parse('унэшхуэ');
        expect(result.derivationType).toBe('magnificative');
        expect(result.suffix).toBe('шхуэ');
        expect(result.stem).toBe('унэ');
    });

    it('küçültme ekini (-цӀыкӀу) doğru ayrıştırır', () => {
        const result = decompiler.parse('унэцӀыкӀу');
        expect(result.derivationType).toBe('diminutive');
        expect(result.suffix).toBe('цӀыкӀу');
    });

    it('isimleştirme ekini (-гъэ) doğru ayrıştırır', () => {
        const result = decompiler.parse('дахэгъэ');
        expect(result.derivationType).toBe('nominalizer');
        expect(result.suffix).toBe('гъэ');
    });

    it('ikincil / yenilik ekini (-щӀэ) doğru ayrıştırır', () => {
        const result = decompiler.parse('гущӀэ');
        expect(result.derivationType).toBe('repetition');
        expect(result.suffix).toBe('щӀэ');
    });

    it('ek bulunmayan yalın kök için bare döner', () => {
        const result = decompiler.parse('унэ');
        expect(result.derivationType).toBe('bare');
        expect(result.suffix).toBeNull();
        expect(result.stem).toBe('унэ');
    });

    it('boş girdi için güvenli varsayılan değer döner', () => {
        const result = decompiler.parse('');
        expect(result.derivationType).toBe('bare');
        expect(result.confidence).toBe(0);
    });
});
