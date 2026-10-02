# ROLLBACK PROCEDURE

**Tarih:** 2026-10-02
**Versiyon:** v1.0
**Kategori:** Governance

---

## 1. AMAC

Canli sistemde sorun cikmasi durumunda hizli ve guvenli geri donus.

---

## 2. ROLLBACK TURLERI

| Tur | Tetikleyici | Suresi | Etki |
|-----|-------------|--------|------|
| Vercel | UI/API hatasi | ~2 dk | Anlik geri donus |
| Docker | Container hatasi | ~5 dk | Image degisimi |
| Git | Kod hatasi | ~10 dk | Commit geri alma |
| Database | Veri hatasi | ~30 dk | Snapshot geri yukleme |

---

## 3. VERCEL ROLLBACK

### Manuel (Dashboard)

1. vercel.com/dashboard
2. Proje sec
3. Deployments
4. Onceki basarili deployment
5. "Promote to Production"

### Otomatik (Workflow)

GitHub Actions → Rollback → Run workflow

- Environment: production
- Version: (bos birak veya commit hash)

---

## 4. DOCKER ROLLBACK

    # Onceki image'i bul
    docker images | grep cerkesce

    # Eski image'i calistir
    docker stop cerkesce-nextjs
    docker run -d --name cerkesce-nextjs -p 3000:3000 cerkesce-nextjs:<onceki-tag>

---

## 5. GIT ROLLBACK

    # Son commit'i geri al
    git revert HEAD
    git push origin main

    # Veya belirli commit'e don
    git revert <commit-hash>
    git push origin main

---

## 6. KARAR MATRISI

| Durum | Aksiyon | Kim |
|-------|---------|-----|
| UI hatasi | Vercel rollback | Gelistirici |
| API hatasi | Vercel rollback | Gelistirici |
| Container hatasi | Docker rollback | DevOps |
| Kod hatasi | Git revert | Gelistirici |
| Veri hatasi | DB snapshot | Mimar |

---

## 7. DOGRULAMA

Rollback sonrasi:

- [ ] Health check PASS
- [ ] Smoke test PASS
- [ ] Ana sayfa aciliyor
- [ ] API cevap veriyor
- [ ] Loglarda hata yok

---

## 8. ILETISIM

Rollback sonrasi bilgilendir:

- Mimar
- Gelistirici
- Ilgili ekip

---

**Imza:** Mimar
**Tarih:** 2026-10-02
