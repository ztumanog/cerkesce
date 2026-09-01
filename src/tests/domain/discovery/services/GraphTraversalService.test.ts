import { describe, it, expect, beforeEach } from "vitest";
import { GraphTraversalService } from "../../../../domain/discovery/services/GraphTraversalService";
import { IConceptGraphRepository, ConceptNeighbor } from "../../../../domain/discovery/services/IConceptGraphRepository";
import { DiscoveryRelationType } from "../../../../domain/discovery/types/DiscoveryRelationType";

class InMemoryConceptGraphRepository implements IConceptGraphRepository {
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

describe("Phase 5 Sprint 2: GraphTraversalService (GT-001 - GT-008)", () => {
  let repo: InMemoryConceptGraphRepository;
  let service: GraphTraversalService;

  beforeEach(() => {
    repo = new InMemoryConceptGraphRepository();
    service = new GraphTraversalService(repo);
  });

  it("GT-001: Tek düğüm taraması ROOT tipinde tek düğüm döndürmelidir", () => {
    const nodes = service.traverse({ rootConceptId: "CONCEPT_WATER" });
    expect(nodes).toHaveLength(1);
    expect(nodes[0].conceptId).toBe("CONCEPT_WATER");
    expect(nodes[0].depth).toBe(0);
    expect(nodes[0].relationType).toBe(DiscoveryRelationType.ROOT);
  });

  it("GT-002: Depth 1 seviyesindeki komşuları doğru getirmelidir", () => {
    repo.addRelation("CONCEPT_WATER", "CONCEPT_RIVER", DiscoveryRelationType.RELATED);
    const nodes = service.traverse({ rootConceptId: "CONCEPT_WATER", maxDepth: 1 });

    expect(nodes).toHaveLength(2);
    expect(nodes[1].conceptId).toBe("CONCEPT_RIVER");
    expect(nodes[1].depth).toBe(1);
  });

  it("GT-003: Depth 2 zincirini getirmelidir (A -> B -> C)", () => {
    repo.addRelation("CONCEPT_WATER", "CONCEPT_ICE", DiscoveryRelationType.CHILD);
    repo.addRelation("CONCEPT_ICE", "CONCEPT_GLACIER", DiscoveryRelationType.RELATED);

    const nodes = service.traverse({ rootConceptId: "CONCEPT_WATER", maxDepth: 2 });

    expect(nodes).toHaveLength(3);
    expect(nodes.map(n => n.conceptId)).toEqual(["CONCEPT_WATER", "CONCEPT_ICE", "CONCEPT_GLACIER"]);
    expect(nodes[2].depth).toBe(2);
  });

  it("GT-004: Depth > 2 olan düğümleri kesmeli ve dönmemelidir (DepthLimit)", () => {
    repo.addRelation("A", "B", DiscoveryRelationType.RELATED);
    repo.addRelation("B", "C", DiscoveryRelationType.RELATED);
    repo.addRelation("C", "D", DiscoveryRelationType.RELATED);

    const nodes = service.traverse({ rootConceptId: "A", maxDepth: 2 });

    const conceptIds = nodes.map(n => n.conceptId);
    expect(conceptIds).toContain("A");
    expect(conceptIds).toContain("B");
    expect(conceptIds).toContain("C");
    expect(conceptIds).not.toContain("D");
  });

  it("GT-005: Cycle Detection (A -> B -> A) durumunda sonsuz döngüyü engellemelidir", () => {
    repo.addRelation("A", "B", DiscoveryRelationType.RELATED);
    repo.addRelation("B", "A", DiscoveryRelationType.RELATED);

    const nodes = service.traverse({ rootConceptId: "A", maxDepth: 2 });

    expect(nodes).toHaveLength(2);
    expect(nodes.map(n => n.conceptId)).toEqual(["A", "B"]);
  });

  it("GT-006: Farklı ilişki tiplerini (SYNONYM, ANTONYM, RELATED) korumalıdır", () => {
    repo.addRelation("A", "B", DiscoveryRelationType.SYNONYM);
    repo.addRelation("A", "C", DiscoveryRelationType.ANTONYM);
    repo.addRelation("A", "D", DiscoveryRelationType.RELATED);

    const nodes = service.traverse({ rootConceptId: "A", maxDepth: 1 });

    expect(nodes).toHaveLength(4);
    expect(nodes.find(n => n.conceptId === "B")?.relationType).toBe(DiscoveryRelationType.SYNONYM);
    expect(nodes.find(n => n.conceptId === "C")?.relationType).toBe(DiscoveryRelationType.ANTONYM);
    expect(nodes.find(n => n.conceptId === "D")?.relationType).toBe(DiscoveryRelationType.RELATED);
  });

  it("GT-007: Geniş grafiklerde BFS traversal sırasını korumalıdır (A -> B, C, D)", () => {
    repo.addRelation("A", "B", DiscoveryRelationType.RELATED);
    repo.addRelation("A", "C", DiscoveryRelationType.RELATED);
    repo.addRelation("A", "D", DiscoveryRelationType.RELATED);

    const nodes = service.traverse({ rootConceptId: "A", maxDepth: 1 });

    expect(nodes.map(n => n.conceptId)).toEqual(["A", "B", "C", "D"]);
  });

  it("GT-008: Hiç komşusu olmayan veya bilinmeyen düğümlerde güvenli şekilde tek düğüm dönmelidir", () => {
    const nodes = service.traverse({ rootConceptId: "UNKNOWN_ROOT" });

    expect(nodes).toHaveLength(1);
    expect(nodes[0].conceptId).toBe("UNKNOWN_ROOT");
    expect(nodes[0].depth).toBe(0);
    expect(nodes[0].relationType).toBe(DiscoveryRelationType.ROOT);
  });
});