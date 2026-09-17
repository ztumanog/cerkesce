/**
 * File: vitest.config.ts
 * Generated: 17.09.2026
 * Layer: Configuration
 */

import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['src/tests/**/*.test.ts'],
    exclude: [
      '**/node_modules/**',
      'src/tests/domain/DialectAnalytics.test.ts',
      'src/tests/domain/ExportEngine.test.ts',
      'src/tests/domain/LayoutAndBatchExport.test.ts',
      'src/tests/domain/ConceptGraph.test.ts',
    ],
  },
});