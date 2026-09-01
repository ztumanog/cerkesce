import { TraversalDepth, MAX_TRAVERSAL_DEPTH } from '../types/TraversalDepth';

export class TraversalContext {
  private readonly visitedNodes: Set<string> = new Set<string>();

  constructor(public readonly maxDepth: TraversalDepth = MAX_TRAVERSAL_DEPTH) {}

  public isVisited(conceptId: string): boolean {
    return this.visitedNodes.has(conceptId);
  }

  public markVisited(conceptId: string): void {
    this.visitedNodes.add(conceptId);
  }

  public canTraverse(currentDepth: number): boolean {
    return currentDepth <= this.maxDepth;
  }
}