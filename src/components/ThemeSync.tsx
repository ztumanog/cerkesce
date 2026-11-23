'use client';

/**
 * KÖK TEMA SENKRONU (Parti 3-B).
 * html.dark sınıfını izler ve Radix Theme appearance'ı günceller.
 * Bu, bölgesel layout'larda (sozluk/lexeme/kavramlar) tekrarlanan
 * MutationObserver kalıbının tek ve kök seviyedeki halidir.
 * Bileşenler artık appearance'ı buradan miras alır; sabitlemek yasak.
 */

import { useEffect, useState } from 'react';
import { Theme } from '@radix-ui/themes';

export function ThemeSync({ children }: { children: React.ReactNode }) {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const sync = () => setIsDark(document.documentElement.classList.contains('dark'));
    sync();
    const observer = new MutationObserver(sync);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  return (
    <Theme appearance={isDark ? 'dark' : 'light'} accentColor="indigo" grayColor="slate" radius="large">
      {children}
    </Theme>
  );
}
