import { describe, it, expect, beforeEach } from 'vitest';
import { InMemoryTranslationRepository } from '../repository/InMemoryTranslationRepository';
import { InMemoryConceptRepository } from '../repository/InMemoryConceptRepository';
import { MeaningConceptLinker } from '../domain/concept/services/MeaningConceptLinker';
import { Concept } from '../domain/concept/Concept';
import { TranslationEntry } from '../domain/translation';

describe('P5S5-01: Cross-Lingual Concept Triangulation Sertifikasyonu', () => {
  let translationRepo: InMemoryTranslationRepository;
  let conceptRepo: InMemoryConceptRepository;
  let linker: MeaningConceptLinker;

  const CONCEPT_WATER_ID_STR = 'TEST_CONCEPT_1';

  beforeEach(async () => {
    translationRepo = new InMemoryTranslationRepository();
    conceptRepo = new InMemoryConceptRepository();
    linker = new MeaningConceptLinker(conceptRepo);

    const waterConceptId = CONCEPT_WATER_ID_STR;

    const waterConcept = new Concept({
      id: waterConceptId,
      preferredLabel: 'Water',
      description: 'Yasam icin temel sivi madde',
    });
    await conceptRepo.save(waterConcept);

    const entryTr: TranslationEntry = {
      id: 'entry-su',
      lemma: 'su',
      normalizedLemma: 'su',
      language: 'TR',
      meanings: [{ id: 'm-water-tr', text: 'su', language: 'TR' }],
    } as any;

    const entryEn: TranslationEntry = {
      id: 'entry-water',
      lemma: 'water',
      normalizedLemma: 'water',
      language: 'EN',
      meanings: [{ id: 'm-water-en', text: 'water', language: 'EN' }],
    } as any;

    const entryKbd: TranslationEntry = {
      id: 'entry-psi',
      lemma: 'psi',
      normalizedLemma: 'psi',
      language: 'KBD',
      meanings: [{ id: 'm-water-kbd', text: 'psi', language: 'KBD' }],
    } as any;

    await translationRepo.save(entryTr);
    await translationRepo.save(entryEn);
    await translationRepo.save(entryKbd);

    linker.link('m-water-tr', CONCEPT_WATER_ID_STR);
    linker.link('m-water-en', CONCEPT_WATER_ID_STR);
    linker.link('m-water-kbd', CONCEPT_WATER_ID_STR);
  });

  it('su, water ve psi sorgulari CONCEPT_WATER nesnesine ulasmali', async () => {
    const testCases = [
      { query: 'su', expectedMeaningId: 'm-water-tr' },
      { query: 'water', expectedMeaningId: 'm-water-en' },
      { query: 'psi', expectedMeaningId: 'm-water-kbd' },
    ];

    for (const testCase of testCases) {
      const entries = await translationRepo.search(testCase.query);
      expect(entries.length).toBeGreaterThan(0);

      const entry = entries.find((e) => e.lemma.toLowerCase() === testCase.query.toLowerCase());
      expect(entry).toBeDefined();

      const meaning = entry?.meanings?.[0];
      expect(meaning).toBeDefined();
      expect(meaning?.id).toBe(testCase.expectedMeaningId);

      const resolvedConcept = await linker.resolveConcept(meaning!.id!);
      expect(resolvedConcept).not.toBeNull();

      const conceptIdValue = resolvedConcept!.id.getValue();
      expect(conceptIdValue).toBe(CONCEPT_WATER_ID_STR);
    }
  });
});