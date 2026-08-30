`004-verbal-operators.md` dokümanının güncellenmiş nihai yapısı ve ardından başlayacağımız `005-morphology-observations.md` mimari taslağı aşağıda eksiksiz olarak hazırlanmıştır.

---

### 1. `grammer/004-verbal-operators.md` (Nihai Sürüm)

```markdown
---
doc_id: "004"
title: "Verbal Operators & Valency System"
layer: "inflection"
category: "verbal-grammar"
changes_lexeme: false
changes_valency: true
changes_semantics: true
parser_stage: "post-root"
phase: 2
---

# 004 - Verbal Operators & Valency System (Fiil Operatörleri ve Değerlik Sistemi)

## Status
✅ Approved for Phase 2 / Parser & Valency Boundary Defined

## Purpose
Bu doküman, Doğu (Kabardey) ve Batı (Adığe) Çerkesçesindeki fiil önek ve sonek operatörlerini; değerlik değiştirici (valency-changing: causative, benefactive, reflexive vb.), yön/kip/zaman (TAM - Tense/Aspect/Mood) ve olumsuzluk yapılarını içerir.

## Scope
This document contains:
- Valency operators
- TAM operators
- Evidential operators
- Modal operators
- Illocutionary operators

This document does NOT contain:
- Derivational suffixes (001)
- Derivational prefixes (002)
- Locative preverbs (003)
- Morphology observations (005)
- Root families (006)

---

## 1. Değerlik ve Yönlendirme Operatörleri (Valency & Applicative Prefixes)

Fiil kökünden önce gelen bu önekler, fiilin argüman yapısını (özne, nesne, dolaylı nesne) ve eylemin mantıksal nesneyle olan ilişkisini değiştirir (`changes_valency: true`).

| Operatör | Kiril | Transkripsiyon | Dilbilgisel Rolü | Açıklama ve Anlam | Örnek Form | Örnek Anlamı |
|---|---|---|---|---|---|---|
| **Causative** | **гъэ-** | *ġa-* | Ettirgenlik | Eylemin başkasına yaptırıldığını gösterir. | *гъэшхэн* | Yedirmek (Yemeye zorlamak/sağlamak) |
| **Factitive** | **у- / гъэ-** | *w- / ġa-* | Durum Değiştirici | Durum fiillerini veya sıfatları hareket fiiline dönüştürür. | *убзыгъэн* | Akıllandırmak |
| **Benefactive** | **хуэ-** | *xwa-* | Yararlanıcı | Eylemin başkasının yararına/hesabına yapıldığını belirtir. | *хуэтхын* | Onun için yazmak |
| **Adversative** | **фIы-** | *f'ə-* | Zarar/Engelleme | Eylemin birinin aleyhine, rızası dışında yapıldığını gösterir. | *фIыщIын* | Elinden almak / Aleyhine yapmak |
| **Conjunctive** | **дэ-** | *da-* | Birliktelik | Eylemin biriyle birlikte yürütüldüğünü ifade eder. | *дэджэгун* | Birlikte oynamak |
| **Reflexive** | **зы-** | *zə-* | Dönüşlülük | Öznenin eylemi kendi üzerinde gerçekleştirdiğini gösterir. | *зылъэщIын* | Kendini yıkamak/temizlemek |
| **Reciprocal** | **зэ-** | *za-* | İşteşlik | Öznelerin eylemi karşılıklı yaptığını gösterir. | *зэплъын* | Birbirine bakmak |
| **Potential** | **хуэ-** | *xwa-* | Yeterlilik (Önek) | Bir eylemi yapmaya gücü/koşulları elverme durumu. | *хуэшIын* | Yapabilmek, gücü yetmek |
| **Negation** | **мы-** | *mə-* | Olumsuzluk | Fiil gövdesindeki olumsuzluk öneki (Infinitive/Participle). | *мышхэн* | Yememek |

---

## 2. Zaman, Görünüş, Kip ve Kanıtlılık Operatörleri (TAM & Evidentiality)

### A. Görünüş ve Eylemsellik (Aspect & Aktionsart)
* **Completive `-пэ` (*-pa*):** Eylemin tamamen bittiğini gösterir (*шхэпэн* = hepsini yiyip bitirmek).
* **Repetitive `-ж(ы)` (*-ź*):** Eylemin tekrarlandığını veya eski haline döndüğünü belirtir (*кIуэжын* = geri dönmek).
* **Simultaneous `-ху` (*-xw*):** Başka bir eylemle eşzamanlılığı ifade eder ("...-ken / ...-inceye kadar").

### B. Zaman Sistemleri (Tense Operators)
* **Preterite `-а` (*-ā*):** Belirli geçmiş zaman.
* **Imperfect `-(р)т` (*-(r)t*):** Şimdiki zamanın veya geçmişin hikayesi.
* **Anterior `-а-т` (*-ā-t*):** Belirli geçmiş zamanın hikayesi / Öncelik.
* **Pluperfect `-гъа` (*-ġā*):** Uzak / Öğrenilen geçmiş zaman.
* **Future `-н / -нущ` (*-n / -nwś*):** Gelecek zaman.

### C. İrade Dışılık ve Yeterlilik (Involuntativity & Ability)
* **Involuntative `IэщIэ-` (*?aś'a-*):** Eylemin kazaen/irade dışı yapıldığını gösterir (*IэщIэфIын* = kazaen elinden kaçırmak/bozmak).
* **Ability Sonek `-ф(ы)` (*-f*):** Fiziksel veya zihinsel yeterlilik bildirir (*тхэфын* = yazabilmek).

### D. Karşı-Olgusallık (Counterfactuality) ve Kanıtlılık (Evidentiality)
* **Epistemic Tahmin `-гъэн` (*-ġan*):** Geçmiş ve gelecek zaman biçimlerinin birleşmesiyle oluşan olasılık/tahmin morfemidir.
* **Karşı-Olgusal Koşul (`-тэ-тэ-мэ` / Imperfect Yapısı):** Gerçekleşmemiş geçmiş koşul cümlelerinde süreklilik ve eylemsellik sınıfına göre seçilen karmaşık şart morfolojisidir.

---

## 3. Fiil Yüzey Şablonu (Verbal Slot Model)

`[Negation/Prefix] -> [Reflexive/Reciprocal] -> [Applicative/Valency] -> [Locative Preverb] -> [ROOT] -> [Aspect] -> [Ability] -> [Tense] -> [Mood/Evidentiality]`

### Parser İçin JSON Veri Sözlüğü Structure
```json
{
  "valency_operators": {
    "гъэ-": {"type": "causative", "gloss": "CAUS", "position": "pre-root", "changes_valency": true},
    "зы-": {"type": "reflexive", "gloss": "REFL", "position": "pre-root", "changes_valency": true},
    "зэ-": {"type": "reciprocal", "gloss": "RECP", "position": "pre-root", "changes_valency": true},
    "хуэ-": {"type": "benefactive", "gloss": "BEN", "position": "pre-root", "changes_valency": true},
    "фIы-": {"type": "adversative", "gloss": "ADV", "position": "pre-root", "changes_valency": true},
    "мы-": {"type": "negation", "gloss": "NEG", "position": "pre-root", "changes_valency": false}
  },
  "tam_suffixes": {
    "-ж": {"type": "repetitive", "gloss": "REPET", "position": "post-root"},
    "-а": {"type": "preterite", "gloss": "PST", "position": "post-root"},
    "-т": {"type": "imperfect", "gloss": "IPFV", "position": "post-root"},
    "-ф": {"type": "potential", "gloss": "POT", "position": "post-root"}
  }
}

