export class MeaningVariantLinker {
  private meaningToVariants: Map<string, Set<string>> = new Map();
  private variantToMeanings: Map<string, Set<string>> = new Map();

  public link(meaningId: string, variantId: string): void {
    if (!this.meaningToVariants.has(meaningId)) {
      this.meaningToVariants.set(meaningId, new Set());
    }
    this.meaningToVariants.get(meaningId)!.add(variantId);

    if (!this.variantToMeanings.has(variantId)) {
      this.variantToMeanings.set(variantId, new Set());
    }
    this.variantToMeanings.get(variantId)!.add(meaningId);
  }

  public getVariantsByMeaningId(meaningId: string): string[] {
    return Array.from(this.meaningToVariants.get(meaningId) || []);
  }

  public getMeaningsByVariantId(variantId: string): string[] {
    return Array.from(this.variantToMeanings.get(variantId) || []);
  }
}