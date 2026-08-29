// @/lib/source-registry.ts
import { SourceMetadata, SourceMetadataSchema } from '@/types/source';

export class SourceRegistryService {
  private static instance: SourceRegistryService;
  private registry: Map<string, SourceMetadata> = new Map();

  private constructor() {}

  public static getInstance(): SourceRegistryService {
    if (!SourceRegistryService.instance) {
      SourceRegistryService.instance = new SourceRegistryService();
    }
    return SourceRegistryService.instance;
  }

  public registerSource(rawData: unknown): SourceMetadata {
    const parseResult = SourceMetadataSchema.safeParse(rawData);
    
    if (!parseResult.success) {
      throw new Error(`[SourceRegistry] Şema Doğrulama Hatası: ${parseResult.error.message}`);
    }

    const data = parseResult.data;
    this.registry.set(data.id, data);
    return data;
  }

  public getSource(id: string): SourceMetadata | undefined {
    return this.registry.get(id);
  }

  public getAllSources(): ReadonlyArray<SourceMetadata> {
    return Array.from(this.registry.values());
  }
}