export interface ConceptCandidateDTO {
  readonly conceptId: string;
  readonly confidence: number; // 0.0 - 1.0 arası deterministik skor
}