/**
 * File: src/domain/discovery/services/WordFamilyResolver.ts
 * Layer: Service
 * 
 * Word Family → Concept çözümleyici.
 * 
 * WF-CONCEPT-MAPPING.md belgesine dayanır.
 * 
 * Görev: Bir kelimenin hangi Root'a ve hangi Concept'e bağlı olduğunu bulur.
 * 
 * Kural: Bir Root, birden fazla Concept'e bağlanabilir.
 */

import { WORD_FAMILY_CONCEPT_MAP, WordFamilyConceptMap } from './WordFamilyConceptMap';
import { normalizePalochka } from '@/domain/utils/normalizePalochka';

export interface WordFamilyResolution {
  word: string;
  root?: string;
  conceptId?: string;
  confidence: number;
}

export class WordFamilyResolver {
  constructor(
    private readonly conceptMap: WordFamilyConceptMap = WORD_FAMILY_CONCEPT_MAP
  ) {}

  /**
   * Bir kelimenin hangi Root'a bağlı olduğunu bulur.
   * 
   * @param word Çözümlenecek kelime
   * @returns Root (örn: 'щхьэ', 'псы') veya undefined
   */
  public resolveRoot(word: string): string | undefined {
    if (!word || !word.trim()) return undefined;

    const normalizedWord = normalizePalochka(word.trim());

    for (const [root, derivatives] of Object.entries(this.conceptMap)) {
      if (derivatives[normalizedWord]) {
        return root;
      }
    }

    return undefined;
  }

  /**
   * Bir kelimenin hangi Concept'e bağlı olduğunu bulur.
   * 
   * @param word Çözümlenecek kelime
   * @returns ConceptID veya undefined
   */
  public resolveConcept(word: string): string | undefined {
    if (!word || !word.trim()) return undefined;

    const normalizedWord = normalizePalochka(word.trim());

    for (const [, derivatives] of Object.entries(this.conceptMap)) {
      const conceptId = derivatives[normalizedWord];
      if (conceptId) {
        return conceptId;
      }
    }

    return undefined;
  }

  /**
   * Bir kelimenin tüm çözümlemesini yapar.
   * 
   * @param word Çözümlenecek kelime
   * @returns WordFamilyResolution
   */
  public resolve(word: string): WordFamilyResolution {
    const root = this.resolveRoot(word);
    const conceptId = this.resolveConcept(word);

    return {
      word,
      root,
      conceptId,
      confidence: conceptId ? 1.0 : 0.0,
    };
  }

  /**
   * Bir Root'un tüm türevlerini döndürür.
   * 
   * @param root Root (örn: 'щхьэ')
   * @returns Türev listesi
   */
  public getDerivatives(root: string): string[] {
    const derivatives = this.conceptMap[root];
    return derivatives ? Object.keys(derivatives) : [];
  }

  /**
   * Bir Root'un tüm Concept'lerini döndürür.
   * 
   * @param root Root (örn: 'щхьэ')
   * @returns ConceptID listesi
   */
  public getConceptsByRoot(root: string): string[] {
    const derivatives = this.conceptMap[root];
    if (!derivatives) return [];

    const concepts = new Set(Object.values(derivatives));
    return Array.from(concepts);
  }

  /**
   * Tüm Root'ları döndürür.
   */
  public getAllRoots(): string[] {
    return Object.keys(this.conceptMap);
  }
}
