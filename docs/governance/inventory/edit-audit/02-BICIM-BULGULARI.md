# 02 — Biçimsel tutarlılık bulguları

Toplam **60** biçim bulgusu, **52** dosyada.

## Tür bazında toplam

| Bulgu türü | Adet | Önem | Otomatik düzeltilebilir mi |
|---|---|---|---|
| Satır sonu boşluğu (trailing whitespace) | 0 | dusuk | Evet — satırlardaki sonda boşluk kaldırılır |
| Dosya sonunda yeni satır yok | 1 | dusuk | Evet — dosya sonuna LF eklenir |
| Karışık satır sonu (CRLF+LF) | 0 | orta | Evet — LF tek biçime çevrilir |
| Tek başına CR satır sonu | 0 | orta | Evet — LF'e çevrilir |
| Mojibake izi | 5 | yuksek | Hayır — elle onarım gerekir |
| U+FFFD değiştirme karakteri | 2 | yuksek | Hayır — elle onarım gerekir |
| Başlık seviyesi atlaması | 0 | orta | Hayır — yapısal karar gerekir |
| H1 yok / birden fazla H1 | 24 | orta | Hayır — yapısal karar gerekir |
| Tabloda sütun uyuşmazlığı | 1 | orta | Kısmen |
| Tabloda ayraç satırı bozuk | 0 | orta | Evet — ayraç satırı eklenir |
| Kapatılmamış kod bloğu | 0 | yuksek | Evet — kapanış eklenir |
| Kod bloğunda dil etiketi yok | 0 | dusuk | Kısmen |
| Boş başlık | 0 | orta | Hayır |
| Uzun satır (>400 karakter) | 4 | dusuk | Kısmen — satır kaydırma |
| Sekme girintisi | 0 | dusuk | Evet — boşluğa çevrilir |
| Çok fazla tarih biçimi | 22 | dusuk | Kısmen |

## Dosya bazında (otomatik düzeltilebilir olanlar hariç)

