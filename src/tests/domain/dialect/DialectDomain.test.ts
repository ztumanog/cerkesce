import { describe, it, expect } from 'vitest';
import { Dialect } from '../../../domain/dialect/Dialect';
import { Variant } from '../../../domain/dialect/Variant';
import { VariantId } from '../../../domain/dialect/value-objects/VariantId';
import { DialectCode, RegionGroup } from '../../../domain/dialect/types/DialectTypes';
import { MeaningVariantLinker } from '../../../domain/dialect/services/MeaningVariantLinker';

describe('Sprint 1 (Phase 4): Dialect & Variant Isolated Domain Foundation', () => {
  describe('VariantId VO', () => {
    it('Geçerli bir VariantId oluşturmalı ve eşitliği doğrulamalıdır', () => {
      const id1 = VariantId.create('var-101');
      const id2 = VariantId.create('var-101');
      expect(id1.getValue()).toBe('var-101');
      expect(id1.equals(id2)).toBe(true);
    });

    it('Boş id ile oluşturulduğunda hata fırlatmalıdır', () => {
      expect(() => VariantId.create('')).toThrow('VariantId cannot be empty');
    });
  });

  describe('Isolated Variant Entity', () => {
    it('Phase 2 bağımlılığı olmadan izole Variant oluşturmalıdır', () => {
      const variant = new Variant({
        id: VariantId.create('var-101'),
        dialectCode: DialectCode.SHAPSUG,
        spelling: 'псы',
        phoneticNotation: 'psə',
      });

      expect(variant.id.getValue()).toBe('var-101');
      expect(variant.spelling).toBe('псы');
      expect(variant.dialectCode).toBe(DialectCode.SHAPSUG);
    });
  });

  describe('MeaningVariantLinker (Bridge Layer)', () => {
    it('Meaning ve Variant arasında Phase-isolated bağımsız eşleme kurmalıdır', () => {
      const linker = new MeaningVariantLinker();
      linker.link('meaning-water-01', 'var-101');
      linker.link('meaning-water-01', 'var-102');

      const variants = linker.getVariantsByMeaningId('meaning-water-01');
      expect(variants).toHaveLength(2);
      expect(variants).toContain('var-101');
      expect(variants).toContain('var-102');

      const meanings = linker.getMeaningsByVariantId('var-101');
      expect(meanings).toContain('meaning-water-01');
    });
  });
});