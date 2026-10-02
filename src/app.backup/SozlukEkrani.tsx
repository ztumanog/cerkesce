"use client";

import React, { useState, useEffect } from "react";

export default function SozlukEkrani() {
  const [isDark, setIsDark] = useState(false);
  const [fontBoyutu, setFontBoyutu] = useState<"sm" | "base" | "lg">("base");

  // Tema state'i DOM'a uygula
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  // Font class seçimi
  const fontClass =
    fontBoyutu === "sm"
      ? "text-sm"
      : fontBoyutu === "lg"
      ? "text-lg"
      : "text-base";

  return (
    <div className={fontClass}>
      <div className="flex gap-2 mb-4">
        <button onClick={() => setIsDark(!isDark)}>
          {isDark ? "🌙 Karanlık" : "☀️ Aydınlık"}
        </button>
        <button onClick={() => setFontBoyutu("sm")}>-A</button>
        <button onClick={() => setFontBoyutu("base")}>A</button>
        <button onClick={() => setFontBoyutu("lg")}>+A</button>
      </div>

      <div className="p-4 border rounded dark:bg-gray-800 dark:text-white">
        <p>Örnek kart içeriği (font ve tema state ile değişir)</p>
      </div>
    </div>
  );
}
