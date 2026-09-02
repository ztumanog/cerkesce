'use client';

import React from 'react';

export interface HeaderProps {
  totalWords?: number;
  activeSourcesCount?: number;
  resultCount?: number;
}

export const Header: React.FC<HeaderProps> = ({
  totalWords = 0,
  activeSourcesCount = 0,
  resultCount = 0,
}) => {
  return (
    <header className="w-full bg-stone-900 border-b border-stone-800 p-4 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
        <div>
          <h1 className="text-xl font-bold text-amber-500">Çerkesçe Bilgi Grafiği</h1>
          <p className="text-xs text-stone-400">Çok Dilli Dijital Sözlük & Veri Tabanı</p>
        </div>

        <div className="flex items-center gap-4 text-xs">
          <div className="bg-stone-950 px-3 py-1.5 rounded border border-stone-800">
            <span className="text-stone-400 block">Toplam Kaynak</span>
            <span className="text-amber-400 font-bold text-sm">{activeSourcesCount} Sözlük</span>
          </div>
          <div className="bg-stone-950 px-3 py-1.5 rounded border border-stone-800">
            <span className="text-stone-400 block">Kayıtlı Kelime</span>
            <span className="text-amber-400 font-bold text-sm">{totalWords}</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;