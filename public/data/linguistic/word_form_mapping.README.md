# word_form_mapping.json - Sertifikasyon Fixture

**Durum:** GECICI VERI KATMANI
**Tarih:** 2026-10-31
**Amac:** Phase 5.3.3 Cross-Lingual Discovery testleri icin

---

## Kapsam

10 form eslemesi:

| Form | Concept |
|---|---|
| water, su, psin | WATER |
| tree, zhyg, agac | TREE |
| horse, at, shy | HORSE |

---

## Dogrulama Durumu

| Form | Kaynak | Durum |
|---|---|---|
| water | Test fixture | Var |
| su | lexemes.json L-PSY | Var (conceptId bos) |
| psin | lexemes.json L-PSY | Var (conceptId bos) |
| tree | Test fixture | Var |
| zhyg | lexemes.json L-ZHYG | Var (OAK_TREE) |
| horse | Test fixture | Var |
| at | lexemes.json L-SHY | Var (HORSE) |
| shy | lexemes.json L-SHY | Var (HORSE) |
| agac | lexemes.json L-ZHYG | Var (OAK_TREE) |

**Not:** 'Dogrulandi' ifadesi kullanilmadi. lexemes.json'da
kayitlarin varligi teyit edildi, ancak conceptId atamalari
kismen bos veya farkli kavramlara isaret ediyor.

---

## Sinirlamalar

- Gercek uretim icin lexemes.json tabanli otomatik turetme gerekir
- 28.155 lexeme'den sadece 6.863'unde conceptId dolu (sayildi)
- Kalanlar icin veri sahibi etiketlemesi gerekir

---

## Referanslar

- Sonuc.txt (2026-10-31) - Secenek B karari
- ConceptLookupPort mimarisi
- P5-001-CORPUS_AUDIT.md
- PHASE_5_3_3_REPORT.md

---

**Not:** Bu dosya hard-code DEGILDIR. Veri katmanidir.

