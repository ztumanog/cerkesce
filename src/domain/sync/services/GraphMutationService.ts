import { ConceptId } from '../../shared/value-objects/ConceptId';

export interface GraphMutationEvent {
  mutationId: string;
  conceptId: string;
  type: 'NODE_ADDED' | 'NODE_UPDATED' | 'EDGE_CREATED' | 'EDGE_REMOVED';
  timestamp: number;
}

export class GraphMutationService {
  private static invalidatedKeys = new Set<string>();

  public static applyMutation(event: GraphMutationEvent): { success: boolean; invalidatedCacheKey: string } {
    if (!event.mutationId || typeof event.mutationId !== 'string' || event.mutationId.trim().length === 0) {
      throw new Error('GraphMutationEvent mutationId boş olamaz.');
    }

    const canonicalConceptId = ConceptId.create(event.conceptId);
    const cacheKey = `cache_concept_${canonicalConceptId.value}`;
    this.invalidatedKeys.add(cacheKey);

    return {
      success: true,
      invalidatedCacheKey: cacheKey
    };
  }

  public static isCacheInvalidated(cacheKey: string): boolean {
    return this.invalidatedKeys.has(cacheKey);
  }

  public static clear(): void {
    this.invalidatedKeys.clear();
  }
}