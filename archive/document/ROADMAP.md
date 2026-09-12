<<<<<<< Updated upstream
# ROADMAP

## Faz 2

### Translation Platform

- TranslationEntry
- TranslationGroup
- TranslationRepository
- TranslationTable
- MultiLanguage Search
- Reverse Translation Search
- Cross Dictionary Matching

---

## Faz 3

### Concept Engine

- Concept
- ConceptRepository
- ConceptLookup
- Meaning Graph

---

## Faz 4

### Knowledge Graph

- Knowledge Nodes
- Relation Graph
- Semantic Connections

---

## Faz 5

### Corpus Analytics

- Frequency Analysis
- Usage Analysis
- Statistical Reports

---

## Faz 6

### Embedding Engine

- Semantic Embeddings
- Similarity Search

---

## Faz 7

### Circassian Foundation Dataset

- Unified Foundation Dataset
- Research Export Layer
=======
﻿# ROADMAP

## Phase 1: Core Dictionary Platform & UI Sprint 1

### Completed (Infrastructure)
- [x] Search Engine & API Layer
- [x] Drawer v1.0 (Frozen)
- [x] Daily Word Engine (FNV-1a - single source of truth)
- [x] Normalization & Source Registry
- [x] Batch Loading & Caching

### Remaining / Active (UI Sprint 1 - ADR-0015)
- [x] UI-001 Layout Shell
- [/] UI-002 Search-Centric Homepage (SearchBox.tsx reused in Hero)
- [ ] UI-003 Dark Mode Altyapısı
- [ ] UI-004 WCAG AA Kontrolleri
- [ ] UI-005 UDL Kontrolleri
- [ ] UI-006 Daily Word Entegrasyonu

### Exit Criteria
- Homepage completed (Search-Centric, single SearchBox)
- Header & Footer operational
- Dark Mode functional (CSS Tokens)
- WCAG AA accessibility passed (Keyboard Nav & Focus Rings)
- Daily Word integrated with Drawer v1.0

---

## Phase 2: Translation Platform (Suspended)
*Locked until UI Sprint 1 exit criteria are met.*

---

## Phase 3: Concept Engine (Locked)

### Phase 3 Execution Roadmap (Concept Engine MVP)
- [ ] **Sprint 1: Domain Foundation** (CE-01, CE-02, CE-04, CE-14)[cite: 5]
- [ ] **Sprint 2: Persistence & Query Layer** (CE-03, CE-09)[cite: 5]
- [ ] **Sprint 3: Cross-Domain Bridge** (CE-10, CE-13)[cite: 5]
- [ ] **Sprint 4: Graph Engine** (CE-05, CE-06, CE-07, CE-08, CE-11)[cite: 5]
- [ ] **Sprint 5: Performance & UI Contract** (CE-12, CE-15)[cite: 5]
- [ ] **Sprint 6: Hardening & Governance** (CE-16, CE-17)[cite: 5]

---

## Certifications & Future Phases
*Doküman Referansı: `docs/certifications/phase-certification-history.md`*[cite: 5]

### Completed Certifications
- ✅ Phase 5.1 Discovery Engine[cite: 5]
- ✅ Phase 5.2.1 Knowledge Ranking[cite: 5]
- ✅ Phase 5.2.2 Contextual Discovery[cite: 5]
- ✅ Phase 5.3.1 Query-Semantic Mapping[cite: 5]
- ✅ Phase 5.3.2 DiscoveryFacade & Explainable Discovery[cite: 5]
- ✅ Phase 5.3.3 Integration & Validation[cite: 5]

### Next Milestones
- 🔜 Phase 5.4 Interactive Concept Network Explorer[cite: 5]
  - ConceptNetworkDTO[cite: 5]
  - ConceptGraphAdapter[cite: 5]
  - Explorer API[cite: 5]
  - UI Graph Contracts[cite: 5]
- 🔜 Phase 5.4 Semantic Expansion[cite: 5]
- 🔜 Knowledge Graph Analytics[cite: 5]
>>>>>>> Stashed changes
