/**
 * File: src/domain/discovery/services/QuerySemanticMapper.ts
 * Layer: Service
 *
 * Query → Concept Resolution
 * Öncelik sırası:
 *   1. ConceptCandidateResolver (çeviri köprüsü)
 *   2. WordFamilyResolver (morfoloji köprüsü)
 *   3. ConceptLookupPort (veri kaynağı: lexemes/translations)
 *
 * Kural: Hiçbir aşama hard-coded sözlük kullanmaz. Veri yoksa undefined döner.
 */

import { TranslationService } from '@/services/TranslationService';
import { InMemoryTranslationRepository } from '@/repository/InMemoryTranslationRepository';
import { CONCEPT_REGISTRY, getConceptUlid } from '../../concept/ConceptRegistry';
import { ConceptCandidateResolver } from './ConceptCandidateResolver';
import { WordFamilyResolver } from './WordFamilyResolver';
import { ConceptCandidateDTO } from '../dto/ConceptCandidateDTO';
import { ConceptLookupPort } from '../ports/ConceptLookupPort';

export interface SemanticQueryResult {
  normalizedQuery: string;
  tokens: string[];
  conceptId?: string;
  confidence: number;
  detectedLanguage?: string;
  candidates?: ConceptCandidateDTO[];
  source?: 'translation' | 'wordFamily' | 'lookup' | 'both';
}

export interface QuerySemanticMapperDeps {
  translationService?: TranslationService;
  conceptLookupPort?: ConceptLookupPort;
}

export class QuerySemanticMapper {
  private candidateResolver: ConceptCandidateResolver;
  private wordFamilyResolver: WordFamilyResolver;
  private conceptLookupPort?: ConceptLookupPort;

  constructor(deps: TranslationService | QuerySemanticMapperDeps = {}) {
    // Geriye dönük uyumluluk: eski imza (TranslationService) de kabul edilir
    const isLegacy = !('conceptLookupPort' in deps) && !('translationService' in deps);
    const opts: QuerySemanticMapperDeps = isLegacy ? {} : (deps as QuerySemanticMapperDeps);

    const repo = new InMemoryTranslationRepository();
    const service = opts.translationService || new TranslationService(repo);
    this.candidateResolver = new ConceptCandidateResolver(service);
    this.wordFamilyResolver = new WordFamilyResolver();
    this.conceptLookupPort = opts.conceptLookupPort;
  }

  /** Registry anahtarı (WATER) veya ham string → ULID */
  private normalizeConceptId(rawId: string | undefined): string | undefined {
    if (!rawId) return undefined;
    const registryValue = (CONCEPT_REGISTRY as any)[rawId];
    if (registryValue) {
      return getConceptUlid(registryValue) ?? String(registryValue);
    }
    return rawId;
  }

  public map(query: string): SemanticQueryResult {
    // Senkron API — sadece WordFamilyResolver kullanır (lookup port asenkron olduğu için).
    const normalizedQuery = (query ?? '').trim().normalize('NFC').toLowerCase();
    const tokens = normalizedQuery.split(/\s+/).filter(Boolean);
    const detectedLanguage = this.detectLanguage(normalizedQuery);

    const wf = this.wordFamilyResolver.resolve(normalizedQuery);
    if (wf?.conceptId) {
      const conceptId = this.normalizeConceptId(wf.conceptId);
      if (conceptId) {
        return {
          normalizedQuery,
          tokens,
          conceptId,
          confidence: wf.confidence ?? 0.8,
          detectedLanguage,
          candidates: [{ conceptId, confidence: wf.confidence ?? 0.8 }],
          source: 'wordFamily',
        };
      }
    }

    return {
      normalizedQuery,
      tokens,
      detectedLanguage: detectedLanguage ?? 'UNKNOWN',
      confidence: 0,
      candidates: [],
    };
  }

  public async mapQuery(query: string): Promise<SemanticQueryResult> {
    const normalizedQuery = (query ?? '')
      .trim()
      .normalize('NFC')
      .replace(/\u04C0/g, '\u04C0')
      .toLowerCase()
      .replace(/\u04CF/g, '\u04C0');

    const tokens = normalizedQuery.split(/\s+/).filter(Boolean);
    const detectedLanguage = this.detectLanguage(normalizedQuery);

    // 1) ConceptCandidateResolver (çeviri verisi)
    let candidates: ConceptCandidateDTO[] = [];
    let source: 'translation' | 'wordFamily' | 'lookup' | 'both' = 'translation';
    try {
      const resolved = await this.candidateResolver.resolve(normalizedQuery);
      candidates = Array.isArray(resolved) ? resolved : [];
    } catch {
      candidates = [];
    }

    // 2) WordFamilyResolver (morfoloji)
    let wfResult: { conceptId?: string; confidence: number } = { conceptId: undefined, confidence: 0 };
    try {
      const r = this.wordFamilyResolver.resolve(normalizedQuery);
      wfResult = { conceptId: r?.conceptId, confidence: r?.confidence ?? 0 };
    } catch {
      wfResult = { conceptId: undefined, confidence: 0 };
    }

    if (wfResult.conceptId) {
      const normalized = this.normalizeConceptId(wfResult.conceptId);
      if (normalized) {
        const exists = candidates.some((c) => this.normalizeConceptId(c.conceptId) === normalized);
        if (!exists) {
          candidates.push({ conceptId: normalized, confidence: wfResult.confidence });
        }
        source = candidates.length > 1 ? 'both' : 'wordFamily';
      }
    }

    // 3) ConceptLookupPort (veri kaynağı) — hâlâ boşsa
    if (candidates.length === 0 && this.conceptLookupPort) {
      try {
        const hit = await this.conceptLookupPort.lookup(normalizedQuery);
        if (hit) {
          candidates = [{ conceptId: hit.conceptId, confidence: hit.confidence }];
          source = 'lookup';
        }
      } catch {
        // Veri kaynağı hata verirse sessizce yut, undefined dön
      }
    }

    const normalizedCandidates: ConceptCandidateDTO[] = candidates.map((c) => ({
      ...c,
      conceptId: this.normalizeConceptId(c.conceptId) as string,
    }));

    return {
      normalizedQuery,
      tokens,
      conceptId: normalizedCandidates[0]?.conceptId,
      confidence: normalizedCandidates[0]?.confidence ?? 0.0,
      detectedLanguage,
      candidates: normalizedCandidates,
      source,
    };
  }

  private detectLanguage(query: string): string | undefined {
    if (!query) return undefined;
    try {
      if (this.wordFamilyResolver.resolveRoot(query)) return 'ADY';
    } catch { /* noop */ }

    if (/[\u2C00-\u2C5F]/.test(query)) return 'ADY';
    if (/[\u0400-\u04FF]/.test(query)) {
      if (/[Ӏӏ]/.test(query)) return 'ADY';
      return 'RU';
    }
    if (/[\u0600-\u06FF]/.test(query)) return 'AR';
    if (/[çğıöşüÇĞİÖŞÜ]/.test(query)) return 'TR';
    const turkishWords = ['su', 'ateş', 'toprak', 'hava', 'deniz', 'nehir', 'akarsu', 'akarsular'];
    if (turkishWords.includes(query.toLowerCase())) return 'TR';
    return 'EN';
  }
}
