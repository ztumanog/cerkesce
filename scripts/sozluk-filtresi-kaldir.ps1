# sozluk-filtresi-kaldir.ps1
# Amac:
#   1) FilterPanel.tsx'ten DictionaryFilter'i kaldir
#   2) SozlukEkrani.tsx'teki FilterDropdown props'larindan sozlukFilter'i kaldir
# Kullanim:
#   cd E:\projeler\Cerkesce
#   .\sozluk-filtresi-kaldir.ps1 -DryRun
#   .\sozluk-filtresi-kaldir.ps1

param(
    [string]$ProjectRoot = ".",
    [switch]$DryRun
)

$ErrorActionPreference = "Stop"
$ProjectRoot = (Resolve-Path $ProjectRoot).Path
$timestamp   = Get-Date -Format "yyyyMMdd_HHmmss"
$backupDir   = Join-Path $ProjectRoot "_backup_$timestamp"

Write-Host ""
Write-Host "=====================================================" -ForegroundColor Cyan
Write-Host "  Sozluk Filtresini Kaldir (Dis Filtre)" -ForegroundColor Cyan
Write-Host "=====================================================" -ForegroundColor Cyan
Write-Host "Proje : $ProjectRoot" -ForegroundColor Gray
Write-Host "Yedek : $backupDir" -ForegroundColor Gray
Write-Host ""

# ---------------------------------------------------------------
# 1) Dosyalari kontrol et
# ---------------------------------------------------------------
Write-Host "[1/4] Dosyalar kontrol ediliyor..." -ForegroundColor Yellow

$panelFile = Join-Path $ProjectRoot "src\components\dictionary\FilterPanel.tsx"
$ekranFile = Join-Path $ProjectRoot "src\components\dictionary\SozlukEkrani.tsx"

foreach ($f in @($panelFile, $ekranFile)) {
    if (-not (Test-Path $f)) {
        Write-Host "  X Bulunamadi: $f" -ForegroundColor Red
        exit 1
    }
    Write-Host "  + $($f.Substring($ProjectRoot.Length + 1))" -ForegroundColor Green
}

# ---------------------------------------------------------------
# 2) Yedek al
# ---------------------------------------------------------------
Write-Host "`n[2/4] Yedek aliniyor..." -ForegroundColor Yellow
if (-not (Test-Path $backupDir)) { New-Item -ItemType Directory -Path $backupDir -Force | Out-Null }

foreach ($f in @($panelFile, $ekranFile)) {
    $rel = $f.Substring($ProjectRoot.Length).TrimStart('\')
    $dest = Join-Path $backupDir $rel
    $destDir = Split-Path $dest -Parent
    if (-not (Test-Path $destDir)) { New-Item -ItemType Directory -Path $destDir -Force | Out-Null }
    Copy-Item $f $dest -Force
    Write-Host "  + $rel" -ForegroundColor DarkGray
}

# ---------------------------------------------------------------
# 3) FilterPanel.tsx - Tamamen yeniden yaz
# ---------------------------------------------------------------
Write-Host "`n[3/4] FilterPanel.tsx guncelleniyor..." -ForegroundColor Yellow

$panelContent = @'
'use client';

import React from 'react';
import DialectFilter, {
  type DialectFilterValue,
} from '@/components/dictionary/DialectFilter';
import LanguageFilter, {
  type LanguageFilterValue,
} from '@/components/dictionary/LanguageFilter';

export interface FilterPanelProps {
  dialectFilter: DialectFilterValue;
  onDialectChange: (v: DialectFilterValue) => void;
  dialectCounts?: Record<DialectFilterValue, number>;

  languageFilter: LanguageFilterValue;
  onLanguageChange: (v: LanguageFilterValue) => void;
  languageCounts?: Record<LanguageFilterValue, number>;
}

export function FilterPanel({
  dialectFilter,
  onDialectChange,
  dialectCounts,
  languageFilter,
  onLanguageChange,
  languageCounts,
}: FilterPanelProps) {
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-3 shadow-lg space-y-3">

      {/* 1. LEHCE - en ustte, hep gorunur */}
      <div>
        <span className="block mb-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          Lehçe
        </span>
        <DialectFilter
          value={dialectFilter}
          onChange={onDialectChange}
          counts={dialectCounts}
        />
      </div>

      {/* AYIRICI */}
      <div className="border-t border-slate-200/60 dark:border-slate-800/60" />

      {/* 2. DIL - dropdown */}
      <LanguageFilter
        value={languageFilter}
        onChange={onLanguageChange}
        counts={languageCounts}
      />
    </div>
  );
}

