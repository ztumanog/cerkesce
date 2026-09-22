# ADR-P2-011: Filter Flow Audit

**Tarih:** 2026-09-22
**Durum:** Kabul Edildi
**Kapsam:** Faz 2 - Filtreleme ve Sunum
**Onceki ADR:** ADR-0013-QUERY_SEMANTIC_MAPPING

---

## Baglam

Filtre sistemi (Lehce + Dil + Sozluk) UI'da goruntiyordu ama
gercek davranislari dogrulanmamisti. Kullanici sikayetleri:

- `Cerkesce (20)` gibi anlamsiz sayaclar (arama sonucu sayisi)
- `Tumu (0)` tutarsizligi (ALL guncellenmiyordu)
- Drawer'da filtrelenmemis kaynaklar
- `sourceId` eslesmemesi (`"...-0"` son eki)

## Karar

**Filter Flow Audit** yapildi. 5 sorun bulundu ve duzeltildi:

### 1. languageCounts -> dictionaries.json bazli
- **Once:** arama sonuclarindan sayiyordu -> `Cerkesce (20)` yanlis
- **Sonra:** her zaman `DICT_ARRAY`'dan -> `Cerkesce (1)` dogru

### 2. dialectCounts -> ALL = ADY + KBD
- **Once:** `ALL` guncellenmiyordu -> `Tumu (0)`
- **Sonra:** `counts.ALL = counts.ADY + counts.KBD`

### 3. getDictMeta -> sourceId temizleme
- **Once:** `"0.Ady-Ady_AIG.json-0"` != `"0.Ady-Ady_AIG.json"` -> eslesmiyor
- **Sonra:** `.replace(/-\d+$/, '')` ile temizleniyor

### 4. matchesLanguage -> CIRC ve MULTI destegi
- **Once:** sadece `TR/EN/RU/AR`
- **Sonra:** `CIRC` (Cerkesce <-> Cerkesce) ve `MULTI` (Apazhev & Kokov) eklendi

### 5. Drawer -> dis filtre prop
- **Once:** kendi `dialectFilter` + `languageFilter` state'leri -> cakisma
- **Sonra:** disaridan prop, ic sadece Sozluk Secimi

## Sonuc

**Dogrulanan sayilar (dictionaries.json'dan):**

| Grup | Sayi |
|------|------|
| Tumu | 34 |
| Cerkesce | 1 |
| Turkce | 7 |
| English | 10 |
| Russkiy | 13 |
| Arabic | 2 |
| Cok Dilli | 1 |

**Dogrulanan davranislar:**
- `псы` + `Cerkesce` -> sadece AIG (2006)
- `псы` + `Russkiy` -> sadece Rusca sozlukler
- Drawer `Sozluk Kaynaklari (1 / 5)` gosteriyor
- `CIRC` ve `MULTI` filtreleri calisiyor

## Alternatifler

- **Yeni filtre eklemek** - reddedildi, mevcut hatti dogrulamak oncelikli
- **grupMap'i degistirmek** - gerek yok, ciktilari dogru

## Etkilenen Dosyalar

| Dosya | Degisiklik |
|-------|-----------|
| `LanguageFilter.tsx` | 7 secenek, `CIRC` + `MULTI` tipi |
| `SozlukEkrani.tsx` | `getLangFromDict`, `languageCounts`, `dialectCounts`, `filtrelenmisSonuclar` |
| `KelimeDetayDrawer.tsx` | Prop'lar, sadece Sozluk filtresi, `sozlukGroups` |
| `FilterPanel.tsx` | Sozluk filtresi kaldirildi |
| `FilterDropdown.tsx` | `sozlukFilter` props kaldirildi |

## Acik Sorular

1. `getDictMeta` -> `resolveSourceMetadata` ile birlestirilmeli mi?
2. Cok dilli sozluk sayisi artarsa `MULTI` grubu nasil davranmali?
3. API'deki `"0.ady"` onekini backend'de mi temizlemeliyiz?

## Referanslar

- `docs/architecture/adr/ADR-0013-QUERY_SEMANTIC_MAPPING.md`
- `src/data/dictionaries.json`
- `src/components/ui/KelimeDetayDrawer.tsx`
- `src/components/dictionary/SozlukEkrani.tsx`
