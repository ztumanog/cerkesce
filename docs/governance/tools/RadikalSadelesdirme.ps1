# ============================================================
# Radikal Sadelestirme - Governance Cleanup Sprint
# Tarih: 2026-10-16
# ============================================================
$ErrorActionPreference = "Stop"
$Root = "E:\projeler\Cerkesce\docs"

Write-Host "=== RADIKAL SADELESTIRME BASLIYOR ===" -ForegroundColor Cyan
Write-Host "Kok: $Root" -ForegroundColor Gray

# --- 0. YEDEK ---
$BackupDir = "E:\projeler\Cerkesce\backups"
$BackupFile = Join-Path $BackupDir ("docs-radikal-" + (Get-Date -Format "yyyy-MM-dd_HHmmss") + ".zip")
if (-not (Test-Path $BackupDir)) { New-Item -ItemType Directory -Path $BackupDir -Force | Out-Null }
Write-Host "`n[0] Yedek aliniyor..." -ForegroundColor Yellow
Compress-Archive -Path (Join-Path $Root "*") -DestinationPath $BackupFile -Force
Write-Host "    Yedek: $BackupFile" -ForegroundColor Green

# --- 1. ARSIV KLASORLERI ---
$ArchiveBase = Join-Path $Root "archive"
$Archive202609 = Join-Path $ArchiveBase "2026-09-tarihsel"
$Archive202610 = Join-Path $ArchiveBase "2026-10-denetim"
$ArchiveRawKopya = Join-Path $Archive202610 "raw-kopyalar"
foreach ($d in @($Archive202609, $Archive202610, $ArchiveRawKopya)) {
    if (-not (Test-Path $d)) { New-Item -ItemType Directory -Path $d -Force | Out-Null; Write-Host "    Olusturuldu: $d" -ForegroundColor Gray }
}

# --- 2. DOCS_KANONIK_KARARI.md YAZ ---
$KararFile = Join-Path $Root "governance\DOCS_KANONIK_KARARI.md"
$KararIcerik = @"
# docs/ Kanonik Kaynak Karari

**Tarih:** 2026-10-16
**Durum:** KANONIK KARAR
**Karar veren:** Bas Mimar
**Kapsam:** Tum dokumantasyon denetim ve uygulama surecleri

---

## 1. Karar

E:\projeler\Cerkesce\docs klasoru, projenin tek kanonik dokumantasyon kokudur.

Gecersiz kokler (referans verilmez):
- E:\home\ProjeDoc_FINAL
- E:\home\ProjeDoc
- E:\projeler\Cerkesce\ (kok) - yalnizca docs/ disi dosyalar icin

---

## 2. Gerekce

Kok klasorde belgeler 4 kez silme olayi yasadi. Bu nedenle belgeler docs/ altina tasindi.

---

## 3. SSOT Ilkesi

Her bilgi icin tek dogru kaynak vardir:

| Bilgi turu | Kanonik kaynak |
|---|---|
| Faz durumu | governance/status/PHASES.md, PROJECT_STATUS.md |
| Denetim bulgulari | governance/inventory/DOCS_EDIT_AUDIT_INDEX.md |
| Uygulama kaydi | governance/inventory/edit-audit/07-UYGULAMA-RAPORU.md |
| Kararlar | governance/DOCS_KANONIK_KARARI.md |

---

## 4. Mukerrer Belge Yasagi

Ayni konu icin birden fazla belge olusturulamaz.

Yasak: rapor.md, rapor_v2.md, rapor_son.md, rapor_final.md, rapor_tamam.md

Serbest: Tek karar + Tek uygulama kaydi + Tek kanonik kaynak

---

## 5. Dokuman Butcesi

Her is icin: 1 Karar + 1 Uygulama Kaydi + 1 Kanonik Kaynak

---

## 6. Arsiv Kurallari

- Tarihsel belgeler -> docs/archive/<yil-ay>-<konu>/
- Silinmez, tasinir
- Basi na TARİHSEL notu eklenir

---

## 7. Tekrar Onleme Kurali

