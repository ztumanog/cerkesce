import { describe, it, expect } from 'vitest';
import { PhraseAnalyzer } from '@/domain/morphology/PhraseAnalyzer';

describe('PhraseAnalyzer Cümle ve Öbek Çözümleme Testleri', () => {
  const analyzer = new PhraseAnalyzer();

  it('Ergatif özne, nesne ve yüklem içeren 3 sözcüklü cümleyi doğru ayrıştırmalıdır', () => {
    const result = analyzer.analyzePhrase('щӀалэм унэшхуэр ищӀащ');

    expect(result.tokens).toHaveLength(3);
    expect(result.structurePattern).toBe('ERG_SUBJ + OBJ + VERB');
    
    // 1. Düğüm: Ergatif Özne
    expect(result.tokens[0].word).toBe('щӀалэм');
    expect(result.tokens[0].role).toBe('subject_ergative');

    // 2. Düğüm: Nesne
    expect(result.tokens[1].word).toBe('унэшхуэр');
    expect(result.tokens[1].role).toBe('direct_object');

    // 3. Düğüm: Yüklem
    expect(result.tokens[2].word).toBe('ищӀащ');
    expect(result.tokens[2].role).toBe('predicate_verb');
  });

  it('Yan cümlecik eki (-мэ) içeren şart öbeklerini doğru etiketlemelidir', () => {
    const result = analyzer.analyzePhrase('ар кӀуэмэ');
    
    expect(result.tokens).toHaveLength(2);
    expect(result.tokens[1].role).toBe('conditional_clause');
  });
});