import { describe, it, expect } from 'vitest';
import { NounCaseParser } from '../../../domain/morphology/NounCaseParser';

describe('NounCaseParser — Hal Eki Ayrıştırıcı Testleri', () => {
    const parser = new NounCaseParser();

    it('NC-001: щӀалэхэр -> plural_nominative', () => {
        const r = parser.parse('щӀалэхэр');
        expect(r.case).toBe('plural_nominative');
    });

    it('NC-002: лӀыжьымкӀэ -> definite_instrumental', () => {
        const r = parser.parse('лӀыжьымкӀэ');
        expect(r.case).toBe('definite_instrumental');
    });

    it('NC-003: унэуэ -> adverbial', () => {
        const r = parser.parse('унэуэ');
        expect(r.case).toBe('adverbial');
    });

    it('NC-004: цӀыхухэм -> plural_ergative', () => {
        const r = parser.parse('цӀыхухэм');
        expect(r.case).toBe('plural_ergative');
    });

    it('NC-005: хадэ -> bare', () => {
        const r = parser.parse('хадэ');
        expect(r.case).toBe('bare');
    });

    it('NC-006: уынэр -> nominative', () => {
        const r = parser.parse('уынэр');
        expect(r.case).toBe('nominative');
    });

    it('NC-007: уынэм -> ergative', () => {
        const r = parser.parse('уынэм');
        expect(r.case).toBe('ergative');
    });

    it('NC-008: сэчӀэ -> instrumental', () => {
        const r = parser.parse('сэчӀэ');
        expect(r.case).toBe('instrumental');
    });

    it('NC-009: унэхэмкӀэ -> plural_instrumental', () => {
        const r = parser.parse('унэхэмкӀэ');
        expect(r.case).toBe('plural_instrumental');
    });

    it('NC-010: шакӀуэхэу -> plural_adverbial', () => {
        const r = parser.parse('шакӀуэхэу');
        expect(r.case).toBe('plural_adverbial');
    });

    it('NC-011: унэм -> ergative', () => {
        const r = parser.parse('унэм');
        expect(r.case).toBe('ergative');
    });

    it('NC-012: унэмкӀэ -> definite_instrumental', () => {
        const r = parser.parse('унэмкӀэ');
        expect(r.case).toBe('definite_instrumental');
    });

    it('NC-013: унэхэм -> plural_ergative', () => {
        const r = parser.parse('унэхэм');
        expect(r.case).toBe('plural_ergative');
    });

    it('NC-014: унэ -> bare (belirsiz)', () => {
        const r = parser.parse('унэ');
        expect(r.case).toBe('bare');
    });

    it('NC-015: унэр -> nominative (belirli)', () => {
        const r = parser.parse('унэр');
        expect(r.case).toBe('nominative');
    });

    it('NC-016: псыр -> nominative', () => {
        const r = parser.parse('псыр');
        expect(r.case).toBe('nominative');
    });

    it('NC-017: псым -> ergative', () => {
        const r = parser.parse('псым');
        expect(r.case).toBe('ergative');
    });

    it('NC-018: псыхэр -> plural_nominative', () => {
        const r = parser.parse('псыхэр');
        expect(r.case).toBe('plural_nominative');
    });

    it('NC-019: bos form -> bare, confidence 0', () => {
        const r = parser.parse('');
        expect(r.case).toBe('bare');
        expect(r.confidence).toBe(0);
    });

    it('NC-020: bilinmeyen form -> bare', () => {
        const r = parser.parse('xyzabc');
        expect(r.case).toBe('bare');
    });

    it('NC-021: isPlural', () => {
        const r = parser.parse('щӀалэхэр');
        expect(r.isPlural).toBe(true);
    });

    it('NC-022: isDefinite', () => {
        const r = parser.parse('унэр');
        expect(r.isDefinite).toBe(true);
    });

    it('NC-023: parseBatch', () => {
        const results = parser.parseBatch(['унэр', 'унэм']);
        expect(results.length).toBe(2);
    });
});