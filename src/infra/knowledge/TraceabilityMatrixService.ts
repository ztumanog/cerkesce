export interface TraceabilityEntry {
  requirementId: string;
  adrId: string;
  testId: string;
  status: 'covered' | 'partial' | 'missing';
}

export interface MatrixRow {
  requirementId: string;
  adrs: string[];
  tests: string[];
  coverage: number;
  status: 'covered' | 'partial' | 'missing';
}

export interface TraceabilityReport {
  timestamp: string;
  totalRequirements: number;
  totalAdrs: number;
  totalTests: number;
  rows: MatrixRow[];
  coveragePercent: number;
  status: 'ok' | 'warning' | 'critical';
}

export class TraceabilityMatrixService {
  private static entries: TraceabilityEntry[] = [];

  static add(entry: TraceabilityEntry): void {
    this.entries.push(entry);
  }

  static getReport(): TraceabilityReport {
    const requirements = [...new Set(this.entries.map(e => e.requirementId))];

    const rows: MatrixRow[] = requirements.map(reqId => {
      const reqEntries = this.entries.filter(e => e.requirementId === reqId);
      const adrs = [...new Set(reqEntries.map(e => e.adrId))];
      const tests = [...new Set(reqEntries.map(e => e.testId))];

      const covered = reqEntries.filter(e => e.status === 'covered').length;
      const coverage = reqEntries.length > 0
        ? Math.round((covered / reqEntries.length) * 100)
        : 0;

      const status: MatrixRow['status'] = coverage === 100 ? 'covered'
        : coverage > 0 ? 'partial' : 'missing';

      return { requirementId: reqId, adrs, tests, coverage, status };
    });

    const allAdrs = [...new Set(this.entries.map(e => e.adrId))];
    const allTests = [...new Set(this.entries.map(e => e.testId))];

    const coveredRows = rows.filter(r => r.status === 'covered').length;
    const coveragePercent = rows.length > 0
      ? Math.round((coveredRows / rows.length) * 100)
      : 0;

    const status = coveragePercent >= 80 ? 'ok'
      : coveragePercent >= 50 ? 'warning' : 'critical';

    return {
      timestamp: new Date().toISOString(),
      totalRequirements: requirements.length,
      totalAdrs: allAdrs.length,
      totalTests: allTests.length,
      rows,
      coveragePercent,
      status,
    };
  }

  static clear(): void {
    this.entries = [];
  }
}
