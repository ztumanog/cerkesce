'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { DiscoveryRelationType } from '@/domain/discovery/types/DiscoveryRelationType';
import { RelationFilterBar } from '@/ui/components/discovery/RelationFilterBar';

const RELATION_BADGE_TR: Record<string, string> = {
  ROOT: 'KÖK',
  CHILD: 'KELİME AİLESİ',
  DIALECT_VARIANT: 'LEHÇE VARYANTI',
  SYNONYM: 'EŞ ANLAM',
  RELATED: 'KAVRAM',
};

function circassianOf(item: any): string {
  if (item?.circassian) return String(item.circassian);
  if (typeof item?.subtitle === 'string' && item.subtitle.includes('·')) {
    return item.subtitle.split('·').slice(1).join('·').trim();
  }
  return String(item?.targetConcept || '');
}
function turkishOf(item: any): string {
  if (item?.turkishLabel) return String(item.turkishLabel);
  if (typeof item?.subtitle === 'string' && item.subtitle.includes('·')) {
    return item.subtitle.split('·')[0].trim();
  }
  return String(item?.relationType || '');
}
function codeOf(item: any): string {
  return String(item?.code || item?.targetConcept || '');
}
function latinOf(item: any): string {
  return String(item?.ipa || item?.latin || '').trim();
}

export default function ExplorerPage() {
  const [query, setQuery] = useState<string>('псы');
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedTypes, setSelectedTypes] = useState<DiscoveryRelationType[]>([
    DiscoveryRelationType.ROOT,
    DiscoveryRelationType.SYNONYM,
    DiscoveryRelationType.DIALECT_VARIANT,
    DiscoveryRelationType.CHILD,
    DiscoveryRelationType.RELATED,
  ]);

  const fetchDiscovery = (q: string) => {
    setLoading(true);
    fetch(`/api/discovery/search?q=${encodeURIComponent(q)}`)
      .then((r) => r.json())
      .then((res) => setItems(res.items || []))
      .catch((err) => console.error('Discovery API hatası:', err))
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchDiscovery('псы'); }, []);

  const filteredItems = items.filter((item) => selectedTypes.includes(item.relationType));

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Kavram ve Anlamsal Ağ Kaşifi</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Kök (Root), Kelime Ailesi (Family), Lehçe Varyantı ve Kavram (Concept) ağını canlı veriden keşfedin.
        </p>
      </div>

      <form onSubmit={(e) => { e.preventDefault(); fetchDiscovery(query); }} className="flex gap-2">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Çerkesçe kelime, Latin yazım veya Türkçe anlam girin (örn. псы, su, нэ)..."
          className="flex-1 px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm"
        />
        <button
          type="submit"
          className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold transition"
        >
          Ağı Keşfet
        </button>
      </form>

      <RelationFilterBar selectedTypes={selectedTypes} onChange={setSelectedTypes} />

      {loading ? (
        <div className="py-10 text-center text-sm text-slate-500">Anlamsal ilişkiler taranıyor...</div>
      ) : filteredItems.length === 0 ? (
        <div className="py-10 text-center text-sm text-slate-500">Bu sorgu ve filtreler için ilişki bulunamadı.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredItems.map((item, idx) => {
            const circassian = circassianOf(item);
            const turkish = turkishOf(item);
            const code = codeOf(item);
            const latin = latinOf(item);
            const badgeLabel = RELATION_BADGE_TR[item.relationType] || item.relationType;
            return (
              <Link
                key={`${item.targetId}-${idx}`}
                href={item.href || '#'}
                className="p-5 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-emerald-500 hover:shadow-lg hover:shadow-emerald-500/10 transition flex flex-col gap-2 min-h-[140px]"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                    {badgeLabel} {code ? `· ${code}` : ''}
                  </span>
                  <span className="text-xs font-mono px-2 py-1 rounded bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 shrink-0">
                    %{Math.round((item.score || 0.85) * 100)}
                  </span>
                </div>
                <div className="text-2xl leading-tight font-bold text-slate-900 dark:text-white break-words">
                  {circassian}
                </div>
                {latin && (
                  <div className="text-sm text-slate-500 dark:text-slate-400 italic break-words">{latin}</div>
                )}
                <div className="text-xs text-slate-500 dark:text-slate-400 mt-auto pt-1 border-t border-slate-100 dark:border-slate-700/60">
                  {turkish}{code ? ` · ${code}` : ''}
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
