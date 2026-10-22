import { VariantRepository } from '../../domain/dialect/repository/VariantRepository';
import { Variant } from '../../domain/dialect/Variant';
import { VariantId } from '../../domain/dialect/value-objects/VariantId';
import { DialectCode } from '../../domain/dialect/types/DialectTypes';

export class InMemoryVariantRepository implements VariantRepository {
  private variantsById: Map<string, Variant> = new Map();
  private variantsByDialect: Map<DialectCode, Set<Variant>> = new Map();
  private variantsByMeaning: Map<string, Set<Variant>> = new Map();
  // meaningId -> variantId[] map'ini dışarıdan besleyeceğiz
  private meaningToVariantIds: Map<string, Set<string>> = new Map();

  public async save(variant: Variant): Promise<void> {
    const idStr = variant.id.getValue();
    this.variantsById.set(idStr, variant);

    if (!this.variantsByDialect.has(variant.dialectCode)) {
      this.variantsByDialect.set(variant.dialectCode, new Set());
    }
    this.variantsByDialect.get(variant.dialectCode)!.add(variant);
  }

  // DialectResolver.indexVariant burayı da besleyecek
  public async indexByMeaning(meaningId: string, variant: Variant): Promise<void> {
    if (!this.variantsByMeaning.has(meaningId)) {
      this.variantsByMeaning.set(meaningId, new Set());
    }
    this.variantsByMeaning.get(meaningId)!.add(variant);

    if (!this.meaningToVariantIds.has(meaningId)) {
      this.meaningToVariantIds.set(meaningId, new Set());
    }
    this.meaningToVariantIds.get(meaningId)!.add(variant.id.getValue());
  }

  public async findById(id: VariantId): Promise<Variant | null> {
    return this.variantsById.get(id.getValue()) || null;
  }

  public async findByDialectCode(code: DialectCode): Promise<Variant[]> {
    const set = this.variantsByDialect.get(code);
    return set ? Array.from(set) : [];
  }

  public async findByMeaningId(meaningId: string): Promise<Variant[]> {
    const set = this.variantsByMeaning.get(meaningId);
    return set ? Array.from(set) : [];
  }

  public async findAll(): Promise<Variant[]> {
    return Array.from(this.variantsById.values());
  }

  // DialectResolver.loadFromRepository için helper
  public getMeaningMap(): Map<string, string[]> {
    const out = new Map<string, string[]>();
    for (const [k, v] of this.meaningToVariantIds.entries()) {
      out.set(k, Array.from(v));
    }
    return out;
  }
}