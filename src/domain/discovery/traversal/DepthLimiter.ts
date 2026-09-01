import { TraversalDepth, MAX_TRAVERSAL_DEPTH } from '../types/TraversalDepth';

export class DepthLimiter {
  constructor(private readonly maxAllowedDepth: TraversalDepth = MAX_TRAVERSAL_DEPTH) {}

  public isWithinBounds(currentDepth: number): boolean {
    return currentDepth >= 0 && currentDepth <= this.maxAllowedDepth;
  }

  public shouldStop(currentDepth: number): boolean {
    return currentDepth >= this.maxAllowedDepth;
  }
}