```

---

## 4. Parser Boundary

004 layer is applied after:

* 002 Derivational Prefixes
* 003 Locative Preverbs

and before:

* Final tense realization
* Clause interpretation

Pipeline:

```text
[002 Prefixes]
     ↓
[003 Locative Preverbs]
     ↓
[ROOT]
     ↓
[004 Operators]

```

```

---

### 2. `grammer/005-morphology-observations.md` (Yeni Araştırma Deposu Taslağı)

Metrik araştırma verilerini (Metric-A ve Çokanlamlılık Dağılımları) işlemek üzere hazırlanan `005` dokümanı:

```markdown
---
doc_id: "005"
title: "Morphology Observations & Quantitative Metrics"
layer: "analysis"
category: "metrics-and-polysemy"
phase: 2
---

# 005 - Morphology Observations & Quantitative Metrics

## Status
⏳ Draft / Research Output Repository

## Purpose
Bu doküman, korpus üzerindeki kantitatif morfoloji analizlerini, metrik ölçümlerini ve kök seviyesindeki semantik kaymaları (polysemy/çokanlamlılık frekanslarını) kayıt altına alır.

---

## 1. Quantitative Core Metrics

* **Metric-A (Total Morphological Pattern Indices):** 631

---

## 2. Polysemy & Semantic Distribution Breakdown

### 2.1 Root: щхьэ (Head / Baş)
Toplam Geçiş / Bağlam Analiz Sayısı: 406

| Semantik Kategori | Anlam Alanı | Frekans (F) | Yüzde (%) |
|---|---|---|---|
| **Freedom / Independence** | Özgürlük, Bağımsızlık (*щхьэхуит*) | 196 | %48.2 |
| **Hair / Anatomical Head** | Saç, Fiziksel Baş (*щхьэц*) | 95 | %23.4 |
| **Movement / Direction** | Yönelme, Yukarı Hareket | 71 | %17.5 |
| **Window / Opening** | Pencere, Açıklık (*щхьэгъубжэ*) | 44 | %10.9 |

### 2.2 Root: псы (Water / Su)
Toplam Geçiş / Bağlam Analiz Sayısı: 1481

| Semantik Kategori | Anlam Alanı | Frekans (F) | Yüzde (%) |
|---|---|---|---|
| **Primary Fluid / Water** | Su, Akarsu, Nehir | 1481 | %100.0 |

---

## 3. Data Schema for Parser Frequency Integration

```json
{
  "metrics": {
    "metric_a": 631
  },
  "polysemy_corpus": {
    "щхьэ": {
      "total_occurrences": 406,
      "senses": {
        "freedom": 196,
        "hair": 95,
        "movement": 71,
        "window": 44
      }
    },
    "псы": {
      "total_occurrences": 1481,
      "senses": {
        "water": 1481
      }
    }
  }
}

