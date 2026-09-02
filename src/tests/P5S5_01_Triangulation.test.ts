import { describe, it, expect, beforeEach } from 'vitest';
import { InMemoryTranslationRepository } from '../repository/InMemoryTranslationRepository';
import { InMemoryConceptRepository } from '../repository/InMemoryConceptRepository';
import { MeaningConceptLinker } from '../domain/concept/services/MeaningConceptLinker';
import * as ConceptModule from '../domain/concept';
import { TranslationEntry } from '../domain/translation';

const { Concept } = ConceptModule as any;
const ConceptID = (ConceptModule as any).ConceptID;

describe('P5S5-01: Cross-Lingual Concept Triangulation Sertifikasyonu', () => {
  let translationRepo: InMemoryTranslationRepository;
  let conceptRepo: InMemoryConceptRepository;
  let linker: MeaningConceptLinker;

  const CONCEPT_WATER_ID_STR = '01ARZ3NDEKTSV4RRFFQ69G5FA1';

  beforeEach(async () => {
    translationRepo = new InMemoryTranslationRepository();
    conceptRepo = new InMemoryConceptRepository();
    linker = new MeaningConceptLinker(conceptRepo);

    // ConceptID nesnesi oluşturma (create, constructor veya string desteği)
    let waterConceptId: any;
    if (ConceptID) {
      if (typeof ConceptID.create === 'function') {
        waterConceptId = ConceptID.create(CONCEPT_WATER_ID_STR);
      } else if (typeof ConceptID === 'function') {
        waterConceptId = new ConceptID(CONCEPT_WATER_ID_STR);
      }
    }
    if (!waterConceptId) {
      waterConceptId = CONCEPT_WATER_ID_STR;
    }

    // 1. Somut Concept Kaydı
    const waterConcept = new Concept({
      id: waterConceptId,
      prefLabel: 'Water',
      description: 'Yaşam için temel sıvı madde',
    });
    await conceptRepo.save(waterConcept);

    // 2. Çeviri Kayıtları (su - TR, water - EN, psı - KBD)
    const entryTr: TranslationEntry = {
      id: 'entry-su',
      lemma: 'su',
      normalizedLemma: 'su',
      language: 'TR',
      meanings: [
        {
          id: 'm-water-tr',
          text: 'su',
          language: 'TR',
        },
      ],
    } as any;

    const entryEn: TranslationEntry = {
      id: 'entry-water',
      lemma: 'water',
      normalizedLemma: 'water',
      language: 'EN',
      meanings: [
        {
          id: 'm-water-en',
          text: 'water',
          language: 'EN',
        },
      ],
    } as any;

    const entryKbd: TranslationEntry = {
      id: 'entry-psi',
      lemma: 'psı',
      normalizedLemma: 'psı',
      language: 'KBD',
      meanings: [
        {
          id: 'm-water-kbd',
          text: 'psı',
          language: 'KBD',
        },
      ],
    } as any;

    await translationRepo.save(entryTr);
    await translationRepo.save(entryEn);
    await translationRepo.save(entryKbd);

    // 3. MeaningConceptLinker Bağlantıları
    linker.link('m-water-tr', CONCEPT_WATER_ID_STR);
    linker.link('m-water-en', CONCEPT_WATER_ID_STR);
    linker.link('m-water-kbd', CONCEPT_WATER_ID_STR);
  });

  it('su, water ve psı sorgularının her biri bağımsız olarak CONCEPT_WATER nesnesine ulaşmalıdır', async () => {
    const testCases = [
      { query: 'su', expectedMeaningId: 'm-water-tr' },
      { query: 'water', expectedMeaningId: 'm-water-en' },
      { query: 'psı', expectedMeaningId: 'm-water-kbd' },
    ];

    for (const testCase of testCases) {
      // Step A: TranslationRepository Arama
      const entries = await translationRepo.search(testCase.query);
      expect(entries.length).toBeGreaterThan(0);

      const entry = entries.find((e) => e.lemma.toLowerCase() === testCase.query.toLowerCase());
      expect(entry).toBeDefined();

      const meaning = entry?.meanings?.[0];
      expect(meaning).toBeDefined();
      expect(meaning?.id).toBe(testCase.expectedMeaningId);

      // Step B: MeaningConceptLinker Çözümleme
      const resolvedConcept = await linker.resolveConcept(meaning!.id);
      expect(resolvedConcept).not.toBeNull();

      // Step C: Concept Triangulation Doğrulaması
      const conceptIdValue = typeof resolvedConcept!.id === 'string'
        ? resolvedConcept!.id
        : (typeof resolvedConcept!.id?.getValue === 'function' ? resolvedConcept!.id.getValue() : String(resolvedConcept!.id));

      expect(conceptIdValue).toBe(CONCEPT_WATER_ID_STR);
    }
  });
});