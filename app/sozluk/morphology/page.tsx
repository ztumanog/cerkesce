'use client';

import React, { useState, useRef } from 'react';
import {
  Search,
  Loader2,
  Layers,
  BookOpen,
  Globe,
  AlertCircle,
  Languages,
  Keyboard,
  X,
} from 'lucide-react';
import { AkilliKlavye } from '@/components/features/AkilliKlavye';
import { safeConceptId } from '@/lib/conceptDisplay';


// Önek slot çevirileri
const SLOT_TR: Record<string, string> = {
  person: 'Kişi',
  reflexive: 'Dönüşlü',
  directional: 'Yönelme',
  version: 'Versiyon',
  comitative: 'Birliktelik',
  locative: 'Yersel',
  causative: 'Ettirgen',
  factitive: 'Faktitif',
};

// Sonek kod çevirileri
const SUFFIX_CODE_TR: Record<string, string> = {
  FUTURE_NEGATION: 'Olumsuz Gelecek',
  IMPERFECT_NEGATION: 'Olumsuz Geniş/Geçmiş',
  FINITE_NEGATION: 'Olumsuzluk',
  PRETERITE_DECLARATIVE: 'Belirli Geçmiş Bildirme',
  ANTERIOR_PLUPERFECT: 'Uzak Geçmiş Anterior',
  PLUPERFECT: 'Uzak Geçmiş',
  PAST_ANTERIOR: 'Geçmiş Anterior',
  PRETERITE: 'Belirli Geçmiş',
  IMPERFECT_DYN: 'Şimdiki Hikaye',
  IMPERFECT: 'Geçmiş Süreklilik',
  FACTUAL_FUTURE: 'Kesin Gelecek',
  FUTURE_BASE: 'Gelecek Tabanı',
  CATEGORICAL_FUTURE: 'Kategorik Gelecek',
  REPETITIVE: 'Tekrar',
  POTENTIAL: 'Yeterlilik',
  TOTALITIVE: 'Tamamen',
  CONDITIONAL: 'Şart',
  CONDITIONAL_SHORT: 'Şart (Kısa)',
  INDICATIVE: 'Bildirme',
};

// Bölüm renk tonları
const TONES = {
  emerald: { bar: 'bg-emerald-500', icon: 'text-emerald-600', badge: 'bg-emerald-50 text-emerald-700 ring-emerald-200', term: 'text-emerald-900' },
  sky: { bar: 'bg-sky-500', icon: 'text-sky-600', badge: 'bg-sky-50 text-sky-700 ring-sky-200', term: 'text-sky-900' },
  violet: { bar: 'bg-violet-500', icon: 'text-violet-600', badge: 'bg-violet-50 text-violet-700 ring-violet-200', term: 'text-violet-900' },
  amber: { bar: 'bg-amber-500', icon: 'text-amber-600', badge: 'bg-amber-50 text-amber-700 ring-amber-200', term: 'text-amber-900' },
  cyan: { bar: 'bg-cyan-500', icon: 'text-cyan-600', badge: 'bg-cyan-50 text-cyan-700 ring-cyan-200', term: 'text-cyan-900' },
  orange: { bar: 'bg-orange-500', icon: 'text-orange-600', badge: 'bg-orange-50 text-orange-700 ring-orange-200', term: 'text-orange-900' },
  lime: { bar: 'bg-lime-500', icon: 'text-lime-600', badge: 'bg-lime-50 text-lime-700 ring-lime-200', term: 'text-lime-900' },
  pink: { bar: 'bg-pink-500', icon: 'text-pink-600', badge: 'bg-pink-50 text-pink-700 ring-pink-200', term: 'text-pink-900' },
} as const;

type Tone = keyof typeof TONES;

