import { ConceptCandidateDTO } from './ConceptCandidateDTO';

export type SearchIntent = 'concept_lookup' | 'relation_explore' | 'context_discovery';

export interface SemanticQueryDTO {
  readonly rawQuery: string;
  readonly normalizedQuery: string;
  readonly detectedLanguage: string; // 'TR' | 'EN' | 'RU' | 'ADY' | 'UNKNOWN'
  readonly intent: SearchIntent;
  readonly candidates: ConceptCandidateDTO[];
}