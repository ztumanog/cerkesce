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
    if (/[\u0400-\u04FF]/.test(query)) return 'RU';
    if (/[\u0600-\u06FF]/.test(query)) return 'AR';
    if (/[\u2C00-\u2C5F]/.test(query)) return 'ADY';
    if (/[çğıöşü]/i.test(query)) return 'TR';
    return 'EN';
  }
}
