/**
 * File: src/domain/discovery/services/QuerySemanticMapper.ts
 * Layer: Service
 */

export class QuerySemanticMapper {
  public mapQuery(query: string): { normalizedQuery: string; tokens: string[] } {
    const normalizedQuery = (query ?? "").normalize("NFC").toLocaleLowerCase();
    return {
      normalizedQuery,
      tokens: normalizedQuery.split(/\s+/).filter(Boolean)
    };
  }
}