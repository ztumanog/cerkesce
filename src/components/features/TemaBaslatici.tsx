'use client';

import { useEffect } from 'react';

export function TemaBaslatici() {
  useEffect(() => {
    try {
      // Tema
      var theme = localStorage.getItem('theme');
      if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }

      // Erişilebilirlik tercihleri
      var tercih = localStorage.getItem('cerkesce-tercih');
      if (tercih) {
        try {
          var p = JSON.parse(tercih);
          if (p.font) document.documentElement.dataset.font = p.font;
          if (p.line) document.documentElement.dataset.line = p.line;
          if (p.letter) document.documentElement.dataset.letter = p.letter;
          if (p.contrast) document.documentElement.dataset.contrast = p.contrast;
        } catch (e) {}
      }
    } catch (e) {}
  }, []);

  return null;
}
