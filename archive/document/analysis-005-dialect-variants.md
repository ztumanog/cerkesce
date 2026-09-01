# Analysis 005 — Proven Dialect Correspondences Strategy

* **Status:** Verified & ADR-0006 Aligned (High Confidence)
* **Phase:** Phase 2 (Translation Platform)
* **Target Layer:** Normalizer, Morphological Segmenter, Matching Engine
* **Rule Source:** `circassian_dialect_rules.json`

---

## Strict Architectural Constraint (ADR-0006)

> **Direct string replacement is strictly forbidden.**  
> Phonological correspondence rules MUST ONLY be applied after morphological segmentation has isolate the lexical root and paradigm boundaries.

### Matching Pipeline Rules:
1. **Morphological Segmentation:** Kelime ek, önek ve kök sınırlarına ayrılır.
2. **Prefix & Preverb Isolation:** Gramer önekleri (örn: `фэ-`) ve konum önekleri (örn: `щы-`) tespit edilir.
3. **Lexical Root Identification:** Kök yalıtılır.
4. **Phonological Rule Application:** Fonolojik kurallar YALNIZCA yalıtılmış köke uygulanır.
5. **Grammatical Rule Application:** Dilbilgisel kurallar YALNIZCA ilgili önek/son ek segmentlerine uygulanır.

---

## Proven Correspondence Rules

### 1. `phonological_rules` (Lexical Root Level Only)

Bu kurallar yalnızca segmentasyon sonucu yalıtılmış leksikal köklere (`lexical_root`) uygulanabilir. Ham metin düzeyinde uygulanması yasaktır.

#### Rule-001 (`щ ↔ шъ`)
- **Pattern:** `щ` (Kabardian) ↔ `шъ` (Adyghe)
- **Target Segment:** `lexical_root`
- **Examples:**
  - `щхьэ` ↔ `шъхьэ` (Kök: `щхьэ` / `шъхьэ`)
  - `щыблэ` ↔ `шыблэ`
- **Confidence:** High

#### Rule-002 (`щӀ ↔ шӀ`)
- **Pattern:** `щӀ` (Kabardian) ↔ `шӀ` (Adyghe)
- **Target Segment:** `lexical_root`
- **Examples:**
  - `щӀын` ↔ `шӀын`
  - `щӀэн` ↔ `шӀэн`
  - `гъащӀэ` ↔ `гъашӀэ`
- **Confidence:** High

#### Rule-003 (`жь ↔ жъ`)
- **Pattern:** `жь` (Kabardian) ↔ `жъ` (Adyghe)
- **Target Segment:** `lexical_root`
- **Examples:**
  - `жьы` ↔ `жъы`
  - `бжьэ` ↔ `бжъэ`
  - `жьэн` ↔ `жъэн`
- **Confidence:** High

#### Rule-004 (`ху ↔ ф`)
- **Pattern:** `ху` (Kabardian) ↔ `ф` (Adyghe)
- **Target Segment:** `lexical_root`
- **Examples:**
  - `хуабэ` ↔ `фабэ`
  - `махуэ` ↔ `мафэ`
  - `хужь` ↔ `фыжьы`
- **Confidence:** Medium-High

---

### 2. `grammatical_rules` (Prefix / Paradigm Boundaries)

Önek ve çekim ekleri seviyesinde çalışan kurallardır. Kök kurallarından bağımsız değerlendirilir.

#### Rule-005 (`фэ- ↔ фӀэ-`)
- **Pattern:** `фэ-` (Adyghe prefix) ↔ `фӀэ-` (Kabardian prefix)
- **Target Segment:** `prefix`
- **Example:**
  - `фэщхъуныгъэ` → `фӀэщхъуныгъэ` ✅

---

### 3. `syntactic_rules` (Post-Lexical Realizations)

Kelime gövdesi dışındaki ek ve kopula yapılarına uygulanan kurallardır.

#### Rule-006 (`-щ` Copula Realization)
- **Pattern:** Kabardian copula `-щ` (örn: `дахэщ`)
- **Target Segment:** `suffix` / `clitic`

---

## Verification & Anti-Pattern Matrix

| Test Senaryosu | Uygulanan Yöntem | Sonuç | Durum |
| :--- | :--- | :--- | :--- |
| `щхьэ` → `шъхьэ` | Root Segment Transformation | `шъхьэ` | ✅ PASS |
| `фэщхъуныгъэ` → `фӀэщхъуныгъэ` | Grammatical Prefix Rule (`фэ- ↔ фӀэ-`) | `фӀэщхъуныгъэ` | ✅ PASS |
| `фэщхъуныгъэ` → `хуэщхъуныгъэ` | Global String Replacement (`ф ↔ ху`) | Hatalı Dönüşüm | ❌ FAIL (Forbidden) |
| Global Rule execution before segmentation | Pre-Segmentation Execution | False-Positive Explosion | ❌ FAIL (Forbidden) |

