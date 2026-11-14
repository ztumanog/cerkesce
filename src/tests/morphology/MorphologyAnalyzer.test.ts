import { describe, it, expect } from 'vitest';
import { MorphologyAnalyzer } from '@/domain/morphology/MorphologyAnalyzer';

describe('MorphologyAnalyzer Çekirdek & Sözlük Entegrasyon Testleri', () => {
  const analyzer = new MorphologyAnalyzer();

  it('İsim çekimini ayrıştırıp sözlükteki lemma ve Türkçe anlamı getirmelidir', () => {
    const res = analyzer.analyze('унэшхуэм');
    expect(res.source).toBe('noun');
    expect(res.root).toBe('унэ');
    expect(res.dictionaryEntry).not.toBeNull();
    expect(res.dictionaryEntry?.meaningTr).toBe('Ev');
    expect(res.confidence).toBeGreaterThanOrEqual(0.95);
  });

  it('Fiil ön-ek ve soneklerini ayrıştırıp sözlük kaydını eşleştirmelidir', () => {
    const res = analyzer.analyze('гъэщӀащ');
    expect(res.source).toBe('verb');
    expect(res.root).toBe('щӀа');
    expect(res.verbPrefixes?.prefixes[0].type).toBe('causative');
    expect(res.dictionaryEntry).not.toBeNull();
    expect(res.dictionaryEntry?.lemma).toBe('щӀын');
  });

  it('тепӀэн (üzerine örtmek/sermek) fiilini те- + [пӀ] + -э + -н olarak ayrıştırır', () => {
    const res = analyzer.analyze('тепӏэн');
    expect(res.source).toBe('verb');
    expect(res.root).toBe('пӀ');
    expect(res.prefixCount).toBe(1);
    expect(res.suffixCount).toBe(2);
    expect(res.morphemes?.map((m) => m.morpheme)).toEqual(['те', 'пӀ', 'э', 'н']);
    expect(res.morphemes?.map((m) => m.type)).toEqual(['locative', 'root', 'thematic', 'infinitive']);
  });

  it('къы-, хуэ-, фэ- ve çoklu preverb fiil zincirlerini regresyonsuz ayrıştırır', () => {
    const qyRes = analyzer.analyze('къыкӀуащ');
    expect(qyRes.source).toBe('verb');
    expect(qyRes.verbPrefixes?.prefixes.map((p) => p.morpheme)).toEqual(['къы']);

    const xueRes = analyzer.analyze('хуэтхын');
    expect(xueRes.source).toBe('verb');
    expect(xueRes.verbPrefixes?.prefixes.map((p) => p.morpheme)).toEqual(['хуэ']);

    const feRes = analyzer.analyze('фэщӀын');
    expect(feRes.source).toBe('verb');
    expect(feRes.verbPrefixes?.prefixes.map((p) => p.morpheme)).toEqual(['фэ']);

    const multiPreverb = analyzer.analyze('къытепӀэн');
    expect(multiPreverb.source).toBe('verb');
    expect(multiPreverb.verbPrefixes?.prefixes.map((p) => p.morpheme)).toEqual(['къы', 'те']);
    expect(multiPreverb.prefixCount).toBe(2);
    expect(multiPreverb.suffixCount).toBe(2);
  });

  it('çok ekli polisentetik fiil zincirlerini (къысхуигъэщӀащ, къытхуагъэтхащ, иригъэщӀэнущ) katmanlı ayrıştırır', () => {
    const r1 = analyzer.analyze('къысхуигъэщӀащ');
    expect(r1.source).toBe('verb');
    expect(r1.morphemes?.map((m) => m.morpheme)).toEqual(['къы', 'с', 'хуи', 'гъэ', 'щӀ', 'ащ']);
    expect(r1.prefixCount).toBe(4);
    expect(r1.suffixCount).toBe(1);

    const r2 = analyzer.analyze('къытхуагъэтхащ');
    expect(r2.source).toBe('verb');
    expect(r2.morphemes?.map((m) => m.morpheme)).toEqual(['къы', 'т', 'хуа', 'гъэ', 'тх', 'ащ']);
    expect(r2.prefixCount).toBe(4);
    expect(r2.suffixCount).toBe(1);

    const r3 = analyzer.analyze('иригъэщӀэнущ');
    expect(r3.source).toBe('verb');
    expect(r3.morphemes?.map((m) => m.morpheme)).toEqual(['и', 'ри', 'гъэ', 'щӀэ', 'нущ']);
    expect(r3.prefixCount).toBe(3);
    expect(r3.suffixCount).toBe(1);
  });

  it('-бзэ (dil) birleşik isim ailesini (адыгэбзэ, адыгэбзэмкӀэ, урысыбзэ, адыгэбзэу) iki köklü ayrıştırır', () => {
    const r1 = analyzer.analyze('адыгэбзэ');
    expect(r1.source).toBe('compound');
    expect(r1.morphemes?.map((m) => m.morpheme)).toEqual(['адыг', 'э', 'бз', 'э']);

    const r2 = analyzer.analyze('адыгэбзэмкӀэ');
    expect(r2.source).toBe('compound');
    expect(r2.morphemes?.map((m) => m.morpheme)).toEqual(['адыг', 'э', 'бз', 'э', 'мкӀэ']);

    const r3 = analyzer.analyze('урысыбзэ');
    expect(r3.source).toBe('compound');
    expect(r3.morphemes?.map((m) => m.morpheme)).toEqual(['урыс', 'ы', 'бз', 'э']);

    const r4 = analyzer.analyze('адыгэбзэу');
    expect(r4.source).toBe('compound');
    expect(r4.morphemes?.map((m) => m.morpheme)).toEqual(['адыг', 'э', 'бз', 'э', 'у']);
  });
});
