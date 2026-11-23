import React from "react";

/**
 * Parti 3-B: Bölgesel MutationObserver + Theme sarmalayıcısı kaldırıldı
 * (ayrıca kökte zaten import edilen @radix-ui/themes/styles.css'in mükerrer
 * import'u da temizlendi). Radix appearance kökteki ThemeSync'ten miras alınır.
 */
export default function KavramlarLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen bg-slate-50 dark:bg-slate-950 dark:text-slate-100">{children}</div>;
}
