'use client';

import React from 'react';
import { Camera, Code2, Users, Shield, BookOpen } from 'lucide-react';

export interface FooterProps {
  onKaynaklarAc?: () => void;
}

const sosyalBaglantilar = [
  { ad: 'Facebook', href: 'https://www.facebook.com/', icon: Users },
  { ad: 'Instagram', href: 'https://www.instagram.com/', icon: Camera },
  { ad: 'GitHub', href: 'https://github.com/', icon: Code2 },
];

export default function Footer({ onKaynaklarAc }: FooterProps) {
  return (
    <footer className="mt-auto border-t border-[#c9a227]/30 bg-[#fbf8ef] dark:bg-slate-900 dark:border-slate-800 text-stone-800 dark:text-slate-200 py-0.5 px-3 transition-colors duration-200">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-1 text-[10px] min-h-[24px]">
        <div className="flex items-center gap-1">
          <div className="h-4 w-4 bg-[#8b1e1e] rounded flex items-center justify-center text-white font-black text-[9px] shrink-0">
            А
          </div>
          <span className="font-bold text-[#8b1e1e] dark:text-emerald-400">Açık Mektep</span>
          <span className="text-stone-400 dark:text-slate-500">• Çerkesçe Sözlük</span>
        </div>

        <div className="flex items-center gap-1 text-stone-600 dark:text-slate-400">
          <button
            type="button"
            onClick={onKaynaklarAc}
            className="hover:text-[#8b1e1e] dark:hover:text-white flex items-center gap-0.5 font-medium"
          >
            <BookOpen size={9} className="text-[#8b1e1e] dark:text-emerald-400" />
            <span>Kaynaklar</span>
          </button>
          <span>•</span>
          <a
            href="https://creativecommons.org/licenses/by-sa/4.0/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#8b1e1e] dark:hover:text-white font-medium"
          >
            CC BY-SA 4.0
          </a>
          <span>•</span>
          <a
            href="/privacy"
            className="hover:text-[#8b1e1e] dark:hover:text-white flex items-center gap-0.5 font-medium"
          >
            <Shield size={9} className="text-stone-400" />
            <span>Gizlilik</span>
          </a>
        </div>

        <div className="flex items-center gap-1.5">
          <div className="flex items-center gap-1">
            {sosyalBaglantilar.map(({ ad, href, icon: Icon }) => (
              <a
                key={ad}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                title={ad}
                className="w-4 h-4 rounded-full border border-[#c9a227]/40 dark:border-slate-700 bg-white/80 dark:bg-slate-800 text-stone-600 dark:text-slate-300 flex items-center justify-center hover:bg-[#8b1e1e] dark:hover:bg-emerald-600 hover:text-white transition-colors"
              >
                <Icon size={9} />
              </a>
            ))}
          </div>
          <span className="text-stone-400 dark:text-slate-600">|</span>
          <a
            href="https://acikkitap.com.tr"
            target="_blank"
            rel="noopener noreferrer"
            className="text-stone-500 dark:text-slate-400 hover:text-[#8b1e1e] dark:hover:text-emerald-400 underline"
          >
            Zeki Tuman
          </a>
        </div>
      </div>
    </footer>
  );
}