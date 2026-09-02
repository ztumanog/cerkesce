import { defineConfig, configDefaults } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    include: ['src/tests/**/*.test.ts', 'src/repository/**/*.test.ts'],
    exclude: [
      ...configDefaults.exclude,
      'src/tests/domain/concept/**',
      'src/tests/certification/**',
      'src/tests/services/ConceptFacade.test.ts',
      'src/tests/repository/InMemoryConceptRepository.test.ts',
      'src/tests/P5S5_02_GraphTraversal.test.ts',
    ],
    coverage: {
      reporter: ['text', 'json', 'html'],
    },
  },
});