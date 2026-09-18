/**
 * File: src/domain/discovery/services/QuerySemanticMapper.ts
 * Generated: 2026-09-18
 * Layer: Service
 */

export interface MappedQueryResult {
  readonly normalizedQuery: string;
  readonly tokens: readonly string[];
}

export class QuerySemanticMapper {
  public mapQuery(query: string): MappedQueryResult {
    const normalizedQuery = (query ?? "").normalize("NFC").toLocaleLowerCase();
    return {
      normalizedQuery,
      tokens: normalizedQuery.split(/\s+/).filter(Boolean)
    };
  }
}