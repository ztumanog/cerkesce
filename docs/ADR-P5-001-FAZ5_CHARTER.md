# ADR-P5-001: Faz 5 Charter - Corpus Analytics & Search Intelligence

**Tarih:** 2026-09-24
**Durum:** PROPOSED
**Faz:** 5
**On Kosul:** Faz 2 CLOSED, Faz 4 Sprintler Tamamlandi
**Karar Sahibi:** Mimar

---

## Amac

Faz 5'in amaci:

- Kelimeyi bulmak degil
- Kelimeyi anlamak
- Veriyi analiz etmek
- Kullanim davranisini olcmek

---

## Kapsam

### P5-001 Corpus Analytics

**Amac:** 428.000+ kayit uzerinde istatistik uretmek

**Ornek Ciktilar:**
- En sik gecen kelimeler
- En buyuk sozlukler
- Dil dagilimi
- Lehce dagilimi
- Kaynak yogunlugu

---

### P5-002 Search Analytics

**Amac:** Kullanici davranisini anlamak

**Ornek Ciktilar:**
- En cok aranan kelimeler
- Sonucsuz sorgular
- En cok kullanilan filtreler
- En cok acilan kaynaklar

---

### P5-003 Smart Suggestions

**Amac:** Yazim toleransi, yakin eslesme, oneri sistemi

**Ornek:**
- пси -> псы (Kastettiginiz bu olabilir mi?)

---

### P5-004 Corpus Explorer

**Amac:** Bir kelimenin:
- Hangi sozluklerde gectigi
- Kac farkli anlam tasidigi
- Hangi dillerde bulundugu

sorusunu cevaplamak.

---

## Faz 5'te Yapilmayacaklar

- Embedding Engine
- Semantic Vector Search
- AI Similarity Search
- LLM tabanli eslestirme

**Not:** Bunlar Faz 6 konusu.

---

## Cikis Kriterleri

- [ ] Corpus Analytics ekrani
- [ ] Search Analytics ekrani
- [ ] Smart Suggestions sistemi
- [ ] Corpus Explorer ekrani
- [ ] Mevcut performans korunmus
- [ ] Testler PASS
- [ ] Kritik teknik borc: 0

---

## Product Stage Gozlem Plani

### Toplanacak Veriler

#### Arama
- En cok aranan kelimeler
- Sonucsuz sorgular
- Filtre kullanim oranlari

#### Drawer
- En cok acilan kaynaklar
- En cok goruntulenen icerikler
- En uzun okunan icerikler

#### Gunun Kelimesi
- Kaydetme orani
- Paylasma orani
- Tiklanma orani

#### Android
- Performans
- Bildirim kullanimi
- Akilli klavye kullanimi

---

## Known Improvements Backlog

**Durum:** Dusuk Oncelik

### META-001: Metadata Resolver Konsolidasyonu
- getDictMeta
- resolveSourceMetadata

### META-002: Language Metadata Standardizasyonu
- sourceLanguage temizligi

### META-003: MULTI Stratejisi
- Yeni cok dilli sozluk gelirse yeniden degerlendirilecek

### DRAWER-001: Ansiklopedik Marker Sunumu
- Isaretler: ◊, /, I-II-III, 1-2-3

### REL-001: Play Store Yayini
- Butce olusunca

---

## Nihai Mimar Karari

- Faz 2 CLOSED
- Product Stage ACTIVE
- Faz 5 Charter Hazir
- Faz 5 Henuz Baslatilmadi
- Faz 5 Tasarim Asamasinda

---

## Onay

Bu ADR, Faz 5'in kapsamini ve sinirlarini resmi olarak tanimlar.

**Onay Bekleyen:** Mimar
**Tarih:** 2026-09-24

