import { SemanticQueryDTO, SearchIntent } from '../dto/SemanticQueryDTO';
import { ConceptCandidateDTO } from '../dto/ConceptCandidateDTO';

export interface ConceptLookupDictionary {
  [key: string]: { conceptId: string; language: string };
}

export class QuerySemanticMapper {
  private dictionary: ConceptLookupDictionary;

  constructor(customDictionary?: ConceptLookupDictionary) {
    // Varsayılan Çoklu Dil -> Concept Eşleşme Sözlüğü (Deterministik)
    this.dictionary = customDictionary || {
      'su': { conceptId: '01ARZ3NDEKTSV4RRFFQ69G5FAV', language: 'TR' },
      'water': { conceptId: '01ARZ3NDEKTSV4RRFFQ69G5FAV', language: 'EN' },
      'вода': { conceptId: '01ARZ3NDEKTSV4RRFFQ69G5FAV', language: 'RU' },
      'псы': { conceptId: '01ARZ3NDEKTSV4RRFFQ69G5FAV', language: 'ADY' },
      'psı': { conceptId: '01ARZ3NDEKTSV4RRFFQ69G5FAV', language: 'ADY' },
      'akarsu': { conceptId: '01ARZ3NDEKTSV4RRFFQ69G5FB0', language: 'TR' },
      'river': { conceptId: '01ARZ3NDEKTSV4RRFFQ69G5FB0', language: 'EN' },
      'buz': { conceptId: '01ARZ3NDEKTSV4RRFFQ69G5FB2', language: 'TR' },
      'ice': { conceptId: '01ARZ3NDEKTSV4RRFFQ69G5FB2', language: 'EN' }
    };
  }

  public map(query: string): SemanticQueryDTO {
    const rawQuery = query || '';
    const normalizedQuery = this.normalize(rawQuery);

    if (!normalizedQuery) {
      return {
        rawQuery,
        normalizedQuery: '',
        detectedLanguage: 'UNKNOWN',
        intent: 'concept_lookup',
        candidates: []
      };
    }

    const match = this.dictionary[normalizedQuery];
    
    if (match) {
      return {
        rawQuery,
        normalizedQuery,
        detectedLanguage: match.language,
        intent: this.determineIntent(normalizedQuery),
        candidates: [
          {
            conceptId: match.conceptId,
            confidence: 1.0
          }
        ]
      };
    }

    // Aday bulunamadıysa partial/fallback araması
    const candidates = this.findPartialCandidates(normalizedQuery);

    return {
      rawQuery,
      normalizedQuery,
      detectedLanguage: 'UNKNOWN',
      intent: 'context_discovery',
      candidates
    };
  }

  private normalize(input: string): string {
    return input
      .trim()
      .toLowerCase()
      .replace(/I/g, 'ı')
      .replace(/İ/g, 'i')
      .normalize('NFC');
  }

  private determineIntent(normalizedQuery: string): SearchIntent {
    if (normalizedQuery.length <= 3) {
      return 'concept_lookup';
    }
    return 'context_discovery';
  }

  private findPartialCandidates(normalizedQuery: string): ConceptCandidateDTO[] {
    const matches: ConceptCandidateDTO[] = [];
    
    for (const key of Object.keys(this.dictionary)) {
      if (key.includes(normalizedQuery) || normalizedQuery.includes(key)) {
        matches.push({
          conceptId: this.dictionary[key].conceptId,
          confidence: 0.7
        });
      }
    }

    return matches.sort((a, b) => b.confidence - a.confidence);
  }
}