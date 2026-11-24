'use client';

/**
 * BİRLEŞİK ÜST ÇUBUK (Parti 2-C).
 * Eski Navbar (menü) + eski Header (erişilebilirlik kontrolleri) tek bileşende birleşti.
 * - Sol: logo + başlık
 * - Orta: menü (Sözlük ▾ · Morfoloji · Converter · Yönetim)
 * - Sağ: erişilebilirlik (yazı boyutu, satır aralığı, harf aralığı, kontrast,
 *        favoriler, tema düğmesi)
 * Tema değiştirme yalnızca useTheme hook'u üzerinden (Parti 3-B).
 */

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { Star } from 'lucide-react';
import { useTercih } from '@/contexts/TercihContext';
import { useTheme } from '@/hooks/useTheme';

export default function UnifiedHeader() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const { font, setFont, line, setLine, letter, setLetter, contrast, setContrast } = useTercih();
  const { theme, toggleTheme, ready: themeReady } = useTheme();

  // Sözlük dropdown'u: hover köprüsü (Portal + onMouseLeave titremesi çözümü,
  // eski Navbar'dan korundu — 160ms gecikmeli kapanma)
  const [open, setOpen] = useState(false);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const handleEnter = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    setOpen(true);
  };
  const handleLeave = () => {
    closeTimerRef.current = setTimeout(() => setOpen(false), 160);
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  // Klavye kısayolları (eski Header'dan korundu): Ctrl+= büyüt, Ctrl=- küçült,
  // Ctrl+0 sıfırla, Ctrl+C kontrast
  useEffect(() => {
    if (!mounted) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!e.ctrlKey && !e.metaKey) return;
      const fontSizes: Array<'sm' | 'md' | 'lg' | 'xl'> = ['sm', 'md', 'lg', 'xl'];
      if (e.key === '=' || e.key === '+') {
        e.preventDefault();
        const idx = fontSizes.indexOf(font);
        setFont(fontSizes[Math.min(idx + 1, 3)]);
      }
      if (e.key === '-') {
        e.preventDefault();
        const idx = fontSizes.indexOf(font);
        setFont(fontSizes[Math.max(idx - 1, 0)]);
      }
      if (e.key === '0') {
        e.preventDefault();
        setFont('md');
      }
      if (e.key === 'c' || e.key === 'C') {
        e.preventDefault();
        setContrast(contrast === 'high' ? 'normal' : 'high');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [font, contrast, mounted, setFont, setContrast]);

  const isSozlukGroup =
    pathname === '/sozluk' ||
    pathname?.startsWith('/kavram') ||
    pathname?.startsWith('/explorer') ||
    pathname?.startsWith('/sozluk/favoriler') ||
    pathname?.startsWith('/favoriler');

  const topLink =
    'px-2.5 py-1.5 rounded-lg outline-none select-none transition-colors text-slate-700 dark:text-slate-200 hover:text-emerald-600 dark:hover:text-emerald-400';
  const activeLink = 'text-emerald-600 dark:text-emerald-400';
  const itemCls =
    'flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-slate-700 dark:text-slate-100 outline-none transition-colors hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-emerald-600 dark:hover:text-emerald-400 focus:bg-slate-100 dark:focus:bg-slate-800 focus:text-emerald-600 dark:focus:text-emerald-400';

  if (!mounted) {
    // İskelet yükleme durumu (eski Header'dan korundu)
    return (
      <header className="border-b border-slate-200 dark:border-slate-800 px-3 py-2.5 sm:px-8 sm:py-4 bg-white/90 dark:bg-[#090d16]/90 backdrop-blur-md relative z-10">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-2 sm:gap-4">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <div className="relative h-9 w-9 sm:h-11 sm:w-11 flex items-center justify-center rounded-lg sm:rounded-xl overflow-hidden shrink-0 border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900">
              <div className="w-full h-full bg-slate-200 dark:bg-slate-700 animate-pulse" />
            </div>
            <div className="min-w-0">
              <div className="h-5 w-32 bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />
            </div>
          </div>
          <div className="h-10 w-48 bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />
        </div>
      </header>
    );
  }

  return (
    <header className="border-b border-slate-200 dark:border-slate-800 px-3 py-2.5 sm:px-8 sm:py-4 bg-white/90 dark:bg-[#090d16]/90 backdrop-blur-md relative z-10 transition-colors duration-300">
      <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-2 sm:gap-4">
        {/* SOL: logo + başlık */}
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <div className="relative h-9 w-9 sm:h-11 sm:w-11 flex items-center justify-center rounded-lg sm:rounded-xl overflow-hidden shrink-0 border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
            <Image
              src="/logo/logo.svg"
              alt="Çerkesçe Sözlük Logosu"
              fill
              className="object-contain p-1"
              priority
              onError={(e) => {
                const img = e.target as HTMLImageElement;
                img.style.display = 'none';
                const parent = img.parentElement;
                if (parent) parent.textContent = '📚';
              }}
            />
          </div>
          <div className="min-w-0">
            <Link
              href="/sozluk"
              className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-tight truncate transition-colors duration-300 hover:text-emerald-600 dark:hover:text-emerald-400"
              title="Çerkesçe Sözlük"
            >
              Çerkesçe Sözlük
            </Link>
            <p className="hidden sm:block text-xs text-slate-600 dark:text-slate-300 transition-colors duration-300">
              Адыгэбзэ Псалъалъэ
            </p>
          </div>
        </div>

        {/* ORTA: menü (eski Navbar'dan) */}
        <nav className="flex flex-wrap items-center gap-0.5 sm:gap-2 text-sm font-medium order-3 sm:order-2 w-full sm:w-auto">
          <div onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
            <DropdownMenu.Root modal={false} open={open} onOpenChange={setOpen}>
              <DropdownMenu.Trigger asChild>
                <button
                  type="button"
                  aria-label="Sözlük menüsünü aç"
                  className={`inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 outline-none select-none transition-colors hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-emerald-600 dark:hover:text-emerald-400 text-slate-700 dark:text-slate-200 ${
                    isSozlukGroup ? 'bg-slate-100 dark:bg-slate-800 text-emerald-600 dark:text-emerald-400' : ''
                  }`}
                >
                  <span>Sözlük</span>
                  <span aria-hidden="true">▾</span>
                </button>
              </DropdownMenu.Trigger>
              <DropdownMenu.Portal>
                <DropdownMenu.Content
                  align="start"
                  sideOffset={6}
                  onMouseEnter={handleEnter}
                  onMouseLeave={handleLeave}
                  onCloseAutoFocus={(e) => e.preventDefault()}
                  className="z-50 min-w-52 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-1.5 text-sm text-slate-700 dark:text-slate-100 shadow-xl shadow-black/10 dark:shadow-black/40"
                >
                  <DropdownMenu.Item asChild onSelect={() => setOpen(false)}>
                    <Link href="/sozluk" className={itemCls}>
                      Sözlük Arama
                    </Link>
                  </DropdownMenu.Item>
                  <DropdownMenu.Separator className="my-1 h-px bg-slate-200 dark:bg-slate-800" />
                  <DropdownMenu.Item asChild onSelect={() => setOpen(false)}>
                    <Link href="/kavramlar" className={itemCls}>
                      Kavramlar
                    </Link>
                  </DropdownMenu.Item>
                  <DropdownMenu.Item asChild onSelect={() => setOpen(false)}>
                    <Link href="/explorer" className={itemCls}>
                      Keşfet (Kavram Ağı)
                    </Link>
                  </DropdownMenu.Item>
                  <DropdownMenu.Item asChild onSelect={() => setOpen(false)}>
                    <Link href="/sozluk/favoriler" className={itemCls}>
                      Favoriler
                    </Link>
                  </DropdownMenu.Item>
                  <DropdownMenu.Item asChild onSelect={() => setOpen(false)}>
                    <Link href="/sozluk/oneri" className={itemCls}>
                      Kelime Öner
                    </Link>
                  </DropdownMenu.Item>
                </DropdownMenu.Content>
              </DropdownMenu.Portal>
            </DropdownMenu.Root>
          </div>
          <Link
            href="/sozluk/morphology"
            className={`${topLink} ${pathname?.startsWith('/sozluk/morphology') ? activeLink : ''}`}
          >
            Morfoloji
          </Link>
          <Link
            href="/sozluk/converter"
            className={`${topLink} ${pathname?.startsWith('/sozluk/converter') ? activeLink : ''}`}
          >
            Converter
          </Link>
          <Link
            href="/admin/yonetim"
            className={`${topLink} ${pathname?.startsWith('/admin') ? activeLink : ''}`}
          >
            Yönetim
          </Link>
        </nav>

        {/* SAĞ: erişilebilirlik (eski Header'dan) */}
        <div className="flex items-center gap-1 bg-slate-100 dark:bg-[#131b2e] p-1 rounded-lg sm:rounded-xl border border-slate-300 dark:border-slate-700 transition-colors duration-300 order-2 sm:order-3">
          <div className="flex items-center">
            {(['sm', 'md', 'lg', 'xl'] as const).map((size) => (
              <button
                key={size}
                onClick={() => setFont(size)}
                className={`px-2 py-1 text-[11px] sm:text-xs font-semibold rounded-lg transition-all duration-200 ${
                  font === size
                    ? 'bg-amber-500 text-white'
                    : 'text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
                title={`Yazı boyutu: ${size === 'sm' ? 'Küçük' : size === 'md' ? 'Normal' : size === 'lg' ? 'Büyük' : 'Çok Büyük'}`}
              >
                A
              </button>
            ))}
          </div>

          <select
            value={line}
            onChange={(e) => setLine(e.target.value as 'tight' | 'normal' | 'loose')}
            className="px-2 py-1 text-[11px] sm:text-xs font-semibold text-slate-700 dark:text-slate-200 bg-transparent border border-slate-300 dark:border-slate-700 rounded-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-amber-500"
            title="Satır aralığı"
          >
            <option value="tight">Sıkı</option>
            <option value="normal">Normal</option>
            <option value="loose">Geniş</option>
          </select>

          <button
            onClick={() => setLetter(letter === 'wide' ? 'normal' : 'wide')}
            className={`px-2 py-1 text-[11px] sm:text-xs font-semibold rounded-lg transition-all duration-200 ${
              letter === 'wide'
                ? 'bg-sky-500 text-white'
                : 'text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
            title={`Harf aralığı: ${letter === 'wide' ? 'Geniş' : 'Normal'}`}
          >
            Harf
          </button>

          <button
            onClick={() => setContrast(contrast === 'high' ? 'normal' : 'high')}
            className={`px-2 py-1 text-[11px] sm:text-xs font-semibold rounded-lg transition-all duration-200 ${
              contrast === 'high'
                ? 'bg-purple-500 text-white'
                : 'text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
            title={`Kontrast modu (Ctrl + C) - Şu an: ${contrast === 'high' ? 'Yüksek' : 'Normal'}`}
          >
            🌓
          </button>

          <Link
            href="/sozluk/favoriler"
            className="flex items-center gap-1 px-2 py-1 text-[11px] sm:text-xs font-semibold text-yellow-700 dark:text-yellow-300 hover:bg-yellow-500/20 rounded-lg transition-all duration-200"
            title="Favoriler"
          >
            <Star size={14} className="text-yellow-500" fill="currentColor" />
          </Link>

          <button
            onClick={toggleTheme}
            disabled={!themeReady}
            className="px-2 py-1 text-[11px] sm:text-xs font-semibold text-amber-700 dark:text-amber-300 hover:bg-amber-500/20 rounded-lg transition-all duration-200 disabled:opacity-40"
            title={`Tema: ${theme === 'dark' ? 'Karanlık' : 'Aydınlık'}`}
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
        </div>
      </div>
    </header>
  );
}
