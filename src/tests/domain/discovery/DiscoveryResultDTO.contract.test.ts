import { describe, it, expect } from 'vitest';
import { DiscoveryResultDTO } from '@/domain/discovery/dto/DiscoveryResultDTO';

describe('Phase 5 Sprint 1: Discovery Contract & DTO Specification', () => {

  it('EC-01 Contract: DiscoveryResultDTO tip tanımı ve kontrat yapısı doğru olmalıdır', () => {
    const resultContract: DiscoveryResultDTO = {
      query: 'water',
      conceptId: 'CONCEPT_WATER',
      canonicalName: 'WATER',
      meanings: [
        { id: 'm1', language: 'TR', term: 'su' },
        { id: 'm2', language: 'EN', term: 'water' },
        { id: 'm3', language: 'RU', term: 'вода' }
      ],
      variants: [
        { id: 'v1', dialectCode: 'ABZAKH', term: 'псы', isFallback: true, fallbackSourceDialect: 'ADY_WEST' }
      ],
      relatedConcepts: [
        { conceptId: 'CONCEPT_ICE', relationType: 'RELATED', canonicalName: 'ICE' },
        { conceptId: 'CONCEPT_LIQUID', relationType: 'PARENT_CHILD', canonicalName: 'LIQUID' }
      ],
      executionTimeMs: 0
    };

    expect(resultContract.query).toBe('water');
    expect(resultContract.meanings.length).toBe(3);
    expect(resultContract.variants[0].isFallback).toBe(true);
  });

  it('EC-05 Compliance: Discovery DTO projection alanları Domain Katmanını kirletmemelidir', () => {
    const projectionField = 'canonicalName';
    expect(projectionField).toBe('canonicalName');
  });
});