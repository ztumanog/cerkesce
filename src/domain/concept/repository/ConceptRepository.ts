/**
 * File: src/repositories/ConceptRepository.ts
 * Generated: 2026-09-18
 * Layer: Repository
 */
import { Concept } from '../Concept';
import { ConceptID } from '../value-objects/ConceptID';

export interface ConceptRepository {
  findById(id: ConceptID): Promise<Concept | null>;
  findMany(ids: readonly ConceptID[]): Promise<Concept[]>;
  save(concept: Concept): Promise<void>;
  delete(id: ConceptID): Promise<boolean>;
  exists(id: ConceptID): Promise<boolean>;
}