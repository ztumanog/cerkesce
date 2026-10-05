import { NounCaseParser } from './NounCaseParser';
import { VerbDecompiler } from './VerbDecompiler';

import fs from 'fs';
import path from 'path';

/**
 * LemmaBuilderV2.ts - Kabardian-Cherkess Lemma Construction & Morphological Analyzer Engine
 * Phase 4 (Morphology Engine) - TypeScript / Node.js Implementation
 *
 * Based on M. A. Kumakhov's Structural Rules (gl1.pdf, gl4.pdf, gl5.pdf)
 * and John Colarusso's Phonemic Analysis.
 */

export type PosType =
  | 'VERB'
  | 'VERB_PARTICIPLE'
  | 'NOUN'
  | 'NOUN/LEMMA'
  | 'ADJECTIVE'
  | 'ADVERB'
  | 'UNKNOWN';

export interface PersonArgument {
  morpheme: string;
  code: string;
  gloss: string;
}

export interface PrefixSlot {
  slot: string;
  morpheme: string;
  gloss: string;
}

export interface SuffixSlot {
  code: string;
  morpheme: string;
  gloss: string;
}

export interface PossessivePrefix {
  code: string;
  morpheme: string;
  gloss: string;
}

export interface CaseInfo {
  case: 'NOMINATIVE' | 'ERGATIVE' | 'INSTRUMENTAL' | 'ADVERBIAL' | 'NOMINATIVE/ERGATIVE';
  definiteness: 'DEFINITE' | 'INDEFINITE' | 'INDEFINITE/BARE';
  isPlural: boolean;
  morpheme: string;
  gloss: string;
}

export interface VerbAnalysis {
  personArguments: PersonArgument[];
  prefixSlots: PrefixSlot[];
  extractedVerbRoot: string;
  suffixSlots: SuffixSlot[];
}

export interface NounAnalysis {
  possessivePrefix: PossessivePrefix | null;
  cleanNominalStem: string;
  caseInfo: CaseInfo;
  epentheticVowelRestored: boolean;
}

export interface MorphemeParseResult {
  inputWord: string;
  primaryPos: 'VERB' | 'NOUN' | 'NOUN/LEMMA';
  verbScore: number;
  nounScore: number;
  verbAnalysis: VerbAnalysis;
  nounAnalysis: NounAnalysis;
}

export interface SubrootMatch {
  root: string;
  meaning: string;
}

export interface RootMatch {
  matchType: 'EXACT_COMPOUND' | 'PRIMARY_ROOT' | 'SOMATIC_DECOMPOSITION';
  matchedItem: string;
  parentRoot?: string;
  category?: string;
  meaningPrimary?: string;
  meaningSecondary?: string;
  meaning?: string;
  morphemes?: string[];
  literalTranslation?: string;
  detectedSubroots?: SubrootMatch[];
}

export interface LemmaBuildResult {
  inputWord: string;
  lemma: string;
  pos: PosType;
  confidenceScore: number;
  rawStem: string;
  rootMatches: RootMatch[];
  morphemeBreakdown: {
    personArguments: PersonArgument[];
    prefixes: (PrefixSlot | PossessivePrefix)[];
    suffixes: (SuffixSlot | CaseInfo)[];
  };
}

export class VerbPrefixDecompiler {
  public static readonly PREFIX_SLOTS: Array<[string, RegExp[], string]> = [
    ['SLOT_7_REFLEXIVE', [/^Ğ·Ñ‹/, /^Ğ·/], 'Reflexive (DÃ¶nÃ¼ÅŸlÃ¼)'],
    ['SLOT_6_DIRECTIONAL', [/^ĞºÑŠÑ‹/, /^ĞºÑŠÑ/, /^Ğ½Ñ‹/, /^Ğ½Ñ/], 'Directional (YÃ¶nsel)'],
    ['SLOT_5_VERSION_POTENTIAL', [/^Ñ…ÑƒÑ/, /^Ñ…Ñƒ/, /^Ñ„IÑ/, /^Ñ„IÑ‹/], 'Version/Potential (SÃ¼rÃ¼m/Yeterlilik)'],
    ['SLOT_4_COMITATIVE', [/^Ğ·Ğ´Ñ‹/, /^Ğ·Ğ´Ñ/, /^Ğ·Ñ/, /^Ğ´Ñ/, /^Ğ´Ñ‹/], 'Comitative/Reciprocal (Birliktelik/KarÅŸÄ±lÄ±klÄ±lÄ±k)'],
    ['SLOT_3_LOCATIVE', [/^ĞºIÑÑ€Ñ‹/, /^Ğ±Ğ³ÑŠÑĞ´Ñ/, /^Ğ±Ğ³ÑŠÑƒÑ€Ñ‹/, /^Ñ‚Ğµ/, /^Ñ‰IÑ/, /^Ñ…Ñ/, /^Ğ´Ñ/, /^Ğ¸/, /^Ğ±Ğ»Ñ/, /^Ğ¿Ñ‹/, /^IÑƒ/, /^Ñ‰Ñ‹/], 'Locative Preverb (Yersel)'],
    ['SLOT_2_CAUSATIVE', [/^Ğ³ÑŠÑ/, /^Ğ³ÑŠĞ°/], 'Causative (Ettirgen)'],
    ['SLOT_1_FACTITIVE', [/^ÑƒÑ/, /^Ñƒ/], 'Factitive (Faktatif)']
  ];

