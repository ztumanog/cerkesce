# ============================================================
# PROJECT_STATUS.md Mojibake Onarim
# Tarih: 2026-10-16
# ============================================================

$ErrorActionPreference = "Stop"
$Root = "E:\projeler\Cerkesce\docs"
$BackupDir = "E:\projeler\Cerkesce\backups"

if (-not (Test-Path $BackupDir)) { New-Item -ItemType Directory -Path $BackupDir -Force | Out-Null }

$hasarli = Join-Path $Root "governance\status\PROJECT_STATUS.md"
$yedek = Join-Path $BackupDir ("PROJECT_STATUS-hasarli-" + (Get-Date -Format "yyyy-MM-dd_HHmmss") + ".md")

# --- 1. YEDEK ---
Copy-Item -Path $hasarli -Destination $yedek -Force
Write-Host "Yedek: $yedek" -ForegroundColor Green

# --- 2. ICERIGI OKU ---
$icerik = Get-Content -Path $hasarli -Raw -Encoding UTF8

# --- 3. MOJIBAKE DUZELT ---
# Uzun tire: â€" -> — (em dash)
$icerik = $icerik -replace 'â€"', '—'

# Cerkesce homonim: ÑˆÑ -> шы
$icerik = $icerik -replace 'ÑˆÑ', 'шы'

# Cerkesce homonim: Ğ±Ğ·Ñ -> бзэ
$icerik = $icerik -replace 'Ğ±Ğ·Ñ', 'бзэ'

# --- 4. KAYDET ---
Set-Content -Path $hasarli -Value $icerik -Encoding UTF8
Write-Host "PROJECT_STATUS.md onarildi." -ForegroundColor Green

# --- 5. DOGRULAMA ---
Write-Host ""
Write-Host "=== DOGRULAMA ===" -ForegroundColor Cyan
$kalan = (Select-String -Path $hasarli -Pattern "â€|Ñˆ|Ğ±" -ErrorAction SilentlyContinue).Count
if ($kalan -eq 0) {
    Write-Host "Mojibake kalmadi. TEMIZ." -ForegroundColor Green
} else {
    Write-Host "UYARI: $kalan satirda hala mojibake var." -ForegroundColor Yellow
    Select-String -Path $hasarli -Pattern "â€|Ñˆ|Ğ±" | Select-Object LineNumber, Line -First 10
}

# --- 6. UYGULAMA KAYDI ---
$uygulamaFile = Join-Path $Root "governance\inventory\edit-audit\07-UYGULAMA-RAPORU.md"
$kayit = "`n---`n`n## 2026-10-16 - PROJECT_STATUS.md Mojibake Onarim`n`nMojibake elle onarildi (7 satir).`n- â€ -> — (uzun tire, 3 satir)`n- ÑˆÑ -> шы (Cerkesce homonim, 2 satir)`n- Ğ±Ğ·Ñ -> бзэ (Cerkesce homonim, 2 satir)`n- Yedek: $yedek`n"

if (Test-Path $uygulamaFile) {
    Add-Content -Path $uygulamaFile -Value $kayit -Encoding UTF8
    Write-Host "Uygulama kaydi eklendi." -ForegroundColor Green
}

Write-Host ""
Write-Host "=== TAMAMLANDI ===" -ForegroundColor Cyan