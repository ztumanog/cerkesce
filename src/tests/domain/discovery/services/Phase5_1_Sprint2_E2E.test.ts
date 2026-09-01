import { describe, it, expect, beforeEach } from "vitest";
import { DiscoveryAssembler } from "../../../../domain/discovery/services/DiscoveryAssembler";
import { GraphTraversalService } from "../../../../domain/discovery/services/GraphTraversalService";
import { RelatedConceptResolver } from "../../../../domain/discovery/services/RelatedConceptResolver";
import { DiscoveryRelationType } from "../../../../domain/discovery/types/DiscoveryRelationType";
import { IConceptGraphRepository, ConceptNeighbor } from "../../../../domain/discovery/services/IConceptGraphRepository";

class MockConceptGraphRepository implements IConceptGraphRepository {
  private adjacencyList: Map<string, ConceptNeighbor[]> = new Map();

  public addRelation(source: string, target: string, type: DiscoveryRelationType): void {
    if (!this.adjacencyList.has(source)) {
      this.adjacencyList.set(source, []);
    }
    this.adjacencyList.get(source)!.push({ targetConceptId: target, relationType: type });
  }

  public getNeighbors(conceptId: string): ConceptNeighbor[] {
    return this.adjacencyList.get(conceptId) || [];
  }
}

describe("Phase 5.1 Sprint 2: E2E Knowledge Discovery Pipeline", () => {
  let mockRepo: MockConceptGraphRepository;
  let traversalService: GraphTraversalService;
  let resolver: RelatedConceptResolver;
  let assembler: DiscoveryAssembler;

  beforeEach(() => {
    mockRepo = new MockConceptGraphRepository();
    
    // Su grafını kur: WATER -> ICE (RELATED), RIVER (PARENT), LIQUID (SYNONYM)
    mockRepo.addRelation("CONCEPT_WATER", "CONCEPT_ICE", DiscoveryRelationType.RELATED);
    mockRepo.addRelation("CONCEPT_WATER", "CONCEPT_RIVER", DiscoveryRelationType.PARENT);
    mockRepo.addRelation("CONCEPT_WATER", "CONCEPT_LIQUID", DiscoveryRelationType.SYNONYM);

    traversalService = new GraphTraversalService(mockRepo);
    resolver = new RelatedConceptResolver();
    assembler = new DiscoveryAssembler(resolver);
  });

  it("Ham graf düğümlerini çözümlemeli ve DiscoveryResultDTO v2 olarak doğru monte etmelidir", () => {
    // 1. Graph Traversal (Kontrata uygun { rootConceptId, maxDepth } nesnesi ile)
    const traversalNodes = traversalService.traverse({ rootConceptId: "CONCEPT_WATER", maxDepth: 2 });

    expect(traversalNodes).toBeDefined();
    expect(traversalNodes).toHaveLength(4); // ROOT + 3 Komşu

    // 2. Assembler & Resolver Entegrasyonu
    const resultDTO = assembler.assemble("su", 12, {
      conceptId: "CONCEPT_WATER",
      canonicalName: "water",
      traversalNodes,
      maxDepth: 2
    });

    // 3. Uçtan Uca Doğrulamalar
    expect(resultDTO.query).toBe("su");
    expect(resultDTO.conceptId).toBe("CONCEPT_WATER");
    expect(resultDTO.executionTimeMs).toBe(12);

    // ROOT filtresinin çalıştığını ve 3 ilişkili kavramın geldiğini doğrula
    expect(resultDTO.relatedConcepts).toBeDefined();
    expect(resultDTO.relatedConcepts).toHaveLength(3);

    const hasRoot = resultDTO.relatedConcepts?.some(c => c.relationType === DiscoveryRelationType.ROOT);
    expect(hasRoot).toBe(false);

    // Metadata Kontratı Doğrulaması
    expect(resultDTO.graphMetadata).toEqual({
      maxDepth: 2,
      traversedNodes: 4
    });
  });
});