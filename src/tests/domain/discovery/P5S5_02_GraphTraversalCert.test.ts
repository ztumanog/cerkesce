import { describe, it, expect } from 'vitest';
import { GraphTraversalService } from '../../../domain/discovery/services/GraphTraversalService';
import { IConceptGraphRepository } from '../../../domain/discovery/services/IConceptGraphRepository';
import { DiscoveryRelationType } from '../../../domain/discovery/types/DiscoveryRelationType';

class InMemoryGraphRepo implements IConceptGraphRepository {
  private adjacency = new Map<string, Array<{ targetConceptId: string; relationType: DiscoveryRelationType }>>();

  public addRelation(sourceId: string, targetId: string, relationType: DiscoveryRelationType = DiscoveryRelationType.RELATED): void {
    if (!this.adjacency.has(sourceId)) {
      this.adjacency.set(sourceId, []);
    }
    this.adjacency.get(sourceId)!.push({ targetConceptId: targetId, relationType });
  }

  public getNeighbors(conceptId: string) {
    return this.adjacency.get(conceptId) || [];
  }
}

describe('P5S5-02: Graph Traversal Certification', () => {
  it('GTC-001: Multiple Paths - Should ensure Unique Node Traversal for convergent paths', () => {
    const repo = new InMemoryGraphRepo();
    // A -> B -> D
    // A -> C -> D
    repo.addRelation('A', 'B', DiscoveryRelationType.RELATED);
    repo.addRelation('A', 'C', DiscoveryRelationType.RELATED);
    repo.addRelation('B', 'D', DiscoveryRelationType.STATE_OF);
    repo.addRelation('C', 'D', DiscoveryRelationType.STATE_OF);

    const service = new GraphTraversalService(repo);
    const nodes = service.traverse('A', 2);

    const dNodes = nodes.filter(n => n.conceptId === 'D');
    expect(dNodes).toHaveLength(1);
    expect(nodes.map(n => n.conceptId)).toEqual(['A', 'B', 'C', 'D']);
  });

  it('GTC-002: Large Breadth - Should process 100+ direct neighbors deterministically under SLA', () => {
    const repo = new InMemoryGraphRepo();
    for (let i = 1; i <= 100; i++) {
      repo.addRelation('A', `B_${i}`, DiscoveryRelationType.RELATED);
    }

    const service = new GraphTraversalService(repo);
    const startTime = performance.now();
    const nodes = service.traverse('A', 2);
    const duration = performance.now() - startTime;

    expect(nodes).toHaveLength(101);
    expect(duration).toBeLessThan(50);
  });

  it('GTC-003: Self Reference - Should gracefully handle self-referencing loops', () => {
    const repo = new InMemoryGraphRepo();
    repo.addRelation('A', 'A', DiscoveryRelationType.RELATED);

    const service = new GraphTraversalService(repo);
    const nodes = service.traverse('A', 2);

    expect(nodes).toHaveLength(1);
    expect(nodes[0].conceptId).toBe('A');
    expect(nodes[0].relationType).toBe(DiscoveryRelationType.ROOT);
  });

  it('GTC-004: Diamond Graph - Should traverse diamond structure with exact depth and uniqueness', () => {
    const repo = new InMemoryGraphRepo();
    //     A
    //    / \
    //   B   C
    //    \ /
    //     D
    repo.addRelation('A', 'B', DiscoveryRelationType.RELATED);
    repo.addRelation('A', 'C', DiscoveryRelationType.RELATED);
    repo.addRelation('B', 'D', DiscoveryRelationType.LOCATION_OF);
    repo.addRelation('C', 'D', DiscoveryRelationType.LOCATION_OF);

    const service = new GraphTraversalService(repo);
    const nodes = service.traverse('A', 2);

    const ids = nodes.map(n => n.conceptId);
    expect(ids).toEqual(['A', 'B', 'C', 'D']);

    const dNode = nodes.find(n => n.conceptId === 'D');
    expect(dNode?.depth).toBe(2);
  });

  it('GTC-005: Max Depth Hard Stop - Should strictly stop traversal at depth 2', () => {
    const repo = new InMemoryGraphRepo();
    // A -> B -> C -> D -> E
    repo.addRelation('A', 'B', DiscoveryRelationType.RELATED);
    repo.addRelation('B', 'C', DiscoveryRelationType.RELATED);
    repo.addRelation('C', 'D', DiscoveryRelationType.RELATED);
    repo.addRelation('D', 'E', DiscoveryRelationType.RELATED);

    const service = new GraphTraversalService(repo);
    const nodes = service.traverse('A', 2);

    const ids = nodes.map(n => n.conceptId);
    expect(ids).toEqual(['A', 'B', 'C']);
    expect(ids).not.toContain('D');
    expect(ids).not.toContain('E');
  });
});
