import { describe, it, expect, beforeEach } from 'vitest';
import { MeaningConceptLinker } from '../../../domain/concept/services/MeaningConceptLinker';

describe('Sprint 3: CE-10 & CE-13 - MeaningConceptLinker Bridge', () => {
  let linker: MeaningConceptLinker;

  beforeEach(() => {
    linker = new MeaningConceptLinker();
  });

  it('Phase 2 Meaning ID ile Phase 3 Concept ID arasında M:N bağ kurabilmelidir', () => {
    const link = linker.link('meaning-101', 'TEST_CONCEPT_1');
    expect(link.meaningId).toBe('meaning-101');
    expect(link.conceptId).toBe('TEST_CONCEPT_1');
  });

  it('CE-13: Reverse Concept Lookup - Concept ID üzerinden bağlı Meaning ID leri getirebilmelidir', () => {
    const conceptId = 'TEST_CONCEPT_1';
    linker.link('meaning-101', conceptId);
    linker.link('meaning-102', conceptId);

    const meaningIds = linker.getMeaningsByConceptId(conceptId);
    expect(meaningIds).toHaveLength(2);
    expect(meaningIds).toContain('meaning-101');
    expect(meaningIds).toContain('meaning-102');
  });

  it('Meaning ID üzerinden bağlı Concept ID leri getirebilmelidir', () => {
    const meaningId = 'meaning-200';
    linker.link(meaningId, 'TEST_CONCEPT_1');
    linker.link(meaningId, 'TEST_CONCEPT_2');

    const conceptIds = linker.getConceptsByMeaningId(meaningId);
    expect(conceptIds).toHaveLength(2);
  });
});
