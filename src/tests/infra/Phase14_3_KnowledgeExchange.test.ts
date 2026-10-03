import { describe, it, expect, beforeEach } from 'vitest';
import { KnowledgeExchangeService } from '../../infra/ecosystem/KnowledgeExchangeService';

describe('Sprint 14.3 - KnowledgeExchangeService', () => {
  beforeEach(() => {
    KnowledgeExchangeService.clear();
  });

  it('Paket olusturur', () => {
    const pkg = KnowledgeExchangeService.create({
      source: 'platform-a',
      target: 'platform-b',
      type: 'adr',
      content: { adr: 'ADR-001' },
    });
    expect(pkg.id).toBeDefined();
    expect(pkg.status).toBe('pending');
  });

  it('Paket transfer eder', () => {
    const pkg = KnowledgeExchangeService.create({
      source: 'a',
      target: 'b',
      type: 'pattern',
      content: { pattern: 'test' },
    });
    const result = KnowledgeExchangeService.transfer(pkg.id);
    expect(result.success).toBe(true);
  });

  it('Olmayan paket hata', () => {
    const result = KnowledgeExchangeService.transfer('unknown');
    expect(result.success).toBe(false);
  });

  it('Rapor uretir', () => {
    const pkg = KnowledgeExchangeService.create({
      source: 'a',
      target: 'b',
      type: 'metric',
      content: {},
    });
    KnowledgeExchangeService.transfer(pkg.id);
    const report = KnowledgeExchangeService.getReport();
    expect(report.transferred).toBe(1);
    expect(report.status).toBe('ok');
  });

  it('Basarisiz paket critical', () => {
    const pkg = KnowledgeExchangeService.create({
      source: 'a',
      target: 'b',
      type: 'lesson',
      content: {},
    });
    KnowledgeExchangeService.fail(pkg.id);
    const report = KnowledgeExchangeService.getReport();
    expect(report.status).toBe('critical');
  });
});
