
# Faz C-10 Planlama

**Tarih:** 2026-09-30
**Durum:** PLANLAMA

## Hedefler

| Metrik | C-9 Sonu | C-10 Hedefi |
|--------|----------|-------------|
| Lexeme | 240 | 300+ |
| Word Family | 38 | 45+ |
| Root | 60 | 75+ |
| Semantic Relations | 189 | 250+ |
| DialectConverter | 47/47 | 80/80 |
| Corpus kapsami | %28.6 | %50+ |
| Metafor | 13 | 25+ |

## Alt Gorevler

### C-10.1: Corpus Genisletme
- Bulunamayan 40 lexeme icin alternatif corpus
- Yeni corpus kaynaklari (HuggingFace, Wiktionary)
- Cikti: data/corpus/frequency/c10_verification.json

### C-10.2: DialectConverter 2.0
- 8 yeni fonetik kural
- Abzakh, Bzhedug, Shapsug diyalektleri
- Cikti: src/domain/linguistic/DialectConverter.ts

### C-10.3: Yeni Aileler
- Somatik: body:head-face, body:limbs
- Zihinsel: mind:cognition, mind:emotion
- Doga: nature:sky-weather, nature:terrain-water
- Cikti: public/data/linguistic/word_families.json

### C-10.4: Metaforik Zincirler
- 5 bulunamayan metafor icin kanit ara
- Yeni metaforlar ekle
- Cikti: public/data/linguistic/semantic_relations.json

### C-10.5: Dokumantasyon
- Her aile icin detayli belge
- Corpus dogrulama raporu
- Cikti: docs/FAZ_C10_TAMAMLAMA_RAPORU.md
