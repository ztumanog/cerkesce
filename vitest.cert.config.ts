import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve('./src'),
    },
  },
  test: {
    include: [
      'src/tests/api/**/*.test.ts',
      'src/tests/certification/**/*.test.ts',
      'src/tests/ui/**/*.test.ts',
      'src/tests/**/*.cert.test.ts',
      'src/tests/P5S5_02_GraphTraversal.test.ts',
      'src/tests/domain/DialectAnalytics.test.ts',
      'src/tests/domain/ExportEngine.test.ts',
      'src/tests/domain/LayoutAndBatchExport.test.ts',
      'src/tests/domain/ConceptGraph.test.ts',
    ],
    exclude: ['**/node_modules/**'],
  },
});
