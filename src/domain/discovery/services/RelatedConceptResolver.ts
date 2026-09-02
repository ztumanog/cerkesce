import { TraversalNode } from '../dto/TraversalNode';
import { RelatedConceptDTO } from '../dto/DiscoveryResultDTO';
import { DiscoveryRelationType } from '../types/DiscoveryRelationType';

export interface CategorizedConcepts {
  synonyms: RelatedConceptDTO[];
  antonyms: RelatedConceptDTO[];
  parents: RelatedConceptDTO[];
  children: RelatedConceptDTO[];
  related: RelatedConceptDTO[];
}

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

  public categorize(nodes?: TraversalNode[] | any): CategorizedConcepts {
    if (!nodes || !Array.isArray(nodes)) {
      return {
        synonyms: [],
        antonyms: [],
        parents: [],
        children: [],
        related: []
      };
    }

    const dtos = this.resolveDTOs(nodes);

    return {
      synonyms: dtos.filter(dto => dto.relationType === DiscoveryRelationType.SYNONYM),
      antonyms: dtos.filter(dto => dto.relationType === DiscoveryRelationType.ANTONYM),
      parents: dtos.filter(dto => dto.relationType === DiscoveryRelationType.PARENT),
      children: dtos.filter(dto => dto.relationType === DiscoveryRelationType.CHILD),
      related: dtos.filter(dto => dto.relationType === DiscoveryRelationType.RELATED)
    };
  }
}