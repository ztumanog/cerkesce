import { describe, it, expect } from 'vitest';
import { MorphemeParser } from '../../../domain/morphology/MorphemeParser';
import { Morpheme } from '../../../domain/linguistic/Morpheme';

describe('MorphemeParser — Güncel Uyum Testleri', () => {
    const mockMorphemes: Morpheme[] = [
        { id: 'M-F1E', form: 'фӀэ', ipa: '', gloss: 'faktitif', type: 'bound', dialect: 'both' },
        { id: 'M-GHE', form: 'гъэ', ipa: '', gloss: 'kausatif', type: 'bound', dialect: 'both' },
        { id: 'M-BZHYGE', form: 'бзыгъэ', ipa: '', gloss: 'isim', type: 'free', dialect: 'both' },
        { id: 'M-SHXUE', form: 'шхуэ', ipa: '', gloss: 'buyuk', type: 'free', dialect: 'both' },
    ];
    const parser = new MorphemeParser(mockMorphemes);

    it('gufl e -> morfem ayrıştırması yapar', () => {
        const r = parser.parse('гуфӀэ');
        expect(r).toBeDefined();
        expect(r.morphemes).toBeDefined();
    });

    it('toplu ayrıştırma (parseBatch) çalışır', () => {
        const rs = parser.parseBatch(['гуфӀэ', 'губзыгъэ']);
        expect(rs.length).toBe(2);
    });

    it('bilinmeyen formlarda güvenli çıktı üretir', () => {
        const r = parser.parse('xyzabc');
        expect(r.confidence).toBeLessThanOrEqual(1);
    });
});
