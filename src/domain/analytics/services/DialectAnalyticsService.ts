export class DialectAnalyticsService {
  static analyzeConceptDialects(conceptId: string, conceptName: string, variations: any[]) {
    const unique = [...new Map(variations.map((v: any) => [v.dialectCode + v.form, v])).values()];
    const east = unique.filter((v: any) => v.dialectCode === "KBD" || v.dialectCode === "DOGU");
    const west = unique.filter((v: any) => v.dialectCode === "ADG" || v.dialectCode === "BATI");
    const coverage = (east.length > 0 ? 0.5 : 0) + (west.length > 0 ? 0.5 : 0);
    return { conceptId, conceptName, eastDialect: east, westDialect: west, coverageScore: coverage, variations: unique };
  }
}
