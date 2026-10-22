# docs/ Kanonik Kaynak Karari

**Tarih:** 2026-10-16
**Durum:** KANONIK KARAR
**Karar veren:** Bas Mimar
**Kapsam:** Tum dokumantasyon denetim ve uygulama surecleri

---

## 1. Karar

E:\projeler\Cerkesce\docs klasoru, projenin tek kanonik dokumantasyon kokudur.

Gecersiz kokler (referans verilmez):
- E:\home\ProjeDoc_FINAL
- E:\home\ProjeDoc
- E:\projeler\Cerkesce\ (kok) - yalnizca docs/ disi dosyalar icin

---

## 2. Gerekce

Kok klasorde belgeler 4 kez silme olayi yasadi. Bu nedenle belgeler docs/ altina tasindi.

---

## 3. SSOT Ilkesi

Her bilgi icin tek dogru kaynak vardir:

| Bilgi turu | Kanonik kaynak |
|---|---|
| Faz durumu | governance/status/PHASES.md, PROJECT_STATUS.md |
| Denetim bulgulari | governance/inventory/DOCS_EDIT_AUDIT_INDEX.md |
| Uygulama kaydi | governance/inventory/edit-audit/07-UYGULAMA-RAPORU.md |
| Kararlar | governance/DOCS_KANONIK_KARARI.md |

---

## 4. Mukerrer Belge Yasagi

Ayni konu icin birden fazla belge olusturulamaz.

Yasak: rapor.md, rapor_v2.md, rapor_son.md, rapor_final.md, rapor_tamam.md

Serbest: Tek karar + Tek uygulama kaydi + Tek kanonik kaynak

---

## 5. Dokuman Butcesi

Her is icin: 1 Karar + 1 Uygulama Kaydi + 1 Kanonik Kaynak

---

## 6. Arsiv Kurallari

- Tarihsel belgeler -> docs/archive/<yil-ay>-<konu>/
- Silinmez, tasinir
- Basi na TARİHSEL notu eklenir

---

## 7. Tekrar Onleme Kurali

Ayni is birden fazla kez yapilmaz. Yapilirsa once mevcut iz aranir, varsa guncellenir.

---

**Bu karar gecerlidir. Son guncelleme: 2026-10-16**


---

## 9. Test Sayisi Politikasi

### Kural

Test sayilari belgelerde rastgele yazilmaz. Her belge turu kendi kuralina tabidir:

| Belge turu | Test sayisi | Ornek |
|---|---|---|
| Sertifikasyon | Tarihsel sabit - dokunulmaz | CERTIFICATION_*, PHASE_*_COMPLETION |
| Faz raporu | Faz bazli sabit - dokunulmaz | ADR-0015, PROJECT_ROADMAP |
| Durum belgesi | Tarihli - guncellenir | AGENTS.md, README.md, PROJECT_STATUS.md |
| Kanonik baseline | Guncel SSOT | governance/status/CURRENT_TEST_BASELINE.md |

### Toplu Replace Yasagi

193 -> 1028, 231 -> 1028 gibi toplu degistirme yapilmaz.
Cunku 193/193 bir donemin dogru sonucudur -> tarihsel kayittir.

### Durum Belgesi Formati

Durum belgelerinde test sayisi tarihli yazilir:

**Test:** 1028/1028 PASS (2026-10-16)

> Kanonik kaynak: governance/status/CURRENT_TEST_BASELINE.md

---

*Son guncelleme: 2026-10-16*


---

## 10. Dil ve Terminoloji Politikasi (Asama C)

### K3 - Faz Yazimi

| Kullanim | Karar | Ornek |
|---|---|---|
| Govde metni | Faz | "Faz 1-15 CLOSED" |
| Dosya adi | PHASE_* | PHASE_5_COMPLETION_REPORT.md |
| Kisaltma (baslik) | FAZ | "FAZ 5 DURUMU" |
| Ingilizce baglam | Phase | "Phase 2 - Translation Platform" |

**Kural:** Turkce metinde "Faz", teknik dosya adinda "PHASE", baslikta "FAZ".

### K4 - Durum Etiketi

