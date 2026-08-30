---
doc_id: "003"
title: "Locative Preverbs & Grammaticalization System"
layer: "preverb"
category: "spatial-grammar"
changes_lexeme: false
changes_valency: false
changes_semantics: true
parser_stage: "before-root"
phase: 2
---

# 003 - Locative Preverbs & Grammaticalization System (Yer / Konum Ön-Fiil Sistemi)

## Status
✅ Approved for Phase 2 / Parser Layer Defined

## Purpose
Bu doküman, Kabardey-Çerkes dilindeki fiil önü konum eklerinin (locative preverbs / directional prefixes) semantik, morfolojik ve dilbilgiselleşme (grammaticalization) mimarisini tanımlar. Bu katman, yeni bir leksik kelime (lexeme) türetmez (`changes_lexeme: false`) ve eylemin değerliğini/üye yapısını değiştirmez (`changes_valency: false`); ancak eylemin uzamsal/yönsel semantiğini modifiye eder (`changes_semantics: true`).

---

## Architectural Position & Pipeline

```text
Layer:
003 - Locative Preverbs

Pipeline Position:
[002 Derivational Prefixes]
            ↓
[003 Locative Preverbs]
            ↓
        [ROOT]
            ↓
[004 Verbal Operators]

Role:
Locative preverbs do not normally create new lexemes and do not increase valency.

Their primary purpose is:
- spatial specification
- directional specification
- semantic modification

Flags:
changes_lexeme = false
changes_valency = false
changes_semantics = true