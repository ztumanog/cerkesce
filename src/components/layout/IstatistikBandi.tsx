"use client";

import type React from "react";

interface IstatistikBandiProps {
  wordsCount: number;
  sozlukSayisi?: number;
  aktifTema: {
    yaziAna?: string;
    yaziAlt: string;
  };
}

export const IstatistikBandi: React.FC<IstatistikBandiProps> = ({
  wordsCount,
  sozlukSayisi = 34,
  aktifTema,
}) => {
  const yaziAna = aktifTema.yaziAna || "inherit";

  return (
    <div
      style={{
        color: aktifTema.yaziAlt,
      }}
      className="-mt-3 mb-1 flex select-none flex-wrap items-center justify-center gap-2 text-center text-[13px]"
      aria-live="polite"
    >
      <span>
        <strong
          style={{
            color: yaziAna,
          }}
          className="font-bold"
        >
          {sozlukSayisi} Sözlük
        </strong>
      </span>

      <span
        className="opacity-35"
        aria-hidden="true"
      >
        •
      </span>

      <span>
        <strong
          style={{
            color: yaziAna,
          }}
          className="font-bold"
        >
          {wordsCount.toLocaleString("tr-TR")}+
        </strong>{" "}
        Kelime Kaydı
      </span>

      <span
        className="opacity-35"
        aria-hidden="true"
      >
        •
      </span>
<span className="inline-flex items-center gap-1.5">
  <span
    className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-500"
    aria-hidden="true"
  />
</span>
</div>
);
};


export default IstatistikBandi;
