'use client';

import React, { useState, useEffect } from 'react';
import { X, Download, Share2, Square, Smartphone } from 'lucide-react';
import {
  olusturPaylasimGorseli,
  indirBlob,
  type PaylasimGorseliOptions,
} from '@/lib/paylasimGorseli';
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

  const handleIndir = async () => {
    try {
      const blob = await olusturPaylasimGorseli({ ...kelime, boyut });
      const dosyaAdi = `gunun-kelimesi-${kelime.kelime}-${boyut}.png`;
      indirBlob(blob, dosyaAdi);
      toast.success('Görsel indirildi');
    } catch {
      toast.error('İndirme başarısız');
    }
  };

  const handlePaylas = async () => {
    if (typeof navigator === 'undefined' || !navigator.share) {
      toast.error('Paylaşım desteklenmiyor');
      return;
    }
    try {
      const blob = await olusturPaylasimGorseli({ ...kelime, boyut });
      const file = new File([blob], `gunun-kelimesi-${kelime.kelime}.png`, {
        type: 'image/png',
      });

      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: 'Günün Kelimesi',
          text: `${kelime.kelime} — ${kelime.anlam}`,
        });
      } else {
        toast.error('Dosya paylaşımı desteklenmiyor');
      }
    } catch (err: any) {
      if (err?.name !== 'AbortError') {
        console.error('Paylaşım hatası:', err);
      }
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
          <h2
            id="paylasim-modal-title"
            className="text-lg font-bold text-white"
          >
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
            Kare (1080×1080)
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
            Story (1080×1920)
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
        <div className="p-4 flex gap-2 border-t border-slate-700">
          <button
            type="button"
            onClick={handleIndir}
            disabled={loading || !previewUrl}
            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-lg bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Download size={16} />
            İndir
          </button>
          <button
            type="button"
            onClick={handlePaylas}
            disabled={loading || !previewUrl}
            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-lg bg-emerald-600 text-white text-sm font-semibold hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Share2 size={16} />
            Paylaş
          </button>
        </div>
      </div>
    </div>
  );
}