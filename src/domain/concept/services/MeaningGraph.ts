import { ConceptRepository } from '../repository/ConceptRepository';
import { ConceptID } from '../value-objects/ConceptID';
import { Concept } from '../Concept';
import { RelationType } from '../types/ConceptRelation';

export interface GraphTraversalResult {
  rootId: string;
  depth1: string[];
  depth2: string[];
}

export class MeaningGraph {
  constructor(private readonly conceptRepo: ConceptRepository) {}

  /**
   * ADR-0011 uyarınca Traversal Depth kesinlikle MAX 2 ile sınırlıdır.
   */
  public async traverse(rootConceptId: ConceptID): Promise<GraphTraversalResult> {
    const root = await this.conceptRepo.findById(rootConceptId);
    if (!root) {
      return { rootId: rootConceptId.getValue(), depth1: [], depth2: [] };
    }

    // Depth 1: Doğrudan bağlı targetConceptID'ler
    const depth1Ids = Array.from(
      new Set(root.relations.map(rel => rel.targetConceptId))
    );

    // Depth 2: Depth 1 düğümlerinin bağlı olduğu targetConceptID'ler
    const depth2IdsSet = new Set<string>();

    const depth1Concepts = await this.conceptRepo.findMany(
      depth1Ids.map(id => ConceptID.create(id))
    );

    for (const d1Concept of depth1Concepts) {
      for (const rel of d1Concept.relations) {
        const target = rel.targetConceptId;
        // Kök düğümün kendisini veya Depth 1 düğümlerini tekrar eklememek için filtreleme
        if (target !== rootConceptId.getValue() && !depth1Ids.includes(target)) {
          depth2IdsSet.add(target);
        }
      }
    }

    return {
      rootId: rootConceptId.getValue(),
      depth1: depth1Ids,
      depth2: Array.from(depth2IdsSet)
    };
  }

  public async getSynonyms(conceptId: ConceptID): Promise<string[]> {
    return this.getRelationsByType(conceptId, RelationType.SYNONYM);
  }

  public async getAntonyms(conceptId: ConceptID): Promise<string[]> {
    return this.getRelationsByType(conceptId, RelationType.ANTONYM);
  }

  public async getParentsAndChildren(conceptId: ConceptID): Promise<string[]> {
    const root = await this.conceptRepo.findById(conceptId);
    if (!root) return [];
    return root.relations
      .filter(r => r.type === RelationType.HYPONYM || r.type === RelationType.HOLONYM)
      .map(r => r.targetConceptId);
  }

  private async getRelationsByType(conceptId: ConceptID, type: RelationType): Promise<string[]> {
    const root = await this.conceptRepo.findById(conceptId);
    if (!root) return [];
    return root.relations
      .filter(r => r.type === type)
      .map(r => r.targetConceptId);
  }
}