import { VariantRepository } from '../../domain/dialect/repository/VariantRepository';
import { Variant } from '../../domain/dialect/Variant';
import { VariantId } from '../../domain/dialect/value-objects/VariantId';
import { DialectCode } from '../../domain/dialect/types/DialectTypes';

export class InMemoryVariantRepository implements VariantRepository {
  private variantsById: Map<string, Variant> = new Map();
  private variantsByDialect: Map<DialectCode, Set<Variant>> = new Map();

  public async save(variant: Variant): Promise<void> {
    const idStr = variant.id.getValue();
    this.variantsById.set(idStr, variant);

    if (!this.variantsByDialect.has(variant.dialectCode)) {
      this.variantsByDialect.set(variant.dialectCode, new Set());
    }
    this.variantsByDialect.get(variant.dialectCode)!.add(variant);
  }

  public async findById(id: VariantId): Promise<Variant | null> {
    return this.variantsById.get(id.getValue()) || null;
  }

  public async findByDialectCode(code: DialectCode): Promise<Variant[]> {
    const set = this.variantsByDialect.get(code);
    return set ? Array.from(set) : [];
  }
}