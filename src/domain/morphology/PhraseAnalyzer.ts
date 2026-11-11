/**
 * PhraseAnalyzer - Cümle ve Öbek Çözümleme Katmanı
 * ADR-0044: Defensive Initialization & Syntax Integration
 */

import { MorphologyAnalyzer, MorphologyResult } from './MorphologyAnalyzer';
import { SyntaxAnalyzer, SyntacticStructure } from './SyntaxAnalyzer';

export class PhraseAnalyzer {
  private analyzer: MorphologyAnalyzer;
  private syntaxAnalyzer: SyntaxAnalyzer;

  constructor(analyzer?: MorphologyAnalyzer, syntaxAnalyzer?: SyntaxAnalyzer) {
    this.analyzer = (analyzer && typeof analyzer.analyze === 'function')
      ? analyzer
      : new MorphologyAnalyzer();

    this.syntaxAnalyzer = (syntaxAnalyzer && typeof syntaxAnalyzer.analyzeSentence === 'function')
      ? syntaxAnalyzer
      : new SyntaxAnalyzer();
  }

  analyzePhrase(phrase: string): SyntacticStructure {
    const trimmed = phrase ? phrase.trim() : '';
    if (!trimmed) {
      return {
        sentence: '',
        tokens: [],
        structurePattern: 'EMPTY',
        confidence: 0,
      };
    }

    // Kelime düzeyindeki morfolojik analizleri yap
    const words = trimmed.split(/\s+/);
    const wordAnalyses: MorphologyResult[] = words.map(w => this.analyzer.analyze(w));

    // Sentaks motorundan cümle yapısını ve rollerini al
    const syntaxResult = this.syntaxAnalyzer.analyzeSentence(trimmed);

    // Morfolojik analiz detaylarını sentaks düğümlerine (token) bağla
    syntaxResult.tokens = syntaxResult.tokens.map((token, index) => ({
      ...token,
      analysis: wordAnalyses[index] || token.analysis,
    }));

    return syntaxResult;
  }
}