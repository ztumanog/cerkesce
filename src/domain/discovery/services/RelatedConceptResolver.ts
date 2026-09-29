import { TraversalNode } from '../dto/TraversalNode';
import { RelatedConceptDTO } from '../dto/RelatedConceptDTO';
import { DiscoveryRelationType } from '../types/DiscoveryRelationType';
import { getConceptDisplayName } from '@/domain/concept/ConceptRegistry';

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
      .map(node => {
        const display = getConceptDisplayName(node.conceptId);
        const displayName = display?.kbd || display?.tr || node.conceptId;
        const displayNameTr = display?.tr;
        return {
          conceptId: node.conceptId,
          displayName,
          displayNameTr,
          relationType: node.relationType,
          depth: node.depth,
          parentConceptId: node.parentConceptId
        };
      });
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