  public static readonly PERSON_PREFIXES: Array<[RegExp, string, string]> = [
    [/^ÑÑ‹|^Ñ/, '1SG', 'Ben'],
    [/^ÑƒÑ|^Ñƒ/, '2SG', 'Sen'],
    [/^Ğ´Ñ‹|^Ğ´/, '1PL', 'Biz'],
    [/^Ñ„Ñ‹|^Ñ„/, '2PL', 'Siz'],
    [/^Ñ|^Ğ°/, '3PL', 'Onlar'],
    [/^Ğ¸|^Ğ¹|^Ñ€/, '3SG', 'O']
  ];

  public static decompile(
    verbStem: string,
    isPossessiveNoun: boolean = false
  ): {
    personArguments: PersonArgument[];
    prefixSlots: PrefixSlot[];
    coreRootCandidate: string;
  } {
    let remaining = verbStem.trim();
    const unpackedPrefixes: PrefixSlot[] = [];
    const personMarkers: PersonArgument[] = [];

    if (isPossessiveNoun) {
      return {
        personArguments: [],
        prefixSlots: [],
        coreRootCandidate: remaining
      };
    }

    for (const [pattern, code, gloss] of this.PERSON_PREFIXES) {
      const match = remaining.match(pattern);
      if (match) {
        const matchedText = match[0];
        if (remaining.length - matchedText.length >= 1) {
          personMarkers.push({ morpheme: matchedText, code, gloss });
          remaining = remaining.slice(matchedText.length);
          break;
        }
      }
    }

    for (const [slotName, patterns, slotGloss] of this.PREFIX_SLOTS) {
      for (const pat of patterns) {
        const match = remaining.match(pat);
        if (match) {
          const matchedText = match[0];
          if (remaining.length - matchedText.length >= 1) {
            unpackedPrefixes.push({ slot: slotName, morpheme: matchedText, gloss: slotGloss });
            remaining = remaining.slice(matchedText.length);
            break;
          }
        }
      }
    }

    return {
      personArguments: personMarkers,
      prefixSlots: unpackedPrefixes,
      coreRootCandidate: remaining
    };
  }
}

