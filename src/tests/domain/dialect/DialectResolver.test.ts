import { describe, it, expect, beforeEach } from 'vitest';
import { Dialect } from '../../../domain/dialect/Dialect';
import { Variant } from '../../../domain/dialect/Variant';
import { VariantId } from '../../../domain/dialect/value-objects/VariantId';
import { DialectCode, RegionGroup } from '../../../domain/dialect/types/DialectTypes';
import { InMemoryVariantRepository } from '../../../repository/dialect/InMemoryVariantRepository';
import { MeaningVariantLinker } from '../../../domain/dialect/services/MeaningVariantLinker';
import { DialectResolver } from '../../../domain/dialect/services/DialectResolver';

describe('Sprint 2 (Phase 4): Repository & Strict O(1) DialectResolver Engine', () => {
  let repo: InMemoryVariantRepository;
  let linker: MeaningVariantLinker;
  let resolver: DialectResolver;

  beforeEach(() => {
    repo = new InMemoryVariantRepository();
    linker = new MeaningVariantLinker();
    resolver = new DialectResolver(repo, linker);

    resolver.registerDialect(new Dialect({
      code: DialectCode.ADY_WEST,
      name: 'Batı Adığece Standardı',
      regionGroup: RegionGroup.WEST,
    }));

    resolver.registerDialect(new Dialect({
      code: DialectCode.ABZAKH,
      name: 'Abzeh Diyalekti',
      regionGroup: RegionGroup.WEST,
      parentDialectCode: DialectCode.ADY_WEST,
    }));
  });

  it('1. VariantRepository save & findById çalışmalıdır', async () => {
    const varId = VariantId.create('v-1');
    const v = new Variant({ id: varId, dialectCode: DialectCode.ADY_WEST, spelling: 'псы' });
    await repo.save(v);

    const found = await repo.findById(varId);
    expect(found?.spelling).toBe('псы');
  });

  it('2. VariantRepository findByDialectCode çalışmalıdır', async () => {
    const v1 = new Variant({ id: VariantId.create('v-1'), dialectCode: DialectCode.ADY_WEST, spelling: 'псы' });
    await repo.save(v1);

    const list = await repo.findByDialectCode(DialectCode.ADY_WEST);
    expect(list).toHaveLength(1);
  });

  it('3. Direct dialect resolution (Doğrudan diyalekt çözümleme) O(1) çalışmalıdır', async () => {
    const varId = VariantId.create('v-abz-1');
    const variant = new Variant({ id: varId, dialectCode: DialectCode.ABZAKH, spelling: 'псы' });

    await resolver.indexVariant('m-water', variant);

    const result = await resolver.resolveBestVariant('m-water', DialectCode.ABZAKH);
    expect(result).not.toBeNull();
    expect(result?.spelling).toBe('псы');
    expect(result?.dialectCode).toBe(DialectCode.ABZAKH);
  });

  it('4. Parent fallback resolution (Üst diyalekte düşme) çalışmalıdır', async () => {
    const parentVarId = VariantId.create('v-west-1');
    const parentVariant = new Variant({ id: parentVarId, dialectCode: DialectCode.ADY_WEST, spelling: 'псы (Standart)' });

    await resolver.indexVariant('m-water', parentVariant);

    // Abzeh isteniyor ancak sadece üst diyalekt (ADY_WEST) mevcut
    const result = await resolver.resolveBestVariant('m-water', DialectCode.ABZAKH);
    expect(result).not.toBeNull();
    expect(result?.spelling).toBe('псы (Standart)');
    expect(result?.dialectCode).toBe(DialectCode.ADY_WEST);
  });

  it('5. Unknown/Unregistered dialect durumunda güvenli şekilde null dönmelidir', async () => {
    const result = await resolver.resolveBestVariant('m-water', DialectCode.BESLENEY);
    expect(result).toBeNull();
  });

  it('6. Missing meaning handling (Anlam bulunamadığında) null dönmelidir', async () => {
    const result = await resolver.resolveBestVariant('non-existent-meaning', DialectCode.ABZAKH);
    expect(result).toBeNull();
  });

  it('7. Overwrite/Duplicate save durumunda en güncel varyantı indekslemelidir', async () => {
    const varId = VariantId.create('v-abz-1');
    const v1 = new Variant({ id: varId, dialectCode: DialectCode.ABZAKH, spelling: 'псы 1' });
    const v2 = new Variant({ id: varId, dialectCode: DialectCode.ABZAKH, spelling: 'псы 2' });

    await resolver.indexVariant('m-water', v1);
    await resolver.indexVariant('m-water', v2);

    const result = await resolver.resolveBestVariant('m-water', DialectCode.ABZAKH);
    expect(result?.spelling).toBe('псы 2');
  });
});