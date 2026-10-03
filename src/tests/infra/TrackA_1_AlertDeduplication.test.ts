import { describe, it, expect, beforeEach } from 'vitest';
import { AlertDeduplicationService } from '../../infra/operations/AlertDeduplicationService';

describe('Track A.1 - AlertDeduplicationService', () => {
  beforeEach(() => {
    AlertDeduplicationService.clear();
  });

  it('Alert ekler', () => {
    const alert = AlertDeduplicationService.add({
      type: 'memory',
      message: 'Memory high',
      severity: 'warning',
      source: 'api',
    });
    expect(alert.id).toBeDefined();
  });

  it('Duplicate tespit eder', () => {
    AlertDeduplicationService.add({
      type: 'memory',
      message: 'Memory high 1',
      severity: 'warning',
      source: 'api',
    });
    AlertDeduplicationService.add({
      type: 'memory',
      message: 'Memory high 2',
      severity: 'warning',
      source: 'api',
    });
    const result = AlertDeduplicationService.deduplicate(5);
    expect(result.uniqueAlerts.length).toBe(1);
    expect(result.duplicateCount).toBe(1);
  });

  it('Farkli kaynaklar ayrisir', () => {
    AlertDeduplicationService.add({
      type: 'memory',
      message: 'Memory',
      severity: 'warning',
      source: 'api',
    });
    AlertDeduplicationService.add({
      type: 'memory',
      message: 'Memory',
      severity: 'warning',
      source: 'worker',
    });
    const result = AlertDeduplicationService.deduplicate(5);
    expect(result.uniqueAlerts.length).toBe(2);
  });

  it('Bos alert listesi', () => {
    const result = AlertDeduplicationService.deduplicate(5);
    expect(result.uniqueAlerts.length).toBe(0);
  });
});
