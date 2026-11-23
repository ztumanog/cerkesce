/**
 * MorphologyAnalyzer - Çerkesçe Çekirdek Morfoloji Analiz Motoru
 * ADR-0063: Dynamic Prefix & Suffix Counter Resolution
 * MORPH-02: P4 decompiler baglantisi (ADR-ROOT-001 istisna)
 *  - Pronoun / Numeral: gate'li, type != bare ise DUR
 *  - Adverb / Participle: sadece dusuk guven fallback
 *  - Root dogrulama: RootExtractor (roots.json ile)
 *  - P4 VerbDecompiler BAGLANMADI (canli VerbPrefix daha guclu)
 */

import { NounCaseParser, NounCaseResult } from './NounCaseParser';
import { NominalDerivationDecompiler, DerivationResult as NominalDerivationResult } from './NominalDerivationDecompiler';
import { VerbSuffixDecompiler, VerbDecompileResult as VerbSuffixResult } from './VerbSuffixDecompiler';
import { VerbPrefixDecompiler, VerbPrefixDecompileResult } from './VerbPrefixDecompiler';
import { DictionaryProvider, DictionaryEntry } from './DictionaryProvider';
import { PossessiveParser, PossessiveInfo, PluralInfo } from './PossessiveParser';
import { CompoundDecompiler } from './CompoundDecompiler';
import { normalizePalochka } from './utils/textUtils';
import { PronounDecompiler, PronounResult } from './PronounDecompiler';
import { NumeralDecompiler, NumeralResult } from './NumeralDecompiler';
import { AdverbDecompiler, AdverbResult } from './AdverbDecompiler';
import { ParticipleDecompiler, ParticipleResult } from './ParticipleDecompiler';
import { RootExtractor } from './RootExtractor';
import type { Root } from '../linguistic/Root';

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
  lemma?: string;
  rootId?: string | null;
  rootType?: string;
  source: 'noun' | 'verb' | 'compound' | 'unknown' | 'pronoun' | 'numeral' | 'adverb' | 'participle';
  nounCase?: NounCaseResult;
  derivation?: NominalDerivationResult;
  verbSuffixes?: VerbSuffixResult;
  verbPrefixes?: VerbPrefixDecompileResult;
  pronoun?: PronounResult;
  numeral?: NumeralResult;
  adverb?: AdverbResult;
  participle?: ParticipleResult;
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
  private pronounDecompiler: PronounDecompiler;
  private numeralDecompiler: NumeralDecompiler;
  private adverbDecompiler: AdverbDecompiler;
  private participleDecompiler: ParticipleDecompiler;
  private rootExtractor: RootExtractor | null = null;

  constructor(dictProvider?: any, roots?: Root[], lexemesForRoot?: any[]) {
    this.caseParser = new NounCaseParser();
    this.derivationDecompiler = new NominalDerivationDecompiler();
    this.verbSuffixDecompiler = new VerbSuffixDecompiler();
    this.verbPrefixDecompiler = new VerbPrefixDecompiler();
    this.possessiveParser = new PossessiveParser();
    this.compoundDecompiler = new CompoundDecompiler();
    this.pronounDecompiler = new PronounDecompiler();
    this.numeralDecompiler = new NumeralDecompiler();
    this.adverbDecompiler = new AdverbDecompiler();
    this.participleDecompiler = new ParticipleDecompiler();

    if (Array.isArray(roots) && roots.length > 0) {
      try { this.rootExtractor = new RootExtractor(roots, lexemesForRoot || []); } catch { this.rootExtractor = null; }
    }

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
    const prefixTypes = ['possessive','applicative','causative','reflexive','reciprocal','person','locative','directional','prefix'];
    const suffixTypes = ['case','plural','derivation','connective','suffix','verb_suffix','infinitive','thematic','tense','future_tense','negative','predicative','modal'];
    let prefixCount = 0; let suffixCount = 0;
    for (const m of morphemes) {
      if (prefixTypes.includes(m.type)) prefixCount++;
      else if (suffixTypes.includes(m.type)) suffixCount++;
    }
    return { prefixCount, suffixCount };
  }

  private enrichWithLemmaAndRoot(input: string, root: string, dictEntry: any): { lemma?: string; rootId?: string | null; rootType?: string } {
    let lemma: string | undefined;
    try {
    } catch { /* V2 yoksa lemma bos kalir, eski davranis bozulmaz */ }
    let rootId: string | null | undefined; let rootType: string | undefined;
    try {
      if (this.rootExtractor) {
        const r = this.rootExtractor.extract(input);
        if (r && r.rootId) { rootId = r.rootId; rootType = r.rootType; }
      }
    } catch { /* extractor yoksa sessiz gec */ }
    if (!lemma) lemma = root;
    return { lemma, rootId: rootId ?? null, rootType };
  }

  analyze(word: string): MorphologyResult {
    const rawInput = word ? word.trim() : '';
    const input = normalizePalochka(rawInput);
    if (!input) {
      return { input: '', word: '', root: '', source: 'unknown', confidence: 0, dictionaryEntry: null, morphemes: [], prefixCount: 0, suffixCount: 0 };
    }

    // 1. ZAMIR - gate: bare ise eslesme degil
    try {
      let pr = this.pronounDecompiler.decompile(rawInput);
      if (!pr || pr.type === 'bare') pr = this.pronounDecompiler.decompile(input);
      if (pr && pr.type !== 'bare') {
        const dictEntry = this.safeFindEntry(input);
        const extra = this.enrichWithLemmaAndRoot(input, pr.stem, dictEntry);
        return {
          input: rawInput, word: rawInput, root: pr.stem, lemma: extra.lemma, rootId: extra.rootId, rootType: extra.rootType,
          source: 'pronoun', pronoun: pr, dictionaryEntry: dictEntry,
          confidence: pr.confidence,
          morphemes: [{ morpheme: pr.stem, type: 'root', glossTr: 'Zamir: ' + pr.type }],
          prefixCount: 0, suffixCount: pr.suffix ? 1 : 0,
        };
      }
    } catch {}

    // 2. SAYI - gate: bare ise eslesme degil
    try {
      let nr = this.numeralDecompiler.decompile(rawInput);
      if (!nr || nr.type === 'bare') nr = this.numeralDecompiler.decompile(input);
      if (nr && nr.type !== 'bare') {
        const dictEntry = this.safeFindEntry(input);
        const extra = this.enrichWithLemmaAndRoot(input, nr.stem, dictEntry);
        return {
          input: rawInput, word: rawInput, root: nr.stem, lemma: extra.lemma, rootId: extra.rootId, rootType: extra.rootType,
          source: 'numeral', numeral: nr, dictionaryEntry: dictEntry,
          confidence: nr.confidence,
          morphemes: [{ morpheme: nr.stem, type: 'root', glossTr: 'Sayi: ' + nr.type + (nr.value !== undefined ? ' = ' + nr.value : '') }],
          prefixCount: 0, suffixCount: nr.suffix ? 1 : 0,
        };
      }
    } catch {}

    // 3. FIIL - mevcut yol, DEGISTIRILMEDI
    const prefixRes = this.verbPrefixDecompiler.parse(input);
    const verbSuffRes = this.verbSuffixDecompiler.parse(prefixRes.stem);
    const fullDictEntry = this.safeFindEntry(input);
    const isKnownVerbInDict = fullDictEntry?.pos?.toLowerCase() === 'verb';
    const isVerbCandidate =
      isKnownVerbInDict ||
      (verbSuffRes.suffixes && verbSuffRes.suffixes.length > 0) ||
      (prefixRes.prefixes && prefixRes.prefixes.length > 0);

    if (isVerbCandidate) {
      const stemCandidate = verbSuffRes.stem;
      const stemDictEntry = this.safeFindEntry(stemCandidate);
      const dictEntry = stemDictEntry || fullDictEntry;
      const hasInfinitive = verbSuffRes.suffixes.some((s) => s.type === 'infinitive');
      let rootMorpheme = stemCandidate;
      let thematicSuffix: MorphemeDetail | null = null;
      if (hasInfinitive && (stemCandidate.endsWith('э') || stemCandidate.endsWith('ы')) && stemCandidate.length >= 2) {
        const vowel = stemCandidate.slice(-1);
        rootMorpheme = stemCandidate.slice(0, -1);
        thematicSuffix = { morpheme: vowel, type: 'thematic', glossTr: vowel === 'э' ? 'Geçişli / Tema Ünlüsü (-э)' : 'Geçişsiz / Tema Ünlüsü (-ы)' };
      }
      const effectiveRoot = stemDictEntry?.root || (prefixRes.prefixes.length > 0 ? rootMorpheme : stemCandidate);
      const morphemes: MorphemeDetail[] = [
        ...prefixRes.prefixes.map((p: any) => ({ morpheme: p.morpheme, type: p.type, glossTr: p.glossTr })),
        { morpheme: rootMorpheme, type: 'root', meaningTr: dictEntry?.meaningTr || fullDictEntry?.meaningTr },
        ...(thematicSuffix ? [thematicSuffix] : []),
        ...verbSuffRes.suffixes.map((s: any) => ({ morpheme: s.morpheme || s.suffix, type: s.type, glossTr: s.glossTr || s.meaningTr })),
      ];
      const counts = this.calculateCounts(morphemes);
      const extra = this.enrichWithLemmaAndRoot(input, effectiveRoot, dictEntry);
      return { input: rawInput, word: rawInput, root: effectiveRoot, lemma: extra.lemma, rootId: extra.rootId, rootType: extra.rootType, source: 'verb', verbPrefixes: prefixRes, verbSuffixes: verbSuffRes, dictionaryEntry: dictEntry, confidence: dictEntry ? 0.95 : 0.85, morphemes, ...counts };
    }

    // 4. SAHIPLIK + HAL + BILESİK - mevcut yol, DEGISTIRILMEDI
    const possessiveRes = this.possessiveParser.parse(input);
    const caseRes = this.caseParser.parse(possessiveRes.stem);
    const compoundRes = this.compoundDecompiler.parse(caseRes.stem);

    if (compoundRes.isCompound) {
      const dictEntry = this.safeFindEntry(caseRes.stem) || fullDictEntry;
      const morphemes: MorphemeDetail[] = [];
      if (possessiveRes.possessive) morphemes.push({ morpheme: possessiveRes.possessive.prefix, type: 'possessive', glossTr: possessiveRes.possessive.glossTr });
      morphemes.push(...compoundRes.morphemes);
      if (possessiveRes.plural) morphemes.push({ morpheme: possessiveRes.plural.suffix, type: 'plural', glossTr: possessiveRes.plural.glossTr });
      else if (caseRes.case !== 'bare') morphemes.push({ morpheme: caseRes.suffix, type: 'case', glossTr: caseRes.case });
      const counts = this.calculateCounts(morphemes);
      const extra = this.enrichWithLemmaAndRoot(input, compoundRes.stem, dictEntry);
      return { input: rawInput, word: rawInput, root: compoundRes.stem, lemma: extra.lemma, rootId: extra.rootId, rootType: extra.rootType, source: 'compound', nounCase: caseRes, possessive: possessiveRes.possessive, plural: possessiveRes.plural, dictionaryEntry: dictEntry, confidence: 0.95, morphemes, ...counts };
    }

    // 5. ISIM - mevcut yol
    const derivRes = this.derivationDecompiler.parse(caseRes.stem);
    const nounRootCandidate = derivRes.stem;
    const dictEntry = this.safeFindEntry(nounRootCandidate) || fullDictEntry;
    const effectiveRoot = dictEntry?.root || dictEntry?.lemma || nounRootCandidate;
    const morphemes: MorphemeDetail[] = [];
    if (possessiveRes.possessive) morphemes.push({ morpheme: possessiveRes.possessive.prefix, type: 'possessive', glossTr: possessiveRes.possessive.glossTr });
    morphemes.push({ morpheme: nounRootCandidate, type: 'root', meaningTr: dictEntry?.meaningTr });
    if (derivRes.suffix) morphemes.push({ morpheme: derivRes.suffix, type: 'derivation', glossTr: derivRes.meaningTr });
    if (possessiveRes.plural) morphemes.push({ morpheme: possessiveRes.plural.suffix, type: 'plural', glossTr: possessiveRes.plural.glossTr });
    else if (caseRes.case !== 'bare') morphemes.push({ morpheme: caseRes.suffix, type: 'case', glossTr: caseRes.case });
    const counts = this.calculateCounts(morphemes);

    // 6. ZARF / ORTAC - sadece isim guveni dusukse fallback (isim yolunu bozmaz)
    const nounConfidence = dictEntry ? 0.95 : 0.80;
    if (!dictEntry && !derivRes.suffix && caseRes.case === 'bare' && !possessiveRes.possessive && !possessiveRes.plural) {
      try {
        const ar = this.adverbDecompiler.decompile(input);
        if (ar && ar.type !== 'bare' && ar.stem && ar.stem.length >= 2) {
          const extra = this.enrichWithLemmaAndRoot(input, ar.stem, dictEntry);
          return { input: rawInput, word: rawInput, root: ar.stem, lemma: extra.lemma, rootId: extra.rootId, rootType: extra.rootType, source: 'adverb', adverb: ar, dictionaryEntry: dictEntry, confidence: ar.confidence, morphemes: [{ morpheme: ar.stem, type: 'root' }, { morpheme: ar.suffix, type: 'suffix', glossTr: 'Zarf: ' + ar.type }], ...this.calculateCounts([{ morpheme: ar.suffix, type: 'suffix' }]) };
        }
      } catch {}
      try {
        const pr2 = this.participleDecompiler.decompile(input);
        if (pr2 && pr2.type !== 'bare' && pr2.stem && pr2.stem.length >= 2) {
          const extra = this.enrichWithLemmaAndRoot(input, pr2.stem, dictEntry);
          return { input: rawInput, word: rawInput, root: pr2.stem, lemma: extra.lemma, rootId: extra.rootId, rootType: extra.rootType, source: 'participle', participle: pr2, dictionaryEntry: dictEntry, confidence: pr2.confidence, morphemes: [{ morpheme: pr2.stem, type: 'root' }, { morpheme: pr2.suffix, type: 'suffix', glossTr: 'Partisip: ' + pr2.type }], ...this.calculateCounts([{ morpheme: pr2.suffix, type: 'suffix' }]) };
        }
      } catch {}
    }

    const extra = this.enrichWithLemmaAndRoot(input, effectiveRoot, dictEntry);
    return { input: rawInput, word: rawInput, root: effectiveRoot, lemma: extra.lemma, rootId: extra.rootId, rootType: extra.rootType, source: 'noun', nounCase: caseRes, derivation: derivRes, possessive: possessiveRes.possessive, plural: possessiveRes.plural, dictionaryEntry: dictEntry, confidence: nounConfidence, morphemes, ...counts };
  }
}


