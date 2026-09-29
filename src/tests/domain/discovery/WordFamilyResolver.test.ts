import { describe, it, expect } from 'vitest';
import { WordFamilyResolver } from '../../../domain/discovery/services/WordFamilyResolver';
import { CONCEPT_REGISTRY } from '../../../domain/concept/ConceptRegistry';

describe('WordFamilyResolver', () => {
  const resolver = new WordFamilyResolver();

  it('WFR-001: щхьэ kelimesi HEAD conceptine gitmeli', () => {
    const result = resolver.resolve('щхьэ');
    expect(result.root).toBe('щхьэ');
    expect(result.conceptId).toBe(CONCEPT_REGISTRY.HEAD);
  });

  it('WFR-002: щхьэц kelimesi HAIR conceptine gitmeli', () => {
    const result = resolver.resolve('щхьэц');
    expect(result.root).toBe('щхьэ');
    expect(result.conceptId).toBe(CONCEPT_REGISTRY.HAIR);
  });

  it('WFR-003: щхьэгъубжэ kelimesi WINDOW conceptine gitmeli', () => {
    const result = resolver.resolve('щхьэгъубжэ');
    expect(result.root).toBe('щхьэ');
    expect(result.conceptId).toBe(CONCEPT_REGISTRY.WINDOW);
  });

  it('WFR-004: щхьэхуит kelimesi FREEDOM conceptine gitmeli', () => {
    const result = resolver.resolve('щхьэхуит');
    expect(result.root).toBe('щхьэ');
    expect(result.conceptId).toBe(CONCEPT_REGISTRY.FREEDOM);
  });

  it('WFR-005: псы kelimesi WATER conceptine gitmeli', () => {
    const result = resolver.resolve('псы');
    expect(result.root).toBe('псы');
    expect(result.conceptId).toBe(CONCEPT_REGISTRY.WATER);
  });

  it('WFR-006: гу kelimesi HEART conceptine gitmeli', () => {
    const result = resolver.resolve('гу');
    expect(result.root).toBe('гу');
    expect(result.conceptId).toBe(CONCEPT_REGISTRY.HEART);
  });

  it('WFR-007: bilinmeyen kelime undefined dönmeli', () => {
    const result = resolver.resolve('unknown_word_xyz');
    expect(result.root).toBeUndefined();
    expect(result.conceptId).toBeUndefined();
    expect(result.confidence).toBe(0.0);
  });

  it('WFR-008: щхьэ rootunun tüm türevleri dönmeli', () => {
    const derivatives = resolver.getDerivatives('щхьэ');
    expect(derivatives.length).toBeGreaterThan(10);
    expect(derivatives).toContain('щхьэ');
    expect(derivatives).toContain('щхьэц');
    expect(derivatives).toContain('щхьэгъубжэ');
  });

  it('WFR-009: щхьэ rootunun tüm conceptleri dönmeli', () => {
    const concepts = resolver.getConceptsByRoot('щхьэ');
    expect(concepts).toContain(CONCEPT_REGISTRY.HEAD);
    expect(concepts).toContain(CONCEPT_REGISTRY.HAIR);
    expect(concepts).toContain(CONCEPT_REGISTRY.WINDOW);
    expect(concepts).toContain(CONCEPT_REGISTRY.FREEDOM);
  });

  it('WFR-010: tüm rootlar dönmeli', () => {
    const roots = resolver.getAllRoots();
    expect(roots).toContain('щхьэ');
    expect(roots).toContain('псы');
    expect(roots).toContain('гу');
    expect(roots).toContain('нэ');
    expect(roots).toContain('Ӏэ');
    expect(roots).toContain('лъэ');
    expect(roots).toContain('бзэ');
    expect(roots).toContain('псэ');
    expect(roots).toContain('пэ');
    expect(roots).toContain('дзэ');
  });
});
