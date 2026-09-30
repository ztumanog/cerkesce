# FAZ-6-GATE-CEVAPLAR (REV2)

**Tarih:** 2026-09-30
**Durum:** REVIZE (Mimar onayi ile)
**Revizyon:** FAISS -> Pure TypeScript

---

## Q1: Embedding Unit nedir?

**Karar:** Root Embedding ✅ ONAY

**Gerekce:**
- ADR-ROOT-001: Root-Centric model
- 60 root, 240 lexeme (4.0 lexeme/root)

---

## Q2: Vector Store kullanilacak mi?

**Karar:** Pure TypeScript In-Memory Vector Store ✅ REVIZE

**Gerekce:**
- 240 vektor (kucuk olcek)
- FAISS native bagimlilik getirir (C++ binding)
- Pure TS Float32Array ile < 1ms
- Build/CI-CD karmasasi yok

**Uygulama:**
- Float32Array dizisi
- In-memory cosine similarity
- O(n) = 240 islem

---

## Q3: Similarity Search hangi katmanda?

**Karar:** Arastirma katmani (Linguistic Dataset) ✅ ONAY

**Gerekce:**
- ADR-ROOT-001
- Runtime'a sokulmaz

---

## Q4: Semantic Relations runtime'a girecek mi?

**Karar:** HAYIR ✅ ONAY

**Gerekce:**
- ADR-ROOT-001 acikca yasakliyor

---

## Q5: Runtime maliyeti nedir?

**Karar:** Runtime maliyeti YOK ✅ REVIZE

**Gerekce:**
- Search arastirma katmaninda
- Runtime'da embedding yok
- Arastirma katmani maliyeti: O(n) = 240 islem, < 1ms

---

## Q6: Retrieval modeli nedir?

**Karar:** Cosine Similarity ✅ ONAY

**Gerekce:**
- Karakter n-gram vektorleri normalize
- F6.2'de test edildi (0.5-1.0)

---

## SONUC

Tum sorular cevaplandi. Mimar onayi alindi.
FAISS kaldirildi, Pure TypeScript kullanilacak.

