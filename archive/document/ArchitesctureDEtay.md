ARCHITECTURE
Sistem Katmanları
Source ↓ Loader ↓ Normalizer ↓ Repository ↓ Service ↓ Hook ↓ UI

Bu akış değiştirilemez.

Katman Sorumlulukları
Source
Kaynak tanımı.

Ham veri erişimi.

Loader
Veriyi yükler.

Normalizer
Ham veriyi normalize eder.

Repository
Domain erişim sınırı.

Service
İş kuralları.

Hook
UI adaptasyonu.

UI
Sunum katmanı.

Mevcut Domain
Dictionary

↓

DictionaryEntry

↓

SearchResult

Faz 2 Domain Hedefi
kitap ↓ Conceptual Meaning ↓ book ↓ книга ↓ тхылъ ↓ тхьылъ

Bağımlılık Yönü
Repository → Service → Hook → UI

serbesttir.

Tersi yasaktır.

Performans Kararları
Batch loading
Lazy loading
Source registry
Dictionary resolver
korunacaktır.