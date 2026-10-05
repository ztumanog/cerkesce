'use client';

import React, { useState } from 'react';
import {
  ChevronRight, ChevronDown, Zap, X, Copy, Volume2, Share2, Check,
  Users, Globe, Sun, Moon, Type, Quote, BookOpen, Languages, Star, Info,
} from 'lucide-react';

/* ══════════════════════ MOCK DATA ══════════════════════ */

const WORD = {
  word: 'псынэ', pos: 'NOUN', ipa: '/psəna/', freq: 78,
  root: 'R-PSY', family: 'WF-PSY', concept: 'WELL',
  variants: { ady: 'псынэ', kbd: 'псынэ' },
};

const FAMILY = [
  'псы', 'псыхъуэ', 'псыкӀэ', 'псышхуэ', 'псыежэх', 'псыдзэ', 'псыщхьэ',
  'псылъэ', 'псыхьэ', 'псыкуу', 'псынащхьэ', 'псыхэлъ', 'псыгуэн',
  'псыкъуий', 'псыжь', 'псыдэкӀ', 'псыбэ', 'псыкъабзэ', 'псыщӀагъ', 'псыгъуэ',
];

type Src = {
  id: string; author: string; title: string; year: string;
  src: string; trg: string; meanings: string[]; example?: string;
};

type LangRow = {
  key: string; flag: string; label: string;
  native?: boolean;
  note?: string;
  equivalents: string[];
  sources: Src[];
};

const LANGS: LangRow[] = [
  {
    key: 'CIRC', flag: '🏳️', label: 'Çerkesçe', native: true,
    note: 'Tek dilli (açıklamalı) sözlükler',
    equivalents: ['псы чӀэдзапӀэ', 'псы къыщӀэжыпӀэ', 'псы щӀэлъ чӀыпӀэ'],
    sources: [
      { id: 'c1', author: 'Aig', title: 'Адыгабзэм изэхэф гущыӀалъ', year: '2006', src: 'ADY', trg: 'ADY', meanings: ['псы чӀэдзапӀэ', 'псы къыщӀэжыпӀэ чӀыпӀ'], example: 'псынэм псы къыщӀэж — kuyudan su çıkıyor' },
      { id: 'c2', author: 'Z. Kereşe', title: 'Адыгабзэ гурыӀу гущыӀалъ', year: '2018', src: 'ADY', trg: 'ADY', meanings: ['псы щӀэлъ чӀыпӀэ'] },
      { id: 'c3', author: 'Б. Бижоев', title: 'Къэбэрдей-шэрджэсыбзэм и псалъалъэ', year: '1999', src: 'KBD', trg: 'KBD', meanings: ['псы къыщӀэж щӀыпӀэ', 'псы щӀэлъ къуий'], example: 'псынэ къабзэ — temiz kuyu' },
      { id: 'c4', author: 'А. Апажев', title: 'Адыгэбзэм и псалъалъэ', year: '2011', src: 'KBD', trg: 'KBD', meanings: ['щӀым къыщӀэж псы'] },
    ],
  },
  {
    key: 'TR', flag: '🇹🇷', label: 'Türkçe',
    equivalents: ['kuyu', 'kaynak', 'pınar', 'çeşme'],
    sources: [
      { id: '01', author: 'Ȿ. Kuşha', title: 'Kabardey–Türkçe Sözlük', year: '1998', src: 'KBD', trg: 'TR', meanings: ['kuyu', 'kaynak'], example: 'Псынэ псы — kuyu suyu' },
      { id: '02', author: 'B. Yedic', title: 'Adıgece–Türkçe Sözlük', year: '2011', src: 'ADY', trg: 'TR', meanings: ['pınar', 'kaynak'] },
      { id: '03', author: 'Ö. Özbay', title: 'Çerkes Sözlüğü', year: '2004', src: 'KBD', trg: 'TR', meanings: ['çeşme', 'kuyu'] },
      { id: '04', author: 'A. Tsey', title: 'Türkçe Karşılıklar Dizini', year: '2019', src: 'ADY', trg: 'TR', meanings: ['su kaynağı'] },
    ],
  },
  {
    key: 'EN', flag: '🇬🇧', label: 'İngilizce',
    equivalents: ['well', 'spring', 'water source'],
    sources: [
      { id: '05', author: 'J. Colarusso', title: 'Adyghe–English Dictionary', year: '2006', src: 'ADY', trg: 'EN', meanings: ['well', 'spring'], example: 'psəna — a water well' },
      { id: '06', author: 'T. Yamisha', title: 'Kabardian–English', year: '2023', src: 'KBD', trg: 'EN', meanings: ['well'] },
      { id: '07', author: 'A. Kuipers', title: 'Circassian Lexicon', year: '1975', src: 'KBD', trg: 'EN', meanings: ['spring', 'fountain'] },
    ],
  },
  {
    key: 'RU', flag: '🇷🇺', label: 'Rusça',
    equivalents: ['колодец', 'источник', 'родник'],
    sources: [
      { id: '08', author: 'Б. Карданов', title: 'Кабардинско-русский словарь', year: '1957', src: 'KBD', trg: 'RU', meanings: ['колодец', 'источник'], example: 'псынэ хуабэ — тёплый источник' },
      { id: '09', author: 'М. Апажев', title: 'Кабардино-русский словарь', year: '2008', src: 'KBD', trg: 'RU', meanings: ['родник'] },
      { id: '10', author: 'А. Шагиров', title: 'Этимологический словарь', year: '1977', src: 'KBD', trg: 'RU', meanings: ['колодец (псы “вода” + -нэ)'] },
      { id: '11', author: 'А. Хатанов', title: 'Адыгейско-русский словарь', year: '1960', src: 'ADY', trg: 'RU', meanings: ['источник'] },
      { id: '12', author: 'Ю. Тхаркахо', title: 'Адыгейско-русский', year: '1991', src: 'ADY', trg: 'RU', meanings: ['колодец', 'родник'] },
    ],
  },
  {
    key: 'AR', flag: '🇸🇦', label: 'Arapça',
    equivalents: ['بئر', 'عين ماء'],
    sources: [
      { id: '13', author: 'H. Ḥabjoqa', title: 'المعجم الشركسي العربي', year: '1986', src: 'KBD', trg: 'AR', meanings: ['بئر'] },
      { id: '14', author: 'Ş. Qumuq', title: 'Ürdün Adıgece–Arapça', year: '2002', src: 'ADY', trg: 'AR', meanings: ['عين ماء', 'بئر'] },
    ],
  },
];

