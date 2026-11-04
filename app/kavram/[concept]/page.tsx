import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Languages, BookOpen, Quote, Network } from 'lucide-react';
import fs from 'fs';
import path from 'path';


// Dinamik route: her kavram icin ayri sayfa uret (fs.readFileSync kullanildigi icin)
export const dynamic = 'force-dynamic';
// Ic kalite notlarini filtrele (kullaniciya gosterme)
const INTERNAL_NOTE_PATTERNS = [
  /S2-\d+/i,
  /C-\d+\.\d+/i,
  /conceptId aile/i,
  /migration/i,
  /aile mirasi/i,
  /^Kontrol:/i,
  /^Test:/i,
  /^TODO/i,
  /^FIXME/i,
  /aile miras[ıi] oldugu icin temizlendi/i,
];
function isInternalNote(note: string): boolean {
  if (!note) return false;
  return INTERNAL_NOTE_PATTERNS.some(p => p.test(note));
}
function cleanNotes(note: string | undefined | null): string {
  if (!note) return '';
  return note
    .split('|')
    .map(s => s.trim())
    .filter(s => s && !isInternalNote(s))
    .filter(s => {
      // "Corpus v1.0 (freq: 247, ...)" gibi korpus metadata'sini gosterme
      if (/^Corpus v\d+\.\d+ \(freq:/.test(s)) return false;
      // "X sozluk + Y korpus" gibi dogrulanmamis iddialari gosterme
      if (/\d+\s*sozluk\s*\+\s*\d+\s*korpus/i.test(s)) return false;
      // "Diyalekt: ..." gibi ic notlari gosterme
      if (/^Diyalekt:\s/i.test(s)) return false;
      return true;
    })
    .join(' | ');
}

// 1. Veriyi çeken fonksiyon
async function getConceptData(conceptId: string) {
  const lexemesPath = path.resolve('./public/data/linguistic/lexemes.json');
  const relationsPath = path.resolve('./public/data/linguistic/semantic_relations.json');
  
  const lexemesRaw = JSON.parse(fs.readFileSync(lexemesPath, 'utf-8'));
  const lexemes: any[] = Array.isArray(lexemesRaw) ? lexemesRaw
    : (Array.isArray(lexemesRaw?.lexemes) ? lexemesRaw.lexemes : []);
  let relations: any[] = [];
  try {
    const relRaw = JSON.parse(fs.readFileSync(relationsPath, 'utf-8'));
    relations = Array.isArray(relRaw) ? relRaw : [];
  } catch (e) {
    console.warn("semantic_relations.json okunamadi.");
  }

  const upperConceptId = conceptId.toUpperCase();
  const matched = lexemes.filter((l: any) => 
    (l.conceptId && l.conceptId.toUpperCase() === upperConceptId) ||
    (l.conceptIds && l.conceptIds.some((cid: string) => cid.toUpperCase() === upperConceptId))
  );

  if (matched.length === 0) return null;

  const conceptMap = new Map<string, any>();
  for (const l of matched) {
    const form = l.form;
    if (!form) continue;

    // Ana lehce: SADECE l.dialect alanindan
    let dialectLabel: string = 'Lehçe belirtilmemiş';
    if (l.dialect === 'ady') dialectLabel = 'Adıgece (Batı)';
    else if (l.dialect === 'kbd') dialectLabel = 'Kabardeyce (Doğu)';

    // Kayitli varyantlar: SADECE veriden, bos olmayan
    const ady = typeof l.dialectVariants?.adyghe === 'string' && l.dialectVariants.adyghe.trim()
      ? l.dialectVariants.adyghe.trim() : '';
    const kbd = typeof l.dialectVariants?.kabardian === 'string' && l.dialectVariants.kabardian.trim()
      ? l.dialectVariants.kabardian.trim() : '';

    if (!conceptMap.has(form)) {
      conceptMap.set(form, {
        id: l.id,
        term: form,
        ipa: l.ipa || '',
        dialect: dialectLabel,
        dialectVariants: {
            adyghe: ady,
            kabardian: kbd
        },
        translations: Object.entries(l.translations || {})
            .filter(([key]) => ['tr', 'en', 'ru', 'ar', 'ady', 'kbd'].includes(key))
            .map(([key, val]) => {
                const langMap: Record<string, string> = {
                    'tr': 'Türkçe',
                    'en': 'İngilizce',
                    'ru': 'Rusça',
                    'ar': 'Arapça',
                    'ady': 'Adığce (Batı)',
                    'kbd': 'Kabardeyce (Doğu)'
                };
                return {
                    lang: langMap[key] || key,
                    text: val,
                    code: key.toUpperCase()
                };
            }),
        description: cleanNotes(l.notes),
        examples: l.examples || [],
        sources: new Set<string>(),
      });
    }
    
    const entry = conceptMap.get(form);
    if (l.examples) entry.examples = [...new Set([...entry.examples, ...l.examples])];
    // Kaynak toplama: SADECE l.sources (notes artik kaynak degil)
    if (Array.isArray(l.sources)) {
      l.sources.forEach((s: any) => {
        if (typeof s === 'string' && s.trim()) entry.sources.add(s.trim());
      });
    }
  }

  const items = Array.from(conceptMap.values()).map((i) => ({ ...i, sources: Array.from(i.sources) }));
  const allSources = Array.from(new Set(items.flatMap((i) => i.sources)));

  // İlgili kavramlar
  const relatedMap = new Map<string, string>();
  relations.forEach((rel: any) => {
    if (rel.source === upperConceptId) relatedMap.set(rel.target, rel.type);
    if (rel.target === upperConceptId) relatedMap.set(rel.source, rel.type);
  });

  const relatedConcepts = Array.from(relatedMap.entries()).map(([id, type]) => ({ id, type }));

  return { conceptId: upperConceptId, items, sources: allSources, relatedConcepts };
}

// 2. Lehçe etiketleri için renkler
const dialectStyles: Record<string, string> = {
  'Adıgece (Batı)': 'bg-emerald-100 text-emerald-800 ring-emerald-200',
  'Kabardeyce (Doğu)': 'bg-sky-100 text-sky-800 ring-sky-200',
  'Adıgece (Batı) & Kabardeyce (Doğu)': 'bg-purple-100 text-purple-800 ring-purple-200',
};

// 3. Sayfa Bileşeni
export default async function KavramPage({ params }: { params: Promise<{ concept: string }> }) {
  const { concept } = await params;
  const data = await getConceptData(concept);

  if (!data) notFound();

  return (
    <div className="min-h-screen bg-slate-50 pb-16">
      {/* Üst Şerit */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900 text-white">
        <div className="mx-auto max-w-6xl px-4 pt-6 pb-14">
          <Link href="/" className="inline-flex items-center gap-2 text-sm text-emerald-200 hover:text-white transition">
            <ArrowLeft className="h-4 w-4" /> Ana Sayfa
          </Link>
          <div className="mt-8 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-emerald-300">Kavram</p>
              <h1 className="mt-2 text-5xl font-extrabold tracking-tight">{data.conceptId}</h1>
              <p className="mt-3 text-sm text-slate-300">
                {data.items.length} kelime kartı
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
        {/* KALDIRILDI: lehce rozetleri */}
        {/* KALDIRILDI: lehce rozetleri */}
        {/* KALDIRILDI: lehce rozetleri */}
        {/* KALDIRILDI: lehce rozetleri */}
        {/* KALDIRILDI: lehce rozetleri */}
            </div>
          </div>
        </div>
      </div>

      {/* Ana İçerik */}
      <div className="mx-auto -mt-8 max-w-6xl space-y-8 px-4">
        {data.items.map((item: any) => (
          <article key={item.id} className="overflow-hidden rounded-2xl bg-white shadow-lg ring-1 ring-slate-200">
            <div className="grid gap-0 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
              
              {/* Sol: Çerkesçe terim ve Lehçe Karşılıkları */}
              <div className="bg-gradient-to-b from-emerald-50 to-white p-8">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Çerkesçe</p>
                <p className="mt-2 font-serif text-4xl font-bold text-slate-900">{item.term}</p>
                <p className="mt-2 font-mono text-sm text-slate-500">{item.ipa}</p>
                <span className={`mt-5 inline-flex rounded-full px-3 py-1 text-xs font-semibold ring-1 ${dialectStyles[item.dialect] ?? 'bg-slate-100'}`}>
                  {item.dialect}
                </span>

                {/* Lehçe Karşılıkları */}
                {/* DEBUG: item.dialectVariants = {JSON.stringify(item.dialectVariants)} */}
                {(item.dialectVariants?.adyghe || item.dialectVariants?.kabardian) && (
                  <div className="mt-6 pt-6 border-t border-slate-200">
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Veride kayıtlı lehçe biçimleri</p>
                    <ul className="space-y-1 text-sm">
                      {item.dialectVariants?.adyghe && (
                        <li><span className="font-bold text-emerald-700">Batı (Adığce):</span> {item.dialectVariants.adyghe}</li>
                      )}
                      {item.dialectVariants?.kabardian && (
                        <li><span className="font-bold text-sky-700">Doğu (Kabardeyce):</span> {item.dialectVariants.kabardian}</li>
                      )}
                    </ul>
                  </div>
                )}
              </div>

              {/* Sağ: Çok Dilli Karşılıklar ve Açıklama */}
              <div className="p-8">
                <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
                  <Languages className="h-4 w-4 text-emerald-600" /> Çok Dilli Karşılıklar
                </div>
                <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                  {item.translations.map((t: any) => (
                    <li key={t.lang} className="flex items-start gap-3 rounded-xl border border-slate-200 bg-slate-50 p-3">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-900 text-[11px] font-bold text-white">{t.code}</span>
                      <div className="min-w-0">
                        <p className="text-xs font-medium text-slate-500">{t.lang}</p>
                        <p className="font-semibold text-slate-900">{t.text}</p>
                      </div>
                    </li>
                  ))}
                </ul>

                <p className="mt-6 text-sm leading-relaxed text-slate-600">{item.description}</p>

                {item.examples.length > 0 && (
                  <div className="mt-6">
                    <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
                      <Quote className="h-4 w-4 text-emerald-600" /> Örnekler
                    </div>
                    <div className="mt-3 space-y-2">
                      {item.examples.map((ex: any, i: number) => {
                        const text = typeof ex === "string" ? ex : ex?.text ?? "";
                        const translation = typeof ex === "object" && ex?.translation ? ex.translation : "";
                        return (
                          <blockquote key={i} className="rounded-r-xl border-l-4 border-emerald-500 bg-emerald-50/60 px-4 py-3 font-serif text-slate-800">
                            <p>{text}</p>
                            {translation && (
                              <p className="mt-1 text-sm text-slate-500 italic">{translation}</p>
                            )}
                          </blockquote>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </article>
        ))}

        {/* İlgili Kavramlar */}
        {data.relatedConcepts.length > 0 && (
          <section>
            <div className="mb-4 flex items-center gap-2">
              <Network className="h-5 w-5 text-emerald-600" />
              <h2 className="text-xl font-bold text-slate-900">İlgili Kavramlar</h2>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
              {data.relatedConcepts.map((rel: any) => (
                <Link key={rel.id} href={`/kavram/${rel.id.toLowerCase()}`} className="group flex items-center justify-between rounded-xl bg-white p-4 shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-0.5 hover:shadow-md">
                  <span className="font-semibold text-slate-800 group-hover:text-emerald-700">{rel.id}</span>
                  <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">{rel.type}</span>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Kaynaklar */}
        {data.sources.length > 0 && (
          <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
            <div className="mb-4 flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-emerald-600" />
              <h2 className="text-lg font-bold text-slate-900">Korpus Kaynaklari ({data.sources.length})</h2>
            </div>
            <ul className="space-y-2 text-sm text-slate-600">
              {data.sources.map((s: string, i: number) => {
                const m = s.match(/source:\s*([^,\)]+)/);
                const lang = s.match(/lang:\s*(\w+)/);
                const kod = m ? m[1].trim() : s;
                const dil = lang
                  ? (lang[1] === 'ady' ? 'Adigece'
                    : lang[1] === 'kbd' ? 'Kabardeyce'
                    : lang[1])
                  : '';
                return (
                  <li key={i} className="flex gap-2">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />
                    <span className="font-mono text-xs text-slate-600">{kod}</span>
                    {dil && <span className="text-xs text-slate-400">({dil})</span>}
                  </li>
                );
              })}
            </ul>
          </section>
        )}
      </div>
    </div>
  );
}