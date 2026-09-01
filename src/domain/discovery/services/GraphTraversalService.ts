import { TraversalRequest } from '../dto/TraversalRequest';
import { TraversalNode } from '../dto/TraversalNode';
import { DepthLimiter } from '../traversal/DepthLimiter';
import { CycleDetector } from '../traversal/CycleDetector';
import { DiscoveryRelationType } from '../types/DiscoveryRelationType';
import { MAX_TRAVERSAL_DEPTH, TraversalDepth } from '../types/TraversalDepth';
import { IConceptGraphRepository } from './IConceptGraphRepository';

/**
 * GraphTraversalService
 * 
 * Traversal Model: Unique Node Traversal (BFS)
 * ADR-0011 Governance: Depth <= 2
 */
export class GraphTraversalService {
  constructor(private readonly graphRepository: IConceptGraphRepository) {}

  public traverse(request: TraversalRequest): TraversalNode[] {
    const maxDepth: TraversalDepth = request.maxDepth ?? MAX_TRAVERSAL_DEPTH;
    const limiter = new DepthLimiter(maxDepth);
    const cycleDetector = new CycleDetector();
    const resultNodes: TraversalNode[] = [];

    // Root node
    cycleDetector.track(request.rootConceptId);
    resultNodes.push({
      conceptId: request.rootConceptId,
      depth: 0,
      relationType: DiscoveryRelationType.ROOT
    });

    // BFS Queue
    const queue: { conceptId: string; depth: number }[] = [{ conceptId: request.rootConceptId, depth: 0 }];

    while (queue.length > 0) {
      const current = queue.shift()!;

      // ADR-0011: Depth <= 2 Sınırı
      if (limiter.shouldStop(current.depth)) {
        continue;
      }

      const neighbors = this.graphRepository.getNeighbors(current.conceptId);

      for (const neighbor of neighbors) {
        const nextDepth = current.depth + 1;

        if (!limiter.isWithinBounds(nextDepth)) {
          continue;
        }

        // Cycle Detection (Unique Node Traversal)
        if (cycleDetector.isCycle(neighbor.targetConceptId)) {
          continue;
        }

        cycleDetector.track(neighbor.targetConceptId);

        const node: TraversalNode = {
          conceptId: neighbor.targetConceptId,
          depth: nextDepth,
          relationType: neighbor.relationType,
          parentConceptId: current.conceptId
        };

        resultNodes.push(node);
        queue.push({ conceptId: neighbor.targetConceptId, depth: nextDepth });
      }
    }

    return resultNodes;
  }
}