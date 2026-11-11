import { describe, it, expect } from 'vitest';
import { MorphologyAnalyzer } from '../../../domain/morphology/MorphologyAnalyzer';

describe('MorphologyAnalyzer - Güncel Mimari Testleri', () => {
    const analyzer = new MorphologyAnalyzer();

    it('isim çözümlemesi yapar', () => {
        const r = analyzer.analyze('план');
        expect(r.source).toBe('noun');
        expect(r.root).toBe('план');
        expect(r.confidence).toBeGreaterThan(0);
    });

    it('türetilmiş isim çözümlemesi yapar', () => {
        const r = analyzer.analyze('цӀыхуныгъэ');
        expect(r.source).toBe('noun');
        expect(r.derivation?.derivationType).toBe('abstract');
    });

    it('bilinmeyen form için varsayılan nesne döner', () => {
        const r = analyzer.analyze('xyzabc');
        expect(r.input).toBe('xyzabc');
        expect(r.confidence).toBeGreaterThan(0);
        expect(Array.isArray(r.morphemes)).toBe(true);
    });

    it('boş girdi için güvenli fallback döner', () => {
        const r = analyzer.analyze('');
        expect(r.source).toBe('unknown');
        expect(r.confidence).toBe(0);
        expect(r.prefixCount).toBe(0);
        expect(r.suffixCount).toBe(0);
    });
});