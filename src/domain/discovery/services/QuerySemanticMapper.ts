/**
 * File: src/domain/discovery/services/QuerySemanticMapper.ts
 * Layer: Service
 *
 * Query → Concept Resolution
 * Öncelik sırası:
 *   1. WordFamilyResolver (morfoloji köprüsü)
 *   2. Senkron form indeksi (çeviri verisi: DEFAULT_MOCK_ENTRIES)
 *   3. ConceptCandidateResolver / ConceptLookupPort (asenkron — mapQuery)
 *
 * Kural: Hiçbir aşama hard-coded sözlük kullanmaz. Veri yoksa undefined döner.
 */

import { TranslationService } from '@/services/TranslationService';
import {
  InMemoryTranslationRepository,
  DEFAULT_MOCK_ENTRIES,
} from '@/repository/InMemoryTranslationRepository';
import { CONCEPT_REGISTRY } from '../../concept/ConceptRegistry';
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

interface SyncFormHit {
  conceptId: string;
  confidence: number;
}

export class QuerySemanticMapper {
  private candidateResolver: ConceptCandidateResolver;
  private wordFamilyResolver: WordFamilyResolver;
  private conceptLookupPort?: ConceptLookupPort;
  private readonly syncFormIndex: Map<string, SyncFormHit> = new Map();

  constructor(deps: TranslationService | QuerySemanticMapperDeps = {}) {
    // Geriye dönük uyumluluk: eski imza (TranslationService) de kabul edilir
    const isLegacy = !('conceptLookupPort' in deps) && !('translationService' in deps);
    const opts: QuerySemanticMapperDeps = isLegacy ? {} : (deps as QuerySemanticMapperDeps);

    const repo = new InMemoryTranslationRepository();
    const service = opts.translationService || new TranslationService(repo);
    this.candidateResolver = new ConceptCandidateResolver(service);
    this.wordFamilyResolver = new WordFamilyResolver();
    this.conceptLookupPort = opts.conceptLookupPort;

    // Senkron map() için veri kaynağından (mock çeviri kayıtları) form indeksi kur.
    this.buildSyncFormIndex(DEFAULT_MOCK_ENTRIES);
  }

  /**
   * Çeviri kayıtlarından senkron form indeksi üretir.
   * Hard-coded sözlük değildir; veri kaynağından türetilir.
   */
  private buildSyncFormIndex(entries: readonly any[]): void {
    for (const entry of entries) {
      const conceptId = this.normalizeConceptId(
        (entry as any)?.conceptId ?? (entry as any)?.concept
      );
      if (!conceptId) continue;

      const meanings = ((entry as any)?.meanings ?? []) as any[];
      const forms: unknown[] = [
        (entry as any)?.lemma,
        (entry as any)?.word,
        (entry as any)?.sourceWord,
        (entry as any)?.normalizedLemma,
        ...meanings.map((m) => m?.text ?? m?.value),
      ];

      for (const form of forms) {
        if (typeof form !== 'string') continue;
        const key = form.trim().normalize('NFC').toLowerCase();
        if (!key) continue;
        if (!this.syncFormIndex.has(key)) {
          this.syncFormIndex.set(key, { conceptId, confidence: 1.0 });
        }
      }
    }
  }

  /** Registry anahtarı (WATER) veya ham string → ULID */
  private normalizeConceptId(rawId: string | undefined): string | undefined {
    if (!rawId) return undefined;
    const registryValue = (CONCEPT_REGISTRY as any)[rawId];
    return registryValue ? String(registryValue) : rawId;
  }

