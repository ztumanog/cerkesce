# Mimari Tasarım - REV2

**Versiyon:** REV2
**Tarih:** 13 Eylül 2026
**Durum:** Updated with ADR-0015 to ADR-0018

## Teknik Stack

### Frontend
- **Framework:** Next.js 16
- **UI Library:** React 19
- **Styling:** Tailwind CSS
- **State:** Zustand
- **Type Safety:** TypeScript 5.0+

### Backend
- **Runtime:** Node.js
- **API:** REST + GraphQL
- **Database:** PostgreSQL
- **Cache:** Redis
- **ORM:** Prisma

### Infrastructure
- **Containerization:** Docker
- **Orchestration:** Kubernetes
- **Logging:** ELK Stack
- **Monitoring:** Prometheus + Grafana

## Mimari Prensipleri

### 1. Clean Architecture
- **Presentation Layer:** React bileşenleri
- **Application Layer:** Server Actions, Hooks
- **Domain Layer:** Business Logic, Services
- **Infrastructure Layer:** Repository, Database

### 2. Domain-Driven Design (DDD)
- **Ubiquitous Language:** Çerkesçe dilbilim terimleri
- **Bounded Contexts:** Dictionary, Translation, Concept
- **Entities:** DictionaryItem, Translation, Concept
- **Value Objects:** Language, PartOfSpeech

### 3. SOLID Prensipleri
- **S**ingle Responsibility: Her modül bir sorumluluğa sahip
- **O**pen/Closed: Genişlemeye açık, değişime kapalı
- **L**iskov Substitution: ITranslationRepository arayüzü
- **I**nterface Segregation: Küçük, spesifik arayüzler
- **D**ependency Inversion: Repository pattern kullanımı

### 4. Modüler Tip Mimarisi (ADR-0015)
- **Merkezi Tip Tanımları:** `@/types/dictionary.ts`
- **Bileşen Tiplemesi:** `@/types/components/`
- **Hook Tiplemesi:** `@/types/hooks/`
- **Service Tiplemesi:** `@/types/services/`

## Veri Modeli (ADR-0016)

### Domain Model
```typescript
interface ExtendedDictionaryItem {
  id: string;
  lemma: string;
  partOfSpeech: string;
  groups: TranslationGroup[];
}

interface TranslationGroup {
  id: string;
  groupName: string;
  meanings: TranslationMeaning[];
}

interface TranslationMeaning {
  id: string;
  meaning: string;
  language: "TR" | "RU" | "EN";
  context?: string;
}
```

## Veri Erişim Katmanı (ADR-0017)

### Repository Pattern
```
ITranslationRepository (Interface)
├── JsonRepository
├── InMemoryRepository
├── DatabaseRepository
└── MockRepository
```

### Arayüz Tanımı
```typescript
interface ITranslationRepository {
  getByLemma(lemma: string): Promise<ExtendedDictionaryItem[]>;
  getTranslations(id: string): Promise<TranslationGroup[]>;
  reverseLookup(meaning: string, language: string): Promise<ExtendedDictionaryItem[]>;
  getByGroup(groupId: string): Promise<TranslationGroup>;
}
```

## Server Actions ve Asenkron Güvenlik (ADR-0018)

### Standart Yanıt Formatı
```typescript
interface TranslationResult<T = any> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: Record<string, any>;
  };
}
```

### Eylem Örnekleri
- `searchDictionary(query: string)`
- `getTranslations(lemmaId: string)`
- `reverseLookup(meaning: string, language: string)`
- `getConceptRelations(conceptId: string)`

## Dosya Yapısı

```
src/
├── app/
│   ├── actions/
│   │   └── dictionaryActions.ts
│   ├── components/
│   │   ├── AkilliKlavye.tsx
│   │   └── SearchBox.tsx
│   └── page.tsx
├── types/
│   ├── dictionary.ts
│   ├── components/
│   ├── hooks/
│   └── services/
├── services/
│   ├── TranslationService.ts
│   └── ConceptService.ts
├── repositories/
│   ├── ITranslationRepository.ts
│   ├── JsonRepository.ts
│   ├── InMemoryRepository.ts
│   └── DatabaseRepository.ts
└── hooks/
    ├── useDictionary.ts
    └── useTranslation.ts
```

## Güvenlik ve Performans

### Tip Güvenliği
- TypeScript 5.0+ strict mode
- 100% tip kapsamı
- ADR-0015 ile merkezi tip yönetimi

### Veri Güvenliği
- ADR-0016 ile çok dilli veri standardı
- ADR-0017 ile repository soyutlaması
- ADR-0018 ile asenkron yanıt güvenliği

### Test Edilebilirlik
- ADR-0017 ile mock repository desteği
- Unit test yazılması kolaylaştırıldı
- Entegrasyon testleri mümkün hale getirildi

## Deployment

### Containerization
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

### Kubernetes
- Deployment, Service, ConfigMap
- Health checks ve liveness probes
- Resource limits ve requests

## Monitoring

### Prometheus Metrikleri
- Request duration
- Error rate
- Cache hit rate
- Database query time

### Grafana Dashboards
- Real-time performance
- Error tracking
- User activity

## ADR Özeti

| ADR | Başlık | Durum |
|-----|--------|-------|
| 0001 | Next.js 16 Seçimi | ✅ Approved |
| 0002 | PostgreSQL Veritabanı | ✅ Approved |
| 0003 | Docker + Kubernetes | ✅ Approved |
| 0004 | Redis Cache | ✅ Approved |
| 0005 | OAuth 2.0 + JWT | ✅ Approved |
| 0006 | ELK Stack Logging | ✅ Approved |
| 0007 | Prometheus + Grafana | ✅ Approved |
| 0008 | Clean Architecture | ✅ Approved |
| 0009 | Domain-Driven Design | ✅ Approved |
| 0010 | Test-Driven Development | ✅ Approved |
| 0011 | Vitest Framework | ✅ Approved |
| 0012 | Semantic Versioning | ✅ Approved |
| 0013 | Git Flow Branching | ✅ Approved |
| 0014 | CI/CD Pipeline | ✅ Approved |
| 0015 | Modüler Tip Mimarisi | ✅ Approved |
| 0016 | Çok Dilli Standardı | ✅ Approved |
| 0017 | Repository Ayrışımı | ✅ Approved |
| 0018 | Server Actions Güvenliği | ✅ Approved |
