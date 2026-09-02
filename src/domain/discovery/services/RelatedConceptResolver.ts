import { TraversalNode } from '../dto/TraversalNode';
import { RelatedConceptDTO } from '../dto/DiscoveryResultDTO';
import { DiscoveryRelationType } from '../types/DiscoveryRelationType';

export class RelatedConceptResolver {
  public resolveDTOs(nodes?: TraversalNode[] | any): RelatedConceptDTO[] {
    if (!nodes || !Array.isArray(nodes)) {
      return [];
    }

    return nodes
      .filter(node => node && node.relationType !== DiscoveryRelationType.ROOT)
      .map(node => ({
        conceptId: node.conceptId,
        relationType: node.relationType,
        depth: node.depth,
        parentConceptId: node.parentConceptId
      }));
  }
}