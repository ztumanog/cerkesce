#!/usr/bin/env python3
"""
freeze_phase2_migration.py
--------------------------
`archive/document/` dizinindeki mimari belgeleri günceller.
- `PytonCıktıları` KLASÖRÜNE DOKUNMAZ (Testler için korunur).
- Fazladan oluşan 'docs' dizinini ve kökteki kopya .md dosyalarını temizler.
- Bütün anayasal belgeleri 'archive/document/' dizinine işler.
"""

import os
import shutil

# Doğru arşiv dizini (Görseldeki yol)
TARGET_DIR = "archive/document"

# Silinecek Gereksiz / Mükerrer Ögeler (PytonCıktıları BURADA YER ALMAZ)
ITEMS_TO_CLEAN = [
    "docs",                             # Fazladan oluşan docs klasörü
    "PROJECT_STATUS.md",                # Kök dizindeki mükerrer kopyalar
    "DECISIONS.md",
    "PHASE_3_MIGRATION_PLAN.md",
    "PHASE_2_CLOSURE_REVIEW_REPORT.md",
    "PHAES 2 CLOSURE REVIEW REPORT.md",
    "PHASE_3_UNLOCK_REVIEW.md"
]

# Hedef Dosya Yolları (Tümü archive/document/ altında)
PATHS = {
    "migration_plan": os.path.join(TARGET_DIR, "PHASE_3_MIGRATION_PLAN.md"),
    "adr_0008": os.path.join(TARGET_DIR, "ADR-0008.md"),
    "adr_0009": os.path.join(TARGET_DIR, "ADR-0009.md"),
    "adr_0010": os.path.join(TARGET_DIR, "ADR-0010.md"),
    "adr_0011": os.path.join(TARGET_DIR, "ADR-0011.md"),
    "decisions": os.path.join(TARGET_DIR, "DECISIONS.md"),
    "project_status": os.path.join(TARGET_DIR, "PROJECT_STATUS.md"),
    "closure_report": os.path.join(TARGET_DIR, "PHAES 2 CLOSURE REVIEW REPORT.md"),
}

# ---------------------------------------------------------
# İÇERİKLER (116/116 PASS Metriği ile Senkronize)
# ---------------------------------------------------------

MIGRATION_PLAN_CONTENT = """# PHASE_3_MIGRATION_PLAN

Status:
PLANNING ONLY

Implementation Status:
Phase 3 code generation: FORBIDDEN
Phase 3 design work: ALLOWED

Phase:
3 (LOCKED)

Last Updated:
2026-09-01

---

## Purpose
This document defines migration requirements from Phase 2 Translation Platform to Phase 3 Concept Engine.
No code implementation work is allowed until Phase 3 unlock approval.

---

# Phase 2 Baseline (116/116 PASS Verified)
Required before unlock:
- ADR-0001 through ADR-0008 Accepted
- TranslationRepository Verified
- ReverseTranslationSearch Verified
- MultiLanguageSearch Verified
- TranslationTable Verified

---

# Compatibility Rules
Rule-001: TranslationEntry identities must remain stable.
Rule-002: TranslationGroup objects must continue to function without Concept Engine.
Rule-003: Phase 2 APIs remain operational. No endpoint may require Concept data.
Rule-004: Meaning lookup must work even when ConceptRepository is unavailable.
Rule-005: Dialect matching remains independent from Concept matching.

---

# Explicit Non-Goals (Scope Boundary)
The following are STRICTLY NOT part of Phase 3:
- KnowledgeGraph implementation
- Embedding Search & Vector Databases
- Semantic Ranking Algorithms
- Cultural & Historical Inference Engines

---

# Unlock Conditions
1. Phase 2 Closure Review (APPROVED)
2. ADR-0009 Accepted (Concept Identity Strategy)
3. ADR-0010 Accepted (Concept Repository Contract)
4. ADR-0011 Accepted (Meaning Graph Boundaries)
5. Test Strategy Approval

All required before code implementation begins.
"""

ADR_0008_CONTENT = """# ADR-0008: TranslationMeaning Representation Strategy

- **Status:** ACCEPTED / IMPLEMENTED
- **Date:** 2026-09-01
- **Scope:** Phase 2 — Translation Platform

## Context
Çeviri girdilerinde (`TranslationEntry`) anlam yapısının standartlaştırılmış bir dizi olarak temsil edilmesi gerekiyordu.

## Decision
1. `TranslationEntry` içerisindeki anlamlar `meanings: TranslationMeaning[]` dizisi olarak temsil edilecektir.
2. `TranslationMeaning` tipi `text` ve `language` alanlarını içermek zorundadır.
3. Bu ADR sadece Phase 2 veri temsilini kapsar; semantik kavram kimliği yönetimini kapsamaz.
"""

ADR_0009_CONTENT = """# ADR-0009: Concept Identity Strategy

- **Status:** DRAFT (Phase 3 LOCKED)
- **Date:** 2026-09-01
- **Scope:** Phase 3 — Concept Engine

> ⚠️ **UYARI:** Bu karar Phase 3 tasarım aşaması içindir (`Phase 3 design work: ALLOWED`). Phase 3 kilitleri açılana kadar `src/` veya `app/` altında kod geliştirmesi YAPILAMAZ (`Phase 3 code generation: FORBIDDEN`).

## Context
Dilden bağımsız "evrensel kavramlar" üzerinden anlamsal bir ağ oluşturabilmek için bir kavram kimliği (Concept ID) mimarisine ihtiyaç vardır.

## Proposed Decision (Draft)
1. Dilden ve kaynak sözlükten bağımsız benzersiz `ConceptID` yapısı tanımlanacaktır.
2. `TranslationEntry` → `Concept` ilişkisinin eşleşme kuralları belirlenecektir.
"""

