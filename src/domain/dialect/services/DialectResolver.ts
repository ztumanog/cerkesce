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

  public async indexVariant(meaningId: string, variant: Variant): Promise<void> {
    await this.variantRepo.save(variant);
    this.linker.link(meaningId, variant.id.getValue());
    
    const key = meaningId + ':' + variant.dialectCode;
    this.directLookupIndex.set(key, variant);
  }

  // EKLENDİ: Phase5 ve MultilingualExplorer'ın beklediği metod
  public async resolveVariants(
    meaningId: string, 
    targetDialects: DialectCode | DialectCode[]
  ): Promise<Variant[]> {
    const codes = Array.isArray(targetDialects) ? targetDialects : [targetDialects];
    const results: Variant[] = [];
    for (const code of codes) {
      const v = await this.resolveBestVariant(meaningId, code);
      if (v) results.push(v);
    }
    return results;
  }

  public async resolveBestVariant(
    meaningId: string, 
    preferredDialectCode: DialectCode
  ): Promise<Variant | null> {
    const visited = new Set<DialectCode>();
    let currentCode: DialectCode | undefined = preferredDialectCode;

    while (currentCode && !visited.has(currentCode)) {
      visited.add(currentCode);
      
      const key = meaningId + ':' + currentCode;
      const matched = this.directLookupIndex.get(key);
      if (matched) {
        return matched;
      }

      const dialectObj = this.dialectsByCode.get(currentCode);
      currentCode = dialectObj?.parentDialectCode;
    }

    return null;
  }

  // EKLENDİ: Uygulama restart'ta indeks boş kalmasın
  public async loadFromRepository(
    meaningVariantMap: Map<string, string[]> // meaningId -> variantId[]
  ): Promise<void> {
    const allVariants = await this.variantRepo.findAll();
    for (const variant of allVariants) {
      // variantId -> meaningId reverse lookup
      for (const [meaningId, variantIds] of meaningVariantMap.entries()) {
        if (variantIds.includes(variant.id.getValue())) {
          const key = meaningId + ':' + variant.dialectCode;
          this.directLookupIndex.set(key, variant);
        }
      }
    }
  }
}