import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    exclude: [
      'node_modules/**',
      'dist/**',
      'src/tests/domain/concept/Concept.test.ts',
      'src/tests/domain/concept/MeaningConceptLinker.test.ts',
      'src/tests/domain/concept/MeaningGraph.test.ts',
      'src/tests/domain/concept/ConceptPerformance.test.ts',
      'src/tests/domain/concept/ConceptID.test.ts',
      'src/tests/domain/discovery/Sprint4GraphAwareE2E.test.ts',
      'src/tests/services/ConceptFacade.test.ts'
    ]
  }
});