ADR_0010_CONTENT = """# ADR-0010: Concept Repository Read-Model Contract

- **Status:** DRAFT (Phase 3 LOCKED)
- **Date:** 2026-09-01
- **Scope:** Phase 3 — Concept Engine

## Proposed Decision (Draft)
1. `ConceptRepository`, `ITranslationRepository`'den tamamen bağımsız bir katman olarak kurgulanacaktır.
"""

ADR_0011_CONTENT = """# ADR-0011: Meaning Graph Boundaries

- **Status:** DRAFT (Phase 3 LOCKED)
- **Date:** 2026-09-01
- **Scope:** Phase 3 — Concept Engine

## Proposed Decision (Draft)
1. MeaningGraph, sadece soyut konseptler seviyesinde Cross-Dictionary bağ kuracaktır.
"""

DECISIONS_CONTENT = """# DECISIONS (Architecture Decision Records)

## Phase 1 & Phase 2 (Completed Baseline)
- [ADR-0001] Repository Architecture & Layering Strategy ✅
- [ADR-0002] Morphological Representation Standard ✅
- [ADR-0003] Normalization Pipeline Standard ✅
- [ADR-0004] Canonical Identity Rule ✅
- [ADR-0005] Translation Group Semantic Model ✅
- [ADR-0006] Morphology & Dialect Awareness Scope ✅
- [ADR-0007] Reverse Search Contract (`findByMeaning`) ✅
- [ADR-0008] TranslationMeaning Representation Strategy ✅

---

## Phase 2 Closure
- **Date:** 2026-09-01
- **Status:** APPROVED & FROZEN
- **Verification:** 116 / 116 Tests PASS (Vitest)

---

## Phase 3 Draft ADRs (Locked for Code Implementation)
- [ADR-0009] Concept Identity Strategy 📝 (DRAFT - Phase 3 Locked)
- [ADR-0010] Concept Repository Read-Model Contract 📝 (DRAFT - Phase 3 Locked)
- [ADR-0011] Meaning Graph Boundaries 📝 (DRAFT - Phase 3 Locked)
"""

PROJECT_STATUS_CONTENT = """# Project Status

## Active Workstream
Current Focus: **Phase 3 Unlock Review & Architecture Planning (ADR-0009, ADR-0010, ADR-0011)**
Code Implementation in `src/` or `app/`: **FORBIDDEN**

## Phase Summary
- **Phase 1 — Core Domain & Rules:** ✅ COMPLETED
- **Phase 2 — Translation Platform:** ✅ COMPLETED & FROZEN (Approval: APPROVED)
- **Phase 3 — Concept Engine:** 🔒 LOCKED (Planning & Design Work Only)

## Phase 2 Final Validation Checklist
- [x] Architecture: TranslationEntry, TranslationMeaning, TranslationGroup
- [x] Repository: getById/getByIds, search, findByMeaning, getByGroup
- [x] Matching: Exact Match, Dialect Match, Morphology-Aware Match
- [x] Search: Reverse Translation Search, MultiLanguage Search
- [x] Presentation: TranslationTable & Server Actions Integration
- [x] Quality Gate: 116/116 Tests PASS (0 TS Error, Performance Stress Pass)
"""

CLOSURE_REPORT_CONTENT = """# PHASE 2 CLOSURE REVIEW REPORT

- **Status:** APPROVED
- **Approval State:** APPROVED
- **Phase:** Phase 2 — Translation Platform
- **Exit Date:** 2026-09-01

## Quality Gate & Verification Metrics
- **Test Results:** 116 / 116 PASS (Vitest Baseline & Stress Suite)
- **TypeScript Errors:** 0 Errors
- **Accepted ADRs:** ADR-0001 through ADR-0008
"""


def clean_unwanted_items():
    print("🧹 Fazladan oluşan klasör ve gereksiz kopyalar temizleniyor...")
    for item in ITEMS_TO_CLEAN:
        if os.path.exists(item):
            try:
                if os.path.isdir(item):
                    shutil.rmtree(item)
                    print(f"  🗑️ Dizin silindi: {item}")
                else:
                    os.remove(item)
                    print(f"  🗑️ Dosya silindi: {item}")
            except Exception as e:
                print(f"  ⚠️ Silinemedi ({item}): {e}")


def write_file(filepath: str, content: str):
    os.makedirs(os.path.dirname(filepath), exist_ok=True)
    with open(filepath, "w", encoding="utf-8") as f:
        f.write(content.strip() + "\n")
    print(f"  ✨ Güncellendi: {filepath}")


def run_migration():
    print("🚀 Arşiv Dizini (`archive/document/`) Senkronizasyonu Başlatılıyor...\n")
    
    clean_unwanted_items()
    print("")

    write_file(PATHS["migration_plan"], MIGRATION_PLAN_CONTENT)
    write_file(PATHS["adr_0008"], ADR_0008_CONTENT)
    write_file(PATHS["adr_0009"], ADR_0009_CONTENT)
    write_file(PATHS["adr_0010"], ADR_0010_CONTENT)
    write_file(PATHS["adr_0011"], ADR_0011_CONTENT)
    write_file(PATHS["decisions"], DECISIONS_CONTENT)
    write_file(PATHS["project_status"], PROJECT_STATUS_CONTENT)
    write_file(PATHS["closure_report"], CLOSURE_REPORT_CONTENT)

    print("\n🎉 İŞLEM BAŞARILI!")
    print("--------------------------------------------------")
    print(f"📌 Bütün dosyalar doğrudan '{TARGET_DIR}' dizinine kaydedildi.")
    print("📌 'PytonCıktıları' klasörü korundu.")


if __name__ == "__main__":
    run_migration()