interface MorphologyResult {
  word: string;
  prefixes: Array<{ slot: string; form: string; position: number }>;
  root: string;
  rootIds?: string[];        // EKLENDİ
  conceptId?: string | null; // EKLENDİ
  prefixCount: number;
  method: string;
  confidence: number;
  source?: string;
  lexeme?: any;
  wordFamily?: any[];
  lemma?: string;
  lemmaPos?: string;
  lemmaConfidence?: number;
  personArguments?: any[];
  lemmaPrefixes?: any[];
  lemmaSuffixes?: any[];
  suffixes?: Array<{ morpheme?: string; code?: string; gloss?: string }>;
  rootMatches?: any[];
  frequency?: { kabardian: number; adyghe: number };
  allMeanings?: Array<{
    id: string;
    literalMeaning: string;
    partOfSpeech: string;
    ipa?: string;
    notes?: string;
  }>;
}

// Bölüm kartı
function SectionCard({
  title,
  count,
  tone,
  icon,
  children,
  className = '',
}: {
  title: string;
  count?: number;
  tone: Tone;
  icon: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  const t = TONES[tone];
  return (
    <section className={`rounded-3xl bg-white p-6 shadow-xl shadow-slate-900/5 ring-1 ring-slate-200 ${className}`}>
      <div className="mb-5 flex items-center gap-3">
        <span className={`h-6 w-1 rounded-full ${t.bar}`} />
        <span className={t.icon}>{icon}</span>
        <h2 className="text-lg font-bold text-slate-900">{title}</h2>
        {typeof count === 'number' && (
          <span className={`rounded-full px-2.5 py-0.5 text-xs font-bold ring-1 ${t.badge}`}>{count}</span>
        )}
      </div>
      {children}
    </section>
  );
}

// Satır içi rozet kutusu (hero istatistikleri)
function Stat({ value, label }: { value: React.ReactNode; label: string }) {
  return (
    <div className="rounded-2xl bg-white/5 px-4 py-2.5 ring-1 ring-white/10 backdrop-blur">
      <p className="text-2xl font-bold leading-none">{value}</p>
      <p className="mt-1 text-xs text-slate-400">{label}</p>
    </div>
  );
}

// Liste öğesi: morfem satırı
function MorphemeRow({ form, label, gloss, tone }: { form: string; label?: string; gloss?: string; tone: Tone }) {
  const t = TONES[tone];
  return (
    <li className="flex flex-wrap items-center gap-x-3 gap-y-1 rounded-2xl bg-slate-50 px-4 py-3 ring-1 ring-slate-200/70">
      <span className={`font-serif text-lg font-bold ${t.term}`}>{form}</span>
      {label && <span className="text-sm text-slate-600">{label}</span>}
      {gloss && <span className="text-sm text-slate-500">— {gloss}</span>}
    </li>
  );
}


// ConceptId Türkçe Çeviri Haritası
const CONCEPT_TR: Record<string, string> = {
  // En sık kullanılanlar (top 50)
  PROTECT: 'Korumak', CRADLE: 'Beşik', THOUSAND: 'Bin',
  EAT_UNDER: 'Altında Yemek', MILK: 'Süt', SPARE: 'Yedek',
  YEAR: 'Yıl', JOY: 'Sevinç', DECEIT: 'Aldatma', DEFECT: 'Kusur',
  MIND: 'Akıl', SKIN: 'Deri', ROT: 'Çürük', LOVE: 'Aşk',
  NOSE: 'Burun', BINDING: 'Bağlama', SNAKE: 'Yılan', FAT: 'Yağ',
  POINT: 'Nokta', DINING_ROOM: 'Yemek Odası', LIFE_PARTNER: 'Hayat Arkadaşı',
  GREEN: 'Yeşil', EYEBROW: 'Kaş', LEG_FOOT: 'Bacak/Ayak', KALMYK: 'Kalmuk',
  TONGUE: 'Dil (organ)', MORNING: 'Sabah', PETROLEUM: 'Petrol',
  BIG_WORK: 'Büyük İş', PLANT: 'Bitki', GRANDMOTHER: 'Büyükanne',
  BOW_MUSIC: 'Yaylı Müzik', WRITE: 'Yazmak', ACTION: 'Eylem',
  YELLOW: 'Sarı', NAVY_BLUE: 'Lacivert', COMPASSION: 'Merhamet',
  EXIT: 'Çıkış', NINE: 'Dokuz', JUSTICE: 'Adalet', TIME: 'Zaman',
  BLUE: 'Mavi', HOUSEWIFE: 'Ev Hanımı', BED_COVER: 'Yatak Örtüsü',
  COMPANION: 'Yoldaş', WORK: 'İş', ACUTE_ANGLE: 'Dar Açı',
  
  // Önceden eklediklerimiz
  WATER: 'Su', FIRE: 'Ateş', HAND: 'El', HEAD: 'Baş',
  HEART: 'Kalp', HAIR: 'Saç', WINDOW: 'Pencere', FREEDOM: 'Özgürlük',
  REASON: 'Sebep', TOP: 'Üst', MOUNTAIN: 'Dağ', RIVER: 'Nehir',
  ICE: 'Buz', LANGUAGE: 'Dil', WORD: 'Kelime', DÖVMEK: 'Dövmek',
  YAĞ: 'Yağ', SU: 'Su', TOPRAK: 'Toprak'
};



function formatConcept(id: string | null | undefined): string {
  if (!id) return "—";
  const safe = safeConceptId(id);
  if (!safe) return "—";
  if (CONCEPT_TR[safe]) return CONCEPT_TR[safe];
  return safe
    .replace(/_/g, ' ')
    .toLowerCase()
    .replace(/\b\w/g, c => c.toUpperCase());
}
export default function MorphologyPage() {
  const [word, setWord] = useState('');
  const [result, setResult] = useState<MorphologyResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showKeyboard, setShowKeyboard] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const analyze = async () => {
    if (!word.trim()) return;
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/morphology/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ word }),
      });
      if (!res.ok) {
        const err = await res.json();
        setError(err.error || 'Bir hata oluştu');
        setResult(null);
        return;
      }
      const data = await res.json();
      setResult(data);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setLoading(false);
    }
  };

  // Lehçe varyantlarını doğrudan kullan (otomatik dönüşüm yok)
  const rawDv = result?.lexeme?.dialectVariants;
  const dv = {
    adyghe: rawDv?.adyghe?.trim() || '',
    kabardian: rawDv?.kabardian?.trim() || '',
  };
  const hasDialect = Boolean(dv.adyghe || dv.kabardian);
  const hasFrequency = Boolean(result?.frequency && (result.frequency.kabardian > 0 || result.frequency.adyghe > 0));

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* HERO */}
      <header className="relative overflow-hidden bg-slate-950 text-white">
        <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-emerald-500/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 left-10 h-80 w-80 rounded-full bg-sky-500/10 blur-3xl" />

        <div className="relative mx-auto max-w-6xl px-6 pb-20 pt-10">
          <p className="text-xs font-semibold uppercase tracking-widest text-emerald-300">Morfoloji</p>
          <h1 className="mt-3 text-5xl font-black tracking-tight md:text-6xl">Morfoloji Analizi</h1>
          <p className="mt-4 max-w-xl text-slate-300">
            Çerkesçe bir kelimeyi önek, kök ve eklerine ayırın; lemma, kelime ailesi ve lehçe karşılıklarını görün.
          </p>
          {result && (
            <div className="mt-8 flex flex-wrap gap-3">
              <Stat value={result.lemmaPrefixes?.length ?? 0} label="önek" />
              <Stat value={(result.lexeme?.rootIds || result.rootIds || []).length} label="kök" />
              <Stat value={result.lemmaSuffixes?.length ?? 0} label="sonek" />
            </div>
          )}
        </div>
      </header>

      <main className="relative z-10 mx-auto -mt-10 max-w-6xl space-y-8 px-6">
        {/* ARAMA */}
        <div className="rounded-3xl bg-white p-3 shadow-xl shadow-slate-900/5 ring-1 ring-slate-200">
          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
              <input
                ref={inputRef}
                type="text"
                value={word}
                onChange={(e) => setWord(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && analyze()}
                placeholder="Örn: хъун"
                className="w-full rounded-2xl bg-slate-50 py-4 pl-13 pr-5 font-serif text-lg text-slate-900 ring-1 ring-slate-200 outline-none transition focus:bg-white focus:ring-2 focus:ring-emerald-300"
                suppressHydrationWarning
              />
            </div>
            <button
              onClick={analyze}
              disabled={loading || !word.trim()}
              className="flex items-center justify-center gap-2 rounded-2xl bg-slate-900 px-8 py-4 font-semibold text-white shadow-sm transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : 'Ayrıştır'}
            </button>
            <button
              onClick={() => setShowKeyboard(!showKeyboard)}
              type="button"
              className={`flex items-center justify-center gap-2 rounded-2xl px-5 py-4 font-semibold shadow-sm transition ${
                showKeyboard
                  ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
              title="Sanal Klavye"
            >
              <Keyboard className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* SANAL KLAVYE */}
        {showKeyboard && (
          <div className="rounded-3xl bg-white p-4 shadow-xl shadow-slate-900/5 ring-1 ring-slate-200 animate-in fade-in slide-in-from-top-4 duration-300">
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                <Keyboard className="h-4 w-4 text-emerald-600" />
                Sanal Klavye
              </div>
              <button
                onClick={() => setShowKeyboard(false)}
                className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <AkilliKlavye
              inputRef={inputRef}
              sorgu={word}
              setSorgu={setWord}
              metinBoyutu={18}
            />
          </div>
        )}

        {/* HATA */}
        {error && (
          <div className="flex items-start gap-3 rounded-2xl bg-red-50 p-5 text-red-800 ring-1 ring-red-200">
            <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />
            <p className="text-sm">{error}</p>
          </div>
        )}

        {/* BOŞ DURUM */}
        {!result && !loading && !error && (
          <div className="rounded-3xl border-2 border-dashed border-slate-200 bg-white p-14 text-center">
            <Layers className="mx-auto mb-4 h-10 w-10 text-slate-300" />
            <p className="text-slate-500">Analiz etmek için bir kelime girin.</p>
          </div>
        )}

        {/* SONUÇ VAR AMA BOŞ (bilinmeyen kelime) */}
        {result && !result.lexeme && (
          <div className="rounded-3xl border-2 border-dashed border-amber-200 bg-amber-50 p-8 text-center">
            <AlertCircle className="mx-auto mb-4 h-10 w-10 text-amber-400" />
            <h3 className="text-lg font-bold text-amber-900 mb-2">Kelime bulunamadı</h3>
            <p className="text-sm text-amber-700 mb-4">
              "<span className="font-mono font-bold">{result.word}</span>" kelimesi sözlükte kayıtlı değil.
            </p>
            <p className="text-xs text-amber-600 mb-4">
              İpucu: Sanal klavyeyi kullanarak doğru Çerkesçe karakterlerle yazmayı deneyin.
            </p>
            <button
              onClick={() => setShowKeyboard(true)}
              className="inline-flex items-center gap-2 px-4 py-2 bg-amber-600 text-white text-sm font-medium rounded-xl hover:bg-amber-700 transition-colors"
            >
              <Keyboard className="h-4 w-4" />
              Sanal Klavyeyi Aç
            </button>
          </div>
        )}

        {result && (
          <>
            {/* ÖZET KARTI */}
            <article className="overflow-hidden rounded-3xl bg-slate-900 text-white shadow-xl shadow-slate-900/10">
              <div className="grid md:grid-cols-5">
                <div className="p-8 md:col-span-3">
                  <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">Kelime</p>
                  <p className="mt-2 font-serif text-5xl font-bold leading-tight">{result.word}</p>
                  {result.lexeme?.ipa && (
                    <p className="mt-3 inline-block rounded-lg bg-white/5 px-2.5 py-1 font-mono text-sm text-slate-300">
                      {result.lexeme.ipa}
                    </p>
                  )}
                </div>
                <div className="flex flex-col justify-end gap-3 border-t border-white/10 bg-gradient-to-br from-emerald-900/40 to-transparent p-8 md:col-span-2 md:border-l md:border-t-0">
                  {result.lemma && <Stat value={result.lemma} label="lemma" />}
                  <div className="grid grid-cols-2 gap-3">
                    {result.lemmaPos && <Stat value={result.lemmaPos} label="tür" />}
                    {result.lemmaConfidence !== undefined && (
                      <div className="rounded-2xl bg-white/5 px-4 py-2.5 ring-1 ring-white/10 backdrop-blur">
                        <p className="text-2xl font-bold leading-none">
                          %{(result.lemmaConfidence * 100).toFixed(0)}
                        </p>
                        <p className="mt-1 text-xs text-slate-400">güven</p>
                        <div className="mt-2 w-full bg-white/10 rounded-full h-1.5">
                          <div
                            className={`h-1.5 rounded-full transition-all ${
                              result.lemmaConfidence >= 0.8
                                ? 'bg-emerald-400'
                                : result.lemmaConfidence >= 0.5
                                ? 'bg-amber-400'
                                : 'bg-red-400'
                            }`}
                            style={{ width: `${result.lemmaConfidence * 100}%` }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </article>

            {/* MORFOLOJİK PASAPORT */}
            {result.lexeme && (
              <SectionCard title="Morfolojik Pasaport" tone="sky" icon={<Layers className="h-5 w-5" />}>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="p-3 bg-sky-50 border border-sky-100 rounded-xl">
                    <p className="text-[10px] text-sky-600 font-bold uppercase mb-1">Kök</p>
                    <p className="text-sm font-mono text-slate-800">
                      {(result.lexeme?.rootIds || result.rootIds || []).join(", ") || "—"}
                    </p>
                  </div>
                  <div className="p-3 bg-sky-50 border border-sky-100 rounded-xl">
                    <p className="text-[10px] text-sky-600 font-bold uppercase mb-1">Aile</p>
                    <p className="text-sm font-mono text-slate-800">
                      {result.lexeme.wordFamilyId || "—"}
                    </p>
                  </div>
                  <div className="p-3 bg-sky-50 border border-sky-100 rounded-xl">
                    <p className="text-[10px] text-sky-600 font-bold uppercase mb-1">Kavram</p>
                    <p className="text-sm font-mono text-slate-800">
                      {formatConcept(result.lexeme?.conceptId || result.conceptId || "")}
                    </p>
                  </div>
                </div>
              </SectionCard>
            )}

            {/* TÜM ANLAMLAR */}
            {result.allMeanings && result.allMeanings.length > 0 && (
              <SectionCard title="Tüm Anlamlar" count={result.allMeanings.length} tone="amber" icon={<BookOpen className="h-5 w-5" />}>
                <ol className="grid gap-3 sm:grid-cols-2">
                  {result.allMeanings.map((m, i) => (
                    <li key={i} className="flex items-start gap-3 rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200/70">
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-slate-900 text-xs font-bold text-white">
                        {i + 1}
                      </span>
                      <div className="min-w-0">
                        <p className="font-semibold text-slate-900">{m.literalMeaning}</p>
                        <p className="text-xs text-slate-500">{m.partOfSpeech}</p>
                        {m.notes && <p className="mt-1 text-xs leading-relaxed text-slate-500">{m.notes}</p>}
                      </div>
                    </li>
                  ))}
                </ol>
              </SectionCard>
            )}

            <div className="grid gap-6 md:grid-cols-2">
              {/* ÖNEKLER */}
              {result.lemmaPrefixes && result.lemmaPrefixes.length > 0 && (
                <SectionCard title="Önekler" count={result.lemmaPrefixes.length} tone="emerald" icon={<Layers className="h-5 w-5" />}>
                  <ul className="space-y-2">
                    {result.lemmaPrefixes.map((p: any, i: number) => (
                      <MorphemeRow
                        key={i}
                        form={`${p.morpheme ?? p.form ?? '—'}-`}
                        label={SLOT_TR[p.slot] ?? p.slot}
                        gloss={p.gloss}
                        tone="emerald"
                      />
                    ))}
                  </ul>
                </SectionCard>
              )}

              {/* KİŞİ EKLERİ */}
              {result.personArguments && result.personArguments.length > 0 && (
                <SectionCard title="Kişi Ekleri" count={result.personArguments.length} tone="cyan" icon={<Layers className="h-5 w-5" />}>
                  <ul className="space-y-2">
                    {result.personArguments.map((p: any, i: number) => (
                      <MorphemeRow key={i} form={p.morpheme} label={p.code} gloss={p.gloss} tone="cyan" />
                    ))}
                  </ul>
                </SectionCard>
              )}

              {/* SONEKLER */}
              {result.lemmaSuffixes && result.lemmaSuffixes.length > 0 && (
                <SectionCard title="Sonekler" count={result.lemmaSuffixes.length} tone="orange" icon={<Layers className="h-5 w-5" />}>
                  <ul className="space-y-2">
                    {result.lemmaSuffixes.map((s: any, i: number) => (
                      <MorphemeRow
                        key={i}
                        form={s.morpheme ?? s.suffix ?? '—'}
                        label={!s.gloss && s.code ? SUFFIX_CODE_TR[s.code] ?? s.code : undefined}
                        gloss={s.gloss}
                        tone="orange"
                      />
                    ))}
                  </ul>
                </SectionCard>
              )}

            </div>

            {/* KORPÜS FREKANSI */}
            {hasFrequency && (
              <SectionCard title="Korpüs Frekansı" tone="violet" icon={<Globe className="h-5 w-5" />}>
                <div className="grid gap-4 sm:grid-cols-2">
                  {result.frequency!.kabardian > 0 && (
                    <div className="rounded-2xl bg-sky-50 p-5 ring-1 ring-sky-100">
                      <p className="text-xs font-semibold uppercase tracking-widest text-sky-700">Kabardeyce</p>
                      <p className="mt-1 text-3xl font-bold text-slate-900">{result.frequency!.kabardian.toLocaleString('tr-TR')}</p>
                    </div>
                  )}
                  {result.frequency!.adyghe > 0 && (
                    <div className="rounded-2xl bg-emerald-50 p-5 ring-1 ring-emerald-100">
                      <p className="text-xs font-semibold uppercase tracking-widest text-emerald-700">Adigece</p>
                      <p className="mt-1 text-3xl font-bold text-slate-900">{result.frequency!.adyghe.toLocaleString('tr-TR')}</p>
                    </div>
                  )}
                </div>
              </SectionCard>
            )}

            {/* LEHÇE KARŞILIKLARI */}
            <SectionCard title="Lehçe Karşılıkları" tone="sky" icon={<Languages className="h-5 w-5" />}>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-emerald-100">
                  <p className="text-xs font-semibold text-emerald-700">Batı · Adigece</p>
                  <p className="mt-1 font-serif text-2xl text-slate-900">
                    {dv.adyghe && dv.adyghe.trim() ? dv.adyghe : <span className="text-slate-400 italic text-base">— (yok)</span>}
                  </p>
                </div>
                <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-sky-100">
                  <p className="text-xs font-semibold text-sky-700">Doğu · Kabardeyce</p>
                  <p className="mt-1 font-serif text-2xl text-slate-900">
                    {dv.kabardian && dv.kabardian.trim() ? dv.kabardian : <span className="text-slate-400 italic text-base">— (yok)</span>}
                  </p>
                </div>
              </div>
            </SectionCard>

            {/* KELİME AİLESİ */}
            {result.wordFamily && result.wordFamily.length > 0 && (
              <SectionCard title="Kelime Ailesi" count={result.wordFamily.length} tone="pink" icon={<Globe className="h-5 w-5" />}>
                <ul className="grid max-h-96 gap-2 overflow-y-auto sm:grid-cols-2">
                  {result.wordFamily.map((w: any, i: number) => (
                    <li key={i} className="rounded-2xl bg-pink-50 p-4 ring-1 ring-pink-200">
                      <div className="flex items-baseline gap-2 flex-wrap">
                        <p className="font-serif font-bold text-pink-900">{w.form}</p>
                        {w.partOfSpeech && (
                          <span className="text-[10px] font-mono text-pink-600 uppercase bg-pink-100 px-1.5 py-0.5 rounded">
                            {w.partOfSpeech}
                          </span>
                        )}
                      </div>
                      {w.literalMeaning && (
                        <p className="text-sm text-slate-600 mt-1">{w.literalMeaning}</p>
                      )}
                      {w.rule && (
                        <p className="mt-1 text-xs text-pink-500 italic">→ {w.rule}</p>
                      )}
                    </li>
                  ))}
                </ul>
              </SectionCard>
            )}
          </>
        )}
      </main>
    </div>
  );
}