export class VerbSuffixDecompiler {
  public static readonly SUFFIX_RULES: Array<[RegExp, string, string, string]> = [
    [/Ñ‰Ñ‚ÑĞ¿$/, 'FUTURE_NEGATION', '-Ñ‰Ñ‚ÑĞ¿', 'Olumsuz Gelecek Zaman (-meyecek)'],
    [/Ñ‚ÑĞ¿$/, 'IMPERFECT_NEGATION', '-Ñ‚ÑĞ¿', 'Olumsuz GeniÅŸ/GeÃ§miÅŸ Zaman (-mezdi)'],
    [/Ñ‰ÑĞ¿$/, 'DECLARATIVE_NEGATION', '-Ñ‰ÑĞ¿', 'Olumsuz Bildirme (-deÄŸildir)'],
    [/ĞºÑŠÑ‹Ğ¼$/, 'FINITE_NEGATION', '-ĞºÑŠÑ‹Ğ¼', 'Olumsuzluk (Finite Negation)'],
    [/Ğ°Ñ‰$/, 'PRETERITE_DECLARATIVE', '-Ğ°Ñ‰', 'Belirli GeÃ§miÅŸ Zaman Bildirme'],
    [/Ñ…Ñ$/, 'PLURAL', '-Ñ…Ñ', 'Ã‡oÄŸul (Plural)'],
    [/Ğ³ÑŠĞ°Ñ‚$/, 'ANTERIOR_PLUPERFECT', '-Ğ³ÑŠĞ°Ñ‚', 'Uzak GeÃ§miÅŸ Anterior'],
    [/Ğ³ÑŠĞ°$/, 'PLUPERFECT', '-Ğ³ÑŠĞ°', 'Uzak GeÃ§miÅŸ'],
    [/Ğ°Ñ‚$/, 'PAST_ANTERIOR', '-Ğ°Ñ‚', 'GeÃ§miÅŸ Zaman Anterior'],
    [/Ğ°$/, 'PRETERITE', '-Ğ°', 'Belirli GeÃ§miÅŸ Zaman'],
    [/Ñ€Ñ‚$/, 'IMPERFECT_DYN', '-Ñ€Ñ‚', 'Åimdiki/GeniÅŸ ZamanÄ±n Hikayesi'],
    [/Ñ‚$/, 'IMPERFECT', '-Ñ‚', 'GeÃ§miÅŸ SÃ¼reklilik'],
    [/Ğ½ÑƒÑ‰$/, 'FACTUAL_FUTURE', '-Ğ½ÑƒÑ‰', 'Kesin Gelecek Zaman'],
    [/Ğ½Ñƒ$/, 'FUTURE_BASE', '-Ğ½Ñƒ', 'Gelecek Zaman TabanÄ±'],
    [/Ğ½Ñ‰$/, 'CATEGORICAL_FUTURE', '-Ğ½Ñ‰', 'Gelecek/GeniÅŸ Zaman'],
    [/Ğ¶ÑŒ$/, 'REPETITIVE', '-Ğ¶ÑŒ', 'Yeniden/Geriye Eylem'],
    [/Ğ¶$/, 'REPETITIVE', '-Ğ¶', 'Tekrar/Geriye Eylem'],
    [/Ñ„$/, 'POTENTIAL_SUFFIX', '-Ñ„', 'Yeterlilik Soneki'],
    [/Ğ¿Ñ$/, 'TOTALITIVE', '-Ğ¿Ñ', 'Tamamen/TÃ¼keterek Yapma'],
    [/Ğ¼Ñ$/, 'CONDITIONAL', '-Ğ¼Ñ', 'Åart/KoÅŸul'],
    [/Ğ¼$/, 'CONDITIONAL_SHORT', '-Ğ¼', 'Åart/KoÅŸul'],
    [/Ñ‰$/, 'INDICATIVE_DECLARATIVE', '-Ñ‰', 'Bildirme/Tasdik Eki']
  ];

  public static decompile(verbStem: string): {
    suffixSlots: SuffixSlot[];
    stemAfterSuffixes: string;
  } {
    let remaining = verbStem.trim();
    const unpackedSuffixes: SuffixSlot[] = [];

    let changed = true;
    while (changed) {
      changed = false;
      for (const [pattern, code, morph, gloss] of this.SUFFIX_RULES) {
        const match = remaining.match(pattern);
        if (match) {
          const matchedText = match[0];
          if (remaining.length - matchedText.length >= 1) {
            unpackedSuffixes.unshift({ code, morpheme: matchedText, gloss });
            remaining = remaining.slice(0, remaining.length - matchedText.length);
            changed = true;
            break;
          }
        }
      }
    }

    return { suffixSlots: unpackedSuffixes, stemAfterSuffixes: remaining };
  }
}

