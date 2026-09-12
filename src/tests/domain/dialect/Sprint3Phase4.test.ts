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

describe('Sprint 3 (Phase 4): Variant Mapping & Cross-Phase Bridges (PiloÅŸum Criteria)', () => {
  describe('1. DialectMapper (Rule Engine Tests)', () => {
    let mapper: DialectMapper;

    beforeEach(() => {
      mapper = new DialectMapper();
    });

    it('âœ… DialectMapper rule tests: Tekil kural dÃ¶nÃ¼ÅŸÃ¼mÃ¼ doÄŸru yapmalÄ±dÄ±r', () => {
      mapper.addRule({
        sourceDialect: DialectCode.ABZAKH,
        targetDialect: DialectCode.ADY_WEST,
        pattern: 'ÑˆÑŠu',
        replacement: 'ÑˆÑŠ'
      });

      const result = mapper.transform('ÑˆÑŠuÑ‹', DialectCode.ABZAKH, DialectCode.ADY_WEST);
      expect(result).toBe('ÑˆÑŠÑ‹');
    });

    it('âœ… Multiple rule chains: Ã‡oklu kural zincirini sÄ±rayla uygulamalÄ±dÄ±r', () => {
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

    it('âœ… Unknown rule handling: Kural bulunamadÄ±ÄŸÄ±nda metni deÄŸiÅŸtirmeden aynen dÃ¶nmelidir', () => {
      const result = mapper.transform('orijinal', DialectCode.BESLENEY, DialectCode.KABARDAY);
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
        name: 'BatÄ± Standart',
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

    it('âœ… ConceptVariantBridge tests: Concept ID Ã¼zerinden varyant Ã§Ã¶zmelidir', async () => {
      const v = new Variant({
        id: VariantId.create('var-w-1'),
        dialectCode: DialectCode.ABZAKH,
        spelling: 'Ğ¿ÑÑ‹'
      });

      await resolver.indexVariant('meaning-water-01', v);

      const result = await bridge.resolveVariantByConcept('concept-water', DialectCode.ABZAKH);
      expect(result).toHaveLength(1);
      expect(result[0].spelling).toBe('Ğ¿ÑÑ‹');
    });

    it('âœ… Parent dialect fallback tests: Concept seviyesinden Ã§aÄŸrÄ±da parent fallback Ã§alÄ±ÅŸmalÄ±dÄ±r', async () => {
      const parentVariant = new Variant({
        id: VariantId.create('var-w-parent'),
        dialectCode: DialectCode.ADY_WEST,
        spelling: 'Ğ¿ÑÑ‹ (Standart)'
      });

      await resolver.indexVariant('meaning-water-01', parentVariant);

      // Abzeh isteniyor ama sadece BatÄ± Standart var
      const result = await bridge.resolveVariantByConcept('concept-water', DialectCode.ABZAKH);
      expect(result).toHaveLength(1);
      expect(result[0].spelling).toBe('Ğ¿ÑÑ‹ (Standart)');
      expect(result[0].dialectCode).toBe(DialectCode.ADY_WEST);
    });

    it('âœ… No Phase 2 / Phase 3 dependency leak & Unknown Concept handling', async () => {
      const result = await bridge.resolveVariantByConcept('unknown-concept', DialectCode.ABZAKH);
      expect(result).toHaveLength(0);
    });
  });
});

