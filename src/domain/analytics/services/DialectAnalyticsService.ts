export class DialectAnalyticsService {
  static analyzeConceptDialects(
    conceptId: string, 
    conceptName: string, 
    variations: any[]
  ) {
    // ADR-16: dialectCode kullan, kbd/ady kodlarını normalize et
    const unique = [
      ...new Map(
        variations.map((v: any) => [
          `${v.dialectCode || v.dialect}${v.form || v.term}`, 
          v
        ])
      ).values()
    ];
    
    // ADR-16: kbd / ady (case-insensitive)
    const normalize = (code: string) => (code || '').toLowerCase();
    
    const east = unique.filter((v: any) => 
      normalize(v.dialectCode || v.dialect) === 'kbd'
    );
    const west = unique.filter((v: any) => 
      normalize(v.dialectCode || v.dialect) === 'ady'
    );
    
    const coverage = (east.length > 0 ? 0.5 : 0) + (west.length > 0 ? 0.5 : 0);
    
    return { 
      conceptId, 
      conceptName, 
      eastDialect: east, 
      westDialect: west, 
      coverageScore: coverage, 
      variations: unique,
      isPerfectMatch: coverage === 1.0,
      discrepancies: [
        ...(east.length === 0 ? ['Missing East Kabardian representation'] : []),
        ...(west.length === 0 ? ['Missing West Adyghe representation'] : []),
      ]
    };
  }
}