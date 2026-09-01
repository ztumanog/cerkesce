import { Dialect } from '../Dialect';
import { DialectCode } from '../types/DialectTypes';
import { Variant } from '../Variant';
import { VariantRepository } from '../repository/VariantRepository';
import { MeaningVariantLinker } from './MeaningVariantLinker';

export class DialectResolver {
  private dialectsByCode: Map<DialectCode, Dialect> = new Map();
  // Tam O(1) Erişim için Bileşik İndeks: Key -> "meaningId:dialectCode"
  private directLookupIndex: Map<string, Variant> = new Map();

  constructor(
    private readonly variantRepo: VariantRepository,
    private readonly linker: MeaningVariantLinker
  ) {}

  public registerDialect(dialect: Dialect): void {
    this.dialectsByCode.set(dialect.code, dialect);
  }

  /**
   * İndeksi günceller veya yeniden inşa eder (O(1) lookup garantisi için).
   */
  public async indexVariant(meaningId: string, variant: Variant): Promise<void> {
    await this.variantRepo.save(variant);
    this.linker.link(meaningId, variant.id.getValue());
    
    const key = meaningId + ':' + variant.dialectCode;
    this.directLookupIndex.set(key, variant);
  }

  /**
   * Belirtilen meaningId için istenen diyalektteki varyantı kesin O(1) sürede arar.
   * Bulamazsa hiyerarşide parentDialectCode yönünde O(1) adımlarla ilerler.
   */
  public async resolveBestVariant(meaningId: string, preferredDialectCode: DialectCode): Promise<Variant | null> {
    let currentCode: DialectCode | undefined = preferredDialectCode;

    while (currentCode) {
      const key = meaningId + ':' + currentCode;
      const matched = this.directLookupIndex.get(key);

      if (matched) {
        return matched;
      }

      // Üst diyalekt kontrolü - Hiyerarşi derinliği max 2-3 (O(1) adım sayısı)
      const dialectObj = this.dialectsByCode.get(currentCode);
      currentCode = dialectObj?.parentDialectCode;
    }

    return null;
  }
}