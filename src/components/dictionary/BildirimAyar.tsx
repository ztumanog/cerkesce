'use client';

import React from 'react';
import { Bell, BellOff, Clock } from 'lucide-react';
import { useBildirimler } from '@/hooks/useBildirimler';
import { toast } from 'sonner';

interface BildirimAyarProps {
  gununKelimesi: { kelime: string; anlam: string } | null;
}

export default function BildirimAyar({ gununKelimesi }: BildirimAyarProps) {
  const { ayar, yukleniyor, izinDurumu, bildirimAcKapat, saatDegistir } =
    useBildirimler(gununKelimesi);

  if (yukleniyor) {
    return (
      <div className="p-4 rounded-xl bg-white/60 dark:bg-slate-900/40 border border-indigo-200 dark:border-indigo-800 animate-pulse">
        <div className="h-6 bg-indigo-200 dark:bg-indigo-800 rounded w-1/3" />
      </div>
    );
  }

  const handleToggle = async () => {
    try {
      await bildirimAcKapat(!ayar.aktif);
      toast.success(ayar.aktif ? 'Bildirim kapatıldı' : 'Bildirim açıldı');
    } catch (err: any) {
      if (err?.message === 'İzin verilmedi') {
        toast.error('Bildirim izni verilmedi');
      } else {
        toast.error('Bildirim ayarlanamadı');
      }
    }
  };

  const handleSaatDegistir = async (yeniSaat: number) => {
    try {
      await saatDegistir(yeniSaat, ayar.dakika);
      toast.success(`Bildirim saati: ${yeniSaat}:00`);
    } catch {
      toast.error('Saat değiştirilemedi');
    }
  };

  return (
    <div className="p-4 rounded-xl bg-white/60 dark:bg-slate-900/40 border border-indigo-200 dark:border-indigo-800 space-y-3">
      {/* BAŞLIK + TOGGLE */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {ayar.aktif ? (
            <Bell size={18} className="text-indigo-600 dark:text-indigo-400" />
          ) : (
            <BellOff size={18} className="text-slate-400" />
          )}
          <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">
            🔔 Günlük Bildirim
          </span>
        </div>

        <button
          type="button"
          onClick={handleToggle}
          aria-label={ayar.aktif ? 'Bildirimi kapat' : 'Bildirimi aç'}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
            ayar.aktif ? 'bg-indigo-600' : 'bg-slate-300 dark:bg-slate-700'
          }`}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
              ayar.aktif ? 'translate-x-6' : 'translate-x-1'
            }`}
          />
        </button>
      </div>

      {/* AÇIKLAMA */}
      <p className="text-xs text-slate-500 dark:text-slate-400">
        {ayar.aktif
          ? `Her gün saat ${ayar.saat}:${String(ayar.dakika).padStart(2, '0')}'da günün kelimesi bildirimi alacaksınız.`
          : 'Günün kelimesini her gün hatırlatmak için bildirimi açın.'}
      </p>

      {/* SAAT SEÇİMİ */}
      {ayar.aktif && (
        <div className="flex items-center gap-2 pt-2 border-t border-indigo-100 dark:border-indigo-900/50">
          <Clock size={14} className="text-indigo-500 dark:text-indigo-400" />
          <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">
            Saat:
          </span>
          <select
            value={ayar.saat}
            onChange={(e) => handleSaatDegistir(Number(e.target.value))}
            className="px-2 py-1 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100"
          >
            {Array.from({ length: 24 }, (_, i) => (
              <option key={i} value={i}>
                {String(i).padStart(2, '0')}:00
              </option>
            ))}
          </select>
        </div>
      )}

      {/* İZİN DURUMU */}
      {izinDurumu === 'denied' && (
        <p className="text-xs text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/30 p-2 rounded border border-rose-200 dark:border-rose-800">
          ⚠️ Bildirim izni verilmedi. Ayarlardan izin verebilirsiniz.
        </p>
      )}
    </div>
  );
}