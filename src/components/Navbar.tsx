"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const handleEnter = () => {
    if (closeTimerRef.current) { clearTimeout(closeTimerRef.current); closeTimerRef.current = null; }
    setOpen(true);
  };
  const handleLeave = () => {
    closeTimerRef.current = setTimeout(() => { setOpen(false); }, 160);
  };
  const isSozlukGroup = pathname === "/sozluk" || pathname?.startsWith("/kavram") || pathname?.startsWith("/explorer") || pathname?.startsWith("/sozluk/favoriler") || pathname?.startsWith("/favoriler");
  const topLink = "hover:text-emerald-400 transition-colors";
  const itemCls = "flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-gray-100 outline-none transition-colors hover:bg-gray-800 hover:text-emerald-400 focus:bg-gray-800 focus:text-emerald-400";
  return (
    <nav className="bg-gray-900 text-white p-4 border-b border-gray-800">
      <div className="container mx-auto flex flex-wrap gap-6 items-center text-sm font-medium">
        <Link href="/sozluk" className="font-bold text-lg hover:text-emerald-400 transition-colors mr-4">Çerkesçe Sözlük</Link>
        <div onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
          <DropdownMenu.Root modal={false} open={open} onOpenChange={setOpen}>
            <DropdownMenu.Trigger asChild>
              <button type="button" aria-label="Sözlük menüsünü aç" className={`inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 outline-none select-none transition-colors hover:bg-gray-800 hover:text-emerald-400 ${isSozlukGroup ? "bg-gray-800/70 text-emerald-400" : ""}`}>
                <span>Sözlük</span><span aria-hidden="true">▾</span>
              </button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Portal>
              <DropdownMenu.Content align="start" sideOffset={6} onMouseEnter={handleEnter} onMouseLeave={handleLeave} onCloseAutoFocus={(e) => e.preventDefault()} className="z-50 min-w- rounded-xl border border-gray-800 bg-gray-900 p-1.5 text-sm text-gray-100 shadow-xl shadow-black/40">
                <DropdownMenu.Item asChild onSelect={() => setOpen(false)}><Link href="/sozluk" className={itemCls}>Sözlük Arama</Link></DropdownMenu.Item>
                <DropdownMenu.Separator className="my-1 h-px bg-gray-800" />
                <DropdownMenu.Item asChild onSelect={() => setOpen(false)}><Link href="/kavramlar" className={itemCls}>Kavramlar</Link></DropdownMenu.Item>
                <DropdownMenu.Item asChild onSelect={() => setOpen(false)}><Link href="/explorer" className={itemCls}>Keşfet (Kavram Ağı)</Link></DropdownMenu.Item>
                <DropdownMenu.Item asChild onSelect={() => setOpen(false)}><Link href="/sozluk/favoriler" className={itemCls}>Favoriler</Link></DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu.Portal>
          </DropdownMenu.Root>
        </div>
        <Link href="/sozluk/morphology" className={`${topLink} ${pathname?.startsWith("/sozluk/morphology") ? "text-emerald-400" : ""}`}>Morfoloji</Link>
        <Link href="/sozluk/converter" className={`${topLink} ${pathname?.startsWith("/sozluk/converter") ? "text-emerald-400" : ""}`}>Converter</Link>
        <Link href="/yonetim" className={`${topLink} ${pathname?.startsWith("/yonetim") || pathname?.startsWith("/admin") ? "text-emerald-400" : ""}`}>Yönetim</Link>
      </div>
    </nav>
  );
}
