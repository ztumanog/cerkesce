import React from 'react';
import { z } from 'zod';

// -----------------------------------------------------------------------------
// 1. ZOD SCHEMA & TYPES (Strict Data Validation)
// -----------------------------------------------------------------------------

export const LehceEnum = z.enum(['Adigece', 'Kabardeyce', 'Abzahce', 'Sapsugca']);
export type Lehce = z.infer<typeof LehceEnum>;

export const KelimeMetaSchema = z.object({
  etimoloji: z.string().optional(),
  kokKelime: z.string().optional(),
  ornekCumle: z.string().optional(),
  ornekCumleCeviri: z.string().optional(),
  sesDosyasiUrl: z.string().url().optional(),
});

export type KelimeMeta = z.infer<typeof KelimeMetaSchema>;

export const GununKelimesiSchema = z.object({
  id: z.string().uuid(),
  kelime: z.string().min(1),
  anlam: z.string().min(1),
  lehce: LehceEnum,
  tarih: z.string(),
  meta: KelimeMetaSchema.optional(),
});

export type GununKelimesi = z.infer<typeof GununKelimesiSchema>;

interface GununKelimesiKartProps {
  readonly veri: GununKelimesi;
  readonly seciliLehce?: Lehce;
  readonly className?: string;
}

// -----------------------------------------------------------------------------
// 2. SERVER / CLIENT HELPER COMPONENT (React 19 & Next.js 16 Ready)
// -----------------------------------------------------------------------------

export function GununKelimesiKart({
  veri,
  seciliLehce,
  className = '',
}: GununKelimesiKartProps) {
  // Safe Parse & Fallback
  const parsedData = GununKelimesiSchema.safeParse(veri);

  if (!parsedData.success) {
    return (
      <div 
        role="alert" 
        className="p-4 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm"
      >
        Kelime verisi doğrulanırken bir hata oluştu.
      </div>
    );
  }

  const { kelime, anlam, lehce, meta } = parsedData.data;
  const metaObj: KelimeMeta = meta ?? {};
  const aktifLehce: Lehce = seciliLehce ?? lehce;

  return (
    <article
      aria-labelledby="gunun-kelimesi-baslik"
      className={`p-6 rounded-2xl bg-white border border-slate-200 shadow-sm transition-all hover:shadow-md ${className}`}
    >
      <header className="flex justify-between items-center mb-4">
        <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">
          Günün Kelimesi
        </span>
        <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md">
          {aktifLehce}
        </span>
      </header>

      <div className="space-y-2 mb-4">
        <h3 id="gunun-kelimesi-baslik" className="text-2xl font-bold text-slate-900">
          {kelime}
        </h3>
        <p className="text-base text-slate-600 leading-relaxed">
          {anlam}
        </p>
      </div>

      {metaObj.ornekCumle && (
        <figure className="mt-4 pt-4 border-t border-slate-100 bg-slate-50/50 p-3 rounded-xl">
          <blockquote className="text-sm font-medium text-slate-800 italic">
            &ldquo;{metaObj.ornekCumle}&rdquo;
          </blockquote>
          {metaObj.ornekCumleCeviri && (
            <figcaption className="text-xs text-slate-500 mt-1">
              {metaObj.ornekCumleCeviri}
            </figcaption>
          )}
        </figure>
      )}

      {metaObj.etimoloji && (
        <footer className="mt-4 text-xs text-slate-400">
          <span>Etimoloji: </span>
          <span className="text-slate-600 font-medium">{metaObj.etimoloji}</span>
        </footer>
      )}
    </article>
  );
}