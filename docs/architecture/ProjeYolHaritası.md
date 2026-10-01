# 🛠️ Çerkesçe Sözlük - Teknik Dokümantasyon

**Son Güncelleme:** 13 Eylül 2026  
**Teknoloji:** Next.js 16 + TypeScript

---

## 📋 İçindekiler

1. [Proje Mimarisi](#proje-mimarisi)
2. [Klasör Yapısı](#klasör-yapısı)
3. [Tip Sistemi](#tip-sistemi)
4. [Hata Çözümleri](#hata-çözümleri)
5. [Prompt Kütüphanesi](#prompt-kütüphanesi)

---

## 🏗️ Proje Mimarisi

### Teknoloji Stack
- **Framework:** Next.js 16
- **Dil:** TypeScript
- **Stil:** Tailwind CSS
- **Veritabanı:** PostgreSQL
- **API:** REST + GraphQL

### Katmanlar
```
┌─────────────────────────┐
│   UI Layer (React)      │
├─────────────────────────┤
│   API Layer (Next.js)   │
├─────────────────────────┤
│   Business Logic        │
├─────────────────────────┤
│   Data Layer (DB)       │
└─────────────────────────┘
```

---

## 📁 Klasör Yapısı

```
cerkesce-sozluk/
├── app/                          # Next.js 16 App Router
│   ├── layout.tsx               # Root layout
│   ├── page.tsx                 # Ana sayfa
│   ├── api/                     # API routes
│   │   ├── dictionary/
│   │   ├── search/
│   │   └��─ translate/
│   └── [slug]/                  # Dynamic routes
│
├── src/
│   ├── types/                   # TypeScript tipler
│   │   ├── dictionary.ts        # Sözlük tipleri
│   │   ├── translation.ts       # Çeviri tipleri
│   │   └── index.ts             # Tüm tipler
│   │
│   ├── components/              # React bileşenleri
│   │   ├── DictionarySearch.tsx
│   │   ├── TranslationView.tsx
│   │   └── WordCard.tsx
│   │
│   ├── lib/                     # Yardımcı fonksiyonlar
│   │   ├── api.ts              # API çağrıları
│   │   ├── utils.ts            # Genel utiller
│   │   └── db.ts               # Veritabanı
│   │
│   └── hooks/                   # Custom hooks
│       ├── useDictionary.ts
│       └── useTranslation.ts
│
├── public/                      # Statik dosyalar
│   ├── images/
│   ├── fonts/
│   └── data/
│
├── styles/                      # Global stiller
│   └── globals.css
│
├── .env.local                   # Ortam değişkenleri
├── tsconfig.json               # TypeScript config
├── next.config.js              # Next.js config
└── package.json                # Bağımlılıklar
```

---

## 🔤 Tip Sistemi

### Ana Tipler (src/types/dictionary.ts)

```typescript
// Kelime
interface Word {
  id: string;
  cerkesce: string;
  turkce: string[];
  ingilizce: string[];
  tanim: string;
  ornekler: string[];
  kategori: WordCategory;
  etimoloji?: string;
  notlar?: string;
}

// Çeviri
interface Translation {
  id: string;
  kaynak: string;
  hedef: string;
  guvenirlik: number;
  kaynak_dil: Language;
  hedef_dil: Language;
}

// Arama Sonucu
interface SearchResult {
  kelimeler: Word[];
  ceviri: Translation[];
  toplam: number;
}

// Kategoriler
type WordCategory = 
  | 'isim'
  | 'fiil'
  | 'sifat'
  | 'zarf'
  | 'edatlar'
  | 'baglaçlar';

// Diller
type Language = 'cerkesce' | 'turkce' | 'ingilizce';
```

---

## 🐛 Hata Çözümleri

### TS2345: Argument of type 'X' is not assignable to parameter of type 'Y'

**Çözüm:**
```typescript
// ❌ Yanlış
const result: Word = data; // Type mismatch

// ✅ Doğru
const result: Word = {
  id: data.id,
  cerkesce: data.cerkesce,
  turkce: data.turkce || [],
  // ... diğer alanlar
};
```

### TS2538: Type 'X' has no properties in common with type 'Y'

**Çözüm:**
```typescript
// ❌ Yanlış
const word: Word = null;

// ✅ Doğru
const word: Word | null = null;
if (word) {
  // word kullan
}
```

---

## 💡 Prompt Kütüphanesi

### Master Context
```
Çerkesçe Sözlük uygulaması Next.js 16 + TypeScript ile geliştirilmektedir.
- Veritabanı: PostgreSQL
- Frontend: React + Tailwind CSS
- API: REST
- Hedef: 428.000+ kelime
```

### Feature Prompt
```
Yeni özellik eklerken:
1. src/types/ klasörüne tip tanımı ekle
2. src/components/ klasörüne bileşen ekle
3. app/api/ klasörüne API route ekle
4. Test yaz ve kontrol et
```

### Data Integration
```
Veri entegrasyonunda:
1. Veritabanı şemasını kontrol et
2. Migration yazı
3. Seed data ekle
4. API endpoint test et
```

### Error Fix
```
Hata çözerken:
1. Error mesajını oku
2. src/types/ kontrol et
3. Component props kontrol et
4. API response kontrol et
```

---

## 📚 Kaynaklar

- [Next.js Dokümantasyon](https://nextjs.org/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)

---

**Versiyon:** v12.0-enterprise-certified | **Tarih:** 13 Eylül 2026
