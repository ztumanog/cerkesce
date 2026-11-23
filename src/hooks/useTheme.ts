'use client';

/**
 * TEK TEMA OTORITESI (Parti 3-B).
 * Daha önce 3 yerde kopya vardı (Header, layout/Header, TemaBaslatici).
 * Artık tema değiştirme yalnızca bu hook üzerinden yapılır.
 *
 * - İlk değer DOM'dan okunur (TemaBaslatici mount'ta html.dark sınıfını
 *   localStorage / prefers-color-scheme'e göre zaten set etmiştir).
 * - Değişiklik html.dark sınıfını yazar ve localStorage'a kaydeder.
 * - Radix Theme görünümü köktteki ThemeSync bileşeni sınıfı izleyerek takip eder.
 */

import { useCallback, useEffect, useState } from 'react';

export type ThemeChoice = 'dark' | 'light';

export function useTheme() {
  const [theme, setThemeState] = useState<ThemeChoice>('dark');
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setThemeState(document.documentElement.classList.contains('dark') ? 'dark' : 'light');
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    document.documentElement.classList.toggle('dark', theme === 'dark');
    try {
      localStorage.setItem('theme', theme);
    } catch {
      // localStorage erişilemiyorsa sessizce geç (özel mod vb.)
    }
  }, [theme, ready]);

  const setTheme = useCallback((t: ThemeChoice) => setThemeState(t), []);
  const toggleTheme = useCallback(() => setThemeState((t) => (t === 'dark' ? 'light' : 'dark')), []);

  return { theme, setTheme, toggleTheme, ready };
}
