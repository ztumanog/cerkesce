/**
 * VerbSuffixDecompiler - Fiil Çekim ve Zaman Ekleri Çözümleyici
 * ADR-0040: Morphological Root Taxonomy
 */

export interface VerbSuffix {
  type: 'predicative' | 'tense' | 'future_tense' | 'negative' | 'modal' | 'unknown';
  morpheme: string;
  glossTr: string;
}

export interface VerbDecompileResult {
  word: string;
  stem: string;
  suffixes: VerbSuffix[];
}

export class VerbSuffixDecompiler {
  /**
   * MorphologyAnalyzer tarafından statik çağrılan kök söküm arayüzü
   */
  static decompile(word: string, rootFormSet?: Set<string>, ...args: any[]): VerbDecompileResult {
    return new VerbSuffixDecompiler().parse(word);
  }

  static parse(verbWord: string): VerbDecompileResult {
    return new VerbSuffixDecompiler().parse(verbWord);
  }

  /**
   * Birim testleri ve modüller tarafından kullanılan nesne metodu
   */
  parse(verbWord: string): VerbDecompileResult {
    const input = verbWord ? verbWord.trim() : '';
    if (!input) {
      return { word: '', stem: '', suffixes: [] };
    }

    let stem = input;
    const suffixes: VerbSuffix[] = [];

    // 1. Olumsuzluk Ekleri (-къым, -теп)
    if (stem.endsWith('къым')) {
      suffixes.unshift({
        type: 'negative',
        morpheme: 'къым',
        glossTr: 'Olumsuzluk Eki',
      });
      stem = stem.slice(0, -4);
    } else if (stem.endsWith('теп')) {
      suffixes.unshift({
        type: 'negative',
        morpheme: 'теп',
        glossTr: 'Geçmiş Zaman Olumsuzluk Eki',
      });
      stem = stem.slice(0, -3);
    }

    // 2. Gelecek Zaman Ekleri (-нущ, -нщ)
    if (stem.endsWith('нущ')) {
      suffixes.unshift({
        type: 'future_tense',
        morpheme: 'нущ',
        glossTr: 'Gelecek Zaman Eki',
      });
      stem = stem.slice(0, -3);
    } else if (stem.endsWith('нщ')) {
      suffixes.unshift({
        type: 'future_tense',
        morpheme: 'нщ',
        glossTr: 'Gelecek Zaman Eki',
      });
      stem = stem.slice(0, -2);
    }

    // 3. Geçmiş Zaman & Bildirme Ekleri (-гъащ, -ащ, -щ)
    if (stem.endsWith('гъащ')) {
      suffixes.unshift({
        type: 'tense',
        morpheme: 'гъащ',
        glossTr: 'Uzak Geçmiş Zaman Eki',
      });
      stem = stem.slice(0, -4);
    } else if (stem.endsWith('ащ')) {
      suffixes.unshift({
        type: 'tense',
        morpheme: 'ащ',
        glossTr: 'Geçmiş Zaman Eki',
      });
      stem = stem.slice(0, -2);
    } else if (stem.endsWith('щ')) {
      suffixes.unshift({
        type: 'predicative',
        morpheme: 'щ',
        glossTr: 'Bildirme Eki',
      });
      stem = stem.slice(0, -1);
    }

    return {
      word: input,
      stem,
      suffixes,
    };
  }
}