export class NounCaseDecompiler {
  public static readonly CASE_PATTERNS: Array<
    [RegExp, CaseInfo['case'], CaseInfo['definiteness'], boolean, string, string]
  > = [
    [/Ñ…ÑĞ¼ĞºIÑ$/, 'INSTRUMENTAL', 'DEFINITE', true, '-Ñ…ÑĞ¼ĞºIÑ', 'EnstrÃ¼mantal Ã‡oÄŸul Belirli'],
    [/Ñ…ÑĞ¼Ñ$/, 'ERGATIVE', 'DEFINITE', true, '-Ñ…ÑĞ¼Ñ', 'Ergatif Ã‡oÄŸul Diyalektik'],
    [/Ñ…ÑĞ¼$/, 'ERGATIVE', 'DEFINITE', true, '-Ñ…ÑĞ¼', 'Ergatif Ã‡oÄŸul Belirli'],
    [/Ñ…ÑÑ€$/, 'NOMINATIVE', 'DEFINITE', true, '-Ñ…ÑÑ€', 'Nominatif Ã‡oÄŸul Belirli'],
    [/Ñ…ÑÑƒÑ$/, 'ADVERBIAL', 'INDEFINITE', true, '-Ñ…ÑÑƒÑ', 'Adverbiyal Ã‡oÄŸul'],
    [/Ñ…ÑÑƒ$/, 'ADVERBIAL', 'INDEFINITE', true, '-Ñ…ÑÑƒ', 'Adverbiyal Ã‡oÄŸul KÄ±sa'],
    [/Ğ¼ĞºIÑ$/, 'INSTRUMENTAL', 'DEFINITE', false, '-Ğ¼ĞºIÑ', 'EnstrÃ¼mantal Tekil Belirli'],
    [/ĞºIÑ$/, 'INSTRUMENTAL', 'INDEFINITE', false, '-ĞºIÑ', 'EnstrÃ¼mantal Tekil Belirsiz'],
    [/Ñ€Ğ°ÑƒÑ$/, 'ADVERBIAL', 'DEFINITE', false, '-Ñ€Ğ°ÑƒÑ', 'Adverbiyal Vurgulu Belirli'],
    [/ÑƒÑ$/, 'ADVERBIAL', 'INDEFINITE', false, '-ÑƒÑ', 'Adverbiyal Tekil'],
    [/(?<![Ğ³ĞºÑ…I])Ñƒ$/, 'ADVERBIAL', 'INDEFINITE', false, '-Ñƒ', 'Adverbiyal Tekil KÄ±sa'],
    [/Ğ¼$/, 'ERGATIVE', 'DEFINITE', false, '-Ğ¼', 'Ergatif Tekil Belirli'],
    [/Ñ€$/, 'NOMINATIVE', 'DEFINITE', false, '-Ñ€', 'Nominatif Tekil Belirli']
  ];

  public static readonly POSSESSIVE_PREFIXES: Array<[RegExp, string, string]> = [
    [/^ÑÑ‹ÑĞµĞ¹/, 'POSS_IND_1SG', 'Benimki'],
    [/^ÑƒÑƒĞµĞ¹/, 'POSS_IND_2SG', 'Seninki'],
    [/^ÑĞ¸/, 'POSS_1SG', 'Benim'],
    [/^ÑƒĞ¸/, 'POSS_2SG', 'Senin'],
    [/^Ğ´Ğ¸/, 'POSS_1PL', 'Bizim'],
    [/^Ñ„Ğ¸/, 'POSS_2PL', 'Sizin'],
    [/^Ñ/, 'POSS_3PL', 'OnlarÄ±n'],
    [/^Ğ¸/, 'POSS_3SG', 'Onun']
  ];

  public static decompile(nounWord: string): {
    possessivePrefix: PossessivePrefix | null;
    caseInfo: CaseInfo;
    epentheticVowelRestored: boolean;
    cleanNominalStem: string;
  } {
    let stem = nounWord.trim();
    let possessive: PossessivePrefix | null = null;

    for (const [pattern, code, gloss] of this.POSSESSIVE_PREFIXES) {
      const match = stem.match(pattern);
      if (match) {
        const matchedText = match[0];
        if (stem.length - matchedText.length >= 2) {
          possessive = { code, morpheme: matchedText, gloss };
          stem = stem.slice(matchedText.length);
          break;
        }
      }
    }

    let caseInfo: CaseInfo = {
      case: 'NOMINATIVE/ERGATIVE',
      definiteness: 'INDEFINITE/BARE',
      isPlural: false,
      morpheme: '-Ã˜',
      gloss: 'YalÄ±n / Belirsiz GÃ¶vde'
    };

    for (const [pattern, caseName, defStatus, isPlural, morph, gloss] of this.CASE_PATTERNS) {
      if (pattern.test(stem)) {
        caseInfo = { case: caseName, definiteness: defStatus, isPlural, morpheme: morph, gloss };
        stem = stem.replace(pattern, '');
        break;
      }
    }

    let epentheticRestored = false;
    if (
      caseInfo.definiteness === 'DEFINITE' &&
      stem.endsWith('Ñ‹') &&
      stem.length > 2 &&
      !stem.endsWith('ÑƒÑ‹')
    ) {
      stem = stem.slice(0, -1);
      epentheticRestored = true;
    }

    return {
      possessivePrefix: possessive,
      caseInfo,
      epentheticVowelRestored: epentheticRestored,
      cleanNominalStem: stem
    };
  }
}

