/**
 * @file src/domain/concept/value-objects/ConceptID.ts
 * @description Value Object for Concept Identifier
 * 
 * Part of Phase 2 Domain Model
 * Kept for backward compatibility with existing tests
 * 
 * Note: Phase 3 uses ConceptEntry.id (string) instead
 */

import { ValueObject } from '@/domain/shared/ValueObject';

/**
 * Unique identifier for a Concept
 * 
 * Format: "concept-{domain}-{sequence}"
 * Example: "concept-anatomy-head-001"
 */
export class ConceptID extends ValueObject<{ value: string }> {
  public static readonly PATTERN = /^concept-[a-z0-9-]+$/;

  private constructor(value: string) {
    super({ value });
  }

  /**
   * Create a new ConceptID
   * 
   * @param value ID string
   * @throws Error if format is invalid
   */
  public static create(value: string): ConceptID {
    if (!this.PATTERN.test(value)) {
      throw new Error(
        `Invalid ConceptID format: ${value}. Expected format: concept-{domain}-{sequence}`
      );
    }
    return new ConceptID(value);
  }

  /**
   * Get the ID value
   */
  public getValue(): string {
    return this.props.value;
  }

  /**
   * Convert to string
   */
  public toString(): string {
    return this.props.value;
  }
}