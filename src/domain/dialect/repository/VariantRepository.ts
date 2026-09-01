import { Variant } from '../Variant';
import { VariantId } from '../value-objects/VariantId';
import { DialectCode } from '../types/DialectTypes';

export interface VariantRepository {
  save(variant: Variant): Promise<void>;
  findById(id: VariantId): Promise<Variant | null>;
  findByDialectCode(code: DialectCode): Promise<Variant[]>;
}