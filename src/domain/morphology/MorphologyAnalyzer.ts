/**
 * MorphologyAnalyzer - Çerkesçe Çekirdek Morfoloji Analiz Motoru
 * ADR-0063: Dynamic Prefix & Suffix Counter Resolution
 */

import { NounCaseParser, NounCaseResult } from './NounCaseParser';
import { NominalDerivationDecompiler, DerivationResult as NominalDerivationResult } from './NominalDerivationDecompiler';
import { VerbSuffixDecompiler, VerbDecompileResult as VerbSuffixResult } from './VerbSuffixDecompiler';
import { VerbPrefixDecompiler, VerbPrefixDecompileResult } from './VerbPrefixDecompiler';
import { DictionaryProvider, DictionaryEntry } from './DictionaryProvider';
import { PossessiveParser, PossessiveInfo, PluralInfo } from './PossessiveParser';
import { CompoundDecompiler } from './CompoundDecompiler';
import { normalizePalochka } from './utils/textUtils';

export interface MorphemeDetail {
  morpheme: string;
  type: string;
  meaningTr?: string;
  glossTr?: string;
}

export interface MorphologyResult {
  input: string;
  word?: string;
  root: string;
  source: 'noun' | 'verb' | 'compound' | 'unknown';
  nounCase?: NounCaseResult;
  derivation?: NominalDerivationResult;
  verbSuffixes?: VerbSuffixResult;
  verbPrefixes?: VerbPrefixDecompileResult;
  dictionaryEntry?: DictionaryEntry | null;
  confidence: number;
  possessive?: PossessiveInfo | null;
  plural?: PluralInfo | null;
  morphemes?: MorphemeDetail[];
  prefixCount: number;
  suffixCount: number;
}

export class MorphologyAnalyzer {
  private caseParser: NounCaseParser;
  private derivationDecompiler: NominalDerivationDecompiler;
  private verbSuffixDecompiler: VerbSuffixDecompiler;
  private verbPrefixDecompiler: VerbPrefixDecompiler;
  private possessiveParser: PossessiveParser;
  private compoundDecompiler: CompoundDecompiler;
  private dictionaryProvider: DictionaryProvider;

  constructor(dictProvider?: any) {
    this.caseParser = new NounCaseParser();
    this.derivationDecompiler = new NominalDerivationDecompiler();
    this.verbSuffixDecompiler = new VerbSuffixDecompiler();
    this.verbPrefixDecompiler = new VerbPrefixDecompiler();
    this.possessiveParser = new PossessiveParser();
    this.compoundDecompiler = new CompoundDecompiler();

    if (dictProvider && typeof dictProvider.findEntry === 'function') {
      this.dictionaryProvider = dictProvider;
    } else if (Array.isArray(dictProvider)) {
      this.dictionaryProvider = new DictionaryProvider(dictProvider);
    } else {
      this.dictionaryProvider = new DictionaryProvider();
    }
  }

  private safeFindEntry(key: string): DictionaryEntry | null {
    if (this.dictionaryProvider && typeof this.dictionaryProvider.findEntry === 'function') {
      return this.dictionaryProvider.findEntry(key);
    }
    return null;
  }

  private calculateCounts(morphemes: MorphemeDetail[] = []): { prefixCount: number; suffixCount: number } {
    const prefixTypes = ['possessive', 'applicative', 'causative', 'reflexive', 'person', 'prefix'];
    const suffixTypes = ['case', 'plural', 'derivation', 'connective', 'suffix', 'verb_suffix'];

    let prefixCount = 0;
    let suffixCount = 0;

    for (const m of morphemes) {
      if (prefixTypes.includes(m.type)) {
        prefixCount++;
      } else if (suffixTypes.includes(m.type)) {
        suffixCount++;
      }
    }

    return { prefixCount, suffixCount };
  }

