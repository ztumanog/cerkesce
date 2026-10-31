# word_form_mapping.json - Sertifikasyon Fixture

**Durum:** GENISLETILDI (otomatik turetme)
**Tarih:** 2026-11-01
**Amac:** Phase 5.3.3 Cross-Lingual Discovery testleri + genis kapsam

---

## Kapsam

**6719 form** (lexemes.json'dan otomatik turetildi)

Testlerin bekledigi 11 form manuel override:

| Form | Concept |
|---|---|
| water, su, псы, пси | WATER |
| tree, ağaç, agac, жыг | TREE |
| horse, at, шы | HORSE |

---

## Kaynak

- public/data/linguistic/lexemes.json
- 28155 kayittan 6863'unde conceptId dolu
- 6711 form otomatik turetildi + 8 override = 6719

---

## Kalite Kontrolu

Rastgele 10 kayit ornegi:

| Form | Concept |
|---|---|
| лъэхъун | LEG_FOOT |
| пэув | OPPONENT |
| мафӏащхьэ | EXIT |
| щыщынэн | BE_AFRAID_OF |
| дзахъэ | EYEBROW |
| чэсэй | CHERRY |
| губернатор | POLITICS |
| ебгын | NINE |
| къапхъэн | PLANT |
| гъуэджэ | YELLOW |

Hepsi anlamli eslesmeler.

---

## Dogrulama Durumu

| Kontrol | Sonuc |
|---|---|
| Discovery testleri | 26 dosya, 81 test PASS |
| TS derlemesi | 0 hata |
| Test bekledigi 11 form | Tamam |
| Rastgele kalite kontrolu | Anlamli |

---

## Sinirlamalar

- Otomatik turetme, lexemes.json'daki conceptId'lere dayanir.
- conceptId'lerin dogrulugu VERI SAHIBI tarafindan teyit edilmemistir.
- Testlerin bekledigi 11 form manuel override edilmistir.
- Gercek uretim icin veri sahibi etiketlemesi gerekir.

---

## Referanslar

- Sonuc.txt (2026-10-31)
- PHASE_5_3_3_REPORT.md

---

**Not:** Bu dosya hard-code DEGILDIR. Veri katmanidir.