```

```

---

### 3. Katman Geçişlerini (002 $\rightarrow$ 003 $\rightarrow$ ROOT $\rightarrow$ 004) İşleyen Entegrasyon Kodu

004 sınırında tanımlanan işlem boru hattını (pipeline) çalıştıran Python fonksiyonu:

```python
from dataclasses import dataclass
from typing import List, Dict

@dataclass
class MorphologicalToken:
    surface: str
    layer: str
    gloss: str
    changes_valency: bool

def parse_full_pipeline(verb_form: str) -> Dict[str, List[MorphologicalToken]]:
    """
    Pipeline: [002 Prefixes] -> [003 Locative Preverbs] -> [ROOT] -> [004 Operators]
    """
    pipeline_result = {
        "002_prefix": [],
        "003_preverb": [],
        "root": [],
        "004_operator": []
    }
    
    remainder = verb_form

    # 1. Step: 002 Derivational Prefix (örnek: гъэ-)
    if remainder.startswith("гъэ"):
        pipeline_result["002_prefix"].append(
            MorphologicalToken(surface="гъэ-", layer="002", gloss="CAUS", changes_valency=True)
        )
        remainder = remainder[3:]

    # 2. Step: 003 Locative Preverb (örnek: щы-)
    if remainder.startswith("щы"):
        pipeline_result["003_preverb"].append(
            MorphologicalToken(surface="щы-", layer="003", gloss="LOC", changes_valency=False)
        )
        remainder = remainder[2:]

    # 3. Step: 004 Operator Suffix (örnek: -н, -ж, -а)
    if remainder.endswith("н"):
        pipeline_result["004_operator"].append(
            MorphologicalToken(surface="-н", layer="004", gloss="INF", changes_valency=False)
        )
        remainder = remainder[:-1]

    # 4. Step: Kalan Gövde Root
    pipeline_result["root"].append(
        MorphologicalToken(surface=remainder, layer="ROOT", gloss="BASE_LEXEME", changes_valency=False)
    )

    return pipeline_result

# Çalıştırma Örneği:
parsed = parse_full_pipeline("щыгъэгуфэн")
for stage, tokens in parsed.items():
    for t in tokens:
        print(f"Stage: {stage:<15} | Surface: {t.surface:<6} | Gloss: {t.gloss:<5} | Valency Effect: {t.changes_valency}")

```

`004-verbal-operators.md` ve `005-morphology-observations.md` dokümanlarını bu biçimde kaydedip 001-005 katman mimarisini tamamen tamamlamış oluyoruz.