'use client';

import { createContext, useContext, useEffect, useState } from 'react';

type FontSize = 'sm' | 'md' | 'lg' | 'xl';
type LineHeight = 'tight' | 'normal' | 'loose';
type LetterSpacing = 'normal' | 'wide';
type Contrast = 'normal' | 'high';

interface Tercih {
  font: FontSize;
  line: LineHeight;
  letter: LetterSpacing;
  contrast: Contrast;
  setFont: (f: FontSize) => void;
  setLine: (l: LineHeight) => void;
  setLetter: (l: LetterSpacing) => void;
  setContrast: (c: Contrast) => void;
}

const Ctx = createContext<Tercih | null>(null);

export function TercihProvider({ children }: { children: React.ReactNode }) {
  const [font, setFont] = useState<FontSize>('md');
  const [line, setLine] = useState<LineHeight>('normal');
  const [letter, setLetter] = useState<LetterSpacing>('normal');
  const [contrast, setContrast] = useState<Contrast>('normal');

  // localStorage'dan oku
  useEffect(() => {
    const saved = localStorage.getItem('cerkesce-tercih');
    if (saved) {
      try {
        const p = JSON.parse(saved);
        setFont(p.font ?? 'md');
        setLine(p.line ?? 'normal');
        setLetter(p.letter ?? 'normal');
        setContrast(p.contrast ?? 'normal');
      } catch (e) {
        console.error('Tercih okunamadı:', e);
      }
    }
  }, []);

  // html attribute'larını güncelle ve kaydet
  useEffect(() => {
    document.documentElement.dataset.font = font;
    document.documentElement.dataset.line = line;
    document.documentElement.dataset.letter = letter;
    document.documentElement.dataset.contrast = contrast;
    localStorage.setItem('cerkesce-tercih', JSON.stringify({ font, line, letter, contrast }));
  }, [font, line, letter, contrast]);

  return (
    <Ctx.Provider value={{ font, line, letter, contrast, setFont, setLine, setLetter, setContrast }}>
      {children}
    </Ctx.Provider>
  );
}

export const useTercih = () => {
  const c = useContext(Ctx);
  if (!c) throw new Error('useTercih, TercihProvider içinde kullanılmalı');
  return c;
};