| Dosya | Satır | Kategori | Önem | Bulgu |
|---|---|---|---|---|
| architecture/adr/ADR-0016-Phase3-7-Dondurma-SUPERSEDED.md |  | BICIM | orta | H1 başlığı yok. |
| architecture/adr/ADR-GOV-008-PHASE_8_SCOPE_DEFINITION.md |  | BICIM | dusuk | Birden fazla tarih biçimi: ISO, TR-ay-adi. |
| architecture/ENGINEERING_CONSTITUTION.md |  | BICIM | dusuk | Birden fazla tarih biçimi: TR-noktali, TR-ay-adi. |
| architecture/ProjeYolHaritası.md |  | BICIM | yuksek | 2 adet U+FFFD değiştirme karakteri (kodlama kaybı). |
| archive/DECISIONS_yedek_2026-10-02_2157.md |  | BICIM | yuksek | 1 adet mojibake izi (örn. Ã, Ä±, ÅŸ). |
| archive/TAŞIMA-RAPORU-20260919-010332.txt |  | BICIM | orta | H1 başlığı yok. |
| archive/TAŞIMA-RAPORU-20260919-010332.txt |  | BICIM | dusuk | Birden fazla tarih biçimi: TR-noktali, US-slash. |
| archive/temizlik-2026-10/archItecture__adr__ADR_INDEX.md.bak |  | BICIM | orta | 2 adet H1 başlığı var (tek olmalı). |
| archive/temizlik-2026-10/archItecture__adr__ADR_INDEX.md.bak-20261005-051043 |  | BICIM | orta | 2 adet H1 başlığı var (tek olmalı). |
| archive/temizlik-2026-10/archItecture__adr__ADR_INDEX.md.bak-20261005-051109 |  | BICIM | orta | 2 adet H1 başlığı var (tek olmalı). |
| archive/temizlik-2026-10/archItecture__adr__ADR_INDEX.md.bak-20261005-051718 |  | BICIM | orta | 2 adet H1 başlığı var (tek olmalı). |
| archive/temizlik-2026-10/archItecture__adr__ADR_INDEX.md.bak-20261005-051740 |  | BICIM | orta | 2 adet H1 başlığı var (tek olmalı). |
| archive/temizlik-2026-10/archItecture__adr__ADR_INDEX.md.bak-20261005-051910 |  | BICIM | orta | 2 adet H1 başlığı var (tek olmalı). |
| archive/temizlik-2026-10/archItecture__adr__ADR_INDEX.md.bak-20261005-053049 |  | BICIM | orta | 2 adet H1 başlığı var (tek olmalı). |
| archive/temizlik-2026-10/archItecture__adr__ADR_INDEX.md.bak-20261005-053155 |  | BICIM | orta | 2 adet H1 başlığı var (tek olmalı). |
| archive/temizlik-2026-10/archItecture__adr__ADR-DASBOARD |  | BICIM | orta | H1 başlığı yok. |
| archive/temizlik-2026-10/archIve__ADR-0016_super_kopya.md |  | BICIM | orta | H1 başlığı yok. |
| archive/temizlik-2026-10/governance__constItutIon__CONSTITUTION.md.bak |  | BICIM | dusuk | Birden fazla tarih biçimi: ISO, TR-ay-adi. |
| archive/temizlik-2026-10/governance__status__PROJECT_STATUS.md.bak |  | BICIM | yuksek | 13 adet mojibake izi (örn. Ã, Ä±, ÅŸ). |
| archive/temizlik-2026-10/governance__status__PROJECT_STATUS.md.bak |  | BICIM | orta | H1 başlığı yok. |
| archive/temizlik-2026-10/references__kumakhov-1989__README.md |  | BICIM | dusuk | En uzun satır 815 karakter (kaydırma gerektirir). |
| governance/archive/PROJECT_STATUS_OLD.md |  | BICIM | orta | H1 başlığı yok. |
| governance/constitution/CONSTITUTION.md |  | BICIM | yuksek | 88 adet mojibake izi (örn. Ã, Ä±, ÅŸ). |
| governance/decisions/MIMAR_MESAJ.md |  | BICIM | orta | H1 başlığı yok. |
| governance/inventory/DOCS_EDIT_AUDIT_INDEX.md |  | BICIM | yuksek | 8 adet mojibake izi (örn. Ã, Ä±, ÅŸ). |
| governance/inventory/DOCS_EDIT_AUDIT_INDEX.md |  | BICIM | orta | H1 başlığı yok. |
| governance/inventory/DOCS_EDIT_AUDIT_INDEX.md |  | BICIM | dusuk | Birden fazla tarih biçimi: ISO, US-slash. |
| governance/inventory/DOCS_EDIT_AUDIT_INDEX.md | 40 | BICIM | orta | Tabloda sütun sayısı uyuşmuyor (1 satır, başlık 4 sütun). |
| governance/memory/PROJECT_MEMORY.md |  | BICIM | dusuk | Birden fazla tarih biçimi: ISO, US-slash. |
| governance/status/FAZ_10_DENETIM.md |  | BICIM | dusuk | Birden fazla tarih biçimi: ISO, TR-noktali. |
| governance/status/FAZ_11_DENETIM.md |  | BICIM | dusuk | Birden fazla tarih biçimi: ISO, TR-noktali. |
| governance/status/FAZ_12_DENETIM.md |  | BICIM | dusuk | Birden fazla tarih biçimi: ISO, TR-noktali. |
| governance/status/FAZ_13_DENETIM.md |  | BICIM | dusuk | Birden fazla tarih biçimi: ISO, TR-noktali. |
| governance/status/FAZ_14_DENETIM.md |  | BICIM | dusuk | Birden fazla tarih biçimi: ISO, TR-noktali. |
| governance/status/FAZ_15_DENETIM.md |  | BICIM | dusuk | Birden fazla tarih biçimi: ISO, TR-noktali. |
| governance/status/FAZ_2_DENETIM.md |  | BICIM | dusuk | Birden fazla tarih biçimi: ISO, TR-noktali. |
| governance/status/FAZ_3_DENETIM.md |  | BICIM | dusuk | Birden fazla tarih biçimi: ISO, TR-noktali. |
| governance/status/FAZ_4_DENETIM.md |  | BICIM | dusuk | Birden fazla tarih biçimi: ISO, TR-noktali. |
| governance/status/FAZ_5_DENETIM.md |  | BICIM | dusuk | Birden fazla tarih biçimi: ISO, TR-noktali. |
| governance/status/FAZ_6_DENETIM.md |  | BICIM | dusuk | Birden fazla tarih biçimi: ISO, TR-noktali. |
| governance/status/FAZ_7_DENETIM.md |  | BICIM | dusuk | Birden fazla tarih biçimi: ISO, TR-noktali. |
| governance/status/FAZ_8_DENETIM.md |  | BICIM | dusuk | Birden fazla tarih biçimi: ISO, TR-noktali. |
| governance/status/FAZ_9_DENETIM.md |  | BICIM | dusuk | Birden fazla tarih biçimi: ISO, TR-noktali. |
| governance/status/PROJECT_STATUS.md |  | BICIM | orta | H1 başlığı yok. |
| governance/status/PROJECT_STATUS.md |  | BICIM | yuksek | 13 adet mojibake izi (örn. Ã, Ä±, ÅŸ). |
| linguistics/003-locative-preverbs.md |  | BICIM | dusuk | En uzun satır 426 karakter (kaydırma gerektirir). |
| linguistics/word-families/word-family-gha.json |  | BICIM | orta | H1 başlığı yok. |
| linguistics/word-families/word-family-gha.md |  | BICIM | dusuk | En uzun satır 703 karakter (kaydırma gerektirir). |
| linguistics/word-families/word-family-gha.md |  | BICIM | dusuk | 327 satırda sekme girintisi. |
| linguistics/word-families/word-family-shhye.json |  | BICIM | orta | H1 başlığı yok. |
| meta/CLEANUP-DUPLICATES-DOCUMENTATION.md |  | BICIM | dusuk | Birden fazla tarih biçimi: TR-noktali, TR-ay-adi. |
| phases/phase-5/PHASE_5_COMPLETION_REPORT.md |  | BICIM | orta | H1 başlığı yok. |
| references/README.md |  | BICIM | dusuk | En uzun satır 815 karakter (kaydırma gerektirir). |
| reports/circassian_dialect_rules(1).json |  | BICIM | orta | H1 başlığı yok. |
| reports/documentation-inventory.csv |  | BICIM | orta | H1 başlığı yok. |
| reports/FAZ_C3_TAMAMLAMA_RAPORU.md |  | BICIM | yuksek | 2 adet U+FFFD değiştirme karakteri (kodlama kaybı). |
| reports/FAZ_C3_TAMAMLAMA_RAPORU.md |  | BICIM | dusuk | Birden fazla tarih biçimi: ISO, TR-ay-adi. |
| reports/kabardian_roots_database.json |  | BICIM | orta | H1 başlığı yok. |
| reports/kabardian_roots.csv |  | BICIM | orta | H1 başlığı yok. |

### Satır sonu boşluğu / eksik son satır bulunan dosyalar

| Dosya | Bulgu |
|---|---|
| governance/README.md | Dosya sonunda yeni satır yok. |