  analyze(word: string): MorphologyResult {
    const rawInput = word ? word.trim() : '';
    const input = normalizePalochka(rawInput);
    if (!input) {
      return {
        input: '',
        word: '',
        root: '',
        source: 'unknown',
        confidence: 0,
        dictionaryEntry: null,
        morphemes: [],
        prefixCount: 0,
        suffixCount: 0,
      };
    }

    // 1. Fiil Ön-ek ve Sonek Ayrıştırması
    const prefixRes = this.verbPrefixDecompiler.parse(input);
    const verbSuffRes = this.verbSuffixDecompiler.parse(prefixRes.stem);
    const isVerbCandidate = (verbSuffRes.suffixes && verbSuffRes.suffixes.length > 0) || (prefixRes.prefixes && prefixRes.prefixes.length > 0);

    if (isVerbCandidate) {
      const rootCandidate = verbSuffRes.stem;
      const dictEntry = this.safeFindEntry(rootCandidate) || this.safeFindEntry(input);
      const effectiveRoot = dictEntry?.root || dictEntry?.lemma || rootCandidate;

      const morphemes: MorphemeDetail[] = [
        ...prefixRes.prefixes.map((p: any) => ({ morpheme: p.morpheme, type: p.type, glossTr: p.glossTr })),
        { morpheme: rootCandidate, type: 'root', meaningTr: dictEntry?.meaningTr },
        ...verbSuffRes.suffixes.map((s: any) => ({ morpheme: s.suffix, type: s.type, glossTr: s.meaningTr })),
      ];

      const counts = this.calculateCounts(morphemes);

      return {
        input: rawInput,
        word: rawInput,
        root: effectiveRoot,
        source: 'verb',
        verbPrefixes: prefixRes,
        verbSuffixes: verbSuffRes,
        dictionaryEntry: dictEntry,
        confidence: dictEntry ? 0.95 : 0.85,
        morphemes,
        ...counts,
      };
    }

    // 2. Sahiplik ve Büküm Katmanları
    const possessiveRes = this.possessiveParser.parse(input);
    const caseRes = this.caseParser.parse(possessiveRes.stem);

    // 3. Derin Bileşik Kelime Çözümleme
    const compoundRes = this.compoundDecompiler.parse(caseRes.stem);

    if (compoundRes.isCompound) {
      const dictEntry = this.safeFindEntry(caseRes.stem) || this.safeFindEntry(input);
      const morphemes: MorphemeDetail[] = [];

      if (possessiveRes.possessive) {
        morphemes.push({ morpheme: possessiveRes.possessive.prefix, type: 'possessive', glossTr: possessiveRes.possessive.glossTr });
      }
      morphemes.push(...compoundRes.morphemes);
      if (possessiveRes.plural) {
        morphemes.push({ morpheme: possessiveRes.plural.suffix, type: 'plural', glossTr: possessiveRes.plural.glossTr });
      } else if (caseRes.case !== 'bare') {
        morphemes.push({ morpheme: caseRes.suffix, type: 'case', glossTr: caseRes.case });
      }

      const counts = this.calculateCounts(morphemes);

      return {
        input: rawInput,
        word: rawInput,
        root: compoundRes.stem,
        source: 'compound',
        nounCase: caseRes,
        possessive: possessiveRes.possessive,
        plural: possessiveRes.plural,
        dictionaryEntry: dictEntry,
        confidence: 0.95,
        morphemes,
        ...counts,
      };
    }

    // 4. Standart İsim Büküm ve Türetim Ayrıştırması
    const derivRes = this.derivationDecompiler.parse(caseRes.stem);
    const nounRootCandidate = derivRes.stem;
    const dictEntry = this.safeFindEntry(nounRootCandidate) || this.safeFindEntry(input);
    const effectiveRoot = dictEntry?.root || dictEntry?.lemma || nounRootCandidate;

    const morphemes: MorphemeDetail[] = [];
    if (possessiveRes.possessive) {
      morphemes.push({ morpheme: possessiveRes.possessive.prefix, type: 'possessive', glossTr: possessiveRes.possessive.glossTr });
    }
    morphemes.push({ morpheme: nounRootCandidate, type: 'root', meaningTr: dictEntry?.meaningTr });
    
    if (derivRes.suffix) {
      morphemes.push({ morpheme: derivRes.suffix, type: 'derivation', glossTr: derivRes.meaningTr });
    }
    if (possessiveRes.plural) {
      morphemes.push({ morpheme: possessiveRes.plural.suffix, type: 'plural', glossTr: possessiveRes.plural.glossTr });
    } else if (caseRes.case !== 'bare') {
      morphemes.push({ morpheme: caseRes.suffix, type: 'case', glossTr: caseRes.case });
    }

    const counts = this.calculateCounts(morphemes);

    return {
      input: rawInput,
      word: rawInput,
      root: effectiveRoot,
      source: 'noun',
      nounCase: caseRes,
      derivation: derivRes,
      possessive: possessiveRes.possessive,
      plural: possessiveRes.plural,
      dictionaryEntry: dictEntry,
      confidence: dictEntry ? 0.95 : 0.80,
      morphemes,
      ...counts,
    };
  }
}