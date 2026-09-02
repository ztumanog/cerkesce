import { DiscoveryResultDTO } from '../dto/DiscoveryResultDTO';
import { TraversalNode } from '../dto/TraversalNode';
import { KnowledgeRanker } from './KnowledgeRanker';
import { ContextClusterer } from './ContextClusterer';

export class DiscoveryAssembler {
  private readonly ranker = new KnowledgeRanker();
  private readonly clusterer = new ContextClusterer();

  public assemble(
    query: string,
    executionTimeMs: number,
    data: {
      conceptId?: string;
      canonicalName?: string;
      meanings?: any[];
      variants?: any[];
      traversalNodes?: TraversalNode[];
      maxDepth?: number;
    }
  ): DiscoveryResultDTO {
    const rawNodes = data.traversalNodes || [];
    const rankedConcepts = this.ranker.rank(rawNodes);
    const contextClusters = this.clusterer.cluster(rankedConcepts);

    return {
      query,
      conceptId: data.conceptId,
      canonicalName: data.canonicalName,
      meanings: data.meanings || [],
      variants: data.variants || [],
      relatedConcepts: rankedConcepts,
      contextClusters,
      graphMetadata: {
        traversedNodes: rawNodes.length,
        maxDepth: data.maxDepth ?? 2
      },
      executionTimeMs
    };
  }
}