const TOTAL = LANGS.reduce((a, l) => a + l.sources.length, 0);

function SectionHead({ icon, children, extra }: { icon: React.ReactNode; children: React.ReactNode; extra?: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between">
      <h3 className="flex items-center gap-2 text-sm font-bold text-slate-800 dark:text-slate-200">{icon}{children}</h3>
      {extra}
    </div>
  );
}

function KarsiliklarTablosu() {
  const [openLang, setOpenLang] = useState<string | null>(null);
  const [openSrc, setOpenSrc] = useState<string | null>(null);
  const [copied, setCopied] = useState<string | null>(null);

  const kopyala = (k: string) => { setCopied(k); setTimeout(() => setCopied(null), 1200); };

  return (
    <section className="space-y-2">
      <SectionHead
        icon={<Globe size={16} className="text-orange-500" />}
        extra={
          <span className="flex items-center gap-1 rounded-full bg-orange-100 px-2 py-0.5 text-xs font-bold text-orange-700 dark:bg-orange-950 dark:text-orange-300">
            <BookOpen size={10} />{TOTAL} sözlük
          </span>
        }
      >
        Çok Dilli Karşılıklar
      </SectionHead>

      <div className="overflow-hidden rounded-xl border border-sky-200 bg-white shadow-sm dark:border-sky-900 dark:bg-slate-800">
        {LANGS.map((l, i) => {
          const isOpen = openLang === l.key;

          return (
            <div
              key={l.key}
              className={`border-b last:border-b-0 ${
                l.native ? 'border-amber-200 dark:border-amber-900' : 'border-sky-100 dark:border-slate-700'
              }`}
            >
              <div
                className={`flex items-center gap-2 px-3 py-2.5 transition-colors ${
                  isOpen
                    ? 'bg-orange-50 dark:bg-slate-900'
                    : l.native
                      ? 'bg-amber-50 dark:bg-amber-950'
                      : i % 2 === 1 ? 'bg-sky-50 dark:bg-slate-900' : ''
                }`}
              >
                <span className="w-5 shrink-0 text-center text-sm">
                  {l.native ? <Star size={13} className="fill-amber-500 text-amber-500" /> : l.flag}
                </span>

                <span
                  className={`w-8 shrink-0 text-xs font-bold uppercase ${
                    isOpen
                      ? 'text-orange-600 dark:text-orange-400'
                      : l.native
                        ? 'text-amber-700 dark:text-amber-400'
                        : 'text-sky-700 dark:text-sky-300'
                  }`}
                >
                  {l.native ? 'ÇRK' : l.key}
                </span>

                <div className="min-w-0 flex-1">
                  <span className={`block break-words text-sm ${l.native ? 'font-bold text-amber-950 dark:text-amber-100' : 'font-medium text-slate-800 dark:text-slate-200'}`}>
                    {l.equivalents.join(' · ')}
                  </span>
                  {l.note && (
                    <span className="mt-0.5 flex items-center gap-1 text-xs text-amber-700 dark:text-amber-400">
                      <Info size={9} />{l.note}
                    </span>
                  )}
                </div>

                <button
                  onClick={() => kopyala(l.key)}
                  aria-label={`${l.label} karşılıklarını kopyala`}
                  className={`shrink-0 rounded-md p-1 ${
                    l.native
                      ? 'text-amber-500 hover:bg-amber-200 dark:hover:bg-amber-900'
                      : 'text-slate-400 hover:bg-sky-100 hover:text-sky-600 dark:hover:bg-slate-700'
                  }`}
                >
                  {copied === l.key ? <Check size={12} className="text-emerald-500" /> : <Copy size={12} />}
                </button>

                <button
                  onClick={() => { setOpenLang(isOpen ? null : l.key); setOpenSrc(null); }}
                  aria-expanded={isOpen}
                  aria-label={`${l.label} için ${l.sources.length} kaynağı göster`}
                  className={`flex shrink-0 items-center gap-0.5 rounded-md border px-1.5 py-0.5 text-xs font-bold transition-colors ${
                    isOpen
                      ? 'border-orange-400 bg-orange-500 text-white'
                      : l.native
                        ? 'border-amber-300 bg-amber-100 text-amber-700 hover:border-amber-400 dark:border-amber-800 dark:bg-amber-900 dark:text-amber-200'
                        : 'border-slate-200 bg-slate-100 text-slate-500 hover:border-orange-300 hover:text-orange-600 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-300'
                  }`}
                >
                  <BookOpen size={10} />{l.sources.length}
                  <ChevronRight size={11} className={`transition-transform ${isOpen ? 'rotate-90' : ''}`} />
                </button>
              </div>

              {isOpen && (
                <div className="bg-slate-50 dark:bg-slate-900">
                  {l.sources.map((s) => {
                    const sOpen = openSrc === s.id;
                    const isMono = s.src === s.trg;
                    return (
                      <div key={s.id} className="border-t border-slate-200 dark:border-slate-800">
                        <button
                          onClick={() => setOpenSrc(sOpen ? null : s.id)}
                          className="flex w-full items-start gap-2 py-2 pl-7 pr-3 text-left hover:bg-white dark:hover:bg-slate-800"
                        >
                          <ChevronDown size={11} className={`mt-1 shrink-0 text-slate-400 transition-transform ${sOpen ? '' : '-rotate-90'}`} />
                          <div className="min-w-0 flex-1">
                            <span className="block truncate text-xs font-bold text-slate-700 dark:text-slate-300">
                              {s.author} <span className="font-normal text-slate-400">({s.year})</span>
                            </span>
                            <span className="block truncate text-xs text-slate-500 dark:text-slate-400">{s.title}</span>
                          </div>
                          <span
                            className={`mt-0.5 shrink-0 rounded px-1 py-0.5 font-mono text-xs ${
                              isMono
                                ? 'bg-amber-200 text-amber-800 dark:bg-amber-900 dark:text-amber-200'
                                : 'bg-slate-200 text-slate-600 dark:bg-slate-700 dark:text-slate-300'
                            }`}
                          >
                            {isMono ? s.src : `${s.src}→${s.trg}`}
                          </span>
                        </button>

                        {sOpen && (
                          <div className="space-y-1 bg-white py-2 pl-12 pr-3 dark:bg-slate-800">
                            {s.meanings.map((m, idx) => (
                              <p key={idx} className="border-l-2 border-orange-300 pl-2 text-xs font-medium text-slate-700 dark:border-orange-700 dark:text-slate-200">
                                {idx + 1}. {m}
                              </p>
                            ))}
                            {s.example && (
                              <p className="flex items-start gap-1 pl-2 pt-0.5 text-xs italic text-slate-500 dark:text-slate-400">
                                <Quote size={9} className="mt-1 shrink-0" />{s.example}
                              </p>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <p className="text-center text-xs text-slate-400">
        📚 sayısına tıkla → o dilin sözlüklerini gör
      </p>
    </section>
  );
}

export default function DrawerFinal() {
  const [dark, setDark] = useState(true);
  const [fontSize, setFontSize] = useState(16);

  return (
    <div className={dark ? 'dark' : ''}>
      <div className="min-h-screen bg-slate-200 p-4 dark:bg-slate-950">

        <div className="mx-auto mb-3 flex items-center justify-between" style={{ maxWidth: 540 }}>
          <h1 className="text-sm font-bold text-slate-700 dark:text-slate-300">
            Lehçe Üstte + <span className="text-orange-500">Tek Dilli Çerkesçe</span>
          </h1>
          <div className="flex gap-2">
            <button
              onClick={() => setFontSize((v) => (v >= 20 ? 14 : v + 2))}
              className="flex items-center gap-1 rounded-lg border border-slate-300 bg-white px-2.5 py-1.5 text-xs font-semibold text-slate-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300"
            >
              <Type size={13} />{fontSize}px
            </button>
            <button onClick={() => setDark(!dark)} className="rounded-lg border border-slate-300 bg-white p-2 text-slate-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300">
              {dark ? <Sun size={14} /> : <Moon size={14} />}
            </button>
          </div>
        </div>

        <div
          style={{ maxWidth: 540, height: 760, fontSize: `${fontSize}px` }}
          className="mx-auto flex flex-col overflow-hidden rounded-2xl border border-slate-300 bg-slate-100 shadow-2xl dark:border-slate-800 dark:bg-slate-900"
        >
          <div className="flex shrink-0 items-center justify-between border-b border-slate-300 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
            <h2 className="truncate text-xl font-bold text-orange-500">{WORD.word}</h2>
            <button aria-label="Kapat" className="rounded-lg p-2 text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800"><X size={18} /></button>
          </div>

          <div className="flex shrink-0 items-center gap-4 border-b border-amber-200 bg-amber-50 px-4 py-2 text-xs text-slate-600 dark:border-amber-800 dark:bg-amber-950 dark:text-slate-400">
            <span>📖 20 anlam</span><span>🌍 5 dil</span><span>📚 {TOTAL} sözlük</span>
          </div>

          <div className="flex-1 space-y-4 overflow-y-auto p-4">

            <div className="flex flex-wrap gap-1.5">
              <span className="rounded-md border border-slate-300 bg-slate-100 px-2 py-0.5 text-xs font-bold text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">{WORD.pos}</span>
              <span className="rounded-md border border-cyan-300 bg-cyan-100 px-2 py-0.5 font-mono text-xs font-bold text-cyan-800 dark:border-cyan-800 dark:bg-cyan-950 dark:text-cyan-300">{WORD.ipa}</span>
              <span className="rounded-md border border-amber-300 bg-amber-100 px-2 py-0.5 text-xs font-bold text-amber-800 dark:border-amber-800 dark:bg-amber-950 dark:text-amber-300">{WORD.freq} kullanım</span>
            </div>

            <section className="space-y-2">
              <SectionHead icon={<Languages size={16} className="text-orange-500" />}>Lehçe Karşılıkları</SectionHead>
              <div className="space-y-1.5 rounded-xl border border-sky-200 bg-sky-50 p-3 dark:border-sky-900 dark:bg-sky-950">
                <div className="flex items-baseline gap-3">
                  <span className="w-12 shrink-0 rounded-md border border-sky-300 bg-sky-200 px-2 py-0.5 text-center text-xs font-bold text-sky-800 dark:border-sky-800 dark:bg-sky-900 dark:text-sky-200">ADY</span>
                  <span className="text-sm font-medium text-slate-800 dark:text-slate-200">{WORD.variants.ady}</span>
                </div>
                <div className="flex items-baseline gap-3">
                  <span className="w-12 shrink-0 rounded-md border border-sky-300 bg-sky-200 px-2 py-0.5 text-center text-xs font-bold text-sky-800 dark:border-sky-800 dark:bg-sky-900 dark:text-sky-200">KBD</span>
                  <span className="text-sm font-medium text-slate-800 dark:text-slate-200">{WORD.variants.kbd}</span>
                </div>
              </div>
            </section>

            <section className="space-y-2">
              <SectionHead icon={<Zap size={16} className="text-orange-500" />}>Morfolojik Pasaport</SectionHead>
              <div className="grid grid-cols-3 gap-2">
                <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-3 dark:border-emerald-900 dark:bg-emerald-950">
                  <span className="mb-1 block text-xs font-bold uppercase text-emerald-700 dark:text-emerald-400">Kök</span>
                  <span className="font-mono text-xs text-emerald-900 dark:text-emerald-100">{WORD.root}</span>
                </div>
                <div className="rounded-xl border border-purple-200 bg-purple-50 p-3 dark:border-purple-900 dark:bg-purple-950">
                  <span className="mb-1 block text-xs font-bold uppercase text-purple-700 dark:text-purple-400">Family</span>
                  <span className="font-mono text-xs text-purple-900 dark:text-purple-100">{WORD.family}</span>
                </div>
                <div className="rounded-xl border border-orange-200 bg-orange-50 p-3 dark:border-orange-900 dark:bg-orange-950">
                  <span className="mb-1 block text-xs font-bold uppercase text-orange-700 dark:text-orange-400">Concept</span>
                  <span className="font-mono text-xs text-orange-900 dark:text-orange-100">{WORD.concept}</span>
                </div>
              </div>
            </section>

            <section className="space-y-2">
              <SectionHead icon={<Users size={16} className="text-purple-500" />}>Aynı Aileden Kelimeler ({FAMILY.length})</SectionHead>
              <div className="rounded-xl border border-purple-200 bg-purple-50 p-3 dark:border-purple-900 dark:bg-purple-950">
                <div className="flex flex-wrap gap-1.5">
                  {FAMILY.slice(0, 10).map((m) => (
                    <span key={m} className="cursor-pointer rounded-md border border-purple-200 bg-white px-2 py-1 text-xs font-medium text-purple-800 hover:bg-purple-100 dark:border-purple-800 dark:bg-slate-800 dark:text-purple-200 dark:hover:bg-purple-900">{m}</span>
                  ))}
                </div>
                <p className="mt-2 text-xs font-semibold text-purple-600 dark:text-purple-400">+{FAMILY.length - 10} kelime daha</p>
              </div>
            </section>

            <KarsiliklarTablosu />

            <div className="h-2" />
          </div>

          <div className="flex shrink-0 gap-2 border-t border-slate-300 bg-white p-3 dark:border-slate-800 dark:bg-slate-900">
            <button className="flex min-h-11 flex-1 items-center justify-center gap-1.5 rounded-xl border border-slate-300 bg-slate-50 text-xs font-semibold text-slate-700 active:scale-95 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"><Copy size={14} />Kopyala</button>
            <button className="flex min-h-11 flex-1 items-center justify-center gap-1.5 rounded-xl border border-slate-300 bg-slate-50 text-xs font-semibold text-slate-700 active:scale-95 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"><Volume2 size={14} />Dinle</button>
            <button className="flex min-h-11 flex-1 items-center justify-center gap-1.5 rounded-xl bg-orange-500 text-xs font-semibold text-white hover:bg-orange-600 active:scale-95"><Share2 size={14} />Paylaş</button>
          </div>
        </div>

        <p className="mx-auto mt-3 text-center text-xs text-slate-400" style={{ maxWidth: 540 }}>
          Lehçe en üstte · ÇRK satırı = ADY→ADY ve KBD→KBD tek dilli sözlükler
        </p>
      </div>
    </div>
  );
}