| Baglam | Karar | Ornek |
|---|---|---|
| Tablo/sertifikasyon | COMPLETED / CLOSED | "Faz 1 - CLOSED" |
| Duz Turkce metin | tamamlandi (kucuk harf) | "Faz 1 tamamlandi" |
| Baslik/ID | COMPLETED | "## P5-001 COMPLETED" |

**Kural:** Teknik tabloda buyuk harf, duz metinde kucuk harf.

### K5 - ADR Numarasi

- **Kanonik:** ADR-0001 (tire)
- **Yeniden adlandirilacak:** ADR_0001 ... ADR_0014 -> ADR-0001 ... ADR-0014
- **Referanslar guncellenecek:** ADR_INDEX.md

### K6 - Diakritik

- **Duzeltilecek:** 170 bulgu
- **Kapsam disi:** Kod bloklari, Ingilizce cumleler
- **Ornek:** Sayilari -> Sayilari, Asagidaki -> Asagidaki

### Terim Kanonik Sozlugu

| Kavram | Kanonik | Cakisan | Kural |
|---|---|---|---|
| Cerkesce | Cerkesce | Circassian | Turkce metinde Cerkesce |
| Kabardey | Kabardian | Kabardey | Teknik terimde Kabardian |
| Korpus | Corpus | Korpus | Teknik terimde Corpus |
| Dokuman | dokuman | dokumentasyon | Baglama gore |

---

*Son guncelleme: 2026-10-16*
---

## 11. Asama C - Ertelenen Isler

### FAZ/PHASE (488 + 59 bulgu)

**Durum:** ERTELENDI
**Neden:** Baglam analizi gerekli - dosya adi / baslik / govde ayrimi
**Ne zaman:** Ayri oturum

**Kural:**
- Dosya adi `FAZ_*` -> dokunulmaz
- Baslik `FAZ` -> dokunulmaz
- Govde `FAZ` -> `Faz` (ayri oturumda)
- Teknik terim `PHASE_*` -> dokunulmaz

### Diger Ertelenen Isler

| Is | Durum | Ne zaman |
|---|---|---|
| FAZ/PHASE normalizasyonu | ERTELENDI | Ayri oturum |
| Terim sozlugu uygulamasi | ERTELENDI | Ayri oturum |

---

## 12. Bu Oturumun Siniri

Bu oturumda **yapilan:**
- Asama A (mekanik bicim) - TAMAMLANDI
- Asama B (yapisal) - TAMAMLANDI
- Asama D (arsiv) - TAMAMLANDI
- Asama E (dogrulama) - TAMAMLANDI
- Mimar Oncelikleri (1-5) - TAMAMLANDI

Bu oturumda **yapilmayan:**
- Asama C (dil/terminoloji) - ERTELENDI
- FAZ/PHASE normalizasyonu - ERTELENDI
- Terim sozlugu uygulamasi - ERTELENDI

---

*Son guncelleme: 2026-10-16*

---

## 9. Test Sayisi Politikasi

### Kural

Test sayilari belgelerde rastgele yazilmaz. Her belge turu kendi kuralina tabidir:

| Belge turu | Test sayisi | Ornek |
|---|---|---|
| Sertifikasyon | Tarihsel sabit - dokunulmaz | CERTIFICATION_*, PHASE_*_COMPLETION |
| Faz raporu | Faz bazli sabit - dokunulmaz | ADR-0015, PROJECT_ROADMAP |
| Durum belgesi | Tarihli - guncellenir | AGENTS.md, README.md, PROJECT_STATUS.md |
| Kanonik baseline | Guncel SSOT | governance/status/CURRENT_TEST_BASELINE.md |

### Toplu Replace Yasagi

193 -> 1028, 231 -> 1028 gibi toplu degistirme yapilmaz.
Cunku 193/193 bir donemin dogru sonucudur -> tarihsel kayittir.

### Durum Belgesi Formati

Durum belgelerinde test sayisi tarihli yazilir:

**Test:** 1028/1028 PASS (2026-10-16)

> Kanonik kaynak: governance/status/CURRENT_TEST_BASELINE.md

---

*Son guncelleme: 2026-10-16*

