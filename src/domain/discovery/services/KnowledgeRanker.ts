import { TraversalNode } from '../dto/TraversalNode';
import { DiscoveryRelationType } from '../types/DiscoveryRelationType';
import { RankedRelatedConceptDTO } from '../dto/RankedRelatedConceptDTO';

export class KnowledgeRanker {
  private getRelationWeight(relationType: any): number {
    if (!relationType) return 0.70;
    const str = String(relationType).toUpperCase();

    if (str.includes('STATE')) return 1.00;
    if (str.includes('CATEGORY')) return 0.85;
    if (str.includes('LOCATION')) return 0.80;
    if (str.includes('RELATED')) return 0.90;

    return 0.70;
  }

  private getDepthPenalty(depth: number): number {
    if (depth === 0) return 1.00;
    if (depth === 1) return 0.90;
    if (depth === 2) return 0.75;
    return 0.50;
  }

  private isRoot(relationType: any): boolean {
    if (!relationType) return false;
    return String(relationType).toUpperCase().includes('ROOT');
  }

  public rank(nodes: TraversalNode[]): RankedRelatedConceptDTO[] {
    const candidateNodes = nodes.filter(
      n => n.depth > 0 && !this.isRoot(n.relationType)
    );

    const ranked = candidateNodes.map(node => {
      const weight = this.getRelationWeight(node.relationType);
      const penalty = this.getDepthPenalty(node.depth);
      const score = Number((weight * penalty).toFixed(4));

      return {
        conceptId: node.conceptId,
        relationType: node.relationType,
        depth: node.depth,
        score,
        parentConceptId: node.parentConceptId
      };
    });

    return ranked.sort((a, b) => {
      if (b.score !== a.score) {
        return b.score - a.score;
      }
      return a.conceptId.localeCompare(b.conceptId);
    });
  }
}