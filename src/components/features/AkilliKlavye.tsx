"use client";

import React, { useState } from "react";
import { 
  KeyboardLang, 
  LANG_OPTIONS, 
  CERKES_SIK_KULLANILANLAR, 
  KEYBOARD_LAYOUTS 
} from "@/constants/alphabet";

export interface AkilliKlavyeProps {
  inputRef?: React.RefObject<HTMLInputElement | null>;
  sorgu?: string;
  setSorgu?: (yeniSorgu: string) => void;
  metinBoyutu?: number | string;
  selectedLang?: KeyboardLang;
  onLanguageChange?: (lang: KeyboardLang) => void;
  onKeyPress?: (char: string) => void;
}

export const AkilliKlavye: React.FC<AkilliKlavyeProps> = ({
  inputRef,
  sorgu = "",
  setSorgu,
  metinBoyutu = 14,
  selectedLang: propLang,
  onLanguageChange,
}) => {
  const [internalLang, setInternalLang] = useState<KeyboardLang>("circassian");
  
  // Dışarıdan prop verilmişse onu, yoksa iç state'i kullan
  const currentLang = propLang || internalLang;

  const handleLangSelect = (lang: KeyboardLang) => {
    setInternalLang(lang);
    if (onLanguageChange) {
      onLanguageChange(lang);
    }
  };

  const karakterEkle = (karakter: string): void => {
    let inputElement: HTMLInputElement | null = inputRef?.current || null;

    if (!inputElement) {
      inputElement = document.querySelector(
        'form input, div[role="search"] input, .search-box input, input[type="search"], input[type="text"]'
      ) as HTMLInputElement;
    }

    if (!inputElement) {
      if (typeof setSorgu === "function") {
        setSorgu((sorgu || "") + karakter);
      }
      return;
    }

    const mevcutDeger = inputElement.value || "";
    const start = inputElement.selectionStart ?? mevcutDeger.length;
    const end = inputElement.selectionEnd ?? mevcutDeger.length;

    const yeniMetin = mevcutDeger.substring(0, start) + karakter + mevcutDeger.substring(end);

    const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
      window.HTMLInputElement.prototype,
      "value"
    )?.set;

    if (nativeInputValueSetter) {
      nativeInputValueSetter.call(inputElement, yeniMetin);
    } else {
      inputElement.value = yeniMetin;
    }

    inputElement.dispatchEvent(new Event("input", { bubbles: true }));
    inputElement.dispatchEvent(new Event("change", { bubbles: true }));

    if (typeof setSorgu === "function") {
      setSorgu(yeniMetin);
    }

    inputElement.focus();
    const yeniKonum = start + karakter.length;
    inputElement.setSelectionRange(yeniKonum, yeniKonum);
  };

  const hesaplananFontBoyutu =
    typeof metinBoyutu === "number" ? `${metinBoyutu}px` : metinBoyutu;

  const currentLayout = KEYBOARD_LAYOUTS[currentLang] || KEYBOARD_LAYOUTS.circassian;

  return (
    <div
      role="region"
      aria-label="Çok Dilli Akıllı Klavye"
      className="flex flex-col gap-3 rounded-2xl border border-stone-200 bg-stone-50/90 p-3 shadow-sm dark:border-stone-800 dark:bg-stone-900/80 backdrop-blur-sm"
    >
      {/* 1. DİL SEÇİM BUTONLARI (UDL BAR) */}
      <div 
        role="tablist" 
        aria-label="Klavye ve Arama Dili Seçimi"
        className="flex flex-wrap items-center gap-1.5 pb-2 border-b border-stone-200 dark:border-stone-800"
      >
        {LANG_OPTIONS.map((lang) => {
          const isActive = currentLang === lang.id;
          return (
            <button
              key={lang.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => handleLangSelect(lang.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-medium text-xs transition-all ${
                isActive
                  ? "bg-amber-500 text-white shadow-md shadow-amber-500/20 scale-105 dark:bg-amber-600"
                  : "bg-white text-stone-700 hover:bg-stone-100 dark:bg-stone-800 dark:text-stone-300 dark:hover:bg-stone-700 border border-stone-200 dark:border-stone-700"
              }`}
            >
              <span className="text-sm">{lang.flag}</span>
              <span>{lang.label}</span>
            </button>
          );
        })}
      </div>

      {/* 2. SADECE ÇERKESÇE MODUNDA AKILLI HIZLI SATIR */}
      {currentLang === "circassian" && (
        <div 
          role="toolbar" 
          aria-label="Sık kullanılan Çerkesçe özel karakterler"
          className="flex flex-wrap items-center gap-1.5 pb-2 border-b border-stone-200/60 dark:border-stone-800/60"
        >
          <span className="mr-1 text-xs font-bold tracking-wider uppercase text-amber-600 dark:text-amber-400 select-none">
            ⚡ Hızlı:
          </span>
          {CERKES_SIK_KULLANILANLAR.map((char) => (
            <button
              key={`fast_${char}`}
              type="button"
              aria-label={`Arama kutusuna ${char} ekle`}
              onClick={() => karakterEkle(char)}
              style={{ fontSize: hesaplananFontBoyutu }}
              className="rounded-lg border border-amber-300 bg-amber-50/80 px-2.5 py-1 font-bold text-amber-900 shadow-sm transition hover:scale-105 hover:bg-amber-100 focus:outline-none focus:ring-2 focus:ring-amber-500 dark:border-amber-800/60 dark:bg-amber-950/40 dark:text-amber-200"
            >
              {char}
            </button>
          ))}
        </div>
      )}

      {/* 3. AKTİF DİLİN KLAVYE HARFLERİ */}
      <div 
        role="group" 
        aria-label={`${currentLang} Klavye Harfleri`}
        className={`flex flex-wrap items-center gap-1.5 ${currentLang === 'ar' ? 'dir-rtl' : ''}`}
      >
        {currentLayout.map((char) => (
          <button
            key={char}
            type="button"
            aria-label={`Arama kutusuna ${char} ekle`}
            onClick={() => karakterEkle(char)}
            style={{ fontSize: hesaplananFontBoyutu }}
            className="rounded-md border border-stone-300 bg-white px-2.5 py-1 font-semibold text-stone-800 shadow-sm transition hover:border-emerald-500 hover:bg-emerald-50 focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-200 dark:hover:border-emerald-500 dark:hover:bg-emerald-950/50"
          >
            {char}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AkilliKlavye;
