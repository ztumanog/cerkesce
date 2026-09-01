export class CycleDetector {
  private readonly visited: Set<string> = new Set<string>();

  public isCycle(conceptId: string): boolean {
    return this.visited.has(conceptId);
  }

  public track(conceptId: string): void {
    this.visited.add(conceptId);
  }

  public reset(): void {
    this.visited.clear();
  }
}