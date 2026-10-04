import fs from 'fs';
import path from 'path';
import { VerbDecompiler, VerbResult } from './VerbDecompiler';
import { RootExtractor, RootExtractorOutput } from './RootExtractor';
import { NounCaseParser, NounCaseResult } from './NounCaseParser';
import { MorphemeParser, MorphemeParserOutput } from './MorphemeParser';
import { VerbSuffixDecompiler, SuffixResult } from './VerbSuffixDecompiler';
import { Root } from '../linguistic/Root';
import { Morpheme } from '../linguistic/Morpheme';

export interface MorphologyResult {
  input: string;
  root: string;
  prefixes: Array<{ slot: string; form: string; position: number }>;
  prefixCount: number;
  method: 'dictionary' | 'exact' | 'partial' | 'fallback';
  confidence: number;
  source?: string;
  // Yeni parser sonuçları
  rootExtractor?: RootExtractorOutput;
  nounCase?: NounCaseResult;
  morphemes?: MorphemeParserOutput;
  suffixes?: SuffixResult[];
}

export interface KnownRoot {
  form: string;
  meaning?: string;
  partOfSpeech?: string;
}

export class MorphologyAnalyzer {
  private decompiler: VerbDecompiler;
  private knownRoots: Map<string, KnownRoot>;
  private rootExtractor: RootExtractor;
  private nounCaseParser: NounCaseParser;
  private morphemeParser: MorphemeParser;

  constructor(
    knownRoots: KnownRoot[] = [],
    roots: Root[] = [],
    morphemes: Morpheme[] = [],
    lexemes: any[] = []
  ) {
    this.decompiler = new VerbDecompiler();
    this.knownRoots = new Map(
      knownRoots.filter(r => r.form).map(r => [r.form, r])
    );
    this.rootExtractor = new RootExtractor(roots, lexemes);
    this.nounCaseParser = new NounCaseParser();
    this.morphemeParser = new MorphemeParser(morphemes);
  }

  analyze(form: string): MorphologyResult {
    const normalized = form.trim();

    // 0. Fiil soneklerini cikar
    const suffixResult = VerbSuffixDecompiler.decompile(normalized);

    // 0a. Sonek varsa -> VERB
    if (suffixResult.suffixes.length > 0) {
      const verbResult = this.decompiler.decompile(suffixResult.stripped);
      return {
        input: normalized,
        prefixes: verbResult.prefixes,
        root: verbResult.root,
        prefixCount: verbResult.prefixCount,
        method: 'exact',
        confidence: verbResult.confidence,
        source: 'verb',
        rootExtractor: this.safeExtract(normalized),
        nounCase: this.safeNounCase(normalized),
        morphemes: this.safeMorpheme(normalized),
        suffixes: suffixResult.suffixes,
      };
    }

    if (!normalized) {
      return {
        input: '',
        prefixes: [],
        root: '',
        prefixCount: 0,
        method: 'fallback',
        confidence: 0,
        suffixes: suffixResult.suffixes,
      };
    }

    // 1. Bilinen kök mü?
    const known = this.knownRoots.get(normalized);
    if (known) {
      return {
        input: normalized,
        prefixes: [],
        root: normalized,
        prefixCount: 0,
        method: 'dictionary',
        confidence: 1.0,
        source: known.meaning ?? known.partOfSpeech,
        rootExtractor: this.safeExtract(normalized),
        nounCase: this.safeNounCase(normalized),
        morphemes: this.safeMorpheme(normalized),
        suffixes: suffixResult.suffixes,
      };
    }

    // 2. VerbDecompiler ile önekleri ayrıştır
    const result = this.decompiler.decompile(normalized);
    return {
      input: result.input,
      prefixes: result.prefixes,
      root: result.root,
      prefixCount: result.prefixCount,
      method: result.method,
      confidence: result.confidence,
      rootExtractor: this.safeExtract(normalized),
      nounCase: this.safeNounCase(normalized),
      morphemes: this.safeMorpheme(normalized),
    };
  }

  private safeExtract(form: string): RootExtractorOutput | undefined {
    try {
      return this.rootExtractor.extract(form);
    } catch {
      return undefined;
    }
  }

  private safeNounCase(form: string): NounCaseResult | undefined {
    try {
      return this.nounCaseParser.parse(form);
    } catch {
      return undefined;
    }
  }

  private safeMorpheme(form: string): MorphemeParserOutput | undefined {
    try {
      return this.morphemeParser.parse(form);
    } catch {
      return undefined;
    }
  }

  getKnownRootCount(): number {
    return this.knownRoots.size;
  }
}
