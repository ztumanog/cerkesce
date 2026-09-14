# 🧬 ONTOLOGY SYSTEM - VERİ MODELİ

**Çerkesçe Knowledge Engine - Ontoloji Sistemi**

**Versiyon:** v12.0-enterprise-certified | **Tarih:** 13 Eylül 2026

---

## 📊 VERİ YAPILARI

### Core Entities (12+)

#### 1. Dictionary
```typescript
interface Dictionary {
  id: string;
  name: string;
  language: string;
  totalWords: number;
  createdAt: Date;
  updatedAt: Date;
}
```

#### 2. DictionaryItem
```typescript
interface DictionaryItem {
  id: string;
  dictionaryId: string;
  word: string;
  definition: string;
  partOfSpeech: string;
  examples: string[];
  synonyms: string[];
  antonyms: string[];
  morphology: Morphology;
  metadata: Record<string, any>;
}
```

#### 3. Concept
```typescript
interface Concept {
  id: string;
  name: string;
  definition: string;
  relatedWords: string[];
  semanticField: string;
  examples: string[];
}
```

#### 4. Morphology
```typescript
interface Morphology {
  root: string;
  stem: string;
  affixes: string[];
  inflections: string[];
  derivations: string[];
}
```

#### 5. User
```typescript
interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'editor' | 'viewer';
  createdAt: Date;
}
```

---

## 📈 VERİ İSTATİSTİKLERİ

| Metrik | Değer |
|:---|:---|
| Toplam Sözlük | 34 |
| Toplam Kayıt | 428.000+ |
| Toplam Kelime | 150.000+ |
| Toplam Tanım | 200.000+ |
| Toplam Örnek | 100.000+ |
| Toplam Konsept | 5.000+ |

---

## 🔗 İLİŞKİLER

```
Dictionary (1) ──→ (N) DictionaryItem
                ├──→ (N) Concept
                └──→ (N) User

DictionaryItem (1) ──→ (1) Morphology
               ├──→ (N) Synonym
               └──→ (N) Example

Concept (1) ──→ (N) RelatedWord
        ├──→ (N) Example
        └──→ (N) SemanticRelation
```

---

**Versiyon:** v12.0-enterprise-certified
