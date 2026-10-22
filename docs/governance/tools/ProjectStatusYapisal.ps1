# ============================================================
# PROJECT_STATUS.md Yapisal Duzeltme
# Tarih: 2026-10-16
# ============================================================

$ErrorActionPreference = "Stop"
$dosya = "E:\projeler\Cerkesce\docs\governance\status\PROJECT_STATUS.md"
$yedek = "E:\projeler\Cerkesce\backups\PROJECT_STATUS-yapisal-" + (Get-Date -Format "yyyy-MM-dd_HHmmss") + ".md"

Copy-Item -Path $dosya -Destination $yedek -Force
Write-Host "Yedek: $yedek" -ForegroundColor Green

$icerik = [System.IO.File]::ReadAllText($dosya)

# --- 1. H1 EKLE (satir 1'deki H3'u H1 + H2 yap) ---
$icerik = $icerik -replace '(?m)^### Faz Özeti \(Tek Gerçek\)', "# PROJECT_STATUS`n`n## Faz Özeti (Tek Gerçek)"

# --- 2. TEKRAR BLOK 2'YI SIL ---
# Satir 22'deki "## Faz Özeti" blogunu (--- dahil) sil
$tekrarBlok = "## Faz Özeti (Tek Gerçek)`n`n> Bu tablo, PHASES.md ve ROADMAP.md ile birebir uyumludur.`n> Son güncelleme: 2026-10-03`n**Not:** Phase 6 = API Gateway (ADR-GOV-003). Embedding ayrı Research Track.`n`n---`n"
$icerik = $icerik.Replace($tekrarBlok, "")

# --- 3. YAZIM HATASI: Sonuçu -> Sonucu ---
$icerik = $icerik -replace '### Test Sonuçu', '### Test Sonucu'

# --- KAYDET ---
$utf8NoBom = New-Object System.Text.UTF8Encoding($false)
[System.IO.File]::WriteAllText($dosya, $icerik, $utf8NoBom)

Write-Host "Yapisal duzeltme yapildi." -ForegroundColor Green

# --- DOGRULAMA ---
Write-Host ""
Write-Host "=== DOGRULAMA ===" -ForegroundColor Cyan
Select-String -Path $dosya -Pattern "^#{1,3} " | Select-Object LineNumber, Line

# --- UYGULAMA KAYDI ---
$uygulamaFile = "E:\projeler\Cerkesce\docs\governance\inventory\edit-audit\07-UYGULAMA-RAPORU.md"
$kayit = "`n---`n`n## 2026-10-16 - PROJECT_STATUS.md Yapisal Duzeltme`n`nTekrar blok silindi + H1 eklendi.`n- Satir 1: ### -> # PROJECT_STATUS + ## Faz Ozeti`n- Satir 22: Tekrar blok silindi`n- Satir 44: Test Sonuçu -> Test Sonucu`n- Yedek: $yedek`n"

if (Test-Path $uygulamaFile) {
    $utf8NoBom2 = New-Object System.Text.UTF8Encoding($false)
    [System.IO.File]::AppendAllText($uygulamaFile, $kayit, $utf8NoBom2)
    Write-Host "Uygulama kaydi eklendi (LF)." -ForegroundColor Green
}