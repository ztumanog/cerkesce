"use client";

import React, { useEffect, useState } from "react";
import { Theme } from "@radix-ui/themes";

export default function SozlukLayout({ children }: { children: React.ReactNode }) {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const syncTheme = () => setIsDark(document.documentElement.classList.contains("dark"));
    syncTheme();
    const observer = new MutationObserver(syncTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  return (
    <Theme appearance={isDark ? "dark" : "light"} accentColor="indigo" grayColor="slate" radius="large">
      <div className={isDark ? "dark min-h-screen bg-slate-950 text-slate-100" : "min-h-screen bg-slate-50/60 text-slate-900"}>
        {children}
      </div>
    </Theme>
  );
}
