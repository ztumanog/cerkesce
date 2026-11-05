import React from 'react';
import { BookOpen } from 'lucide-react';

type Kart = { href: string; baslik: string; aciklama: string };

const sozlukKartlari: Kart[] = [
  { href: '/sozluk', baslik: 'Sözlük', aciklama: 'Arama ve kelime kartları' },
  { href: '/admin/curation/roots', baslik: 'Kökler', aciklama: 'Kök (root) listesi ve detayları' },
  { href: '/sozluk/family', baslik: 'Kelime Aileleri', aciklama: 'Semantik kelime aileleri' },
  { href: '/kavram', baslik: 'Kavramlar', aciklama: 'Kavram portalı (kavram/[concept])' },
  { href: '/sozluk/favoriler', baslik: 'Favoriler', aciklama: 'Favori kelimeler' },
  { href: '/sozluk/morphology', baslik: 'Morfoloji', aciklama: 'Kök, ek ve çekim analizi' },
  { href: '/sozluk/converter', baslik: 'Alfabe dönüştürücü', aciklama: 'Kiril ↔ Latin' },
  { href: '/kaynaklar', baslik: 'Kaynaklar', aciklama: 'Sözlük kaynakları' },
];

export default function SozlukBolumu() {
  return (
    <section className="mt-8">
      <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-slate-700">
        <BookOpen className="h-5 w-5 text-slate-500" />
        Sözlük
      </h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {sozlukKartlari.map((k) => (
          <a key={k.href} href={k.href} className="rounded-xl border border-slate-200 bg-white p-5 transition-colors hover:border-emerald-500 hover:shadow-sm">
            <h3 className="text-base font-semibold text-slate-900">{k.baslik}</h3>
            <p className="mt-1 text-sm text-slate-500">{k.aciklama}</p>
            <p className="mt-3 font-mono text-xs text-slate-400">{k.href}</p>
          </a>
        ))}
      </div>
    </section>
  );
}
