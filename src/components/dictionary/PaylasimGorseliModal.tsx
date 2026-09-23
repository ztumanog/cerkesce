'use client';

import React, { useState, useEffect } from 'react';
import { X, Share2, Download, Copy, Square, Smartphone } from 'lucide-react';
import {
  olusturPaylasimGorseli,
  indirBlob,
  type PaylasimGorseliOptions,
} from '@/lib/paylasimGorseli';
import { Share } from '@capacitor/share';
import { Capacitor } from '@capacitor/core';
import { toast } from 'sonner';

interface PaylasimGorseliModalProps {
  isOpen: boolean;
  onClose: () => void;
  kelime: PaylasimGorseliOptions;
}

export default function PaylasimGorseliModal({
  isOpen,
  onClose,
  kelime,
}: PaylasimGorseliModalProps) {
  const [boyut, setBoyut] = useState<'kare' | 'story'>('kare');
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [shareLoading, setShareLoading] = useState(false);
  const [indirLoading, setIndirLoading] = useState(false);

  // Önizleme oluştur
  useEffect(() => {
    if (!isOpen) return;

    let cancelled = false;
    setLoading(true);

    olusturPaylasimGorseli({ ...kelime, boyut })
      .then((blob) => {
        if (cancelled) return;
        const url = URL.createObjectURL(blob);
        setPreviewUrl((old) => {
          if (old) URL.revokeObjectURL(old);
          return url;
        });
        setLoading(false);
      })
      .catch((err) => {
        if (cancelled) return;
        console.error('Görsel oluşturma hatası:', err);
        toast.error('Görsel oluşturulamadı');
        setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [isOpen, boyut, kelime]);

  useEffect(() => {
    if (!isOpen && previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }
  }, [isOpen, previewUrl]);

  if (!isOpen) return null;

  // ═══════════════════════════════════════════════════════════
  // 1. PAYLAŞ (Capacitor Share - Android/iOS + Web Share API)
  // ═══════════════════════════════════════════════════════════
  const handlePaylas = async () => {
    setShareLoading(true);
    try {
      const blob = await olusturPaylasimGorseli({ ...kelime, boyut });
      const dosyaAdi = `gunun-kelimesi-${kelime.kelime}-${boyut}.png`;

      // ═══ ANDROID / iOS: Capacitor Share ═══
      if (Capacitor.isNativePlatform()) {
        const base64 = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result as string);
          reader.onerror = reject;
          reader.readAsDataURL(blob);
        });
        const base64Data = base64.split(',')[1];

        const { Filesystem, Directory } = await import('@capacitor/filesystem');
        const sonuc = await Filesystem.writeFile({
          path: dosyaAdi,
          data: base64Data,
          directory: Directory.Cache,
          recursive: true,
        });

        await Share.share({
          title: 'Günün Kelimesi',
          text: `${kelime.kelime} — ${kelime.anlam}\n\n🔗 acikmektep.com`,
          url: sonuc.uri,
          dialogTitle: 'Paylaş',
        });

        return;
      }

      // ═══ WEB: Web Share API ═══
      if (
        typeof navigator === 'undefined' ||
        !navigator.share ||
        !navigator.canShare
      ) {
        toast.error('Paylaşım desteklenmiyor');
        return;
      }

      const file = new File([blob], dosyaAdi, { type: 'image/png' });

      if (!navigator.canShare({ files: [file] })) {
        toast.error('Dosya paylaşımı desteklenmiyor');
        return;
      }

      await navigator.share({
        files: [file],
        title: 'Günün Kelimesi',
        text: `${kelime.kelime} — ${kelime.anlam}\n\n🔗 acikmektep.com`,
      });
    } catch (err: any) {
      if (err?.name !== 'AbortError') {
        console.error('Paylaşım hatası:', err);
        toast.error('Paylaşım başarısız');
      }
    } finally {
      setShareLoading(false);
    }
  };

  // ═══════════════════════════════════════════════════════════
  // 2. İNDİR (Filesystem — Android/iOS + <a download> — Web)
  // ═══════════════════════════════════════════════════════════
  const handleIndir = async () => {
    setIndirLoading(true);
    try {
      const blob = await olusturPaylasimGorseli({ ...kelime, boyut });
      const dosyaAdi = `gunun-kelimesi-${kelime.kelime}-${boyut}.png`;
      await indirBlob(blob, dosyaAdi);

      if (Capacitor.isNativePlatform()) {
        toast.success('Görsel indirildi: Documents/ klasörü');
      } else {
        toast.success('Görsel indirildi');
      }
    } catch (err) {
      console.error('İndirme hatası:', err);
      toast.error('İndirme başarısız');
    } finally {
      setIndirLoading(false);
    }
  };

  // ═══════════════════════════════════════════════════════════
  // 3. METNİ KOPYALA
  // ═══════════════════════════════════════════════════════════
  const handleMetniKopyala = async () => {
    const metin = [
      '🎓 Açık Mektep Çerkesçe Sözlük',
      '',
      `📖 ${kelime.kelime}`,
      `🇹🇷 ${kelime.anlam}`,
      kelime.ornekler && kelime.ornekler.length > 0
        ? `\n💬 Örnekler:\n${kelime.ornekler.map((o) => `  • ${o}`).join('\n')}`
        : '',
      '',
      '🔗 acikmektep.com',
    ]
      .filter(Boolean)
      .join('\n');

    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(metin);
        toast.success('Metin kopyalandı');
      } else {
        toast.error('Kopyalama desteklenmiyor');
      }
    } catch {
      toast.error('Kopyalama başarısız');
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="paylasim-modal-title"
      className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md bg-slate-900 rounded-2xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* BAŞLIK */}
        <div className="flex items-center justify-between p-4 border-b border-slate-700">
          <h2 id="paylasim-modal-title" className="text-lg font-bold text-white">
            📷 Paylaşım Görseli
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Kapat"
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* BOYUT SEÇİMİ */}
        <div className="flex gap-2 p-4 border-b border-slate-700">
          <button
            type="button"
            onClick={() => setBoyut('kare')}
            className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-semibold transition-colors ${
              boyut === 'kare'
                ? 'bg-indigo-600 text-white'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <Square size={14} />
            Kare
          </button>
          <button
            type="button"
            onClick={() => setBoyut('story')}
            className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-semibold transition-colors ${
              boyut === 'story'
                ? 'bg-indigo-600 text-white'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <Smartphone size={14} />
            Story
          </button>
        </div>

        {/* ÖNİZLEME */}
        <div className="p-4 bg-slate-950">
          <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-slate-800 flex items-center justify-center">
            {loading ? (
              <div className="text-slate-400 text-sm">Oluşturuluyor...</div>
            ) : previewUrl ? (
              <img
                src={previewUrl}
                alt="Paylaşım görseli önizleme"
                className="w-full h-full object-contain"
              />
            ) : (
              <div className="text-slate-400 text-sm">Önizleme yok</div>
            )}
          </div>
        </div>

        {/* BUTONLAR */}
        <div className="p-4 space-y-2 border-t border-slate-700">
          <button
            type="button"
            onClick={handlePaylas}
            disabled={loading || shareLoading || !previewUrl}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-emerald-600 text-white text-sm font-semibold hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Share2 size={16} />
            {shareLoading ? 'Paylaşılıyor...' : 'Paylaş'}
          </button>

          <button
            type="button"
            onClick={handleIndir}
            disabled={loading || indirLoading || !previewUrl}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Download size={16} />
            {indirLoading ? 'İndiriliyor...' : 'İndir'}
          </button>

          <button
            type="button"
            onClick={handleMetniKopyala}
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-slate-800 text-slate-200 text-sm font-semibold hover:bg-slate-700 disabled:opacity-50 transition-colors"
          >
            <Copy size={16} />
            Metni Kopyala
          </button>
        </div>

        {/* BİLGİ */}
        <div className="px-4 pb-4 text-center space-y-1">
          <p className="text-[11px] text-slate-500">
            📱 <strong>Paylaş:</strong> WhatsApp, Telegram, Instagram...
          </p>
          <p className="text-[11px] text-slate-500">
            💾 <strong>İndir:</strong> Documents/ klasörüne kaydeder
          </p>
        </div>
      </div>
    </div>
  );
}