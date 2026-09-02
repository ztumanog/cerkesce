export interface FederatedSourceNode {
  id: string;
  dialect: 'EASTERN_KABARDIAN' | 'WESTERN_ADYGHE';
  label: string;
}

export class FederatedGraphService {
  public static mergeSources(sources: FederatedSourceNode[][]): FederatedSourceNode[] {
    const registry = new Map<string, FederatedSourceNode>();

    for (const sourceList of sources) {
      for (const node of sourceList) {
        if (!registry.has(node.id)) {
          registry.set(node.id, node);
        }
      }
    }

    return Array.from(registry.values());
  }
}