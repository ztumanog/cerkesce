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
