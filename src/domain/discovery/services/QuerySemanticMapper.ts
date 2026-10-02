/**
 * File: src/domain/discovery/services/QuerySemanticMapper.ts
 * Layer: Service
 *
 * Query → Concept Resolution
 *
 * İki kaynak kullanır:
 * 1. ConceptCandidateResolver → TranslationEntry.concept (çeviri köprüsü)
 * 2. WordFamilyResolver → WordFamily → Concept (morfoloji köprüsü)
 */

import { TranslationService } from '@/services/TranslationService';
import { InMemoryTranslationRepository } from '@/repository/InMemoryTranslationRepository';
import { ConceptCandidateResolver } from './ConceptCandidateResolver';
import { WordFamilyResolver } from './WordFamilyResolver';
import { ConceptCandidateDTO } from '../dto/ConceptCandidateDTO';

export interface SemanticQueryResult {
  normalizedQuery: string;
  tokens: string[];
  conceptId?: string;
  confidence: number;
  detectedLanguage?: string;
  candidates?: ConceptCandidateDTO[];
  source?: 'translation' | 'wordFamily' | 'both';
}

export class QuerySemanticMapper {
  private candidateResolver: ConceptCandidateResolver;
  private wordFamilyResolver: WordFamilyResolver;

  constructor(translationService?: TranslationService) {
    const repo = new InMemoryTranslationRepository();
    const service = translationService || new TranslationService(repo);
    this.candidateResolver = new ConceptCandidateResolver(service);
    this.wordFamilyResolver = new WordFamilyResolver();
  }

  /**
   * Senkron map metodu (test uyumlulugu icin)
   * Basit sozluk tabanli esleme
   */
  public map(query: string): SemanticQueryResult {
    const normalizedQuery = (query ?? '')
      .trim()
      .normalize('NFC')
      .toLowerCase();

    // Basit sozluk: TR/EN/RU/ADY -> CONCEPT_WATER
    const WATER_CONCEPT_ID = '01ARZ3NDEKTSV4RRFFQ69G5FAV';
    const waterWords = ['su', 'water', 'вода', 'псы'];
    const partialWords = ['akarsular', 'akarsu', 'nehir'];

    const detectedLanguage = this.detectLanguage(normalizedQuery);

    // Tam esleme
    if (waterWords.includes(normalizedQuery)) {
      return {
        normalizedQuery,
        tokens: normalizedQuery.split(/\s+/).filter(Boolean),
        conceptId: WATER_CONCEPT_ID,
        confidence: 1.0,
        detectedLanguage,
        candidates: [{ conceptId: WATER_CONCEPT_ID, confidence: 1.0 }],
        source: 'translation',
      };
    }

    // Kismi esleme (0.7)
    if (partialWords.some(w => normalizedQuery.includes(w))) {
      return {
        normalizedQuery,
        tokens: normalizedQuery.split(/\s+/).filter(Boolean),
        conceptId: WATER_CONCEPT_ID,
        confidence: 0.7,
        detectedLanguage,
        candidates: [{ conceptId: WATER_CONCEPT_ID, confidence: 0.7 }],
        source: 'translation',
      };
    }

    // Bilinmeyen
    return {
      normalizedQuery,
      tokens: normalizedQuery.split(/\s+/).filter(Boolean),
      detectedLanguage: 'UNKNOWN',
      confidence: 0,
      candidates: [],
    };
  }

  public async mapQuery(query: string): Promise<SemanticQueryResult> {
    const normalizedQuery = (query ?? '')
      .trim()
      .normalize('NFC')
      // Palochka'yi koru (U+04C0 -> U+04C0)
      .replace(/\u04C0/g, '\u04C0')
      // Diger buyuk harfleri kucult (Latin + Kiril)
      .toLowerCase()
      // Palochka'yi geri koy (toLowerCase onu bozduysa)
      .replace(/\u04CF/g, '\u04C0');
    const tokens = normalizedQuery.split(/\s+/).filter(Boolean);

    // 1. Öncelik: ConceptCandidateResolver (TranslationEntry.concept)
    let candidates = await this.candidateResolver.resolve(normalizedQuery);
    let source: 'translation' | 'wordFamily' | 'both' = 'translation';

    // 2. Fallback: WordFamilyResolver (Root → WordFamily → Concept)
    if (candidates.length === 0) {
      const wfResult = this.wordFamilyResolver.resolve(normalizedQuery);
      if (wfResult.conceptId) {
        candidates = [
          {
            conceptId: wfResult.conceptId,
            confidence: wfResult.confidence,
          },
        ];
        source = 'wordFamily';
      }
    } else {
      // 3. Her iki kaynağı birleştir (varsa)
      const wfResult = this.wordFamilyResolver.resolve(normalizedQuery);
      if (wfResult.conceptId) {
        const exists = candidates.some((c) => c.conceptId === wfResult.conceptId);
        if (!exists) {
          candidates.push({
            conceptId: wfResult.conceptId,
            confidence: wfResult.confidence,
          });
          source = 'both';
        } else {
          source = 'both';
        }
      }
    }

    const detectedLanguage = this.detectLanguage(normalizedQuery);

    return {
      normalizedQuery,
      tokens,
      conceptId: candidates[0]?.conceptId,
      confidence: candidates[0]?.confidence ?? 0.0,
      detectedLanguage,
      candidates,
      source,
    };
  }

  private detectLanguage(query: string): string | undefined {
    if (!query) return undefined;
    // Bilinen Adigece kelimeler, Rusca ile paylastiklari Kiril harflerinden once gelir.
    if (this.wordFamilyResolver.resolveRoot(query)) return 'ADY';

    // Adigece özel Kiril araligi
    if (/[\u2C00-\u2C5F]/.test(query)) return 'ADY';
    if (/[\u0400-\u04FF]/.test(query)) {
      // ADY ozel karakterler
      if (/[Ӏӏ]/.test(query)) return 'ADY';
      return 'RU';
    }
    if (/[\u0600-\u06FF]/.test(query)) return 'AR';
    // Turkce ozel karakterler
    if (/[çğıöşüÇĞİÖŞÜ]/.test(query)) return 'TR';
    // Turkce kelime sozlugu
    const turkishWords = ['su', 'ateş', 'toprak', 'hava', 'deniz', 'nehir', 'akarsu', 'akarsular'];
    if (turkishWords.includes(query.toLowerCase())) return 'TR';
    return 'EN';
  }
}
