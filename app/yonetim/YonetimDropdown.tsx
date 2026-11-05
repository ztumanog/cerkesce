'use client';

import React from 'react';
import {
  ChevronDown,
  ArrowUpRight,
  Settings,
  Database,
  GitBranch,
  Languages,
  Layers,
  FileEdit,
  FileSpreadsheet,
} from 'lucide-react';

const kurasyonKartlari = [
  {
    href: '/admin/curation',
    baslik: 'Lexeme Kürasyonu',
    aciklama: 'Sözlük kayıtlarını incele ve düzenle',
    ikon: Database,
  },
  {
    href: '/admin/curation/roots',
    baslik: 'Kök Kürasyonu',
    aciklama: 'Kök kayıtlarını incele',
    ikon: GitBranch,
  },
  {
    href: '/admin/curation/concepts',
    baslik: 'Kavram İnceleme',
    aciklama: 'Türkçe kavram → İngilizce concept eşlemesi',
    ikon: Languages,
  },
  {
    href: '/admin/curation/bulk',
    baslik: 'Toplu İşlem',
    aciklama: 'Toplu güncelleme',
    ikon: Layers,
  },
  {
    href: '/admin/curation/single',
    baslik: 'Tekil Düzenleme',
    aciklama: 'Tek kayıt düzenleme',
    ikon: FileEdit,
  },
  {
    href: '/admin/curation/csv',
    baslik: 'CSV Aktarımı',
    aciklama: 'CSV ile içe/dışa aktarım',
    ikon: FileSpreadsheet,
  },
];

export default function YonetimDropdown() {
  const detailsRef = React.useRef<HTMLDetailsElement>(null);

  React.useEffect(() => {
    function handleOutsideClick(event: PointerEvent) {
      const details = detailsRef.current;
      if (
        details &&
        event.target instanceof Node &&
        !details.contains(event.target)
      ) {
        details.open = false;
      }
    }

    function handleEscape(event: KeyboardEvent) {
      const details = detailsRef.current;
      if (event.key === 'Escape' && details?.open) {
        details.open = false;
        details.querySelector('summary')?.focus();
      }
    }

    document.addEventListener('pointerdown', handleOutsideClick);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('pointerdown', handleOutsideClick);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  return (
    <details ref={detailsRef} className="group relative inline-block">
      <summary className="flex cursor-pointer list-none items-center gap-2 rounded-xl border border-emerald-400/30 bg-slate-900 px-4 py-3 text-sm font-semibold text-emerald-300 shadow-sm transition-colors hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400">
        <Settings className="h-4 w-4" aria-hidden="true" />
        Yönetim
        <ChevronDown
          className="h-4 w-4 transition-transform group-open:rotate-180"
          aria-hidden="true"
        />
      </summary>

      <nav
        aria-label="Yönetim ve kürasyon"
        className="absolute right-0 top-full z-50 mt-3 w-64 rounded-2xl border border-slate-700 bg-slate-900 p-2 text-slate-100 shadow-2xl sm:w-80"
      >
        <div className="px-3 py-3">
          <p className="text-sm font-semibold">Kürasyon araçları</p>
          <p className="mt-1 text-xs text-slate-400">
            Çalışma ekranını seçin
          </p>
        </div>

        <div className="mx-2 mb-2 border-t border-slate-700" />

        {kurasyonKartlari.map((kart) => {
          const Icon = kart.ikon;

          return (
            <a
              key={kart.href}
              href={kart.href}
              className="flex items-center gap-3 rounded-xl px-3 py-3 transition-colors hover:bg-slate-800 focus-visible:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-400/10 text-emerald-400">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>

              <span className="min-w-0 flex-1">
                <span className="block text-sm font-semibold text-slate-100">
                  {kart.baslik}
                </span>
                <span className="mt-1 block text-xs leading-relaxed text-slate-400">
                  {kart.aciklama}
                </span>
              </span>

              <ArrowUpRight
                className="h-4 w-4 shrink-0 text-slate-500"
                aria-hidden="true"
              />
            </a>
          );
        })}
      </nav>
    </details>
  );
}