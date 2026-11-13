'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { DiscoveryRelationType } from '@/domain/discovery/types/DiscoveryRelationType';
import { RelationFilterBar } from '@/ui/components/discovery/RelationFilterBar';

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

  useEffect(() => {
    fetchDiscovery('псы');
  }, []);

  const filteredItems = items.filter((item) => selectedTypes.includes(item.relationType));

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Kavram ve Anlamsal Ağ Kaşifi</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Kök (Root), Kelime Ailesi (Family), Lehçe Varyantı ve Kavram (Concept) ağını canlı veriden keşfedin.
        </p>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          fetchDiscovery(query);
        }}
        className="flex gap-2"
      >
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {filteredItems.map((item) => (
            <Link
              key={item.targetId}
              href={item.href || '#'}
              className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-emerald-500 transition flex items-center justify-between gap-3"
            >
              <div>
                <div className="text-[11px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                  {item.relationType}
                </div>
                <div className="font-bold text-base text-slate-900 dark:text-white mt-0.5">
                  {item.targetConcept}
                </div>
                {item.subtitle && (
                  <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{item.subtitle}</div>
                )}
              </div>
              <span className="text-xs font-mono px-2 py-1 rounded bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
                %{Math.round((item.score || 0.85) * 100)}
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