export class MorphemeParser {
  public parse(word: string): MorphemeParseResult {
    const cleanWord = word.trim();

    const nounRes = NounCaseDecompiler.decompile(cleanWord);

    const suffixRes = VerbSuffixDecompiler.decompile(cleanWord);
    const stemForPrefix = suffixRes.stemAfterSuffixes;
    const isPossessiveNoun = nounRes.possessivePrefix !== null;

    const prefixRes = VerbPrefixDecompiler.decompile(stemForPrefix, isPossessiveNoun);

    let nounScore = 0;
    let verbScore = 0;

    if (nounRes.possessivePrefix !== null) nounScore += 4.0;
    if (nounRes.caseInfo.case !== 'NOMINATIVE/ERGATIVE') {
      if (['INSTRUMENTAL', 'ADVERBIAL'].includes(nounRes.caseInfo.case) || nounRes.caseInfo.isPlural) {
        nounScore += 3.5;
      } else {
        nounScore += 2.5;
      }
    }
    if (nounRes.epentheticVowelRestored) nounScore += 2.0;

    if (suffixRes.suffixSlots.length > 0) {
      const isStrongVerbSuffix = suffixRes.suffixSlots.some((s) =>
        ['FUTURE_NEGATION', 'IMPERFECT_NEGATION', 'DECLARATIVE_NEGATION', 'PRETERITE_DECLARATIVE', 'FINITE_NEGATION', 'PRETERITE', 'CATEGORICAL_FUTURE', 'FACTUAL_FUTURE'].includes(s.code)
      );
      if (isStrongVerbSuffix) {
        verbScore += 5.0;
      } else if (suffixRes.suffixSlots.length === 1 && suffixRes.suffixSlots[0].code === 'CONDITIONAL_SHORT') {
        verbScore += (prefixRes.prefixSlots.length > 0 || prefixRes.personArguments.length > 0) ? 3.0 : 1.0;
      } else {
        verbScore += 2.5;
      }
    }

    if (prefixRes.prefixSlots.length > 0) verbScore += prefixRes.prefixSlots.length * 1.5;
    if (prefixRes.personArguments.length > 0) verbScore += 2.0;

    let primaryPos: 'VERB' | 'NOUN' | 'NOUN/LEMMA' = 'NOUN/LEMMA';

    if (nounScore > verbScore) {
      primaryPos = 'NOUN';
      if (suffixRes.suffixSlots.length === 1 && ['CONDITIONAL_SHORT', 'INDICATIVE_DECLARATIVE'].includes(suffixRes.suffixSlots[0].code)) {
        suffixRes.suffixSlots = [];
      }
    } else if (verbScore > nounScore) {
      primaryPos = 'VERB';
    }

    return {
      inputWord: cleanWord,
      primaryPos,
      verbScore,
      nounScore,
      verbAnalysis: {
        personArguments: primaryPos === 'VERB' ? prefixRes.personArguments : [],
        prefixSlots: primaryPos === 'VERB' ? prefixRes.prefixSlots : [],
        extractedVerbRoot: primaryPos === 'VERB' ? prefixRes.coreRootCandidate : cleanWord,
        suffixSlots: primaryPos === 'VERB' ? suffixRes.suffixSlots : []
      },
      nounAnalysis: {
        possessivePrefix: nounRes.possessivePrefix,
        cleanNominalStem: nounRes.cleanNominalStem,
        caseInfo: nounRes.caseInfo,
        epentheticVowelRestored: nounRes.epentheticVowelRestored
      }
    };
  }
}

export class LemmaBuilderV2 {
  public static readonly KNOWN_CORE_ROOTS: Record<string, string> = {
    'гу': 'kalp / zihin / merkez',
    'нэ': 'göz / algı / çehre',
    'Iэ': 'el / eylem',
    'лъэ': 'ayak / zemin / adım',
    'щхьэ': 'kafa / zirve / gerekçe',
    'псэ': 'ruh / can / yaşam',
    'псы': 'su / berraklık',
    'бзэ': 'dil / konuşma',
    'пэ': 'burun / uç / ön',
    'дзэ': 'diş / ordu / kenar',
    'быдэ': 'sağlam / dirençli',
    'фIы': 'iyi / güzel',
    'бзыгъэ': 'keskin / bilge',
    'усыгъуэ': 'düzenleme / kurgu',
    'мафIэ': 'ateş',
    'щIы': 'toprak / yer',
  };

