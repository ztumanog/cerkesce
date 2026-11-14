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
});
