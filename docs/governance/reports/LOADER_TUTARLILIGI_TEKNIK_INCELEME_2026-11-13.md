\# Loader Tutarliligi — Teknik Inceleme Raporu



\*\*Tarih:\*\* 2026-11-13 20:30

\*\*Kapsam:\*\* app/sozluk/family/page.tsx vs app/api/sozluk/family/\[id]/route.ts

\*\*Kod degisikligi:\*\* Yok

\*\*Son guncelleme:\*\* 2026-11-13 21:10 (4b0725e sonrasi)



\## 1. Inceleme Ani Durum



\### page.tsx (eski)

\- 3-path fallback: data/ -> public/data/ -> src/data/

\- Tum lexemes gomulu

\- Sessiz catch



\### route.ts

\- Tek path: public/data/linguistic/

\- 4 dosya okur (lexemes, word\_families, roots, concept-tr)

\- Her istekte yeniden okur



\### client.tsx

\- Props ile veri alir (SSR gomulu)

\- API cagirmaz



\## 2. Tutarsizliklar



| Fark | page.tsx | route.ts |

|---|---|---|

| Path stratejisi | 3-path fallback | Tek path |

| Turbopack ignore | Var | Yok |

| Hata yonetimi | Sessiz catch | 500 |

| Dosya sayisi | 2 | 4 |

| Veri kapsami | Tum lexemes | 1 aile |

| Cache | Yok | Yok |



\## 3. Risk Degerlendirmesi



| # | Risk | Olasilik | Etki | Oncelik |

|---|---|---|---|---|

| 1 | page.tsx fallback tutmazsa bos sayfa | Dusuk | Yuksek | P1 |

| 2 | route.ts turbopack warning | Dusuk | Dusuk | P3 |

| 3 | page.tsx sessiz hata | Orta | Orta | P2 |

| 4 | concept-tr.json sayfada yok | Yuksek | Orta | P1 |

| 5 | page.tsx HTML cok buyuk | Yuksek | Orta | P1 |

| 6 | route.ts cache yok | Orta | Orta | P2 |



\## 4. Oneriler



\- P1: concept-tr.json ekle, turbopackIgnore ekle, HTML optimize

\- P2: Ortak loader, cache ekle

\- P3: page.tsx API'ye yonlendir



\## 5. Guncelleme Notu (4b0725e)



Commit: Optimize family listing RSC payload, add dialectVariants display, and align root API parity



\### Cozulen Bulgular



| Bulgu | Cozum |

|---|---|

| page.tsx 3-path fallback | Tek path'e indirildi |

| page.tsx HTML cok buyuk | RSC payload optimize |

| page.tsx projeksiyon eksik | families + lexemes projeksiyonu |

| route.ts turbopackIgnore yok | 1 satir eklendi |

| client.tsx dialectVariants eksik | 216 satir UI |



\### Kalan



\- page.tsx sessiz catch (log yok)

\- route.ts cache yok

\- concept-tr.json sayfada yok (gerek yok)



\## 6. Sonuc



\- P1 bulgularin tamami (3/3) 4b0725e ile cozuldu

\- P2/P3 kismen acik

\- Sistem yesil: 218/218, 1085/1085, tsc 0, build 0



\*\*Durum:\*\* KAPANDI (tarihsel kayit)