  private parser: MorphemeParser;
  private knownRoots: Map<string, { form: string; meaning?: string; partOfSpeech?: string }>;
  private nounCaseParser: NounCaseParser;
  private verbDecompiler: VerbDecompiler;

  constructor() {
    this.parser = new MorphemeParser();
    this.nounCaseParser = new NounCaseParser();
    this.verbDecompiler = new VerbDecompiler();

    // lexemes.json'dan bilinen kokleri yukle
    this.knownRoots = new Map();
    try {
      const lexemesPath = path.resolve('./public/data/linguistic/lexemes.json');
      if (fs.existsSync(lexemesPath)) {
        const raw = fs.readFileSync(lexemesPath, 'utf-8');
        const lexemes = JSON.parse(raw);
        for (const l of lexemes) {
          if (l.form) {
            this.knownRoots.set(l.form, {
              form: l.form,
              meaning: l.literalMeaning,
              partOfSpeech: l.partOfSpeech,
            });
          }
        }
      }
    } catch (e) {
      console.error('Error loading known roots:', e);
    }
        }
      }
    } catch (e) {
      console.error('Error loading known roots:', e);
    }
    this.loadRootsDatabase();
  }

  private determinePOS(word: string): 'NOUN' | 'VERB' | 'NOUN/LEMMA' {
    const nounCase = this.nounCaseParser.parse(word);
    const verbResult = this.verbDecompiler.decompile(word);

    if (nounCase.case !== 'bare') return 'NOUN';
    if (verbResult.prefixCount > 0) return 'VERB';
    if (word.endsWith('Ğ½') && word.length > 3) return 'VERB';
    if (/[Ñ‹ÑĞ°]Ğ½$/.test(word)) return 'VERB';
    return 'NOUN/LEMMA';
  }

  private constructVerbLemma(verbRoot: string, prefixes: PrefixSlot[]): string {
    const stem = verbRoot.trim();
    if (!stem) return '';

    const lexicalPrefixes: string[] = [];
    for (const p of prefixes) {
      if (['SLOT_3_LOCATIVE', 'SLOT_2_CAUSATIVE', 'SLOT_1_FACTITIVE'].includes(p.slot)) {
        lexicalPrefixes.push(p.morpheme);
      }
    }

    const prefixStr = lexicalPrefixes.join('');
    const fullStem = prefixStr + stem;

    // Eger zaten -Ğ½ ile bitiyorsa, oldugu gibi birak
    if (fullStem.endsWith('Ğ½')) return fullStem;
    if (fullStem.endsWith('Ñ‹')) return fullStem.slice(0, -1) + 'Ñ‹Ğ½';
    if (fullStem.endsWith('Ğ°') || fullStem.endsWith('Ñ')) return fullStem + 'Ğ½';
    return fullStem + 'ÑĞ½';
  }

    private rootsDb: Array<any> = [];
  private compoundsDb: Map<string, any> = new Map();

  private loadRootsDatabase(): void {
    const dbPath = path.resolve('./public/data/linguistic/kabardian_roots_database.json');
    if (!fs.existsSync(dbPath)) return;

    try {
      const data = JSON.parse(fs.readFileSync(dbPath, 'utf-8'));
      for (const cat of data.root_categories ?? []) {
        for (const item of cat.primary_roots ?? []) {
          this.rootsDb.push({
            root: item.root,
            meaningPrimary: item.meaning_primary,
            meaningSecondary: item.meaning_secondary,
            category: cat.category_name,
          });
          for (const cmp of item.compounds ?? []) {
            if (cmp.word) {
              this.compoundsDb.set(cmp.word, {
                word: cmp.word,
                parentRoot: item.root,
                meaning: cmp.meaning,
                morphemes: cmp.morphemes,
                literalTranslation: cmp.literal_translation,
              });
            }
          }
        }
        for (const cmp of cat.compounds ?? []) {
          if (cmp.word) {
            this.compoundsDb.set(cmp.word, {
              word: cmp.word,
              parentRoot: cat.category_name,
              meaning: cmp.meaning,
              morphemes: cmp.morphemes,
              literalTranslation: cmp.literal_translation,
            });
          }
        }
      }
    } catch (e) {
      console.error('Error loading roots DB:', e);
    }
  }

  private matchRoots(stem: string): RootMatch[] {
    const cleanStem = stem.trim().toLowerCase();
    const matches: RootMatch[] = [];

    // 1. Tam bileÅŸik eÅŸleÅŸme
    if (this.compoundsDb.has(cleanStem)) {
      const cmp = this.compoundsDb.get(cleanStem);
      matches.push({
        matchType: 'EXACT_COMPOUND',
        matchedItem: cmp.word,
        parentRoot: cmp.parentRoot,
        meaning: cmp.meaning,
        morphemes: cmp.morphemes,
        literalTranslation: cmp.literalTranslation,
      });
    }

    // 2. Birincil kÃ¶k eÅŸleÅŸmesi
    for (const r of this.rootsDb) {
      if (r.root.toLowerCase() === cleanStem) {
        matches.push({
          matchType: 'PRIMARY_ROOT',
          matchedItem: r.root,
          category: r.category,
          meaningPrimary: r.meaningPrimary,
          meaningSecondary: r.meaningSecondary,
        });
      }
    }

    // 3. Somatik alt kÃ¶k analizi
    const subroots = this.decomposeSubroots(cleanStem);
    if (subroots.length > 0 && !matches.some(m => m.matchType === 'PRIMARY_ROOT')) {
      matches.push({
        matchType: 'SOMATIC_DECOMPOSITION',
        matchedItem: cleanStem,
        detectedSubroots: subroots,
      });
    }

    return matches;
  }

  private decomposeSubroots(stem: string): SubrootMatch[] {
    const foundSubroots: SubrootMatch[] = [];
    const clean = stem.trim();

    for (const [rootSym, meaning] of Object.entries(LemmaBuilderV2.KNOWN_CORE_ROOTS)) {
      // Sadece kelime kok ile BASLIYORSA veya TAM OLARAK kok ise
      if (clean === rootSym || clean.startsWith(rootSym)) {
        foundSubroots.push({ root: rootSym, meaning });
      }
    }
    return foundSubroots;
  }

  public buildLemma(word: string): LemmaBuildResult {
    const parseRes = this.parser.parse(word);

    // 1. ONCE: lexemes.json'da tam eslesme var mi?
    const knownRoot = this.knownRoots.get(word);
    if (knownRoot) {
      return {
        inputWord: word,
        lemma: word,
        pos: knownRoot.partOfSpeech === 'verb' ? 'VERB' : 'NOUN',
        confidenceScore: 1.0,
        rawStem: word,
        rootMatches: [],
        morphemeBreakdown: { personArguments: [], prefixes: [], suffixes: [] },
      };
    }

    const vAnalysis = parseRes.verbAnalysis;
    const nAnalysis = parseRes.nounAnalysis;

    const ourPos = this.determinePOS(word);
    let pos: PosType = ourPos === 'NOUN' ? 'NOUN' : ourPos === 'VERB' ? 'VERB' : 'NOUN/LEMMA';
    let confidence = 0.9;
    let rawStem = nAnalysis.cleanNominalStem;
    let lemma = rawStem;

    if (ourPos === 'VERB') {
      pos = 'VERB';
      confidence = 0.95;
      rawStem = vAnalysis.extractedVerbRoot;
      lemma = this.constructVerbLemma(rawStem, vAnalysis.prefixSlots);
    } else if (ourPos === 'NOUN') {
      pos = 'NOUN';
      confidence = 0.95;
      rawStem = nAnalysis.cleanNominalStem;
      lemma = rawStem;
    }

    const rootMatches = this.matchRoots(lemma);

    const prefixes: (PrefixSlot | PossessivePrefix)[] = [
      ...vAnalysis.prefixSlots,
      ...(nAnalysis.possessivePrefix ? [nAnalysis.possessivePrefix] : [])
    ];

    const suffixes: (SuffixSlot | CaseInfo)[] = [
      ...vAnalysis.suffixSlots,
      ...(nAnalysis.caseInfo.case !== 'NOMINATIVE/ERGATIVE' ? [nAnalysis.caseInfo] : [])
    ];

    return {
      inputWord: word,
      lemma,
      pos,
      confidenceScore: Math.round(confidence * 100) / 100,
      rawStem,
      rootMatches,
      morphemeBreakdown: {
        personArguments: vAnalysis.personArguments,
        prefixes,
        suffixes
      }
    };
  }
}










