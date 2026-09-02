export interface GraphMutationEvent {
  mutationId: string;
  conceptId: string;
  type: 'NODE_ADDED' | 'NODE_UPDATED' | 'EDGE_CREATED' | 'EDGE_REMOVED';
  timestamp: number;
}

export class GraphMutationService {
  private static invalidatedKeys = new Set<string>();

  public static applyMutation(event: GraphMutationEvent): { success: boolean; invalidatedCacheKey: string } {
    const cacheKey = `cache_concept_${event.conceptId}`;
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