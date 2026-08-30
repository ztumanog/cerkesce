import { TranslationEntry } from '../domain/translation';

/**
 * ADR-0006 uyarınca onaylanmış diyalektik dönüşüm haritası.
 * Belgelenmeyen hiçbir dönüşüm bu haritaya eklenemez.
 */
const APPROVED_DIALECT_MAPPINGS: Record<string, string> = {
  'щ': 'ш',
  'ш': 'щ',
  'фӀ': 'ф',
  'ф': 'фӀ'
};

export class MatchingService {
  /**
   * İki lemmayı ADR-0006 kurallarına göre karşılaştırır.
   */
  public matchEntries(entryA: TranslationEntry, entryB: TranslationEntry): 'EXACT' | 'VARIANT' | 'NONE' {
    // Priority 1: Exact Match
    if (entryA.lemma === entryB.lemma) {
      return 'EXACT';
    }

    // Priority 2: Documented Orthographic Variant Match
    if (this.isApprovedVariant(entryA.lemma, entryB.lemma)) {
      return 'VARIANT';
    }

    return 'NONE';
  }

  /**
   * Sadece belgelenmiş kuralları (APPROVED_DIALECT_MAPPINGS) kullanarak varyant kontrolü yapar.
   */
  private isApprovedVariant(lemmaA: string, lemmaB: string): boolean {
    let normalizedA = lemmaA;
    
    for (const [sourceChar, targetChar] of Object.entries(APPROVED_DIALECT_MAPPINGS)) {
      const candidate = normalizedA.replace(new RegExp(sourceChar, 'g'), targetChar);
      if (candidate === lemmaB) {
        return true;
      }
    }

    return false;
  }
}