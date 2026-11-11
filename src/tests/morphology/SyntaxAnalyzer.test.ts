import { describe, it, expect } from 'vitest';
import { MorphologyAnalyzer } from '@/domain/morphology/MorphologyAnalyzer';
import { SyntaxAnalyzer } from '@/domain/morphology/SyntaxAnalyzer';

describe('SyntaxAnalyzer Ergative & Complex Syntax Roles', () => {
  const morphologyAnalyzer = new MorphologyAnalyzer();
  const syntaxAnalyzer = new SyntaxAnalyzer(morphologyAnalyzer);

  it('Ergatif özne içeren cümlede -р ekli ismi Belirli Nesne (OBJ) olarak sınıflandırmalıdır', () => {
    const result = syntaxAnalyzer.analyzeSentence('щӀалэм унэшхуэр ищӀащ');

    expect(result.structurePattern).toBe('ERG_SUBJ + OBJ + VERB');
    expect(result.tokens).toHaveLength(3);

    expect(result.tokens[0].role).toBe('subject_ergative');
    expect(result.tokens[0].analysis.root).toBe('щӀалэ');

    expect(result.tokens[1].role).toBe('direct_object');
    expect(result.tokens[1].analysis.root).toBe('унэ');

    expect(result.tokens[2].role).toBe('predicate_verb');
    expect(result.tokens[2].analysis.root).toBe('щӀа');
  });

  it('Şart yan cümleciği (-мэ) ve zarf-fiil öbeğini (-уэрэ) doğru tespit etmelidir', () => {
    const resultCond = syntaxAnalyzer.analyzeSentence('щӀалэм унэшхуэр ищӀамэ кӀуэнущ');
    expect(resultCond.structurePattern).toBe('ERG_SUBJ + OBJ + COND_CLAUSE + VERB');
    expect(resultCond.tokens[2].role).toBe('conditional_clause');

    const resultAdv = syntaxAnalyzer.analyzeSentence('щӀалэр кӀуэуэрэ кӀуащ');
    expect(resultAdv.structurePattern).toBe('NOM_SUBJ + ADV_CLAUSE + VERB');
    expect(resultAdv.tokens[1].role).toBe('adverbial_clause');
  });
});