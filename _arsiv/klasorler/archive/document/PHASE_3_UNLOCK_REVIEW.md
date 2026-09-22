# Phase 3 — Unlock Review & Architecture Planning

**Status:** ⏸ **LOCKED** (Review & Gate Review Phase)  
**Date:** 2026-09-01  
**Pre-conditions:** Phase 1 ✅ Completed, Phase 2 ✅ Completed  

---

## 1. Objectives & Scope
The objective of Phase 3 (Concept Engine) is to transform language-specific translation entries into language-independent, semantic concepts (`CONCEPT_ID`).

- **Target:** Bridge dictionaries without relying on pair-wise translations.
- **Identity Model:** `псы` + `water` + `su` + `вода` → `CONCEPT_WATER`

---

## 2. Governance Constraints (Phase 3 Lock Rules)
Until the Phase 3 Gate Sign-off is officially completed, the following boundaries apply:

### 🟢 Allowed:
- Architectural analysis and domain boundary mapping.
- Drafting ADR-0009, ADR-0010, ADR-0011 specification files.
- Conceptual schema designs (Diagrams, Markdown specs).

### 🛑 Strictly Forbidden:
- Writing `ConceptRepository` or `ConceptEngine` classes in `src/`.
- Implementing Knowledge Graph, Semantic Network, or Vector Search engines.
- Adding dependencies for Graph Databases or Embedding models.

---

## 3. Required Architecture Decision Records (Drafts)
- **ADR-0009 (DRAFT):** Concept Identity Strategy & `CONCEPT_ID` Mechanics
- **ADR-0010 (DRAFT):** Concept Repository Read-Model Contract
- **ADR-0011 (DRAFT):** Meaning Graph Boundaries & Relational Taxonomy

---

## 4. Phase 3 Gate Exit Criteria
Phase 3 code implementation will be UNLOCKED only when:
1. [x] Phase 2 Closure Approved (`PHASE2-CLOSURE-001`).
2. [ ] Stakeholder Sign-off on Phase 3 Scope & Non-Goals.
3. [ ] ADR-0009 Draft reviewed and approved.
4. [ ] ADR-0010 Draft reviewed and approved.
5. [ ] ADR-0011 Draft reviewed and approved.
## Relationship to Phase 2 Structures

TranslationEntry
↓
TranslationGroup
↓
Concept

Concepts do not replace Phase 2 structures.

Concepts extend them.