export default FilterPanel;
'@

if (-not $DryRun) {
    Set-Content -Path $panelFile -Value $panelContent -Encoding UTF8
    Write-Host "  + Yeniden yazildi (DictionaryFilter kaldirildi)" -ForegroundColor Green
} else {
    Write-Host "  (DryRun) Yeniden yazilacak (DictionaryFilter kaldirilacak)" -ForegroundColor DarkGray
}

# ---------------------------------------------------------------
# 4) SozlukEkrani.tsx - FilterDropdown props'larindan sozlukFilter kaldir
# ---------------------------------------------------------------
Write-Host "`n[4/4] SozlukEkrani.tsx guncelleniyor..." -ForegroundColor Yellow

$ekranRaw = Get-Content $ekranFile -Raw
$ekranOrig = $ekranRaw
$ekranChanges = @()

# 4a) activeCount blogundan sozlukFilter satirini kaldir
$ekranRaw = $ekranRaw -replace "(?m)^\s*\(sozlukFilter !== 'ALL' \? 1 : 0\) \+\r?\n", ""
if ($ekranRaw -ne $ekranOrig) {
    $ekranChanges += "activeCount'tan sozlukFilter kaldirildi"
}

# 4b) Props satirlarini kaldir
$ekranRaw = $ekranRaw -replace "(?m)^\s*sozlukFilter=\{sozlukFilter\}\r?\n", ""
$ekranRaw = $ekranRaw -replace "(?m)^\s*onSozlukChange=\{setSozlukFilter\}\r?\n", ""
$ekranRaw = $ekranRaw -replace "(?m)^\s*sozlukOptions=\{sozlukOptions\}\r?\n", ""
$ekranRaw = $ekranRaw -replace "(?m)^\s*sozlukCounts=\{sozlukCounts\}\r?\n", ""

if ($ekranRaw -ne $ekranOrig) {
    $ekranChanges += "FilterDropdown props'larindan sozlukFilter + sozlukOptions + sozlukCounts kaldirildi"
}

if ($ekranRaw -ne $ekranOrig) {
    if (-not $DryRun) {
        Set-Content -Path $ekranFile -Value $ekranRaw -Encoding UTF8 -NoNewline
        Write-Host "  + Guncellendi" -ForegroundColor Green
    } else {
        Write-Host "  (DryRun) Guncellenecek" -ForegroundColor DarkGray
    }
    foreach ($c in $ekranChanges) { Write-Host "    - $c" -ForegroundColor Gray }
} else {
    Write-Host "  = Degisiklik yok" -ForegroundColor DarkGray
}

# ---------------------------------------------------------------
# Ozet
# ---------------------------------------------------------------
Write-Host ""
Write-Host "=====================================================" -ForegroundColor Cyan
Write-Host " TAMAMLANDI" -ForegroundColor Green
Write-Host " Yedek: $backupDir" -ForegroundColor Gray
Write-Host ""
Write-Host " Geri almak icin:" -ForegroundColor Gray
Write-Host "   Copy-Item -Recurse -Force '$backupDir\*' '$ProjectRoot'" -ForegroundColor DarkGray
Write-Host ""
Write-Host " SONRAKI ADIM:" -ForegroundColor Yellow
Write-Host "   1) Tarayicida Ctrl+Shift+R" -ForegroundColor Gray
Write-Host "   2) Filtreler -> sadece Lehce + Dil gorunmeli" -ForegroundColor Gray
Write-Host "   3) Hata varsa konsolu kontrol et" -ForegroundColor Gray
Write-Host "=====================================================" -ForegroundColor Cyan
Write-Host ""