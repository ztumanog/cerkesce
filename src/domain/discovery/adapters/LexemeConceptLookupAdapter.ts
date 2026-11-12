/**
 * File: src/domain/discovery/adapters/LexemeConceptLookupAdapter.ts
 * Layer: Adapter (Hexagonal Architecture)
 *
 * ConceptLookupPort'un somut implementasyonu.
 * Veri kaynağı: public/data/linguistic/lexemes.json + concept_mapping.json
 *
 * Arama alanları (öncelik sırası):
 *   1. form, lemma, normalizedLemma
 *   2. literalMeaning (string veya {tr, en, ru} objesi)
 *   3. meaning (string veya {tr, en, ru} objesi)
 *   4. concept_mapping.json (form → conceptId)
 *
 * Kural: veride yoksa null döner. Hard-coded fallback YOK.
 */

import { ConceptLookupPort, ConceptLookupResult } from '../ports/ConceptLookupPort';

interface LexemeRecord {
  id?: string;
  form?: string;
  lemma?: string;
  normalizedLemma?: string;
  literalMeaning?: string | Record<string, unknown>;
  meaning?: string | Record<string, unknown>;
  conceptId?: string;
  [key: string]: unknown;
}

interface ConceptMapping {
  [form: string]: string;
}

export interface LexemeAdapterOptions {
  lexemes?: LexemeRecord[];
  conceptMapping?: ConceptMapping;
}

export class LexemeConceptLookupAdapter implements ConceptLookupPort {
  private readonly formIndex: Map<string, string> = new Map();
  private readonly conceptMapping: ConceptMapping;

  constructor(options: LexemeAdapterOptions = {}) {
    this.conceptMapping = options.conceptMapping ?? {};

    const lexemes = options.lexemes ?? [];
    for (const lex of lexemes) {
      const conceptKey = lex.conceptId;
      if (!conceptKey) continue;

      const conceptId = this.resolveConceptId(conceptKey);
      if (!conceptId) continue;

      // 1) form / lemma / normalizedLemma
      for (const candidate of [lex.form, lex.lemma, lex.normalizedLemma]) {
        this.register(candidate, conceptId);
      }

      // 2) literalMeaning / meaning — string veya {tr,en,ru} objesi
      for (const meaning of [lex.literalMeaning, lex.meaning]) {
        for (const candidate of this.extractStrings(meaning)) {
          this.register(candidate, conceptId);
        }
      }
    }

    // 3) concept_mapping.json
    for (const [form, conceptKey] of Object.entries(this.conceptMapping)) {
      const conceptId = this.resolveConceptId(conceptKey);
      if (!conceptId) continue;
      this.register(form, conceptId);
    }
  }

  private register(candidate: unknown, conceptId: string): void {
    if (typeof candidate !== 'string') return;
    const trimmed = candidate.trim();
    if (!trimmed) return;

    const key = this.normalize(trimmed);
    if (!this.formIndex.has(key)) {
      this.formIndex.set(key, conceptId);
    }

    // Ayrıca çoklu anlam ("su, nehir" gibi) parçalarını da index'e ekle
    for (const part of trimmed.split(/[,;/]/)) {
      const partKey = this.normalize(part);
      if (partKey && !this.formIndex.has(partKey)) {
        this.formIndex.set(partKey, conceptId);
      }
    }
  }

  private extractStrings(value: unknown): string[] {
    if (!value) return [];
    if (typeof value === 'string') return [value];
    if (typeof value === 'object') {
      return Object.values(value as Record<string, unknown>)
        .filter((v): v is string => typeof v === 'string');
    }
    return [];
  }

  private normalize(s: string): string {
    return (s ?? '').trim().normalize('NFC').toLowerCase();
  }

  private resolveConceptId(raw: string): string | undefined {
    const trimmed = (raw ?? '').trim();
    return trimmed || undefined;
  }

  public async lookup(normalizedQuery: string): Promise<ConceptLookupResult | null> {
    const key = this.normalize(normalizedQuery);
    if (!key) return null;

    const conceptId = this.formIndex.get(key);
    if (!conceptId) return null;

    return {
      conceptId,
      confidence: 1.0,
      source: 'lexeme',
    };
  }
}


