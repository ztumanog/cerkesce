# 🏗️ ARCHITECTURE (Mimari)

**Çerkesçe Knowledge Engine - Sistem Mimarisi**

**Framework:** Next.js 16 + React 19  
**Versiyon:** v12.0-enterprise-certified  
**Güncelleme:** Eylül 2026

---

## 📋 İÇİNDEKİLER

1. [5 Katman Mimarisi](#5-katman-mimarisi)
2. [Veri İşleme Zinciri](#veri-işleme-zinciri)
3. [Katman Sorumlulukları](#katman-sorumlulukları)
4. [Bağımlılık Yönü](#bağımlılık-yönü)
5. [Mevcut Domain](#mevcut-domain)
6. [Faz 2 Hedefleri](#faz-2-hedefleri)
7. [Performans Kararları](#performans-kararları)
8. [Dosya Yapısı](#dosya-yapısı)
9. [ADR Referansları](#adr-referansları)

---

## 5 KATMAN MİMARİSİ

### 1. **Presentation Layer** - React 19
- **Sorumluluk:** UI render, state management, user interaction
- **Teknoloji:** React 19, Hooks, Context API, Next.js Pages
- **Bağımlılık:** Hook'lara bağlı
- **Yapabilecekleri:**
  - Component render
  - Event handling
  - Local state management
  - User interaction
  - Form validation (UI level)
- **Yapamayacakları:**
  - Service çağrısı (doğrudan)
  - Repository erişimi
  - İş mantığı
  - HTTP istekleri (doğrudan)

### 2. **Application Layer** - Services
- **Sorumluluk:** İş mantığı, orchestration, dönüştürme
- **Teknoloji:** TypeScript Classes, Dependency Injection
- **Bağımlılık:** Repository'ye bağlı
- **Yapabilecekleri:**
  - İş kuralları uygulama
  - Veri dönüştürme
  - Orchestration
  - TranslationGroup oluşturma
  - Concept ranking
  - Cross-dictionary matching
- **Yapamayacakları:**
  - UI render
  - HTTP istekleri (doğrudan)
  - Repository implementasyonu
  - Veri normalizasyonu (Normalizer'a ait)

### 3. **Domain Layer** - DDD (Domain-Driven Design)
- **Sorumluluk:** Core logic, entities, value objects
- **Teknoloji:** TypeScript Interfaces, Enums, Types
- **Bağımlılık:** Bağımsız (hiçbir katmana bağlı değil)
- **Yapabilecekleri:**
  - Entity tanımı
  - Value object tanımı
  - Domain rules
  - Interface tanımı
  - Type definitions
- **Yapamayacakları:**
  - Veri yükleme
  - Repository implementasyonu
  - Service implementasyonu
  - UI render

### 4. **Infrastructure Layer** - Repositories
- **Sorumluluk:** Veri erişimi, abstraction, veri yükleme
- **Teknoloji:** Repository Pattern, Adapter Pattern
- **Bağımlılık:** Data Layer'a bağlı
- **Yapabilecekleri:**
  - Veri sorgusu
  - Lookup işlemleri
  - Deterministik sonuç
  - Batch loading
  - Lazy loading
- **Yapamayacakları:**
  - TranslationGroup oluşturma
  - Semantik çıkarım
  - İş mantığı
  - Service çağrısı

### 5. **Data Layer** - Persistence
- **Sorumluluk:** Depolama, retrieval, veri kaynakları
- **Teknoloji:** JSON, In-Memory Storage, Database
- **Bağımlılık:** Bağımsız
- **Yapabilecekleri:**
  - Veri depolama
  - Veri retrieval
  - Veri kaynağı yönetimi
- **Yapamayacakları:**
  - Veri normalizasyonu
  - İş mantığı
  - Orchestration

---

## VERİ İŞLEME ZİNCİRİ

### 7 Adımlı Akış (Değişmez)

```
┌─────────┐
│ SOURCE  │  Ham veri tanımı, erişim yolu
└────┬────┘
     │
     ▼
┌─────────┐
│ LOADER  │  Veriyi yükleme, format dönüştürme
└────┬────┘
     │
     ▼
┌──────────────┐
│ NORMALIZER   │  Temizleme, tip dönüştürme, validasyon
└────┬─────────┘
     │
     ▼
┌──────────────┐
│ REPOSITORY   │  Veri sorgusu, lookup, deterministik sonuç
└────┬─────────┘
     │
     ▼
┌──────────────┐
│ SERVICE      │  İş mantığı, dönüştürme, orchestration
└────┬─────────┘
     │
     ▼
┌──────────────┐
│ HOOK         │  State mgmt, effect mgmt, service çağrısı
└────┬─────────┘
     │
     ▼
┌──────────────┐
│ UI           │  Render, user interaction, event handling
└──────────────┘
```

**⚠️ KURAL:** Bu akış değiştirilemez. Geri dönüş yasak. Katman atlama yasak.

---

## KATMAN SORUMLULIKLARI

### SOURCE
**Sorumluluk:** Ham veri tanımı

**Yapabilecekleri:**
- Veri kaynağı tanımı
- Erişim yolu belirleme
- Format bilgisi sağlama
- Metadata tanımı

**Yapamayacakları:**
- Veriyi işleme
- Normalizasyon
- Validasyon
- Veri yükleme

---

### LOADER
**Sorumluluk:** Veriyi yükleme

**Yapabilecekleri:**
- Dosya okuma
- Format dönüştürme
- Batch loading
- Lazy loading

**Yapamayacakları:**
- Veri temizleme
- Validasyon
- İş mantığı
- Veri gruplanması

---

### NORMALIZER
**Sorumluluk:** Veri standartlaştırma

**Yapabilecekleri:**
- Veri temizleme
- Tip dönüştürme
- Validasyon
- Heterojen veri standardizasyonu
- `toStringSafe()` uygulaması

**Yapamayacakları:**
- Veri gruplanması
- Semantik çıkarım
- İş mantığı
- Veri sorgusu

---

### REPOSITORY
**Sorumluluk:** Domain erişim sınırı

**Yapabilecekleri:**
- Veri sorgusu
- Lookup işlemleri
- Deterministik sonuç
- Batch operations
- Query optimization

**Yapamayacakları:**
- TranslationGroup oluşturma
- Semantik çıkarım
- İş mantığı
- Service çağrısı

---

### SERVICE
**Sorumluluk:** İş mantığı ve orchestration

**Yapabilecekleri:**
- İş kuralları uygulama
- Veri dönüştürme
- Orchestration
- TranslationGroup oluşturma
- Cross-dictionary matching
- Concept ranking

**Yapamayacakları:**
- UI render
- HTTP istekleri (doğrudan)
- Repository implementasyonu
- Veri normalizasyonu

---

### HOOK
**Sorumluluk:** UI adaptasyonu

**Yapabilecekleri:**
- State management
- Effect management
- Service çağrısı
- Event handling
- Local state

**Yapamayacakları:**
- Repository çağrısı
- HTTP istekleri (doğrudan)
- İş mantığı
- Veri normalizasyonu

---

### UI
**Sorumluluk:** Sunum katmanı

**Yapabilecekleri:**
- Component render
- User interaction
- Event handling
- Local state
- Form validation (UI level)

**Yapamayacakları:**
- Service çağrısı (doğrudan)
- Repository erişimi
- İş mantığı
- HTTP istekleri

---

## BAĞIMLILLIK YÖNÜ

### ✅ DOĞRU AKIŞ

```
Repository → Service → Hook → UI
```

**Özellikleri:**
- Bağımlılık yönü kontrollü
- Test edilebilir
- Bakımı kolay
- Dependency Injection uygulanabilir

---

### ❌ YANLIŞ AKIŞLAR

#### 1. Hook doğrudan Repository çağırıyor
**Problem:** Service bypass, iş mantığı kaybolur, test zor

#### 2. UI Service'i bypass ediyor
**Problem:** Encapsulation bozulur, bakım zor

#### 3. UI doğrudan Repository çağırıyor
**Problem:** Tüm katmanlar bypass, kaos

#### 4. Service doğrudan UI render ediyor
**Problem:** Service UI'ye bağımlı, yeniden kullanılamaz

---

## MEVCUT DOMAIN

### Dictionary (Sözlük)

**Veri Kaynakları:**
- 34 sözlükten 428.679 kayıt
- Çok dilli: TR, EN, RU, KU, AR
- Heterojen format: JSON, HTML, Array

**Mimarisi:**
```
Dictionary
  ↓
DictionaryEntry (Tekil kayıt)
  ├── lemma (Başlık kelime)
  ├── meanings[] (Anlamlar)
  │   ├── text (Anlam metni)
  │   ├── language (Dil)
  │   └── dictionary (Kaynak sözlük)
  └── metadata (Meta bilgi)
```

**Veri İşleme:**
```
34 Sözlük
    ↓
Loader (Ham veri)
    ↓
Normalizer (toStringSafe + Tip dönüştürme)
    ↓
Repository (In-Memory Index)
    ↓
Service (TranslationGroup oluşturma)
    ↓
Hook (State management)
    ↓
UI (Render)
```

**Performans:**
- Arama: < 100ms
- Normalizasyon: < 50ms
- Gruplama: < 30ms
- **TOPLAM: < 200ms**

---

## FAZ 2 HEDEFLERİ

### TranslationGroup (Kavramsal Anlam Grubu)

**Hedef:** Aynı kavramın farklı dillerdeki karşılıklarını bir grupta sunmak

**Örnek:**
```
TRG_WATER (TranslationGroup ID)
├── Türkçe: su
├── English: water
├── Русский: вода
├── Адыгэ: псы
└── العربية: ماء
```

**Faz 2 Mimarisi:**
```
Dictionary Entry (Phase 1)
    ↓
TranslationGroup (Phase 2) ← Sense tabanlı
    ↓
Concept (Phase 3) ← Language-independent
```

---

## PERFORMANS KARARLARI

### 1. Batch Loading
**Amaç:** Paralel veri yükleme  
**Hedef:** < 50ms

### 2. Lazy Loading
**Amaç:** Gerektiğinde veri yükleme  
**Hedef:** < 100ms

### 3. Source Registry
**Amaç:** Kaynak yönetimi  
**Hedef:** Dinamik kaynak ekleme/çıkarma

### 4. Dictionary Resolver
**Amaç:** Dil bazlı sözlük seçimi  
**Hedef:** < 30ms

### TOPLAM PERFORMANS HEDEFİ

| İşlem | Hedef | Durum |
|-------|-------|-------|
| Arama | < 100ms | ✅ |
| Normalizasyon | < 50ms | ✅ |
| Gruplama | < 30ms | ✅ |
| **TOPLAM** | **< 200ms** | ✅ |

---

## DOSYA YAPISI

```
CERKESCE_KNOWLEDGE_ENGINE/
│
├── src/
│   ├── presentation/              # Presentation Layer
│   │   ├── components/            # React bileşenleri
│   │   ├── hooks/                 # Custom hooks
│   │   └── pages/                 # Next.js sayfaları
│   │
│   ├── application/               # Application Layer
│   │   ├── services/              # İş mantığı
│   │   └── dto/                   # Data Transfer Objects
│   │
│   ├── domain/                    # Domain Layer
│   │   ├── entities/              # Domain entities
│   │   ├── interfaces/            # Domain interfaces
│   │   └── value-objects/         # Value objects
│   │
│   ├── infrastructure/            # Infrastructure Layer
│   │   ├── repositories/          # Repository implementasyonları
│   │   ├── loaders/               # Veri yükleyiciler
│   │   └── normalizers/           # Veri normalizer'ları
│   │
│   └── data/                      # Data Layer
│       ├── sources/               # Veri kaynakları
│       └── persistence/           # Depolama
│
├── ARCHITECTURE/                  # Mimari Kararlar (ADR-0001 to ADR-0014)
├── ARCHITECTURE.md                # Bu dokümantasyon
├── PHASES.md                      # Faz planlaması
└── README.md                      # Proje özeti
```

---

## ADR REFERANSLARI

### Temel Mimari (ADR-0001 to ADR-0004)
- **ADR-0001:** Modüler Tip Mimarisi
- **ADR-0002:** Çok Dilli Standart
- **ADR-0003:** Repository Ayrışımı
- **ADR-0004:** Heterojen Normalizasyon

### Çeviri & Kavram (ADR-0005 to ADR-0009)
- **ADR-0005:** TranslationGroup Strategy
- **ADR-0006:** Cross Dictionary Matching
- **ADR-0007:** TranslationRepository Contract
- **ADR-0008:** TranslationMeaning Representation
- **ADR-0009:** Concept Identity Strategy

### Discovery Engine (ADR-0010 to ADR-0014)
- **ADR-0010:** Concept Repository
- **ADR-0011:** Meaning Graph
- **ADR-0012:** Real Knowledge Discovery Assembly
- **ADR-0013:** Deterministic Query Semantic Mapping
- **ADR-0014:** Canonical Concept Network Projection

---

## ÖZET

### ✅ Başarılar
- ✅ 5 katman mimarisi net olarak tanımlandı
- ✅ 7 adımlı veri işleme zinciri belirlendi
- ✅ Katman sorumlulukları açıkça tanımlandı
- ✅ Bağımlılık yönü kontrol altına alındı
- ✅ 34 sözlükten 428.679 kayıt yönetiliyor
- ✅ < 200ms performans hedefi belirlendi
- ✅ 14 ADR ile mimari kararlar dokümante edildi

### 🎯 Hedefler
- 🎯 Faz 2: TranslationGroup oluşturma (Sense tabanlı)
- 🎯 Faz 3: Concept Engine (Language-independent)
- 🎯 Faz 5: Discovery Engine (Query Semantic Mapping)
- 🎯 Faz 6: API Gateway ve Projection Layer

---

**Versiyon:** v12.0-enterprise-certified  
**Son Güncelleme:** Eylül 2026  
**Durum:** Production Ready ✅