---
doc_id: "005"
title: "Morphology Observations & Quantitative Metrics"
layer: "analysis"
category: "metrics-and-polysemy"
phase: 2
status: "active"
---

# 005 - Morphology Observations & Quantitative Metrics

---

## Section A: Observation Registry

### Observation-001
* **Title**: Polysemy Scan
* **Dictionary**: 17.Kbd-En_Amjad
* **Status**: Completed
* **Notes**: High density of polysemous entries detected. Example: Ӏу (mouth, fore-part, orifice, verbal prefix).

### Observation-002
* **Title**: Word Family Extraction Framework
* **Canonical Storage**: word_families.json
* **Purpose**: Store root-level semantic expansion outside grammar documents.
* **Status**: Active

### Observation-004
* **Title**: Root Family: псы
* **Category**: Word Family Analysis
* **Status**: In Progress
* **Notes**: Kök aile analizi devam ediyor.

---

## Section B: Metrics Registry

### Polysemy Metrics (Amjad Dictionary)
* **Metric-A**: 631
* **Metric-B**: 215
* **Metric-C**: 3

### Dialect & Pattern Matches
* **Phonetic Shift**: ш ↔ щ
* **Matches**: 5312

### Root Productivity Metrics
* **псы Productivity**: 1481

---

## Section C: Confirmed Findings

### Finding-001
* **Root Family**: щхьэ
* **Type**: Word Family Analysis
* **Status**: Confirmed
* **Sources**: 13.Kbd-Ar-Jonty, 14.Kbd-En-2-Jonty, 15.Kbd-En-Jonty, 16.Kbd-En-Ziwar, 17.Kbd-En_Amjad, 18.Kbd-Ru&En, 19.Kbd-Ru-2-Jonty, 20.Kbd-Ru-Jonty, 21.Kbd-Tu-Jonty
* **Core Meanings**: head, top, upper part, roof, surface
* **Semantic Expansion**: HEAD -> TOP -> SURFACE -> OVER -> SEPARATION -> INDEPENDENCE
* **Clusters**:
  * **Freedom**: 196
  * **Hair**: 95
  * **Movement**: 71
  * **Window**: 44
* **Notes**: This is NOT a Concept. This is a Word Family observation only.
---

#### Observation-006

Title:
Example Corpus Found

Source:
Адыгэ_ornekler.json

Notes:
Initial dataset for testing morpheme segmentation and root extraction rules.

----

## Observation-007

### Dialectical Mapping & Phonetic Shifts

Status:
Active

Purpose:
Track sound shifts and orthographic variations between Circassian dialects (e.g., Kabardian vs. Adyghe).

Findings:
- Phonetic shifts such as ш ↔ щ do not alter word family membership.

---

## Observation-008

### Evaluation Metrics Framework

Status:
Research

Purpose:
Kabardian morphological systems require language-specific evaluation methods.

Metrics:
- Sense Density (Lemma-to-Sense Ratio)
- Metaphorical Distance Metric (MDM)
- Morphemic Lemma Coverage (MLC)
- Predictable Verb Omission Rate (PVOR)
- Joint Segmentation and Labeling Accuracy (JSL)
- Slot Assignment F1
- Ablaut Resilient Lemmatization Accuracy (ARLA)

---

## Observation-009

### Valency Increasing Inventory

Status:
Confirmed

Purpose:
Document productive verbal operators that directly alter or increase the verb's argument structure in Kabardian.

Confirmed Operators:
- **гъэ-** (Causative): Adds an agent argument to the verb frame.
- **хуэ-** (Benefactive): Adds a benefactive indirect object argument.
- **фӀы-** (Malefactive): Adds an adversely affected indirect object argument.
- **дэ-** (Comitative): Adds an accompanying participant argument.

Typological Distinction Note:
- **Valency Increasers:** `гъэ-`, `хуэ-`, `фӀы-`, `дэ-` (license new syntactic arguments).
- **Argument Re-mappers:** `зы-` (Reflexive), `зэ-` (Reciprocal) (co-index existing argument slots rather than increasing valency).

Observed Behavior:
Directly validates the `changes_valency: true` parameter in Layer 004 verbal operators.

---

## Observation-010

### Morphological Evaluation Baseline

Status:
Validated

Purpose:
Establish baseline benchmark scores for the Kabardian morphological parser across core evaluation metrics.

Results:
- **JSL Accuracy** (Joint Segmentation and Labeling): 1.0
- **Slot-F1**:
  - Precision: 1.0
  - Recall: 1.0
  - F1-Score: 1.0
- **ARLA Accuracy** (Ablaut Resilient Lemmatization Accuracy): 1.0

Notes:
Baseline evaluation confirms flawless precision and recall on the initial target test corpus.


---

## Observation-011

### Morphological Evaluation Baseline

Status:
Validated

Tool:
validate004.py

Results:
- **JSL Accuracy** (Joint Segmentation and Labeling): 1.0
- **Slot-F1**:
  - Precision: 1.0
  - Recall: 1.0
  - F1 Score: 1.0
- **ARLA Accuracy** (Ablaut Resilient Lemmatization Accuracy): 1.0

Interpretation:
Current parser correctly segmented and labeled all validation examples.

Notes:
Result obtained on validation dataset, not on full corpus.