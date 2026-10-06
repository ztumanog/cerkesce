# ADR-0026: Search Response Contract & Lexeme Join Strategy

| | |
|---|---|
| **Durum** | ✅ ACCEPTED · IMPLEMENTED · VERIFIED |
| **Tarih** | 2026-10-06 |
| **Faz** | 4 — Dictionary Core |
| **Commit** | 28dd10c |
| **Tag** | v0.1.0-mvp |

---

## 1. PROBLEM

Search katmanı ile lexeme katmanı aynı dili konuşmuyor.

/api/search              lexemes.json
key = headword     !=    index = form
(TR/RU/EN)               (Cerkesce)

34 sozlugun cogu TR/RU/EN baslikli. lexemeMap yalniz form ile kurulu.
Sonuc: conceptId = null, ipa = null, partOfSpeech = null -> UI [Kavram] basiyor.

---

## 2. KARARLAR

### K1 - Response Contract

meaning = anlamlar[0] ?? ''

literalMeaning DEGIL anlamlar[0] kullanilir.
Gerekce: join basarisiz olsa bile meaning dolu gelir.

### K2 - Deterministik Lexeme Secimi

1. exact form match       -> kosulsuz kazanir
2. corpusFrequency DESC   -> %67 doluluk
3. lexeme.id ASC          -> degismez kopma noktasi

On filtre: literalMeaning in { "?", "", "-", "???" } -> indekse girmez.

### K3 - Normalizasyon

normKey(s) = normalizePalochka(s).trim().toLowerCase()

### K4 - Cleanup

Response'tan data alani kaldirilir; results canonical.

### K5 - CIKARILDI

/api/sozluk/search -> P1'e tasindi.

### K6 - Kapsam Siniri

lexeme.conceptIds alanina dokunulmaz. Concept kimlik modeli ADR-ROOT-002 tarafindan yonetilir.

### K7 - SearchBox ham fetch -> P1

### K8 - SmartSuggestionService tasima -> P1

### K9 - Freeze

Iki frozen dosyayi kapsar; onay freeze'i yalniz bu kapsamda acar.

---

## 3. UYGULAMA

Yeni modul: src/lib/lexemeIndex.ts
- normKey() - K3
- pickLexeme() - K2
- buildLexemeIndex() - cift yonlu indeks

Degisen: app/api/search/route.ts
- meaning alani eklendi
- lexemeMap -> lexemeIndex
- data alani kaldirildi

---

## 4. DOGRULAMA

| # | Kriter | Sonuc |
|---|---|---|
| 1 | "su" -> meaning dolu | OK |
| 2 | "psı" regresyon yok | OK |
| 3 | "kIue" == "k1ue" | OK |
| 4 | ? kayitlar -> meaning bos | OK |
| 5 | Determinizm (restart) | OK |
| 6 | conceptIds git diff temiz | OK |
| 7 | npx tsc --noEmit | OK |
| 8 | 1010/1010 test | OK |
| 9 | /api/sozluk/search = 0 cagri | OK |

---

## 5. KOK NEDEN

lexemeMap = new Map(lexemes.map(l => [l.form, l]))

Tek satirlik hata. Indeks yalniz form (Cerkesce) ile kuruluydu.

---

## 6. ACILAN ISLER

| # | Is |
|---|---|
| D1 | 110 silinen kayit denetimi |
| D2 | 77 ? kaydi |
| D7 | Asama 2 test kapsami |
| D8 | LEHCE_TR <-> ADR-0008 |

---

## 7. KAPANIS

> Search katmani ile lexeme katmani artik ayni dili konusuyor.

Kok neden:           1 satir
Test:                1010/1010
MVP tag:             v0.1.0-mvp
Durum:               ACCEPTED · IMPLEMENTED · VERIFIED
