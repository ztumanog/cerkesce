'use client';

import React from 'react';
import {
  Camera,
  Code2,
  Play,
  Users,
  BriefcaseBusiness,
  Shield,
  BookOpen,
} from 'lucide-react';

export interface FooterProps {
  aktifTema?: Record<string, any>;
  onKaynaklarAc?: () => void;
  kayitSayisi?: number;
  sozlukSayisi?: number;
  sources?: any[];
  totalSources?: number;
}

const sosyalBaglantilar = [
  { ad: 'Facebook', href: 'https://www.facebook.com/', icon: Users },
  { ad: 'Instagram', href: 'https://www.instagram.com/', icon: Camera },
  { ad: 'YouTube', href: 'https://www.youtube.com/', icon: Play },
  { ad: 'LinkedIn', href: 'https://www.linkedin.com/', icon: BriefcaseBusiness },
  { ad: 'GitHub', href: 'https://github.com/', icon: Code2 },
];

export default function Footer({
  onKaynaklarAc,
}: FooterProps) {
  return (
    <footer className="mt-auto border-t border-[#c9a227]/30 bg-[#fbf8ef] dark:bg-slate-900 dark:border-slate-800 text-stone-800 dark:text-slate-200 transition-colors duration-300">
      <div className="mx-auto max-w-6xl px-4 md:px-8 py-6">
        
        {/* Kesin Yan Yana 3 Sütunlu Grid */}
        <div className="grid grid-cols-3 gap-4 items-center">
          
          {/* 1. Sütun: Logo ve İsim */}
          <div className="flex items-center gap-2 justify-start">
            <div className="h-8 w-8 bg-[#8b1e1e] rounded-lg flex items-center justify-center text-white font-black text-sm shadow-sm shrink-0">
              А
            </div>
            <div className="hidden sm:block">
              <h3 className="text-sm font-bold text-[#8b1e1e] dark:text-emerald-400 leading-tight">
                Açık Mektep
              </h3>
              <p className="text-xs text-stone-500 dark:text-slate-400 font-medium">
                Çerkesçe Sözlük
              </p>
            </div>
          </div>

          {/* 2. Sütun: Sosyal Medya */}
          <div className="flex flex-col items-center justify-center">
            <p className="text-[11px] font-bold text-[#8b1e1e] dark:text-emerald-400 uppercase tracking-wider mb-1.5 hidden sm:block">
              Sosyal Medya
            </p>
            <div className="flex items-center gap-1 sm:gap-1.5 flex-wrap justify-center">
              {sosyalBaglantilar.map(({ ad, href, icon: Icon }) => (
                <a
                  key={ad}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={ad}
                  title={ad}
                  className="flex items-center justify-center w-7 h-7 rounded-full border border-[#c9a227]/40 dark:border-slate-700 bg-white/80 dark:bg-slate-800 text-stone-600 dark:text-slate-300 hover:bg-[#8b1e1e] dark:hover:bg-emerald-600 hover:text-white dark:hover:text-white hover:border-[#8b1e1e] transition-all duration-200 hover:scale-105 shrink-0"
                >
                  <Icon size={13} />
                </a>
              ))}
            </div>
          </div>

          {/* 3. Sütun: Yasal / Bağlantılar */}
          <div className="flex flex-col items-end justify-center space-y-1">
            <button
              type="button"
              onClick={onKaynaklarAc}
              className="text-xs text-stone-600 dark:text-slate-400 hover:text-[#8b1e1e] dark:hover:text-white transition-colors flex items-center gap-1 cursor-pointer font-medium"
            >
              <BookOpen size={12} className="text-[#8b1e1e] dark:text-emerald-400" />
              <span>Kaynaklar</span>
            </button>

            <a
              href="https://creativecommons.org/licenses/by-sa/4.0/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-stone-600 dark:text-slate-400 hover:text-[#8b1e1e] dark:hover:text-white transition-colors font-medium"
            >
              CC BY-SA 4.0
            </a>

            <a
              href="/privacy"
              className="text-xs text-stone-600 dark:text-slate-400 hover:text-[#8b1e1e] dark:hover:text-white transition-colors flex items-center gap-1 font-medium"
            >
              <Shield size={12} className="text-stone-400 dark:text-slate-500" />
              <span>Gizlilik</span>
            </a>
          </div>

        </div>

        {/* Alt Satır */}
        <div className="mt-5 pt-3 border-t border-[#c9a227]/30 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-1 text-[11px] text-stone-500 dark:text-slate-400">
          <p className="text-center sm:text-left">
            © 2026 <span className="font-semibold text-stone-700 dark:text-slate-300">Açık Mektep</span>. Tüm hakları saklıdır.
          </p>
          <p className="text-center sm:text-right">
            <a
              href="https://acikkitap.com.tr"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#8b1e1e] dark:hover:text-emerald-400 underline transition-colors"
            >
              Zeki Tuman
            </a>{' '}
            tarafından geliştirilmiştir.
          </p>
        </div>

      </div>
    </footer>
  );
}