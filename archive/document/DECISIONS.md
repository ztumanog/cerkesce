# Decisions Log (ADR Index)

## Phase 3: Concept Engine Architecture
- **ADR-0009: Concept Identity & Mapping Strategy** — Status: ACCEPTED (v2.0)
- **ADR-0010: Concept Repository Read-Model Contract** — Status: ACCEPTED (v2.0)
- **ADR-0011: Meaning Graph Boundaries & Relation Protocol** — Status: ACCEPTED (v2.0)

> **Governance Note:** Formal Unlock Review COMPLETED. Phase 3 Implementation is AUTHORIZED.
# 🏛️ Architecture Decision Records (ADR) Index

**Project:** Çerkesçe Knowledge Engine & Discovery API  
**Last Updated:** 2026-09-02  
**Current Phase:** Phase 6.1 (REST / GraphQL Gateway)  

---

## 📋 ADR Status Summary

| ADR ID | Title | Status | Phase | Affected Components | Date |
|---|---|---|---|---|---|
| **ADR-0001** | Domain-Driven Design & Clean Architecture | ACCEPTED ✅ | Phase 1.0 | Core Infrastructure, Domain Layer | 2026-01-15 |
| **ADR-0009** | Concept Identity & Mapping Strategy | ACCEPTED (v2.0) ✅ | Phase 3.0 | Concept Engine, Identity Mapping | 2026-04-10 |
| **ADR-0010** | Concept Repository Read-Model Contract | ACCEPTED (v2.0) ✅ | Phase 3.0 | Read Models, Repository Contracts | 2026-04-22 |
| **ADR-0011** | Meaning Graph Boundaries & Relation Protocol | ACCEPTED (v2.0) ✅ | Phase 3.0 | Meaning Graph, Relation Protocols | 2026-05-05 |
| **ADR-0012** | Contextual Discovery & Knowledge Ranker | ACCEPTED ✅ | Phase 5.2 | Knowledge Ranking, Cluster Engine | 2026-08-20 |
| **ADR-0013** | Query Semantic Mapping & Discovery Facade | ACCEPTED ✅ | Phase 5.3 | Query Mapper, DiscoveryFacade API | 2026-08-28 |
| **ADR-0014** | Interactive Concept Network Projection Layer & API Gateway | ACCEPTED ✅ | Phase 5.4 / 6.1 | Projection Layer, Cytoscape Adapter, REST/GraphQL Gateway | 2026-09-02 |

> **Governance Note:** Formal Unlock Review COMPLETED. Phase 3 & Phase 5/6 Implementations are AUTHORIZED.

---

## 📑 DECISION LOG DETAILS

### [ADR-0001] Domain-Driven Design & Clean Architecture
- **Status:** ACCEPTED ✅
- **Context:** Core system architecture needs strict boundary separation between domain business logic, application services, and external visualization/infrastructure frameworks.
- **Decision:** Adopt Domain-Driven Design (DDD) with Clean Architecture rules. Domain entities and DTOs must not depend on UI libraries, HTTP frameworks, or specific database drivers.

---

### [ADR-0009] Concept Identity & Mapping Strategy
- **Status:** ACCEPTED (v2.0) ✅
- **Context:** Establishing stable concept identifiers across dialects and roots.
- **Decision:** Define ULID-based canonical identity mapping strategy for all concept roots and cross-dialect references.

---

### [ADR-0010] Concept Repository Read-Model Contract
- **Status:** ACCEPTED (v2.0) ✅
- **Context:** High-performance read queries require dedicated read-model projections.
- **Decision:** Decouple write aggregates from read projections via explicit `ConceptReadModel` contracts.

---

### [ADR-0011] Meaning Graph Boundaries & Relation Protocol
- **Status:** ACCEPTED (v2.0) ✅
- **Context:** Defining semantic relation bounds and boundary rules for meaning graphs.
- **Decision:** Establish strictly typed edge protocols (`STATE_OF`, `LOCATION_OF`, `PART_OF`, etc.) and graph boundary isolation.

---

### [ADR-0012] Contextual Discovery & Knowledge Ranker
- **Status:** ACCEPTED ✅
- **Context:** Raw semantic matches lack contextual clustering and relevancy scoring for multi-dialect and multi-meaning Circassian roots.
- **Decision:** Introduce `KnowledgeRanker` and `ContextualClusterEngine` to group search results into dynamic context clusters.

---

### [ADR-0013] Query Semantic Mapping & Knowledge Explorer API
- **Status:** ACCEPTED ✅
- **Context:** Frontend applications and third-party consumers need a single unified facade entry point.
- **Decision:** Create `QuerySemanticMapper` and `DiscoveryFacade` to expose clean high-level discovery methods with zero regression.

---

### [ADR-0014] Interactive Concept Network Projection Layer & API Gateway Contract
- **Status:** ACCEPTED ✅
- **Context:** UI graph libraries (Cytoscape, D3, Vis.js) require graph nodes and edges with specific schemas.
- **Decision:** Define canonical `ConceptNetworkDTO`, implement `ConceptGraphAdapter` with deterministic sorting, safety fallbacks, graph ceiling (500 nodes), and API Gateway metadata (`schemaVersion: "1.0.0"`).