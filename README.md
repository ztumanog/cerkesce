# 📚 Çerkesçe Sözlük Projesi

Batı (Adıgece) ve Doğu (Kabardeyce) Çerkesçesi lehçelerini kapsayan, 34 farklı sözlük ve 428.679'un üzerinde kelime kaydını tek bir platformda birleştiren yüksek performanslı, çok dilli arama ve sözlük uygulaması.

---

## ⚡ Öne Çıkan Özellikler

* **Geniş Veri Deposu:** 34 sözlükten derlenen 428.000+ kelime ve tanım kaydı.
* **Akıllı Yükleme (Lazy Loading):** İlk 3 sözlük anında yüklenir (ilk etkileşim <2s), kalan 31 sözlük arka planda 4'erli paketler halinde (batch) çekilir.
* **Dinamik Sanal Klavye:** 6 dilli özel Çerkesçe sanal ekran klavyesi (Adıgece/Kabardeyce karakter desteği).
* **Gelişmiş Filtreleme:** Batı (Adıgece) ve Doğu (Kabardeyce) lehçe ayrımları ile hedef dil filtreleme seçenekleri.
* **Çok Dilli Kavram Tablosu:** Sözlükler arası paralellikleri ve çevirileri sunan detaylı sonuç ekranları[cite: 5].

---

## 🛠️ Teknolojik Altyapı

* **Framework:** Next.js 16 (App Router)[cite: 5]
* **Dil:** TypeScript (Strict Type Checking)[cite: 5]
* **Stil:** Tailwind CSS v3[cite: 5]
* **Paket Yöneticisi:** npm / npx[cite: 5]

---

## 📂 Dizin Yapısı

```text
├── app/
│   ├── layout.tsx                  # Metadata, SEO ve global favicon yönetimi (Server Component)
│   ├── page.tsx                    # Ana arayüz ve UI orkestrasyonu (Client Component)
│   └── globals.css                 # Global CSS ve Tailwind yapılandırması
├── src/
│   ├── types/
│   │   └── dictionary.ts           # [Single Source of Truth] Merkezi tip tanımlamaları
│   ├── hooks/
│   │   └── useDictionary.ts        # Lazy load, arama, filtreleme ve cache mantığı
│   ├── components/                 # Modüler UI bileşenleri (SearchBox, Klavye, Kartlar vb.)
│   └── utils/
│       └── cleanHtml.ts            # Metin ve HTML temizleme araçları
└── public/
    └── data/                       # 34 adet sözlük veritabanı (JSON) ve manifest dosyası
```[cite: 5]

---

## 🚀 Kurulum ve Çalıştırma

Geliştirme ortamını yerelde başlatmak için aşağıdaki adımları izleyin:

1. **Depoyu klonlayın:**
   ```bash
   git clone [https://github.com/kullanici-adi/cerkesce-sozluk.git](https://github.com/kullanici-adi/cerkesce-sozluk.git)
   cd cerkesce-sozluk

## Dilbilimsel Veri Seti Metrikleri (Linguistic Dataset)

- **Toplam Sözcük Birimi (`lexemes.json`):** `28.414` (%100 `etymologyType` sınıflandırması tamamlanmış, `0` kırık referans)
- **Kanonik Kök (`roots.json`):** `4.039` (`1.789` çok üyeli kelime ailesi)
- **Kök Bağlantı Oranı:** **%85.30** (`24.238` lexeme doğrudan kanonik köke bağlı)
- **Köken Dağılımı:** Yerli (`native`): `25.719` (%90.52), Ödünç (`loanword`): `2.123` (%7.47), Özel İsim (`proper_noun`): `559` (%1.97), Diğer (`noise` / `phrase` / `loan_compound`): `13`
- **Diyalekt Dağılımı:** `KBD` (Kabardey): `18.471`, `COMMON` (Ortak): `7.648`, `ADY` (Adige): `2.295`
