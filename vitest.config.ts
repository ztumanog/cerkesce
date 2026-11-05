import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve('./src'),
    },
  },
  test: { globals: true,
    include: ['src/tests/**/*.test.ts', 'src/repository/**/*.test.ts'],
    exclude: [
      'src/tests/smoke/**',
      'src/tests/api/**',
      'src/tests/certification/**',
      'src/tests/ui/**',
      'src/tests/P5S5_02_GraphTraversal.test.ts',
      'src/tests/certification/**',
      '**/node_modules/**',
      'src/tests/domain/DialectAnalytics.test.ts',
      'src/tests/domain/ConceptGraph.test.ts',
    ],
  },
});






