export const WATER_CONCEPT_ID = '01ARZ3NDEKTSV4RRFFQ69G5FAV';

export interface CandidateMatch {
  conceptId: string;
  conceptLabel: string;
  confidence: number;
  matchType: 'EXACT' | 'PARTIAL';
}

export interface QuerySemanticMappingResult {
  query: string;
  rawQuery: string;
  normalizedQuery: string;
  detectedLanguage: 'TR' | 'EN' | 'RU' | 'ADY' | 'UNKNOWN';
  candidates: CandidateMatch[];
}

export class QuerySemanticMapper {
  private dictionary: Array<{
    term: string;
    conceptId: string;
    conceptLabel: string;
    lang: 'TR' | 'EN' | 'RU' | 'ADY';
  }> = [
    { term: 'su', conceptId: WATER_CONCEPT_ID, conceptLabel: 'WATER', lang: 'TR' },
    { term: 'water', conceptId: WATER_CONCEPT_ID, conceptLabel: 'WATER', lang: 'EN' },
    { term: 'вода', conceptId: WATER_CONCEPT_ID, conceptLabel: 'WATER', lang: 'RU' },
    { term: 'псы', conceptId: WATER_CONCEPT_ID, conceptLabel: 'WATER', lang: 'ADY' },
    { term: 'akarsu', conceptId: '01ARZ3NDEKTSV4RRFFQ69G5FAW', conceptLabel: 'RIVER', lang: 'TR' }
  ];

  public map(rawQuery: string): QuerySemanticMappingResult {
    const normalizedQuery = (rawQuery || '').trim().toLowerCase();

    if (!normalizedQuery) {
      return {
        query: rawQuery,
        rawQuery,
        normalizedQuery: '',
        detectedLanguage: 'UNKNOWN',
        candidates: []
      };
    }

    // 1. Exact Match Check
    const exactMatches = this.dictionary.filter(d => d.term === normalizedQuery);
    if (exactMatches.length > 0) {
      const match = exactMatches[0];
      return {
        query: rawQuery,
        rawQuery,
        normalizedQuery,
        detectedLanguage: match.lang,
        candidates: exactMatches.map(m => ({
          conceptId: m.conceptId,
          conceptLabel: m.conceptLabel,
          confidence: 1.0,
          matchType: 'EXACT'
        }))
      };
    }

    // 2. Language Detection Heuristics
    let detectedLanguage: 'TR' | 'EN' | 'RU' | 'ADY' | 'UNKNOWN' = 'UNKNOWN';

    if (/[\u0400-\u04FF]/.test(normalizedQuery)) {
      if (normalizedQuery.includes('псы') || normalizedQuery.includes('шы')) {
        detectedLanguage = 'ADY';
      } else {
        detectedLanguage = 'RU';
      }
    } else if (/[çğıöşü]/i.test(normalizedQuery) || normalizedQuery.includes('su') || normalizedQuery.includes('akar')) {
      detectedLanguage = 'TR';
    } else if (/^[a-z0-9\s]+$/i.test(normalizedQuery)) {
      detectedLanguage = 'EN';
    }

    // 3. Partial Match Fallback
    const candidates: CandidateMatch[] = [];
    for (const item of this.dictionary) {
      if (normalizedQuery.includes(item.term) || item.term.includes(normalizedQuery)) {
        if (detectedLanguage === 'UNKNOWN') {
          detectedLanguage = item.lang;
        }
        candidates.push({
          conceptId: item.conceptId,
          conceptLabel: item.conceptLabel,
          confidence: 0.7,
          matchType: 'PARTIAL'
        });
      }
    }

    return {
      query: rawQuery,
      rawQuery,
      normalizedQuery,
      detectedLanguage,
      candidates
    };
  }
}