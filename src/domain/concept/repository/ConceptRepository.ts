/**
 * File: src/repositories/ConceptRepository.ts
 * Generated: 2026-09-18
 * Layer: Repository
 */
import { Concept } from '../Concept';
import { ConceptId } from '../../shared/value-objects/ConceptId';

export interface ConceptRepository {
  findById(id: ConceptId): Promise<Concept | null>;
  findMany(ids: readonly ConceptId[]): Promise<Concept[]>;
  save(concept: Concept): Promise<void>;
  delete(id: ConceptId): Promise<boolean>;
  exists(id: ConceptId): Promise<boolean>;
}