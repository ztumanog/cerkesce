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
describe('MORPH-04A Adverb Gate', () => {
    const analyzer = new MorphologyAnalyzer();

    it('пIалъэ → ADVERB olmalı, NOUN değil', () => {
        const r = analyzer.analyze('пIалъэ');
        expect(r.source).toBe('adverb');
        expect(r.source).toBe('adverb');
    });

    it('sözlükteki NOUN, adverb listesinde yoksa NOUN kalmalı', () => {
        const r = analyzer.analyze('гуфӀэ');
        expect(r.source).toBe('noun');
    });
});



describe('MORPH-04B Participle Root', () => {
    const analyzer = new MorphologyAnalyzer();

    it('кIуэр → kök кIуэ olmalı, кIуэр değil', () => {
        const r = analyzer.analyze('кIуэр');
        expect(r.root).toBe('кӀуэ');
        // bos analyzer'da source noun olur, API'de verb - sadece kok test ediliyor
    });
});


