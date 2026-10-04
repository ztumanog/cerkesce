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
    ['SLOT_7_REFLEXIVE', [/^зы/, /^з/], 'Reflexive (Dönüşlü)'],
    ['SLOT_6_DIRECTIONAL', [/^къы/, /^къэ/, /^ны/, /^нэ/], 'Directional (Yönsel)'],
    ['SLOT_5_VERSION_POTENTIAL', [/^хуэ/, /^ху/, /^фIэ/, /^фIы/], 'Version/Potential (Sürüm/Yeterlilik)'],
    ['SLOT_4_COMITATIVE', [/^зды/, /^здэ/, /^зэ/, /^дэ/, /^ды/], 'Comitative/Reciprocal (Birliktelik/Karşılıklılık)'],
    ['SLOT_3_LOCATIVE', [/^кIэры/, /^бгъэдэ/, /^бгъуры/, /^те/, /^щIэ/, /^хэ/, /^дэ/, /^и/, /^блэ/, /^пы/, /^Iу/, /^щы/], 'Locative Preverb (Yersel)'],
    ['SLOT_2_CAUSATIVE', [/^гъэ/, /^гъа/], 'Causative (Ettirgen)'],
    ['SLOT_1_FACTITIVE', [/^уэ/, /^у/], 'Factitive (Faktatif)']
  ];

  public static readonly PERSON_PREFIXES: Array<[RegExp, string, string]> = [
    [/^сы|^с/, '1SG', 'Ben'],
    [/^уэ|^у/, '2SG', 'Sen'],
    [/^ды|^д/, '1PL', 'Biz'],
    [/^фы|^ф/, '2PL', 'Siz'],
    [/^я|^а/, '3PL', 'Onlar'],
    [/^и|^й|^р/, '3SG', 'O']
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
    [/щтэп$/, 'FUTURE_NEGATION', '-щтэп', 'Olumsuz Gelecek Zaman (-meyecek)'],
    [/тэп$/, 'IMPERFECT_NEGATION', '-тэп', 'Olumsuz Geniş/Geçmiş Zaman (-mezdi)'],
    [/щэп$/, 'DECLARATIVE_NEGATION', '-щэп', 'Olumsuz Bildirme (-değildir)'],
    [/къым$/, 'FINITE_NEGATION', '-къым', 'Olumsuzluk (Finite Negation)'],
    [/ащ$/, 'PRETERITE_DECLARATIVE', '-ащ', 'Belirli Geçmiş Zaman Bildirme'],
    [/хэ$/, 'PLURAL', '-хэ', 'Çoğul (Plural)'],
    [/гъат$/, 'ANTERIOR_PLUPERFECT', '-гъат', 'Uzak Geçmiş Anterior'],
    [/гъа$/, 'PLUPERFECT', '-гъа', 'Uzak Geçmiş'],
    [/ат$/, 'PAST_ANTERIOR', '-ат', 'Geçmiş Zaman Anterior'],
    [/а$/, 'PRETERITE', '-а', 'Belirli Geçmiş Zaman'],
    [/рт$/, 'IMPERFECT_DYN', '-рт', 'Şimdiki/Geniş Zamanın Hikayesi'],
    [/т$/, 'IMPERFECT', '-т', 'Geçmiş Süreklilik'],
    [/нущ$/, 'FACTUAL_FUTURE', '-нущ', 'Kesin Gelecek Zaman'],
    [/ну$/, 'FUTURE_BASE', '-ну', 'Gelecek Zaman Tabanı'],
    [/нщ$/, 'CATEGORICAL_FUTURE', '-нщ', 'Gelecek/Geniş Zaman'],
    [/н$/, 'INFINITIVE_FUTURE', '-н', 'Mastar/Gelecek'],
    [/жь$/, 'REPETITIVE', '-жь', 'Yeniden/Geriye Eylem'],
    [/ж$/, 'REPETITIVE', '-ж', 'Tekrar/Geriye Eylem'],
    [/ф$/, 'POTENTIAL_SUFFIX', '-ф', 'Yeterlilik Soneki'],
    [/пэ$/, 'TOTALITIVE', '-пэ', 'Tamamen/Tüketerek Yapma'],
    [/мэ$/, 'CONDITIONAL', '-мэ', 'Şart/Koşul'],
    [/м$/, 'CONDITIONAL_SHORT', '-м', 'Şart/Koşul'],
    [/щ$/, 'INDICATIVE_DECLARATIVE', '-щ', 'Bildirme/Tasdik Eki']
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
    [/хэмкIэ$/, 'INSTRUMENTAL', 'DEFINITE', true, '-хэмкIэ', 'Enstrümantal Çoğul Belirli'],
    [/хэмэ$/, 'ERGATIVE', 'DEFINITE', true, '-хэмэ', 'Ergatif Çoğul Diyalektik'],
    [/хэм$/, 'ERGATIVE', 'DEFINITE', true, '-хэм', 'Ergatif Çoğul Belirli'],
    [/хэр$/, 'NOMINATIVE', 'DEFINITE', true, '-хэр', 'Nominatif Çoğul Belirli'],
    [/хэуэ$/, 'ADVERBIAL', 'INDEFINITE', true, '-хэуэ', 'Adverbiyal Çoğul'],
    [/хэу$/, 'ADVERBIAL', 'INDEFINITE', true, '-хэу', 'Adverbiyal Çoğul Kısa'],
    [/мкIэ$/, 'INSTRUMENTAL', 'DEFINITE', false, '-мкIэ', 'Enstrümantal Tekil Belirli'],
    [/кIэ$/, 'INSTRUMENTAL', 'INDEFINITE', false, '-кIэ', 'Enstrümantal Tekil Belirsiz'],
    [/рауэ$/, 'ADVERBIAL', 'DEFINITE', false, '-рауэ', 'Adverbiyal Vurgulu Belirli'],
    [/уэ$/, 'ADVERBIAL', 'INDEFINITE', false, '-уэ', 'Adverbiyal Tekil'],
    [/(?<![гкхI])у$/, 'ADVERBIAL', 'INDEFINITE', false, '-у', 'Adverbiyal Tekil Kısa'],
    [/м$/, 'ERGATIVE', 'DEFINITE', false, '-м', 'Ergatif Tekil Belirli'],
    [/р$/, 'NOMINATIVE', 'DEFINITE', false, '-р', 'Nominatif Tekil Belirli']
  ];

  public static readonly POSSESSIVE_PREFIXES: Array<[RegExp, string, string]> = [
    [/^сысей/, 'POSS_IND_1SG', 'Benimki'],
    [/^ууей/, 'POSS_IND_2SG', 'Seninki'],
    [/^си/, 'POSS_1SG', 'Benim'],
    [/^уи/, 'POSS_2SG', 'Senin'],
    [/^ди/, 'POSS_1PL', 'Bizim'],
    [/^фи/, 'POSS_2PL', 'Sizin'],
    [/^я/, 'POSS_3PL', 'Onların'],
    [/^и/, 'POSS_3SG', 'Onun']
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
      morpheme: '-Ø',
      gloss: 'Yalın / Belirsiz Gövde'
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
      stem.endsWith('ы') &&
      stem.length > 2 &&
      !stem.endsWith('уы')
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
    гу: 'kalp / zihin / merkez',
    нэ: 'göz / algı / çehre',
    Iэ: 'el / eylem',
    лъэ: 'ayak / zemin / adım',
    щхьэ: 'kafa / zirve / gerekçe',
    псэ: 'ruh / can / yaşam',
    псы: 'su / berraklık',
    бзэ: 'dil / konuşma',
    пэ: 'burun / uç / ön',
    дзэ: 'diş / ordu / kenar',
    быдэ: 'sağlam / dirençli',
    фIы: 'iyi / güzel',
    бзыгъэ: 'keskin / bilge',
    усыгъуэ: 'düzenleme / kurgu',
    мафIэ: 'ateş',
    щIы: 'toprak / yer'
  };

  private parser: MorphemeParser;

  constructor() {
    this.parser = new MorphemeParser();
    this.loadRootsDatabase();
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

    if (fullStem.endsWith('ы')) return fullStem.slice(0, -1) + 'ын';
    if (fullStem.endsWith('а') || fullStem.endsWith('э')) return fullStem + 'н';
    if (!fullStem.endsWith('н')) return fullStem + 'эн';
    return fullStem;
  }

    private rootsDb: Array<any> = [];
  private compoundsDb: Map<string, any> = new Map();

  private loadRootsDatabase(): void {
    const dbPath = require('path').resolve('./public/data/linguistic/kabardian_roots_database.json');
    const fs = require('fs');
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

    // 1. Tam bileşik eşleşme
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

    // 2. Birincil kök eşleşmesi
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

    // 3. Somatik alt kök analizi
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
      if (clean.includes(rootSym)) {
        foundSubroots.push({ root: rootSym, meaning });
      }
    }
    return foundSubroots;
  }

  public buildLemma(word: string): LemmaBuildResult {
    const parseRes = this.parser.parse(word);
    const vAnalysis = parseRes.verbAnalysis;
    const nAnalysis = parseRes.nounAnalysis;

    let pos: PosType = 'NOUN/LEMMA';
    let confidence = 0.9;
    let rawStem = nAnalysis.cleanNominalStem;
    let lemma = rawStem;

    if (parseRes.primaryPos === 'VERB') {
      pos = 'VERB';
      confidence = 0.95;
      rawStem = vAnalysis.extractedVerbRoot;
      lemma = this.constructVerbLemma(rawStem, vAnalysis.prefixSlots);
    } else if (parseRes.primaryPos === 'NOUN') {
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

