/**
 * SyntaxAnalyzer - Çerkesçe Sentaks ve Cümle Çözümleyici
 * ADR-0049: Complete Pattern Recognition (Ergative, Nominative, Pronouns & Clauses)
 */

import { MorphologyAnalyzer, MorphologyResult } from './MorphologyAnalyzer';

export interface SyntacticToken {
  word: string;
  role: string;
  roleTr?: string;
  analysis?: MorphologyResult;
}

export interface SyntacticStructure {
  sentence: string;
  tokens: SyntacticToken[];
  structurePattern: string;
  confidence: number;
}

const ERGATIVE_CAPABLE_PRONOUNS = new Set(['сэ', 'уэ', 'дэ', 'фэ']);
const ERGATIVE_3RD_PRONOUNS = new Set(['абы', 'абыхэм', 'мыбы', 'мыбыхэм', 'мобы', 'мобыхэм']);

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
    const rawAnalyses = words.map((w) => this.analyzer.analyze(w));

    const hasExplicitErgative = words.some((word, idx) => {
      const lower = word.toLowerCase();
      const a = rawAnalyses[idx];
      return (
        a.nounCase?.case === 'ergative' ||
        word.endsWith('м') ||
        ERGATIVE_3RD_PRONOUNS.has(lower)
      );
    });

    const hasAbsolutiveObject = words.some((word, idx) => {
      const lower = word.toLowerCase();
      if (ERGATIVE_CAPABLE_PRONOUNS.has(lower)) return false;
      const a = rawAnalyses[idx];
      return a.nounCase?.case === 'nominative' || word.endsWith('р');
    });

    const hasErgativeInSentence =
      hasExplicitErgative ||
      (words.some((w) => ERGATIVE_CAPABLE_PRONOUNS.has(w.toLowerCase())) && hasAbsolutiveObject);

    const tokens: SyntacticToken[] = words.map((word, idx) => {
      const lower = word.toLowerCase();
      const analysis = rawAnalyses[idx];
      let role = 'other';
      let roleTr = 'Diğer Öğe';

      // 1. Yan Cümlecik Koşulları (-мэ, -уэрэ, -щхьэкӀэ)
      if (word.endsWith('мэ')) {
        role = 'conditional_clause';
        roleTr = 'Koşul Yan Cümleciği';
      } else if (word.endsWith('уэрэ')) {
        role = 'adverbial_clause';
        roleTr = 'Zarf Yan Cümleciği';
      } else if (word.endsWith('щхьэкӀэ')) {
        role = 'concessive_clause';
        roleTr = 'Karşıtlık Yan Cümleciği';
      }
      // 2. 1./2. Şahıs Zamirleri (сэ, уэ, дэ, фэ — ek almaz, nesne varsa Ergatif Özne olur)
      else if (ERGATIVE_CAPABLE_PRONOUNS.has(lower)) {
        if (hasAbsolutiveObject) {
          role = 'subject_ergative';
          roleTr = 'Ergatif Özne (Şahıs Zamiri)';
        } else {
          role = 'subject_nominative';
          roleTr = 'Yalın Özne (Şahıs Zamiri)';
        }
      }
      // 3. Ergatif Özne Eki (-м) veya 3. Şahıs Ergatif Zamirler
      else if (
        analysis.nounCase?.case === 'ergative' ||
        word.endsWith('м') ||
        ERGATIVE_3RD_PRONOUNS.has(lower)
      ) {
        role = 'subject_ergative';
        roleTr = 'Ergatif Özne (-м)';
      }
      // 4. Yalın Özne / Belirli Nesne Eki (-р)
      else if (analysis.nounCase?.case === 'nominative' || word.endsWith('р')) {
        if (hasErgativeInSentence) {
          role = 'direct_object';
          roleTr = 'Belirtili Nesne (-р)';
        } else {
          role = 'subject_nominative';
          roleTr = 'Yalın Özne (-р)';
        }
      }
      // 5. Yüklem / Fiil Analizi
      else if (analysis.source === 'verb' || idx === words.length - 1) {
        role = 'predicate_verb';
        roleTr = 'Yüklem (Fiil)';
      }

      return {
        word,
        role,
        roleTr,
        analysis,
      };
    });

    const hasErgative = tokens.some((t) => t.role === 'subject_ergative');
    const hasNomSubj = tokens.some((t) => t.role === 'subject_nominative');
    const hasObject = tokens.some((t) => t.role === 'direct_object');
    const hasVerb = tokens.some((t) => t.role === 'predicate_verb');
    const hasCond = tokens.some((t) => t.role === 'conditional_clause');
    const hasAdv = tokens.some((t) => t.role === 'adverbial_clause');

    let structurePattern = 'GENERAL';
    if (hasErgative && hasObject && hasCond && hasVerb) {
      structurePattern = 'ERG_SUBJ + OBJ + COND_CLAUSE + VERB';
    } else if (hasErgative && hasObject && hasVerb) {
      structurePattern = 'ERG_SUBJ + OBJ + VERB';
    } else if (hasErgative && hasVerb) {
      structurePattern = 'ERG_SUBJ + VERB';
    } else if (hasNomSubj && hasAdv && hasVerb) {
      structurePattern = 'NOM_SUBJ + ADV_CLAUSE + VERB';
    } else if (hasNomSubj && hasVerb) {
      structurePattern = 'NOM_SUBJ + VERB';
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
