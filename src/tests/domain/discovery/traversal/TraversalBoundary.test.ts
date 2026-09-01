import { describe, it, expect, beforeEach } from "vitest";
import { DepthLimiter } from "../../../../domain/discovery/traversal/DepthLimiter";
import { CycleDetector } from "../../../../domain/discovery/traversal/CycleDetector";
import { TraversalContext } from "../../../../domain/discovery/traversal/TraversalContext";

describe("Phase 5 Sprint 2: Traversal Security Boundary", () => {
  describe("DepthLimiter", () => {
    it("depth <= 2 sınırlarını doğru kabul etmelidir", () => {
      const limiter = new DepthLimiter(2);
      expect(limiter.isWithinBounds(0)).toBe(true);
      expect(limiter.isWithinBounds(1)).toBe(true);
      expect(limiter.isWithinBounds(2)).toBe(true);
      expect(limiter.isWithinBounds(3)).toBe(false);
    });

    it("depth = 2 olduğunda stop sinyali vermelidir", () => {
      const limiter = new DepthLimiter(2);
      expect(limiter.shouldStop(2)).toBe(true);
    });
  });

  describe("CycleDetector", () => {
    let detector: CycleDetector;

    beforeEach(() => {
      detector = new CycleDetector();
    });

    it("ziyaret edilen düğümde döngü tespit etmelidir", () => {
      expect(detector.isCycle("CONCEPT_WATER")).toBe(false);
      detector.track("CONCEPT_WATER");
      expect(detector.isCycle("CONCEPT_WATER")).toBe(true);
    });
  });

  describe("TraversalContext", () => {
    it("maxDepth ve ziyaret durumunu doğru yönetmelidir", () => {
      const context = new TraversalContext(2);
      expect(context.canTraverse(1)).toBe(true);
      expect(context.canTraverse(3)).toBe(false);

      expect(context.isVisited("CONCEPT_ICE")).toBe(false);
      context.markVisited("CONCEPT_ICE");
      expect(context.isVisited("CONCEPT_ICE")).toBe(true);
    });
  });
});