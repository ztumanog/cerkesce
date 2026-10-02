/**
 * GraphQL Schema
 * ADR-GOV-005: API Gateway olgunlastirma
 *
 * Basit string template — graphql-tag paketi gerekmez.
 */

export const typeDefs = `
  type Concept {
    id: ID!
    label: String
    nodeType: String
    depth: Int
    score: Float
    cluster: String
  }

  type RelatedConcept {
    conceptId: ID!
    label: String
    relationType: String
    score: Float
  }

  type ContextCluster {
    clusterId: ID!
    label: String
    concepts: [Concept!]!
  }

  type ConceptNetwork {
    nodes: [Concept!]!
    edges: [Edge!]!
    metadata: NetworkMetadata!
  }

  type Edge {
    source: ID!
    target: ID!
    relationType: String
  }

  type NetworkMetadata {
    schemaVersion: String!
    isDirected: Boolean!
    isTruncated: Boolean!
    nodeCount: Int!
    edgeCount: Int!
    rootConceptId: ID
  }

  type ExplorationResult {
    conceptId: ID!
    rootConceptId: ID
    relatedConcepts: [RelatedConcept!]!
    contextClusters: [ContextCluster!]!
  }

  type Query {
    conceptNetwork(q: String!, maxNodes: Int = 500): ConceptNetwork
    explore(q: String!, dialect: String): ExplorationResult
    concept(id: ID!): Concept
  }
`;
