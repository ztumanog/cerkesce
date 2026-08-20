import React from "react";

export interface HeaderProps {
  tema: string;
  metinBoyutu: number;
  karanlikMod: boolean;
  setMetinBoyutu: React.Dispatch<React.SetStateAction<number>>;
  setDuyuruMetni: (s: string) => void;
  toggleKaranlikMod: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  metinBoyutu,
  karanlikMod,
  setMetinBoyutu,
  toggleKaranlikMod,
}) => {
  return (
    <header className="w-full py-4 px-6 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <h1 className="text-xl font-bold text-slate-800 dark:text-slate-100">
          Çerkesçe Sözlük
        </h1>
      </div>

      <div className="flex items-center gap-4">
        {/* Metin Boyutu Yönetimi */}
        <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 rounded-lg p-1 text-xs">
          <button
            type="button"
            onClick={() => setMetinBoyutu(Math.max(12, metinBoyutu - 1))}
            className="px-2 py-1 hover:bg-white dark:hover:bg-slate-700 rounded font-medium"
            title="Metni Küçült"
          >
            A-
          </button>
          <span className="px-1 text-slate-500 font-mono">{metinBoyutu}px</span>
          <button
            type="button"
            onClick={() => setMetinBoyutu(Math.min(24, metinBoyutu + 1))}
            className="px-2 py-1 hover:bg-white dark:hover:bg-slate-700 rounded font-medium"
            title="Metni Büyüt"
          >
            A+
          </button>
        </div>

        {/* Karanlık Mod Değiştirici */}
        <button
          type="button"
          onClick={toggleKaranlikMod}
          className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
          title="Tema Değiştir"
        >
          {karanlikMod ? "🌙" : "☀️"}
        </button>
      </div>
    </header>
  );
};