export class VariantId {
  private constructor(private readonly value: string) {}

  public static create(id: string): VariantId {
    if (!id || id.trim().length === 0) {
      throw new Error("VariantId cannot be empty");
    }
    return new VariantId(id.trim());
  }

  public getValue(): string {
    return this.value;
  }

  public equals(other: VariantId): boolean {
    return this.value === other.getValue();
  }
}