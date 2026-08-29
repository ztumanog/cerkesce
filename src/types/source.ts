// @/types/source.ts
import { z } from 'zod';

export const SourceMetadataSchema = z.object({
  id: z.string().uuid(),
  code: z.string().min(2),
  title: z.string(),
  author: z.string().optional(),
  year: z.number().int().positive().optional(),
  targetLanguages: z.array(z.string()),
  isAcademic: z.boolean().default(false),
  priority: z.number().int().default(1),
});

export type SourceMetadata = z.infer<typeof SourceMetadataSchema>;

export interface RawDefinition {
  definitions?: Array<{ meaning?: string }>;
  full_definition_in_html?: string;
  tanim?: string;
  meaning?: string;
}