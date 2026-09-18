import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve('./src'),
    },
  },
  test: {
    include: ['src/tests/**/*.test.ts', 'src/repository/**/*.test.ts'],
    exclude: [
      'src/tests/api/**',
      'src/tests/certification/**',
      'src/tests/ui/**',
      'src/tests/P5S5_02_GraphTraversal.test.ts',
      'src/tests/domain/discovery/QuerySemanticMapper.cert.test.ts',
      'src/tests/domain/discovery/Phase5_4_NetworkExplorer.cert.test.ts',
      'src/tests/certification/**',
      '**/node_modules/**',
      'src/tests/domain/DialectAnalytics.test.ts',
      'src/tests/domain/ExportEngine.test.ts',
      'src/tests/domain/LayoutAndBatchExport.test.ts',
      'src/tests/domain/ConceptGraph.test.ts',
    ],
  },
});
