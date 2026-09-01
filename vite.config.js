import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    include: ['src/tests/**/*.test.ts'],
    exclude: [
      // Kilitli Fazlar - Phase 3+
      'src/tests/domain/concept/Concept.test.ts',
      'src/tests/domain/concept/MeaningConceptLinker.test.ts',
      'src/tests/domain/concept/MeaningGraph.test.ts',
      'src/tests/domain/concept/ConceptPerformance.test.ts',
      'src/tests/domain/discovery/**/*.test.ts',
      'src/tests/services/ConceptFacade.test.ts',
    ],
    coverage: {
      reporter: ['text', 'json', 'html'],
    },
  },
})