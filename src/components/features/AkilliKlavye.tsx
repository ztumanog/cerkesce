"use client";

import React, { useState } from "react";
import {
  KeyboardLang,
  LANG_OPTIONS,
  CERKES_SIK_KULLANILANLAR,
  KEYBOARD_LAYOUTS,
} from "@/constants/alphabet";

export interface AkilliKlavyeProps {
  inputRef?: React.RefObject<HTMLInputElement | null>;
  sorgu?: string;
  setSorgu?: (yeniSorgu: string) => void;
  metinBoyutu?: number | string;
  selectedLang?: KeyboardLang;
  onLanguageChange?: (lang: KeyboardLang) => void;
  onKeyPress?: (char: string) => void;
  // ⭐ Sprint K1 callback'leri
  onBackspace?: () => void;
  onSpace?: () => void;
  onClear?: () => void;
  onSubmit?: () => void;
}

export const AkilliKlavye: React.FC<AkilliKlavyeProps> = ({
  inputRef,
  sorgu = "",
  setSorgu,
  metinBoyutu = 14,
  selectedLang: propLang,
  onLanguageChange,
  onKeyPress,
  onBackspace,
  onSpace,
  onClear,
  onSubmit,
}) => {
  const [internalLang, setInternalLang] = useState<KeyboardLang>("circassian");

  const currentLang = propLang || internalLang;

  const handleLangSelect = (lang: KeyboardLang) => {
    setInternalLang(lang);
    if (onLanguageChange) {
      onLanguageChange(lang);
    }
  };

  // ---- INPUT'A YAZ ----
  const getInputElement = (): HTMLInputElement | null => {
    if (inputRef?.current) return inputRef.current;
    return document.querySelector(
      'form input, div[role="search"] input, .search-box input, input[type="search"], input[type="text"]'
    ) as HTMLInputElement;
  };

  const karakterEkle = (karakter: string): void => {
    const inputElement = getInputElement();

    if (!inputElement) {
      if (typeof setSorgu === "function") {
        setSorgu((sorgu || "") + karakter);
      }
      if (typeof onKeyPress === "function") onKeyPress(karakter);
      return;
    }

    const mevcutDeger = inputElement.value || "";
    const start = inputElement.selectionStart ?? mevcutDeger.length;
    const end = inputElement.selectionEnd ?? mevcutDeger.length;

    const yeniMetin =
      mevcutDeger.substring(0, start) + karakter + mevcutDeger.substring(end);

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

    if (typeof setSorgu === "function") setSorgu(yeniMetin);

    inputElement.focus();
    const yeniKonum = start + karakter.length;
    inputElement.setSelectionRange(yeniKonum, yeniKonum);

    if (typeof onKeyPress === "function") onKeyPress(karakter);
  };

  // ---- BACKSPACE ----
  const karakterSil = (): void => {
    const inputElement = getInputElement();

    if (!inputElement) {
      if (typeof setSorgu === "function") {
        setSorgu((sorgu || "").slice(0, -1));
      }
      if (typeof onBackspace === "function") onBackspace();
      return;
    }

    const mevcutDeger = inputElement.value || "";
    const start = inputElement.selectionStart ?? mevcutDeger.length;
    const end = inputElement.selectionEnd ?? mevcutDeger.length;

    let yeniMetin: string;
    let yeniKonum: number;

    if (start !== end) {
      // Seçili metni sil
      yeniMetin = mevcutDeger.substring(0, start) + mevcutDeger.substring(end);
      yeniKonum = start;
    } else if (start > 0) {
      // Bir karakter geri sil
      yeniMetin = mevcutDeger.substring(0, start - 1) + mevcutDeger.substring(start);
      yeniKonum = start - 1;
    } else {
      // Başta, silinecek bir şey yok
      if (typeof onBackspace === "function") onBackspace();
      return;
    }

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

    if (typeof setSorgu === "function") setSorgu(yeniMetin);

    inputElement.focus();
    inputElement.setSelectionRange(yeniKonum, yeniKonum);

    if (typeof onBackspace === "function") onBackspace();
  };

  // ---- SPACE ----
  const boslukEkle = (): void => {
    karakterEkle(" ");
    if (typeof onSpace === "function") onSpace();
  };

  // ---- CLEAR ----
  const temizle = (): void => {
    const inputElement = getInputElement();

    if (inputElement) {
      const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
        window.HTMLInputElement.prototype,
        "value"
      )?.set;

      if (nativeInputValueSetter) {
        nativeInputValueSetter.call(inputElement, "");
      } else {
        inputElement.value = "";
      }

      inputElement.dispatchEvent(new Event("input", { bubbles: true }));
      inputElement.dispatchEvent(new Event("change", { bubbles: true }));
      inputElement.focus();
    }

    if (typeof setSorgu === "function") setSorgu("");

    if (typeof onClear === "function") onClear();
  };

  // ---- ENTER (Ara) ----
  const ara = (): void => {
    if (typeof onSubmit === "function") onSubmit();
  };

  const hesaplananFontBoyutu =
    typeof metinBoyutu === "number" ? `${metinBoyutu}px` : metinBoyutu;

  const currentLayout: string[] =
    KEYBOARD_LAYOUTS[currentLang] || KEYBOARD_LAYOUTS.circassian;

  // ---- Ortak buton stili ----
  const actionBtnClass =
    "rounded-md border border-stone-300 bg-white px-3 py-1 font-semibold text-stone-800 shadow-sm transition hover:border-emerald-500 hover:bg-emerald-50 focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-200 dark:hover:border-emerald-500 dark:hover:bg-emerald-950/50";

  return (
    <div
      role="region"
      aria-label="Çok Dilli Akıllı Klavye"
      className="flex flex-col gap-3 rounded-2xl border border-stone-200 bg-stone-50/90 p-3 shadow-sm dark:border-stone-800 dark:bg-stone-900/80 backdrop-blur-sm"
    >
      {/* 1. DİL SEÇİM BUTONLARI */}
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

      {/* 2. ÇERKESÇE HIZLI SATIR */}
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

      {/* 3. KLAVYE HARFLERİ */}
      <div
        role="group"
        aria-label={`${currentLang} Klavye Harfleri`}
        dir={currentLang === "ar" ? "rtl" : "ltr"}
        className="flex flex-wrap items-center gap-1.5"
      >
        {currentLayout.map((char: string) => (
          <button
            key={char}
            type="button"
            aria-label={`Arama kutusuna ${char} ekle`}
            onClick={() => karakterEkle(char)}
            style={{ fontSize: hesaplananFontBoyutu }}
            className={actionBtnClass}
          >
            {char}
          </button>
        ))}
      </div>

      {/* 4. ⭐ AKSİYON SATIRI (Backspace, Space, Clear, Enter) */}
      <div
        role="toolbar"
        aria-label="Klavye Aksiyonları"
        className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-stone-200 dark:border-stone-800"
      >
        {/* Backspace */}
        <button
          type="button"
          onClick={karakterSil}
          aria-label="Son karakteri sil"
          className="flex items-center gap-1 rounded-md border border-rose-300 bg-rose-50 px-3 py-1.5 text-xs font-bold text-rose-700 shadow-sm transition hover:bg-rose-100 focus:outline-none focus:ring-2 focus:ring-rose-500 dark:border-rose-800/60 dark:bg-rose-950/40 dark:text-rose-300 dark:hover:bg-rose-950/70"
        >
          <span>⌫</span>
          <span className="hidden sm:inline">Sil</span>
        </button>

        {/* Space */}
        <button
          type="button"
          onClick={boslukEkle}
          aria-label="Boşluk ekle"
          className="flex items-center gap-1 rounded-md border border-slate-300 bg-slate-50 px-4 py-1.5 text-xs font-bold text-slate-700 shadow-sm transition hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
        >
          <span>␣</span>
          <span className="hidden sm:inline">Boşluk</span>
        </button>

        {/* Clear */}
        <button
          type="button"
          onClick={temizle}
          aria-label="Tüm metni temizle"
          className="flex items-center gap-1 rounded-md border border-amber-300 bg-amber-50 px-3 py-1.5 text-xs font-bold text-amber-800 shadow-sm transition hover:bg-amber-100 focus:outline-none focus:ring-2 focus:ring-amber-500 dark:border-amber-800/60 dark:bg-amber-950/40 dark:text-amber-200"
        >
          <span>✕</span>
          <span className="hidden sm:inline">Temizle</span>
        </button>

        {/* Enter (Ara) */}
        <button
          type="button"
          onClick={ara}
          aria-label="Aramayı başlat"
          className="ml-auto flex items-center gap-1 rounded-md border border-emerald-600 bg-emerald-600 px-4 py-1.5 text-xs font-bold text-white shadow-sm transition hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
        >
          <span>🔍</span>
          <span>Ara</span>
        </button>
      </div>
    </div>
  );
};

export default AkilliKlavye;