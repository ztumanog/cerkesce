# Phase 3: Concept Engine MVP Execution Plan

## Approved Scope & Governance Constraints
- **Core Architecture:** ADR-0009, ADR-0010, ADR-0011 (Accepted)
- **Non-Goals:** No RDF/OWL, No Vector DB, No AI/LLM, Graph Traversal Max Depth = 2
- **Domain Boundaries:** Concept carries NO language fields. M:N cardinality via Phase 2 TranslationMeaning.

## Approved Sprint Roadmap

### Sprint 1: Domain Foundation
- [ ] **CE-01 ConceptID:** Immutable ULID/UUID v7 Identity Value Object
- [ ] **CE-02 Concept:** Language-agnostic Core Entity
- [ ] **CE-04 Relation Model:** Directed/Undirected Abstract Relation Schema
- [ ] **CE-14 Validation:** Domain cycle detection and invariant checks

### Sprint 2: Persistence & Query Layer
- [ ] **CE-03 ConceptRepository:** Isolated O(1) Read-Model Contract
- [ ] **CE-09 Read API:** Concept Lookup & Detail Services

### Sprint 3: Cross-Domain Bridge
- [ ] **CE-10 MeaningConceptLinker:** Phase 2 TranslationMeaning <-> Concept Linker
- [ ] **CE-13 Reverse Concept Lookup:** Concept-to-Word Query Engine

### Sprint 4: Graph Engine
- [ ] **CE-05 Synonym Relation:** Synonymy mapping
- [ ] **CE-06 Antonym Relation:** Antonymy mapping
- [ ] **CE-07 Parent-Child Relation:** Taxonomy / Hyponymy
- [ ] **CE-08 Related Concept:** General semantic linkage
- [ ] **CE-11 MeaningGraph Engine:** Depth=2 Traversal Engine

### Sprint 5: Performance & UI Contract
- [ ] **CE-12 Graph Cache:** In-memory caching for Depth=2 queries
- [ ] **CE-15 Graph Visualization JSON:** UI Contract Endpoint

### Sprint 6: Hardening & Governance
- [ ] **CE-16 Audit & Governance Log:** Historical mutation tracking
- [ ] **CE-17 Baseline Tag:** concept-engine-mvp-ready tagging