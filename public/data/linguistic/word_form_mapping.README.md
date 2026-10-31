# word_form_mapping.json — Sertifikasyon Fixture

**Durum:** GECICI VERI KATMANI
**Tarih:** 2026-10-31
**Amac:** Phase 5.3.3 Cross-Lingual Discovery sertifikasyonu

---

## Kapsam

10 form eslemesi:

| Form | Concept |
|---|---|
| water, su, псы | WATER |
| tree, жыг, ağaç, agac | TREE |
| horse, at, шы | HORSE |

---

## Dogrulama Durumu

| Form | Kaynak | Durum |
|---|---|---|
| water | Test fixture | Dogrulandi |
| su | lexemes.json L-PSY | Dogrulandi |
| псы | lexemes.json L-PSY | Dogrulandi |
| tree | Test fixture | Dogrulandi |
| жыг | lexemes.json L-ZHYG | Dogrulandi |
| horse | Test fixture | Dogrulandi |
| at | lexemes.json L-SHY | Dogrulandi |
| шы | lexemes.json L-SHY | Dogrulandi |
| ağaç, agac | lexemes.json L-ZHYG | Dogrulandi |

---

## Sinirlamalar

- Gercek uretim icin lexemes.json tabanli otomatik turetme gerekir
- 28.155 lexeme'den sadece 6.863'unde conceptId dolu
- Kalanlar icin veri sahibi etiketlemesi gerekir

---

## Referanslar

- Sonuc.txt (2026-10-31) — Secenek B karari
- ConceptLookupPort mimarisi
- P5-001-CORPUS_AUDIT.md
- PHASE_5_3_3_REPORT.md

---

**Not:** Bu dosya hard-code DEGILDIR. Veri katmanidir. Degistirmek icin kod derlemesi gerekmez.
