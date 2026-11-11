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
});