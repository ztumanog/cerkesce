export interface DialectVariation {
  term: string;
  dialect: 'EAST_KABARDIAN' | 'WEST_ADYGHE';
  phoneticSpelling?: string;
  usageContext?: string;
}

export interface DialectSemanticAnalysisDTO {
  conceptId: string;
  conceptLabel: string;
  eastDialect: string[];
  westDialect: string[];
  coverageScore: number;
  isPerfectMatch: boolean;
  discrepancies: string[];
  phoneticShiftPatterns?: string[];
  analyzedAt: string;
}