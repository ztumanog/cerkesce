import { describe, it, expect } from 'vitest';
import { RootClassifier } from '@/domain/morphology/RootClassifier';

describe('ADR-0040: RootClassifier', () => {
  const classifier = new RootClassifier();

  it('RC-001: Bos form NEUTRAL', () => {
    const r = classifier.classify('');
    expect(r.type).toBe('NEUTRAL');
    expect(r.confidence).toBe(0);
  });

  it('RC-002: Bilinen stabil root (гу)', () => {
    const r = classifier.classify('гу');
    expect(r.type).toBe('STABLE');
    expect(r.confidence).toBe(1.0);
  });

  it('RC-003: Bilinen stabil root (псы)', () => {
    const r = classifier.classify('псы');
    expect(r.type).toBe('STABLE');
  });

  it('RC-004: Bound root isareti (-сы)', () => {
    const r = classifier.classify('-сы');
    expect(r.type).toBe('BOUND');
  });

  it('RC-005: Bound root icerigi', () => {
    const r = classifier.classify('сы');
    expect(r.type).toBe('BOUND');
    expect(r.confidence).toBeGreaterThanOrEqual(0.9);
  });

  it('RC-006: Free root (bilinmeyen form)', () => {
    const r = classifier.classify('къэ');
    expect(r.type).toBe('FREE');
  });

  it('RC-007: Toplu siniflandirma', () => {
    const results = classifier.classifyBatch(['гу', 'псы', '-сы']);
    expect(results.length).toBe(3);
    expect(results[0].type).toBe('STABLE');
    expect(results[1].type).toBe('STABLE');
    expect(results[2].type).toBe('BOUND');
  });

  it('RC-008: isBound', () => {
    expect(classifier.isBound('-сы')).toBe(true);
    expect(classifier.isBound('гу')).toBe(false);
  });

  it('RC-009: isFree', () => {
    expect(classifier.isFree('къэ')).toBe(true);
    expect(classifier.isFree('гу')).toBe(false);
  });

  it('RC-010: getType', () => {
    expect(classifier.getType('гу')).toBe('STABLE');
    expect(classifier.getType('-сы')).toBe('BOUND');
  });
});
