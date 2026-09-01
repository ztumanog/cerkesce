import { TraversalNode } from '../dto/TraversalNode';
import { RelatedConceptDTO, CategorizedRelatedConcepts } from '../dto/RelatedConceptDTO';
import { DiscoveryRelationType } from '../types/DiscoveryRelationType';

export class RelatedConceptResolver {
  public resolveDTOs(nodes: TraversalNode[]): RelatedConceptDTO[] {
    // ROOT haricindeki ilişkili kavramları DTO listesine dönüştürür
    return nodes
      .filter(node => node.relationType !== DiscoveryRelationType.ROOT)
      .map(node => ({
        conceptId: node.conceptId,
        relationType: node.relationType,
        depth: node.depth,
        parentConceptId: node.parentConceptId
      }));
  }

  public categorize(nodes: TraversalNode[]): CategorizedRelatedConcepts {
    const dtos = this.resolveDTOs(nodes);
    
    return {
      synonyms: dtos.filter(d => d.relationType === DiscoveryRelationType.SYNONYM),
      antonyms: dtos.filter(d => d.relationType === DiscoveryRelationType.ANTONYM),
      parents: dtos.filter(d => d.relationType === DiscoveryRelationType.PARENT),
      children: dtos.filter(d => d.relationType === DiscoveryRelationType.CHILD),
      related: dtos.filter(d => d.relationType === DiscoveryRelationType.RELATED)
    };
  }
}