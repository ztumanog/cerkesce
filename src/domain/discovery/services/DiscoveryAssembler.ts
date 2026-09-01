import { DiscoveryResultDTO } from '../dto/DiscoveryResultDTO';
import { TraversalNode } from '../dto/TraversalNode';
import { RelatedConceptResolver } from './RelatedConceptResolver';

export class DiscoveryAssembler {
  private readonly resolver: RelatedConceptResolver;

  constructor(resolver?: RelatedConceptResolver) {
    this.resolver = resolver ?? new RelatedConceptResolver();
  }

  public assemble(
    query: string,
    executionTimeMs: number,
    options: {
      conceptId?: string;
      canonicalName?: string;
      meanings?: any[];
      variants?: any[];
      dialects?: any[];
      traversalNodes?: TraversalNode[];
      maxDepth?: number;
    }
  ): DiscoveryResultDTO {
    const meanings = options.meanings ?? [];
    const variants = options.variants ?? [];
    const dialects = options.dialects ?? [];
    const traversalNodes = options.traversalNodes ?? [];

    const relatedConcepts = this.resolver.resolveDTOs(traversalNodes);

    const dto: DiscoveryResultDTO = {
      query,
      conceptId: options.conceptId,
      canonicalName: options.canonicalName,
      meanings,
      variants,
      dialects,
      executionTimeMs
    };

    if (relatedConcepts.length > 0) {
      dto.relatedConcepts = relatedConcepts;
      dto.graphMetadata = {
        maxDepth: options.maxDepth ?? 2,
        traversedNodes: traversalNodes.length
      };
    }

    return dto;
  }
}