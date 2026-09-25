# P5-001: CORPUS COVERAGE AUDIT

**Tarih:** 2026-09-25
**Faz:** 5 - Sprint 1
**Durum:** IN PROGRESS

---

## 1. AMAC

34 sozluk neden 19'a dusuyor? Hangi sozlukler indekslenmiyor?

---

## 2. SORULAR

### Soru 1: 34 Sozluk Envanteri

- [ ] Tum sozluk dosyalari listelendi mi?
- [ ] dictionaries.json'da kac kayit var?
- [ ] public/data/'da kac dosya var?

### Soru 2: Index Coverage

- [ ] TranslationRepository hangi dosyalari yukluyor?
- [ ] Hangi sozlukler eksik?
- [ ] Neden eksik?

### Soru 3: Arama Kapsami

- [ ] `псы` aramasi -> 19 kaynak
- [ ] 34 sozluk nerede?
- [ ] Turkce sozlukler neden yok?

### Soru 4: Ters Arama

- [ ] Reverse Translation neden calismiyor?
- [ ] `sumak` neden bulunmuyor?

---

## 3. BULGULAR

(Bekliyor)

---

## 4. SONUC

(Bekliyor)

---

**Imza:** Gelistirme Ekibi
**Tarih:** 2026-09-25

---

## P5-001 COZULDU (2026-09-25)

### Kok Neden
API route definitions[0].meaning alanini okumuyordu.

### Cozum
const firstMeaning = Array.isArray(item.definitions)
  ? item.definitions[0]?.meaning
  : undefined;

const rawT = String(
  item.anlam ?? item.translation ?? item.definition ?? firstMeaning ?? ''
);

### Dogrulama
- 62/62 PASS, 193/193 PASS
- куэд щ1а (KBD) -> uzun süreli (TR)
- куэд щ1а (KBD) -> longtime (EN)
- куэд щ1акъым (KBD) -> недавно (RU)

### Durum
P5-001 COZULDU - Faz 2 hala aktif
---

## P5-001 ARAMA MODU SEMANTIGI (2026-09-25)

### Sorun
- tam modu, iceren gibi davraniyordu (t.includes kullaniliyordu)
- Arapca ال (el-) takisi normalizasyonu yoktu
- Arapca virgul (،) tokenize edilmiyordu

### Cozum
- tam = exact match (w === q, t === q, wParsed/tParsed.mainTokens)
- baslayan = prefix search (w.startsWith, t.startsWith)
- iceren = full-text search (w.includes, t.includes)
- normalizeArabic: Arapca ال temizleme
- tokenize regex: Arapca virgul (،) eklendi

### Dogrulama
- псы (tam) -> 19 kaynak
- псы (baslayan) -> псы* kelimeleri
- псы (iceren) -> aciklamalardaki referanslar
- ماء (tam) -> 2 kaynak (13.Kbd-Ar + 2.Ady-Ara)
- ماء (iceren) -> 2 + 4 kaynak

### Durum
P5-001 TAMAMEN COZULDU - Arama modu semantigi net
---

## P5-001 ARAMA MODU SEMANTIGI (2026-09-25)

### Sorun
- tam modu, iceren gibi davraniyordu (t.includes kullaniliyordu)
- Arapca ال (el-) takisi normalizasyonu yoktu
- Arapca virgul (،) tokenize edilmiyordu

### Cozum
- tam = exact match (w === q, t === q, wParsed/tParsed.mainTokens)
- baslayan = prefix search (w.startsWith, t.startsWith)
- iceren = full-text search (w.includes, t.includes)
- normalizeArabic: Arapca ال temizleme
- tokenize regex: Arapca virgul (،) eklendi

### Dogrulama
- псы (tam) -> 19 kaynak
- псы (baslayan) -> псы* kelimeleri
- псы (iceren) -> aciklamalardaki referanslar
- ماء (tam) -> 2 kaynak (13.Kbd-Ar + 2.Ady-Ara)
- ماء (iceren) -> 2 + 4 kaynak
- 62/62 Test Files PASS, 193/193 Tests PASS
- TypeScript 0 hata

### Durum
P5-001 TAMAMEN COZULDU - Arama modu semantigi net