Ayni is birden fazla kez yapilmaz. Yapilirsa once mevcut iz aranir, varsa guncellenir.

---

**Bu karar gecerlidir. Son guncelleme: 2026-10-16**
"@
Set-Content -Path $KararFile -Value $KararIcerik -Encoding UTF8
Write-Host "[1] Karar belgesi yazildi: $KararFile" -ForegroundColor Green

# --- 3. RAW TEMIZLIGI ---
$RawDir = Join-Path $Root "governance\inventory\edit-audit\raw"
$RawKopyalar = @("01-ENVANTER.md", "02-BICIM-BULGULARI.md", "03-TERMINOLOJI-VE-DIL.md")
Write-Host "`n[2] raw/ rapor kopyalari arsive tasiniyor..." -ForegroundColor Yellow
foreach ($f in $RawKopyalar) {
    $src = Join-Path $RawDir $f
    if (Test-Path $src) {
        $dst = Join-Path $ArchiveRawKopya $f
        Move-Item -Path $src -Destination $dst -Force
        Write-Host "    Tasindi: $f" -ForegroundColor Gray
    } else {
        Write-Host "    Bulunamadi: $f" -ForegroundColor DarkYellow
    }
}

# --- 4. TARIHSEL ENVANTER ARSIVI ---
$InvReport = Join-Path $Root "governance\inventory\DOCUMENTATION_INVENTORY_REPORT.md"
Write-Host "`n[3] Tarihsel envanter arsivleniyor..." -ForegroundColor Yellow
if (Test-Path $InvReport) {
    $InvDst = Join-Path $Archive202609 "DOCUMENTATION_INVENTORY_REPORT.md"
    Move-Item -Path $InvReport -Destination $InvDst -Force
    $Not = "> TARİHSEL - kanonik degil. docs/ tasinmasindan onceki envanter.`n> Kanonik kaynak: docs/governance/inventory/DOCS_EDIT_AUDIT_INDEX.md`n`n"
    $Icerik2 = Get-Content -Path $InvDst -Raw -Encoding UTF8
    Set-Content -Path $InvDst -Value ($Not + $Icerik2) -Encoding UTF8
    Write-Host "    Arsivlendi: $InvDst" -ForegroundColor Green
} else {
    Write-Host "    Bulunamadi (atlandi)" -ForegroundColor DarkYellow
}

# --- 5. UYGULAMA KAYDI ---
$UygulamaFile = Join-Path $Root "governance\inventory\edit-audit\07-UYGULAMA-RAPORU.md"
Write-Host "`n[4] Uygulama kaydi ekleniyor..." -ForegroundColor Yellow
$Kayit = "`n---`n`n## 2026-10-16 - Radikal Sadelestirme`n`nDokumantasyon kanoniklestirildi.`n- docs/governance/DOCS_KANONIK_KARARI.md olusturuldu.`n- raw/ rapor kopyalari arsive tasindi (3 dosya).`n- DOCUMENTATION_INVENTORY_REPORT.md arsivlendi.`n- Radikal sadelestirme uygulandi: yeni rapor uretilmedi.`n- Yedek: $BackupFile`n"
if (Test-Path $UygulamaFile) {
    Add-Content -Path $UygulamaFile -Value $Kayit -Encoding UTF8
    Write-Host "    Kayit eklendi: $UygulamaFile" -ForegroundColor Green
} else {
    Write-Host "    07-UYGULAMA-RAPORU.md bulunamadi!" -ForegroundColor Red
}

# --- 6. OZET ---
Write-Host "`n=== TAMAMLANDI ===" -ForegroundColor Cyan
Write-Host "Yedek        : $BackupFile" -ForegroundColor Gray
Write-Host "Karar belgesi: $KararFile" -ForegroundColor Gray
Write-Host "Arsiv        : $Archive202609" -ForegroundColor Gray
Write-Host "Arsiv        : $ArchiveRawKopya" -ForegroundColor Gray
Write-Host "`nYeni rapor URETILMEDI." -ForegroundColor Green
