"use client";

/**
 * @file src/components/dictionary/SearchBox.tsx
 * @description Sunucu eylemlerinden bağımsız, yalnızca Prop ve Event kullanan Saf UI Bileşeni.
 * Projenin tüm gelişmiş filtreleme ve Akıllı Klavye özelliklerini korur.
 */

import React from "react";
import type { 
  LehceTipi, 
  AramaModu, 
  SearchBoxProps 
} from "@/types/dictionary";

import AkilliKlavye from "@/components/features/AkilliKlavye";

export interface CleanSearchBoxProps extends SearchBoxProps {
  loading?: boolean;
}

const SearchBox: React.FC<CleanSearchBoxProps> = ({
  searchQuery,
  setSearchQuery,
  hedefDil,
  setHedefDil,
  seciliLehce,
  setSeciliLehce,
  seciliDosya,
  setSeciliDosya,
  aramaModu,
  setAramaModu,
  mod,
  setMod,
  limit = 20,
  setLimit,
  aktifSozlukler = [],
  inputRef,
  setGoruntulenenAdet,
  karanlikMod = false,
  metinBoyutu = 16,
  loading = false,
}) => {
  const mevcutMod: AramaModu = mod || aramaModu || "prefix";
  const modDegistir = setMod || setAramaModu;

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchQuery(e.target.value);
    if (setGoruntulenenAdet) setGoruntulenenAdet(20);
    if (setLimit) setLimit(20);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape" && searchQuery) {
      setSearchQuery("");
    }
  };

  const aramaModlari: { key: AramaModu; label: string; aciklama: string }[] = [
    { key: "prefix", label: "Başlangıç", aciklama: "Kelime başlangıcında ara" },
    { key: "exact", label: "Tam", aciklama: "Tam eşleşme ara" },
    { key: "contains", label: "İçeriyor", aciklama: "Herhangi bir yerde ara" },
  ];

  const handleLimitSelect = (yeniLimit: number) => {
    if (setLimit) setLimit(yeniLimit);
    if (setGoruntulenenAdet) setGoruntulenenAdet(yeniLimit);
  };

  return (
    <div className="mx-auto my-6 w-full max-w-5xl px-4 sm:px-6">
      <div className="rounded-2xl border border-stone-200 bg-white p-4 shadow-sm dark:border-stone-800 dark:bg-stone-900 sm:p-6">
        
        {/* 1. Arama İnputu */}
        <div className="relative mb-6">
          <div className="flex items-center justify-between mb-2">
            <label className="block text-xs font-semibold text-stone-600 dark:text-stone-400">
              Sözlükte Ara
            </label>
            {loading && (
              <span className="text-xs text-amber-600 dark:text-amber-400 animate-pulse font-medium">
                Aranıyor...
              </span>
            )}
          </div>
          <div className="relative">
            <input
              ref={inputRef}
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              onKeyDown={handleKeyDown}
              placeholder="Çerkesçe kelime veya anlam yazın (Örn: фабэ)..."
              className="w-full rounded-xl border border-stone-300 bg-stone-50 px-4 py-3.5 pr-10 text-base text-stone-900 transition placeholder:text-stone-400 focus:border-amber-600 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-100 dark:placeholder:text-stone-500 dark:focus:border-amber-500 dark:focus:bg-stone-900"
              autoComplete="off"
            />
            
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-stone-400 hover:bg-stone-200 hover:text-stone-600 dark:hover:bg-stone-700 dark:hover:text-stone-200"
                type="button"
                title="Temizle (ESC)"
              >
                ✕
              </button>
            )}
          </div>

          {/* 🎹 Akıllı Klavye */}
          <div className="mt-3">
            <AkilliKlavye
              inputRef={inputRef}
              sorgu={searchQuery}
              setSorgu={setSearchQuery}
              metinBoyutu={metinBoyutu}
              karanlikMod={karanlikMod}
            />
          </div>
        </div>

        {/* 2. Arama Modu Seçim Butonları */}
        <div className="mb-6">
          <label className="mb-2 block text-xs font-semibold text-stone-600 dark:text-stone-400">
            Arama Modu
          </label>
          <div className="flex flex-wrap gap-2">
            {aramaModlari.map((item) => {
              const seciliMi = mevcutMod === item.key;
              return (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => modDegistir?.(item.key)}
                  title={item.aciklama}
                  className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                    seciliMi
                      ? "bg-amber-600 text-white shadow-md dark:bg-amber-700"
                      : "bg-stone-100 text-stone-700 hover:bg-stone-200 dark:bg-stone-800 dark:text-stone-300 dark:hover:bg-stone-700"
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* 3. Filtreleme Seçenekleri */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          
          {/* Lehçe Seçimi */}
          <div>
            <label className="mb-2 block text-xs font-semibold text-stone-600 dark:text-stone-400">
              Lehçe
            </label>
            <select
              value={seciliLehce}
              onChange={(e) => setSeciliLehce(e.target.value as LehceTipi)}
              className="w-full rounded-lg border border-stone-300 bg-white px-3 py-2 text-sm text-stone-900 transition focus:border-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-500/20 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-100"
            >
              <option value="TUMU">Tüm Lehçeler</option>
              <option value="DOGU">Doğu (Kabardey)</option>
              <option value="BATI">Batı (Adıge)</option>
            </select>
          </div>

          {/* Hedef Dil Seçimi */}
          <div>
            <label className="mb-2 block text-xs font-semibold text-stone-600 dark:text-stone-400">
              Hedef Dil
            </label>
            <select
              value={hedefDil}
              onChange={(e) => setHedefDil(e.target.value)}
              className="w-full rounded-lg border border-stone-300 bg-white px-3 py-2 text-sm text-stone-900 transition focus:border-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-500/20 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-100"
            >
              <option value="TUMU">Tüm Diller</option>
              <option value="ady">Çerkesçe (Adıge)</option>
              <option value="kbd">Kabardeyce</option>
              <option value="ru">Rusça</option>
              <option value="tr">Türkçe</option>
              <option value="en">İngilizce</option>
              <option value="ar">Arapça</option>
            </select>
          </div>

          {/* Sözlük Seçimi */}
          <div>
            <label className="mb-2 block text-xs font-semibold text-stone-600 dark:text-stone-400">
              Sözlük ({aktifSozlukler.length})
            </label>
            <select
              value={seciliDosya}
              onChange={(e) => setSeciliDosya(e.target.value)}
              className="w-full rounded-lg border border-stone-300 bg-white px-3 py-2 text-sm text-stone-900 transition focus:border-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-500/20 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-100"
            >
              <option value="TUMU">Tüm Sözlükler</option>
              {aktifSozlukler.map((sozluk) => (
                <option key={sozluk.file} value={sozluk.file}>
                  {sozluk.title}
                </option>
              ))}
            </select>
          </div>

          {/* Sonuç Adedi Seçimi */}
          <div>
            <label className="mb-2 block text-xs font-semibold text-stone-600 dark:text-stone-400">
              Sonuç Adedi
            </label>
            <select
              value={limit}
              onChange={(e) => handleLimitSelect(Number(e.target.value))}
              className="w-full rounded-lg border border-stone-300 bg-white px-3 py-2 text-sm text-stone-900 transition focus:border-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-500/20 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-100"
            >
              <option value={20}>20 Sonuç</option>
              <option value={50}>50 Sonuç</option>
              <option value={100}>100 Sonuç</option>
              <option value={200}>200 Sonuç</option>
            </select>
          </div>

        </div>
      </div>
    </div>
  );
};

export default SearchBox;