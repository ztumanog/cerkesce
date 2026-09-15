'use client';

import { useState, useCallback } from 'react';
import SearchBox from '@/components/dictionary/SearchBox';
import KelimeKarti from '@/components/dictionary/KelimeKarti';
import KelimeDetayDrawer from '@/components/ui/KelimeDetayDrawer';
import GununKelimesiKart from '@/components/dictionary/GununKelimesiKart';
import type { KelimeItem } from '@/types/dictionary';

export default function SozlukEkrani() {
  const [sonuclar, setSonuclar] = useState<KelimeItem[]>([]);
  const [yukleniyor, setYukleniyor] = useState(false);
  const [toplam, setToplam] = useState(0);
  const [seciliKelime, setSeciliKelime] = useState<KelimeItem | null>(null);
  const [drawerAcik, setDrawerAcik] = useState(false);
  const [aramaMetni, setAramaMetni] = useState('');
  const [tumunuGoster, setTumunuGoster] = useState(false);

  const handleKelimeSec = (kelime: KelimeItem) => {
    setSeciliKelime(kelime);
    setDrawerAcik(true);
  };

  const handleResults = useCallback((
    results: KelimeItem[],
    total: number,
    loading: boolean
  ) => {
    setSonuclar(results);
    setYukleniyor(loading);
    setToplam(total);
    setAramaMetni(results.length > 0 || loading ? 'arama' : '');
    setTumunuGoster(false);
  }, []);

  const bosArama = sonuclar.length === 0 && !aramaMetni && !yukleniyor;

  const goruntulenenSonuclar = tumunuGoster ? sonuclar : sonuclar.slice(0, 3);
  const dahahazaSonucVarmi = sonuclar.length > 3 && !tumunuGoster;

  return (
    <div className="w-full flex-1 bg-[#fbf8ef] dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors duration-200">
      <div className="max-w-4xl mx-auto px-3 py-3 space-y-3">
        {/* ARAMA KUTUSU */}
        <div className="bg-white/90 dark:bg-slate-900 border border-stone-200 dark:border-slate-800 rounded-2xl shadow-sm p-3.5 sm:p-4">
          <SearchBox onResults={handleResults} />
        </div>

        {/* GÜNÜN KELİMESİ */}
        {bosArama && (
          <div className="animate-in fade-in duration-300">
            <GununKelimesiKart />
          </div>
        )}

        {/* YÜKLENİYOR */}
        {yukleniyor && (
          <div className="flex justify-center items-center py-6">
            <div className="flex flex-col items-center gap-2">
              <div className="relative w-8 h-8">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full animate-spin" />
                <div className="absolute inset-1 bg-[#fbf8ef] dark:bg-slate-950 rounded-full" />
              </div>
              <p className="text-xs text-stone-600 dark:text-slate-400 font-medium">
                Aranıyor...
              </p>
            </div>
          </div>
        )}

        {/* SONUÇ SAYISI */}
        {sonuclar.length > 0 && (
          <div className="flex items-center justify-between px-1">
            <h2 className="text-xs sm:text-sm font-bold text-stone-800 dark:text-slate-200">
              📚 Sonuçlar
              <span className="ml-1.5 text-emerald-700 dark:text-emerald-400 font-medium">
                ({toplam} bulundu)
              </span>
            </h2>
          </div>
        )}

        {/* SONUÇ LİSTESİ */}
        <div className="space-y-2">
          {goruntulenenSonuclar.map((kelime) => (
            <KelimeKarti
              key={kelime.id ?? kelime.kelime}
              data={kelime}
              onClick={() => handleKelimeSec(kelime)}
            />
          ))}
        </div>

        {/* TÜM SONUÇLARI GÖSTER BUTONU */}
        {dahahazaSonucVarmi && (
          <div className="flex justify-center pt-1">
            <button
              onClick={() => setTumunuGoster(true)}
              className="px-4 py-2 text-xs bg-emerald-700 hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-700 text-white font-medium rounded-lg transition-colors shadow-sm"
            >
              📂 Tüm Sonuçları Göster ({sonuclar.length - 3} daha)
            </button>
          </div>
        )}

        {/* SONUÇ YOK */}
        {!yukleniyor && aramaMetni && sonuclar.length === 0 && (
          <div className="text-center py-8 bg-white/50 dark:bg-slate-900/50 rounded-xl border border-stone-200/60 dark:border-slate-800">
            <div className="text-3xl mb-2">🔍</div>
            <h3 className="text-sm font-semibold text-stone-800 dark:text-slate-200 mb-1">
              Sonuç bulunamadı
            </h3>
            <p className="text-xs text-stone-500 dark:text-slate-400">
              Lütfen arama terimini kontrol edin ve tekrar deneyin.
            </p>
          </div>
        )}

        {/* DRAWER */}
        <KelimeDetayDrawer
          isOpen={drawerAcik}
          onClose={() => setDrawerAcik(false)}
          seciliKelime={seciliKelime}
        />
      </div>
    </div>
  );
}