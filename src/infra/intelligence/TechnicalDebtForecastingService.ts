export interface DebtCategory {
  category: 'code' | 'test' | 'documentation';
  currentDebt: number;
  projectedDebt: number;
  trend: 'improving' | 'stable' | 'degrading';
  recommendation: string;
}

export interface TechnicalDebtReport {
  timestamp: string;
  categories: DebtCategory[];
  totalDebt: number;
  projectedTotal: number;
  status: 'ok' | 'warning' | 'critical';
}

export class TechnicalDebtForecastingService {
  static forecast(inputs?: {
    codeDebt?: number;
    testDebt?: number;
    docDebt?: number;
  }): TechnicalDebtReport {
    const m = inputs || {};

    const codeDebt = m.codeDebt ?? 0;
    const testDebt = m.testDebt ?? 0;
    const docDebt = m.docDebt ?? 0;

    const growthRate = 0.10;

    const categories: DebtCategory[] = [
      {
        category: 'code',
        currentDebt: codeDebt,
        projectedDebt: Math.ceil(codeDebt * (1 + growthRate)),
        trend: codeDebt > 5 ? 'degrading' : 'stable',
        recommendation: codeDebt > 5 ? 'Refactor planla' : 'Mevcut seviye kabul edilebilir',
      },
      {
        category: 'test',
        currentDebt: testDebt,
        projectedDebt: Math.ceil(testDebt * (1 + growthRate)),
        trend: testDebt > 3 ? 'degrading' : 'stable',
        recommendation: testDebt > 3 ? 'Test kapsamini artir' : 'Test kapsami yeterli',
      },
      {
        category: 'documentation',
        currentDebt: docDebt,
        projectedDebt: Math.ceil(docDebt * (1 + growthRate)),
        trend: docDebt > 2 ? 'degrading' : 'stable',
        recommendation: docDebt > 2 ? 'Belge guncelleme planla' : 'Belgeler guncel',
      },
    ];

    const totalDebt = categories.reduce((s, c) => s + c.currentDebt, 0);
    const projectedTotal = categories.reduce((s, c) => s + c.projectedDebt, 0);

    const status = totalDebt > 10 ? 'critical' : totalDebt > 5 ? 'warning' : 'ok';

    return {
      timestamp: new Date().toISOString(),
      categories,
      totalDebt,
      projectedTotal,
      status,
    };
  }
}
