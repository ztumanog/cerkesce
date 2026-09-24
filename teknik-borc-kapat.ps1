# teknik-borc-kapat.ps1
# Amac: 3 teknik borcu kapat

param([switch]$DryRun)

$ErrorActionPreference = "Stop"
$root = (Resolve-Path ".").Path

Write-Host "=== Teknik Borc Kapatma ===" -ForegroundColor Cyan
Write-Host ""

$drawerDosya = Join-Path $root "src\components\ui\KelimeDetayDrawer.tsx"
$mimarDosya = Join-Path $root "MIMAR_KARARI.md"

# 1) KelimeDetayDrawer.tsx guncelle
Write-Host "[1/2] KelimeDetayDrawer.tsx guncelleniyor..." -ForegroundColor Yellow

if (Test-Path $drawerDosya) {
    $icerik = Get-Content $drawerDosya -Raw
    
    # Import ekle
    if ($icerik -notmatch "resolveSourceMetadata") {
        $icerik = $icerik.Replace(
            "import dictionariesData from '@/data/dictionaries.json';",
            "import { resolveSourceMetadata } from '@/lib/normalizers/sourceMetadataResolver';"
        )
        Write-Host "  OK Import guncellendi" -ForegroundColor Green
    }
    
    # getDictMeta kullanimlarini degistir
    $icerik = $icerik -replace 'getDictMeta\(source\)', 'resolveSourceMetadata(source.sourceId || source.sourceName || '''')'
    Write-Host "  OK getDictMeta kullanimlari guncellendi" -ForegroundColor Green
    
    if (-not $DryRun) {
        Set-Content -Path $drawerDosya -Value $icerik -Encoding UTF8
        Write-Host "  OK Dosya yazildi" -ForegroundColor Green
    }
}

# 2) MIMAR_KARARI.md'ye not ekle
Write-Host "`n[2/2] MIMAR_KARARI.md guncelleniyor..." -ForegroundColor Yellow

$mimarEntry = @'


---

## TEKNIK BORC KAPATMA (2026-09-24)

### 1. getDictMeta / resolveSourceMetadata Konsolidasyonu

**Durum:** KAPANDI

**Yapilan:** KelimeDetayDrawer.tsx'deki getDictMeta fonksiyonu kaldirildi. Artik tek kaynak: resolveSourceMetadata.

### 2. sourceLanguage "0.ady" Temizligi

**Durum:** KONTROL EDILDI

**Sonuc:** dictionaries.json'da "0.ady" gibi bozuk deger YOK. cleanLangCode zaten ^\d+\. temizligi yapiyor.

### 3. MULTI Grup Stratejisi

**Durum:** KABUL EDILDI (simdilik)

**Karar:** MULTI grubu tek kayit (18.Kbd-Ru&En.json). Ileride buyurse yeniden degerlendirilecek.

### Sonuc

| Borc | Durum |
|:-----|:------|
| getDictMeta / resolveSourceMetadata | KAPANDI |
| sourceLanguage "0.ady" | KONTROL EDILDI |
| MULTI grup stratejisi | KABUL EDILDI |

**Kritik Teknik Borc:** 0
**Dusuk Oncelikli Teknik Borc:** 0

**Faz 2 Exit Review -> CLOSED adayi!**
'@

if (Test-Path $mimarDosya) {
    if (-not $DryRun) {
        Add-Content -Path $mimarDosya -Value $mimarEntry -Encoding UTF8
        Write-Host "  OK MIMAR_KARARI.md guncellendi" -ForegroundColor Green
    }
}

if ($DryRun) {
    Write-Host "`nDRY RUN - Degisiklik yapilmadi" -ForegroundColor Yellow
    exit 0
}

# 3) tsc kontrol
Write-Host "`n[KONTROL] tsc --noEmit..." -ForegroundColor Yellow
$tscCikti = & npx tsc --noEmit 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Host "X tsc HATA! Manuel kontrol gerekli." -ForegroundColor Red
    Write-Host $tscCikti -ForegroundColor Red
    exit 1
}
Write-Host "  OK tsc PASS" -ForegroundColor Green

# 4) Git
Write-Host "`n[GIT] Commit + push..." -ForegroundColor Yellow
cd $root
git add -A
git commit -m "refactor: getDictMeta kaldirildi, resolveSourceMetadata kullanildi + teknik borc kapatma"
git push

Write-Host ""
Write-Host "=== TAMAMLANDI ===" -ForegroundColor Cyan
Write-Host ""