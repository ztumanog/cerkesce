/**
 * SyntaxAnalyzer - Çerkesçe Sentaks ve Cümle Çözümleyici
 * ADR-0049: Complete Pattern Recognition (Ergative, Nominative & Clauses)
 */

import { MorphologyAnalyzer, MorphologyResult } from './MorphologyAnalyzer';

export interface SyntacticToken {
  word: string;
  role: string;
  analysis?: MorphologyResult;
}

export interface SyntacticStructure {
  sentence: string;
  tokens: SyntacticToken[];
  structurePattern: string;
  confidence: number;
}

export class SyntaxAnalyzer {
  private analyzer: MorphologyAnalyzer;

  constructor(analyzer?: any) {
    if (analyzer && typeof analyzer.analyze === 'function') {
      this.analyzer = analyzer;
    } else {
      this.analyzer = new MorphologyAnalyzer();
    }
  }

  analyzeSentence(sentence: string): SyntacticStructure {
    const trimmed = sentence ? sentence.trim() : '';
    if (!trimmed) {
      return {
        sentence: '',
        tokens: [],
        structurePattern: 'EMPTY',
        confidence: 0,
      };
    }

    const words = trimmed.split(/\s+/);
    const rawAnalyses = words.map(w => this.analyzer.analyze(w));

    const hasErgativeInSentence = words.some((word, idx) => {
      const a = rawAnalyses[idx];
      return a.nounCase?.case === 'ergative' || word.endsWith('м');
    });

    const tokens: SyntacticToken[] = words.map((word, idx) => {
      const analysis = rawAnalyses[idx];
      let role = 'other';

      // 1. Yan Cümlecik Koşulları (-мэ, -уэрэ, -щхьэкӀэ)
      if (word.endsWith('мэ')) {
        role = 'conditional_clause';
      } else if (word.endsWith('уэрэ')) {
        role = 'adverbial_clause';
      } else if (word.endsWith('щхьэкӀэ')) {
        role = 'concessive_clause';
      }
      // 2. Ergatif Özne Eki (-м)
      else if (analysis.nounCase?.case === 'ergative' || word.endsWith('м')) {
        role = 'subject_ergative';
      }
      // 3. Yalın Özne / Belirli Nesne Eki (-р)
      else if (analysis.nounCase?.case === 'nominative' || word.endsWith('р')) {
        role = hasErgativeInSentence ? 'direct_object' : 'subject_nominative';
      }
      // 4. Yüklem / Fiil Analizi
      else if (analysis.source === 'verb' || idx === words.length - 1) {
        role = 'predicate_verb';
      }

      return {
        word,
        role,
        analysis,
      };
    });

    const hasErgative = tokens.some(t => t.role === 'subject_ergative');
    const hasNomSubj = tokens.some(t => t.role === 'subject_nominative');
    const hasObject = tokens.some(t => t.role === 'direct_object');
    const hasVerb = tokens.some(t => t.role === 'predicate_verb');
    const hasCond = tokens.some(t => t.role === 'conditional_clause');
    const hasAdv = tokens.some(t => t.role === 'adverbial_clause');

    let structurePattern = 'GENERAL';
    if (hasErgative && hasObject && hasCond && hasVerb) {
      structurePattern = 'ERG_SUBJ + OBJ + COND_CLAUSE + VERB';
    } else if (hasErgative && hasObject && hasVerb) {
      structurePattern = 'ERG_SUBJ + OBJ + VERB';
    } else if (hasErgative && hasVerb) {
      structurePattern = 'ERG_SUBJ + VERB';
    } else if (hasNomSubj && hasAdv && hasVerb) {
      structurePattern = 'NOM_SUBJ + ADV_CLAUSE + VERB';
    } else if (hasCond) {
      structurePattern = 'CONDITIONAL_CLAUSE';
    } else if (hasAdv) {
      structurePattern = 'ADVERBIAL_CLAUSE';
    }

    return {
      sentence: trimmed,
      tokens,
      structurePattern,
      confidence: 0.9,
    };
  }
}