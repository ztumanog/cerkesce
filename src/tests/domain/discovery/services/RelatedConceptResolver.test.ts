import { describe, it, expect, beforeEach } from "vitest";
import { RelatedConceptResolver } from "../../../../domain/discovery/services/RelatedConceptResolver";
import { TraversalNode } from "../../../../domain/discovery/dto/TraversalNode";
import { DiscoveryRelationType } from "../../../../domain/discovery/types/DiscoveryRelationType";

describe("Phase 5 Sprint 2: RelatedConceptResolver", () => {
  let resolver: RelatedConceptResolver;

  beforeEach(() => {
    resolver = new RelatedConceptResolver();
  });

  it("ROOT düğümlerini relatedConcepts listesinden filtrelemelidir", () => {
    const nodes: TraversalNode[] = [
      { conceptId: "A", depth: 0, relationType: DiscoveryRelationType.ROOT },
      { conceptId: "B", depth: 1, relationType: DiscoveryRelationType.RELATED, parentConceptId: "A" }
    ];

    const dtos = resolver.resolveDTOs(nodes);

    expect(dtos).toHaveLength(1);
    expect(dtos[0].conceptId).toBe("B");
  });

  it("İlişki tiplerine göre kavramları doğru kategorize etmelidir", () => {
    const nodes: TraversalNode[] = [
      { conceptId: "A", depth: 0, relationType: DiscoveryRelationType.ROOT },
      { conceptId: "B", depth: 1, relationType: DiscoveryRelationType.SYNONYM, parentConceptId: "A" },
      { conceptId: "C", depth: 1, relationType: DiscoveryRelationType.ANTONYM, parentConceptId: "A" },
      { conceptId: "D", depth: 1, relationType: DiscoveryRelationType.PARENT, parentConceptId: "A" },
      { conceptId: "E", depth: 1, relationType: DiscoveryRelationType.CHILD, parentConceptId: "A" },
      { conceptId: "F", depth: 1, relationType: DiscoveryRelationType.RELATED, parentConceptId: "A" }
    ];

    const categorized = resolver.categorize(nodes);

    expect(categorized.synonyms).toHaveLength(1);
    expect(categorized.synonyms[0].conceptId).toBe("B");

    expect(categorized.antonyms).toHaveLength(1);
    expect(categorized.antonyms[0].conceptId).toBe("C");

    expect(categorized.parents).toHaveLength(1);
    expect(categorized.parents[0].conceptId).toBe("D");

    expect(categorized.children).toHaveLength(1);
    expect(categorized.children[0].conceptId).toBe("E");

    expect(categorized.related).toHaveLength(1);
    expect(categorized.related[0].conceptId).toBe("F");
  });
});