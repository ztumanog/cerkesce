"use client";

import React from "react";
import type { AkilliKlavyeProps } from "@/types/dictionary";
import { CERKES_OZEL_HARFLER } from "@/constants/alphabet";
export const AkilliKlavye: React.FC<AkilliKlavyeProps> = ({
  inputRef,
  sorgu,
  setSorgu,
  metinBoyutu = 14,
}) => {
  const karakterEkle = (karakter: string): void => {
    const inputElement = inputRef?.current;

    if (!inputElement) {
      setSorgu(sorgu + karakter);
      return;
    }

    const start = inputElement.selectionStart ?? sorgu.length;
    const end = inputElement.selectionEnd ?? sorgu.length;

    const yeniMetin = sorgu.substring(0, start) + karakter + sorgu.substring(end);
    setSorgu(yeniMetin);

    setTimeout(() => {
      inputElement.focus();
      const yeniKonum = start + karakter.length;
      inputElement.setSelectionRange(yeniKonum, yeniKonum);
    }, 0);
  };

  const hesaplananFontBoyutu = 
    typeof metinBoyutu === "number" ? `${metinBoyutu}px` : metinBoyutu;

  return (
    <div className="flex flex-wrap items-center gap-1.5 rounded-xl border border-stone-200 bg-stone-100/70 p-2 dark:border-stone-800 dark:bg-stone-800/50">
      <span className="mr-1 text-xs font-medium text-stone-500 dark:text-stone-400">
        Özel Harfler:
      </span>
      {CERKES_OZEL_HARFLER.map((char) => (
        <button
          key={char}
          type="button"
          onClick={() => karakterEkle(char)}
          style={{ fontSize: hesaplananFontBoyutu }}
          className="rounded-md border border-stone-300 bg-white px-2.5 py-1 font-semibold text-stone-800 shadow-sm transition hover:border-amber-500 hover:bg-amber-50 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-200 dark:hover:border-amber-500 dark:hover:bg-amber-950/40"
        >
          {char}
        </button>
      ))}
    </div>
  );
};

export default AkilliKlavye;