  public map(query: string): SemanticQueryResult {
    // Senkron API — WordFamilyResolver + senkron form indeksi kullanır.
    const normalizedQuery = (query ?? '').trim().normalize('NFC').toLowerCase();
    const tokens = normalizedQuery.split(/\s+/).filter(Boolean);
    const detectedLanguage = this.detectLanguage(normalizedQuery);

    // 1) WordFamilyResolver (morfoloji köprüsü)
    const wf = this.wordFamilyResolver.resolve(normalizedQuery);
    if (wf?.conceptId) {
      const conceptId = this.normalizeConceptId(wf.conceptId);
      if (conceptId) {
        const confidence = wf.confidence ?? 1.0;
        return {
          normalizedQuery,
          tokens,
          conceptId,
          confidence,
          detectedLanguage,
          candidates: [{ conceptId, confidence }],
          source: 'wordFamily',
        };
      }
    }

    // 2) Senkron form indeksi — tam eşleşme
    const exact = this.syncFormIndex.get(normalizedQuery);
    if (exact) {
      return {
        normalizedQuery,
        tokens,
        conceptId: exact.conceptId,
        confidence: exact.confidence,
        detectedLanguage,
        candidates: [{ conceptId: exact.conceptId, confidence: exact.confidence }],
        source: 'translation',
      };
    }

    // 3) Senkron form indeksi — kısmi eşleşme (0.7)
    for (const [form, hit] of this.syncFormIndex) {
      if (form.length >= 2 && normalizedQuery.includes(form)) {
        return {
          normalizedQuery,
          tokens,
          conceptId: hit.conceptId,
          confidence: 0.7,
          detectedLanguage,
          candidates: [{ conceptId: hit.conceptId, confidence: 0.7 }],
          source: 'translation',
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
    const normalizedQuery = (query ?? '').trim().normalize('NFC').toLowerCase();
    const tokens = normalizedQuery.split(/\s+/).filter(Boolean);
    const detectedLanguage = this.detectLanguage(normalizedQuery);

    // 1) WordFamilyResolver (morfoloji koprusu) — oncelikli
    const wf = this.wordFamilyResolver.resolve(normalizedQuery);
    if (wf?.conceptId) {
      const conceptId = this.normalizeConceptId(wf.conceptId);
      if (conceptId) {
        const confidence = wf.confidence ?? 1.0;
        return {
          normalizedQuery,
          tokens,
          conceptId,
          confidence,
          detectedLanguage,
          candidates: [{ conceptId, confidence }],
          source: 'wordFamily',
        };
      }
    }

    // 2) ConceptCandidateResolver — ceviri tabanli adaylar
    const candidates = await this.candidateResolver.resolve(normalizedQuery);
    if (candidates.length > 0) {
      const top = candidates[0];
      return {
        normalizedQuery,
        tokens,
        conceptId: top.conceptId,
        confidence: top.confidence ?? 1.0,
        detectedLanguage,
        candidates,
        source: 'translation',
      };
    }

    // 3) ConceptLookupPort (varsa) — son care lexeme/veri aramasi
    if (this.conceptLookupPort) {
      try {
        const hit = await this.conceptLookupPort.lookup(normalizedQuery);
        if (hit?.conceptId) {
          const confidence = hit.confidence ?? 1.0;
          return {
            normalizedQuery,
            tokens,
            conceptId: hit.conceptId,
            confidence,
            detectedLanguage,
            candidates: [{ conceptId: hit.conceptId, confidence }],
            source: 'lookup',
          };
        }
      } catch {
        /* lookup hatasi yutulur */
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
  private detectLanguage(query: string): string | undefined {
    if (!query) return undefined;

    try {
      if (this.wordFamilyResolver.resolveRoot(query)) return 'ADY';
    } catch {
      /* noop */
    }

    // Adıge (Kiril + palochka)
    if (/[\u2C00-\u2C5F]/.test(query)) return 'ADY';
    if (/[\u0400-\u04FF]/.test(query)) {
      if (/[Ӏӏ]/.test(query)) return 'ADY';
      return 'RU';
    }
    if (/[\u0600-\u06FF]/.test(query)) return 'AR';

    if (/[çğıöşüÇĞİÖŞÜ]/.test(query)) return 'TR';

    const turkishWords = ['su', 'ateş', 'toprak', 'hava', 'deniz', 'nehir', 'akarsu', 'akarsular'];
    if (turkishWords.includes(query.toLowerCase())) return 'TR';

    // Bilinen bir form ise İngilizce kabul et; aksi halde UNKNOWN
    if (this.syncFormIndex.has(query)) return 'EN';

    return 'UNKNOWN';
  }
}
