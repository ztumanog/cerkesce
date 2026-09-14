# ADR-0013: Deterministic Query Semantic Mapping Layer

**Date:** 2026-09-02  
**Status:** PROPOSED  
**Context:** Phase 5.3 - Query-Semantic Mapping  
**Deciders:** Architecture Team

---

## Problem Statement

Kullanıcı sorgularının semantik olarak kavramlarla eşleştirilmesi gerekiyor:
- "su nedir?" → WATER kavramı
- "çay içeceği midir?" → DRINK kavramı
- "nehir nerede bulunur?" → LOCATION kavramı

**Zorluklar:**
- Sorgu varyasyonları (yazım, dil, dialekt)
- Çok dilli eşleştirme
- Deterministik sonuçlar
- AI bağımlılığını azaltma

---

## Decision

**Kural tabanlı, deterministik Query Semantic Mapper oluştur:**

### 1. Unicode NFC Normalizasyonu
```typescript
const normalized = query.normalize('NFC').toLowerCase();
```
- Türkçe karakterler: ç, ğ, ı, ö, ş, ü
- Aksan işaretleri: é, è, ê, ë
- Tutarlı karşılaştırma

### 2. Deterministik Dil Tespiti
```typescript
detectLanguage(query): 'tr' | 'en' | 'ku' | 'ar'
- Karakter seti analizi
- Dil-spesifik kelimeleri kontrol
- Fallback: Türkçe
```

### 3. Query Pattern Matching
```typescript
interface QueryPattern {
  pattern: RegExp;
  conceptId: string;
  relationTypes: DiscoveryRelationType[];
  language: string;
}

const patterns = [
  { pattern: /^(su|water|av)\s+(nedir|ne|what)/i, 
    conceptId: 'WATER', 
    relationTypes: ['STATE_OF', 'LOCATION_OF'] },
  { pattern: /^(çay|tea|çaî)\s+(içecek|drink)/i, 
    conceptId: 'DRINK', 
    relationTypes: ['DRINK_OF'] }
];
```

### 4. Cross-Language Concept Mapping
```typescript
interface ConceptTranslation {
  conceptId: string;
  translations: {
    tr: string[];
    en: string[];
    ku: string[];
    ar: string[];
  };
}
```

### 5. Semantic Intent Classification
```typescript
enum QueryIntent {
  DEFINITION = 'definition',        // "su nedir?"
  PROPERTY = 'property',            // "su sıvı mıdır?"
  LOCATION = 'location',            // "nehir nerede?"
  CLASSIFICATION = 'classification' // "çay içecek midir?"
}
```

---

## Architecture

```
User Query
    ↓
[1] Unicode NFC Normalizasyonu
    ↓
[2] Dil Tespiti (TR/EN/KU/AR)
    ↓
[3] Query Intent Sınıflandırması
    ↓
[4] Pattern Matching
    ↓
[5] Concept Extraction
    ↓
[6] Relation Type Mapping
    ↓
QuerySemanticResult {
  conceptId: string;
  intent: QueryIntent;
  relationTypes: DiscoveryRelationType[];
  confidence: number;
  language: string;
}
```

---

## Implementation Details

### QuerySemanticMapper Service
- **Input:** query: string
- **Output:** QuerySemanticResult
- **Logic:**
  1. Normalize → "su nedir?"
  2. Detect Language → "tr"
  3. Classify Intent → DEFINITION
  4. Match Pattern → WATER
  5. Map Relations → [STATE_OF, LOCATION_OF]
  6. Calculate Confidence → 0.95

### Deterministik Garantiler
- ✅ Aynı input → Aynı output
- ✅ Dil bağımsız (TR/EN/KU/AR)
- ✅ Yazım varyasyonları (su/water/av)
- ✅ Dialekt desteği (Kurmanji/Sorani)
- ✅ Trace-able (audit log)

---

## Rationale

**Neden AI kullanılmıyor?**
1. **Deterministik olması gerekli** - Aynı sorgu farklı sonuç vermemeli
2. **Audit trail gerekli** - Hangi kural eşleşti bilmek lazım
3. **Hızlı** - Regex pattern matching < ML inference
4. **Bakım kolay** - Yeni pattern eklemek basit
5. **Offline çalışır** - Ağ bağımlılığı yok

---

## Consequences

### Positive
- ✅ Deterministik ve trace-able
- ✅ Hızlı ve hafif
- ✅ Çok dilli destek
- ✅ Kolay genişletme

### Negative
- ❌ Manuel pattern yazımı gerekli
- ❌ Nadir query varyasyonları kaçabilir
- ❌ Yeni dil desteği manuel çalışma

### Mitigation
- Pattern library oluştur (community-driven)
- Fallback: Generic concept resolver
- Telemetry: Kaçan sorgular logla

---

## Acceptance Criteria

- [ ] QuerySemanticMapper service yazılmış
- [ ] Unicode NFC normalizasyonu çalışıyor
- [ ] Dil tespiti 95%+ doğruluk
- [ ] Pattern matching 50+ kural
- [ ] E2E test: "su nedir?" → WATER
- [ ] Performance: <10ms per query
- [ ] Cross-language test: TR/EN/KU/AR

---

## References

- Phase 5.1: Discovery Engine
- Phase 5.2: Knowledge Ranking & Contextual Discovery
- Phase 5.3: Query Semantic Mapping (THIS)
