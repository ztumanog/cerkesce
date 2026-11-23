import React from "react";

/**
 * Parti 3-B: Bölgesel MutationObserver + Theme sarmalayıcısı kaldırıldı.
 * Radix appearance artık kökteki ThemeSync'ten miras alınır;
 * karanlık mod html.dark sınıfıyla Tailwind dark: değişkenlerinden gelir.
 */
export default function SozlukLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen bg-slate-50/60 dark:bg-slate-950 dark:text-slate-100">{children}</div>;
}
