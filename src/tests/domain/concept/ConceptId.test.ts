import { describe, it, expect } from 'vitest';
import { ConceptId } from '../../../domain/shared/value-objects/ConceptId';

describe('ConceptId Value Object (SSOT)', () => {
  describe('create', () => {
    it('gecerli kanonik ID ile olusturulabilmelidir', () => {
      const id = ConceptId.create('WATER');
      expect(id.value).toBe('WATER');
    });

    it('coklu kelime UPPER_SNAKE_CASE kabul etmelidir', () => {
      const id = ConceptId.create('APPLE_TREE');
      expect(id.value).toBe('APPLE_TREE');
    });

    it('bos string reddetmelidir', () => {
      expect(() => ConceptId.create('')).toThrow();
    });

    it('turkce karakter reddetmelidir', () => {
      expect(() => ConceptId.create('ÖFKE')).toThrow();
    });

    it('eski 26 karakterlik ULID formatini reddetmelidir', () => {
      expect(() => ConceptId.create('01ARZ3NDEKTSV4RRFFQ69G5FAV')).toThrow();
      expect(() => ConceptId.create('01M44JJ719F3V5RXNAJCB9Y11X')).toThrow();
    });

    it('hex-hash formatini reddetmelidir', () => {
      expect(() => ConceptId.create('A1B2C3D4E5F6A7B8')).toThrow();
      expect(() => ConceptId.create('a1b2c3d4e5f6a7b8')).toThrow();
    });

    it('kucuk harfli ID reddetmelidir', () => {
      expect(() => ConceptId.create('water')).toThrow();
    });

    it('rakamla baslayan ID reddetmelidir', () => {
      expect(() => ConceptId.create('1WATER')).toThrow();
    });
  });

  describe('getValue', () => {
    it('olusturulan ID degerini dondurmelidir', () => {
      const id = ConceptId.create('WATER');
      expect(id.getValue()).toBe('WATER');
    });

    it('getValue ile value getter ayni sonucu vermelidir', () => {
      const id = ConceptId.create('APPLE_TREE');
      expect(id.getValue()).toBe(id.value);
    });
  });

  describe('equals', () => {
    it('ayni degerlerle olusturulan iki nesne esit olmalidir', () => {
      const id1 = ConceptId.create('APPLE_TREE');
      const id2 = ConceptId.create('APPLE_TREE');
      expect(id1.equals(id2)).toBe(true);
    });

    it('farkli degerlerle olusturulan iki nesne esit olmamalidir', () => {
      const id1 = ConceptId.create('WATER');
      const id2 = ConceptId.create('FIRE');
      expect(id1.equals(id2)).toBe(false);
    });

    it('null veya undefined ile karsilastirma false donmelidir', () => {
      const id = ConceptId.create('WATER');
      expect(id.equals(null)).toBe(false);
      expect(id.equals(undefined)).toBe(false);
    });
  });

  describe('toString', () => {
    it('ID degerini string olarak dondurmelidir', () => {
      const id = ConceptId.create('WATER');
      expect(id.toString()).toBe('WATER');
    });
  });
});