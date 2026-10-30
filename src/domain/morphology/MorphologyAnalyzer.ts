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
  method: 'dictionary' | 'exact' | 'partial' | 'fallback' | 'unverified' | 'ambiguous';
  confidence: number;
  source?: string;
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
  private lexemes: Map<string, any>;
  private rootFormSet: Set<string>;
  private ambiguousForms: Set<string>;
  private strictDecompile: boolean;

  constructor(
    knownRoots: KnownRoot[] = [],
    roots: Root[] = [],
    morphemes: Morpheme[] = [],
    lexemes: any[] = [],
    strictDecompile: boolean = false
  ) {
    this.rootFormSet = new Set<string>(
      roots.map((r: any) => r.form).filter(Boolean)
    );

    // Ayni forma sahip birden fazla kok varsa 'ambiguous' isaretle

    const formCounts = new Map<string, number>();

    for (const r of roots as any[]) {

      const f = (r?.form ?? '').trim();

      if (f) formCounts.set(f, (formCounts.get(f) ?? 0) + 1);

    }

    this.ambiguousForms = new Set(

      [...formCounts].filter(([, n]) => n > 1).map(([f]) => f)

    );

    this.strictDecompile = strictDecompile;
    this.decompiler = new VerbDecompiler(this.rootFormSet, strictDecompile);
    this.knownRoots = new Map(
      knownRoots.filter(r => r.form).map(r => [r.form, r])
    );
    this.rootExtractor = new RootExtractor(roots, lexemes);
    this.lexemes = new Map((lexemes || []).map((l: any) => [l.id, l]));
    this.nounCaseParser = new NounCaseParser();
    this.morphemeParser = new MorphemeParser(morphemes);
  }

  analyze(form: string): MorphologyResult {
    const normalized = form.trim();

    // 0. Fiil soneklerini cikar.
    // strict modda: kesilen sonrasi kalan parca roots.json'da olmali.
    const suffixResult = VerbSuffixDecompiler.decompile(
      normalized,
      this.rootFormSet,
      this.strictDecompile
    );

    // 0a. Sonek varsa -> VERB
    if (suffixResult.suffixes.length > 0) {
      const verbResult = this.decompiler.decompile(suffixResult.stripped);

      // Kok roots.json'da varsa 'exact', yoksa VerbDecompiler'in method'unu kullan.
      // rootFormSet bos ise (testler / eski cagrilar) eski davranis korunur.

      const hasRootSet = this.rootFormSet.size > 0;

      const rootValid = !hasRootSet || this.rootFormSet.has(verbResult.root);

      const method = this.ambiguousForms.has(verbResult.root)

        ? 'ambiguous'

        : !hasRootSet

          ? verbResult.method

          : rootValid ? 'exact' : 'unverified';

      return {
        input: normalized,
        prefixes: verbResult.prefixes,
        root: verbResult.root,
        prefixCount: verbResult.prefixCount,
        method,
        confidence: verbResult.confidence,
        source: 'verb',
        rootExtractor: this.safeExtract(verbResult.root || normalized),
        nounCase: this.safeNounCase(verbResult.root || normalized),
        morphemes: this.safeMorpheme(verbResult.root || normalized),
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

    // 1. Bilinen kok mu?
    const known = this.knownRoots.get(normalized);
    if (known && !this.ambiguousForms.has(normalized)) {
      return {
        input: normalized,
        prefixes: [],
        root: normalized,
        prefixCount: 0,
        method: 'dictionary',
        confidence: 1.0,
        source: known.meaning ?? known.partOfSpeech,
        rootExtractor: this.safeExtract(known.form || normalized),
        nounCase: this.safeNounCase(known.form || normalized),
        morphemes: this.safeMorpheme(known.form || normalized),
        suffixes: suffixResult.suffixes,
      };
    }

        // 2. VerbDecompiler ile onekleri ayristir
    const result = this.decompiler.decompile(normalized);

    const hasRootSet2 = this.rootFormSet.size > 0;
    const rootValid2 = !hasRootSet2 || this.rootFormSet.has(result.root);

    const method2 = this.ambiguousForms.has(result.root)
      ? 'ambiguous'
      : !hasRootSet2
        ? result.method
        : rootValid2 ? 'exact' : 'unverified';

    return {
      input: result.input,
      prefixes: result.prefixes,
      root: result.root,
      prefixCount: result.prefixCount,
      method: method2,
      confidence: result.confidence,
      rootExtractor: this.safeExtract(result.root || normalized),
      nounCase: this.safeNounCase(result.root || normalized),
      morphemes: this.safeMorpheme(result.root || normalized),
    };
  }


  private safeExtract(form: string): RootExtractorOutput | undefined {
    try {
      const lexemeEntry = [...this.lexemes.entries()].find(([id, l]) => l.form === form);
      const lexemeId = lexemeEntry ? lexemeEntry[0] : 'UNKNOWN';
      return this.rootExtractor.extract({ lexemeId, form });
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