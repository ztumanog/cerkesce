import { describe, it, expect, beforeEach } from 'vitest';
import { Dialect } from '../../../domain/dialect/Dialect';
import { Variant } from '../../../domain/dialect/Variant';
import { VariantId } from '../../../domain/dialect/value-objects/VariantId';
import { DialectCode, RegionGroup } from '../../../domain/dialect/types/DialectTypes';
import { InMemoryVariantRepository } from '../../../repository/dialect/InMemoryVariantRepository';
import { MeaningVariantLinker } from '../../../domain/dialect/services/MeaningVariantLinker';
import { DialectResolver } from '../../../domain/dialect/services/DialectResolver';
import { DialectMapper } from '../../../domain/dialect/services/DialectMapper';
import { ConceptVariantBridge, MeaningConceptLinkerInterface } from '../../../domain/dialect/services/ConceptVariantBridge';

describe('Sprint 3 (Phase 4): Variant Mapping & Cross-Phase Bridges (Piloşum Criteria)', () => {
  describe('1. DialectMapper (Rule Engine Tests)', () => {
    let mapper: DialectMapper;

    beforeEach(() => {
      mapper = new DialectMapper();
    });

    it('✅ DialectMapper rule tests: Tekil kural dönüşümü doğru yapmalıdır', () => {
      mapper.addRule({
        sourceDialect: DialectCode.ABZAKH,
        targetDialect: DialectCode.ADY_WEST,
        pattern: 'шъu',
        replacement: 'шъ'
      });

      const result = mapper.transform('шъuы', DialectCode.ABZAKH, DialectCode.ADY_WEST);
      expect(result).toBe('шъы');
    });

    it('✅ Multiple rule chains: Çoklu kural zincirini sırayla uygulamalıdır', () => {
      mapper.addRule({
        sourceDialect: DialectCode.ABZAKH,
        targetDialect: DialectCode.ADY_WEST,
        pattern: 'a',
        replacement: 'e'
      });
      mapper.addRule({
        sourceDialect: DialectCode.ABZAKH,
        targetDialect: DialectCode.ADY_WEST,
        pattern: 'e',
        replacement: 'i'
      });

      const result = mapper.transform('a', DialectCode.ABZAKH, DialectCode.ADY_WEST);
      expect(result).toBe('i');
    });

    it('✅ Unknown rule handling: Kural bulunamadığında metni değiştirmeden aynen dönmelidir', () => {
      const result = mapper.transform('orijinal', DialectCode.BESLENEY, DialectCode.KABARDIAN);
      expect(result).toBe('orijinal');
    });
  });

  describe('2. ConceptVariantBridge & Phase 3 Integration', () => {
    let repo: InMemoryVariantRepository;
    let linker: MeaningVariantLinker;
    let resolver: DialectResolver;
    let bridge: ConceptVariantBridge;

    beforeEach(() => {
      repo = new InMemoryVariantRepository();
      linker = new MeaningVariantLinker();
      resolver = new DialectResolver(repo, linker);

      resolver.registerDialect(new Dialect({
        code: DialectCode.ADY_WEST,
        name: 'Batı Standart',
        regionGroup: RegionGroup.WEST,
      }));

      resolver.registerDialect(new Dialect({
        code: DialectCode.ABZAKH,
        name: 'Abzeh',
        regionGroup: RegionGroup.WEST,
        parentDialectCode: DialectCode.ADY_WEST,
      }));

      const mockConceptLinker: MeaningConceptLinkerInterface = {
        getMeaningsByConceptId: (cId: string) => {
          if (cId === 'concept-water') return ['meaning-water-01'];
          return [];
        }
      };

      bridge = new ConceptVariantBridge(mockConceptLinker, resolver);
    });

    it('✅ ConceptVariantBridge tests: Concept ID üzerinden varyant çözmelidir', async () => {
      const v = new Variant({
        id: VariantId.create('var-w-1'),
        dialectCode: DialectCode.ABZAKH,
        spelling: 'псы'
      });

      await resolver.indexVariant('meaning-water-01', v);

      const result = await bridge.resolveVariantByConcept('concept-water', DialectCode.ABZAKH);
      expect(result).toHaveLength(1);
      expect(result[0].spelling).toBe('псы');
    });

    it('✅ Parent dialect fallback tests: Concept seviyesinden çağrıda parent fallback çalışmalıdır', async () => {
      const parentVariant = new Variant({
        id: VariantId.create('var-w-parent'),
        dialectCode: DialectCode.ADY_WEST,
        spelling: 'псы (Standart)'
      });

      await resolver.indexVariant('meaning-water-01', parentVariant);

      // Abzeh isteniyor ama sadece Batı Standart var
      const result = await bridge.resolveVariantByConcept('concept-water', DialectCode.ABZAKH);
      expect(result).toHaveLength(1);
      expect(result[0].spelling).toBe('псы (Standart)');
      expect(result[0].dialectCode).toBe(DialectCode.ADY_WEST);
    });

    it('✅ No Phase 2 / Phase 3 dependency leak & Unknown Concept handling', async () => {
      const result = await bridge.resolveVariantByConcept('unknown-concept', DialectCode.ABZAKH);
      expect(result).toHaveLength(0);
    });
  });
});