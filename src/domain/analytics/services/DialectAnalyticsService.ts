import { DialectSemanticAnalysisDTO, DialectVariation } from '../dto/DialectSemanticAnalysisDTO';

export class DialectAnalyticsService {
  /**
   * Analyzes semantic overlap and phonetic discrepancy between East and West dialects.
   */
  public static analyzeConceptDialects(
    conceptId: string,
    conceptLabel: string,
    variations: DialectVariation[]
  ): DialectSemanticAnalysisDTO {
    const eastTerms = Array.from(new Set(
      variations.filter(v => v.dialect === 'EAST_KABARDIAN').map(v => v.term)
    ));

    const westTerms = Array.from(new Set(
      variations.filter(v => v.dialect === 'WEST_ADYGHE').map(v => v.term)
    ));

    const intersections = eastTerms.filter(t => westTerms.includes(t));
    const totalUniqueTerms = Array.from(new Set([...eastTerms, ...westTerms]));

    const coverageScore = totalUniqueTerms.length > 0 
      ? Number((intersections.length / totalUniqueTerms.length).toFixed(2))
      : 0;

    const discrepancies: string[] = [];

    if (eastTerms.length === 0) {
      discrepancies.push('Missing East Kabardian representation');
    }
    if (westTerms.length === 0) {
      discrepancies.push('Missing West Adyghe representation');
    }
    if (coverageScore < 1.0 && eastTerms.length > 0 && westTerms.length > 0) {
      discrepancies.push('Linguistic variance or phonetic shift detected between dialects');
    }

    return {
      conceptId,
      conceptLabel,
      eastDialect: eastTerms,
      westDialect: westTerms,
      coverageScore,
      isPerfectMatch: coverageScore === 1.0,
      discrepancies,
      analyzedAt: new Date().toISOString()
    };
  }
}