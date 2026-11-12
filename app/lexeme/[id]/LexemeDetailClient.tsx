"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Theme, Badge, Card, Button, Table, Separator } from "@radix-ui/themes";
import {
  ArrowLeft,
  BookOpen,
  GitBranch,
  Layers,
  Tag,
  Heart,
  Volume2,
  Sparkles,
  CheckCircle2,
  Share2,
  Check,
} from "lucide-react";

interface VariantAlt { form: string; sourceLabel: string; }
interface DialectVariants {
  adyghePrimary: string;
  adygheAlternatives: VariantAlt[];
  kabardianPrimary: string;
  kabardianAlternatives: VariantAlt[];
}
interface VerbRow {
  personCode: string;
  pronounCircassian: string;
  personLabelTr: string;
  present: string;
  past: string;
  future: string;
  negative: string;
}
interface VerbConjugation { root: string; infinitive: string; rows: VerbRow[]; }
interface DeclensionRow {
  caseNameCircassian: string;
  caseNameTr: string;
  singularIndefinite: string;
  singularDefinite: string;
  pluralIndefinite: string;
  pluralDefinite: string;
}
interface RelatedLexeme { id: string; form: string; tr: string; dialect?: string; }

export interface LexemeDetailProps {
  lex: {
    id: string;
    form: string;
    dialect?: string;
    ipa?: string;
    partOfSpeech?: string;
    rootIds?: string[];
    wordFamilyId?: string;
    conceptId?: string;
    literalMeaning?: string;
    derivation?: { components?: string[] };
    translations?: { tr?: string; en?: string; ru?: string; ar?: string };
    examples?: Array<string | { text?: string; tr?: string }>;
  };
  variants: DialectVariants | null;
  verbConjugation: VerbConjugation | null;
  declension: DeclensionRow[] | null;
  relatedLexemes: RelatedLexeme[];
}

function getDialectHeaderLabel(dialect?: string, id?: string) {
  const d = String(dialect || "").toUpperCase();
  if (d === "COMMON") return { label: "Ортак (COMMON)", color: "indigo" as const };
  if (d === "WESTERN" || d === "ADY" || String(id || "").includes("ADY")) {
    return { label: "Баты (Адыгабзэ)", color: "teal" as const };
  }
  return { label: "Догу (Къэбэрдей-Шэрджэсыбзэ)", color: "cyan" as const };
}

export default function LexemeDetailClient({
  lex,
  variants,
  verbConjugation,
  declension,
  relatedLexemes,
}: LexemeDetailProps) {
  const [isDark, setIsDark] = useState(false);
  const [isFav, setIsFav] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const syncTheme = () => setIsDark(document.documentElement.classList.contains("dark"));
    syncTheme();
    const observer = new MutationObserver(syncTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("cerkesce-favoriler") || "[]");
      setIsFav(Array.isArray(saved) && saved.some((x: any) => x === lex.id || x?.id === lex.id));
    } catch {}
  }, [lex.id]);

  const toggleFavorite = () => {
    try {
      const saved = JSON.parse(localStorage.getItem("cerkesce-favoriler") || "[]");
      const arr = Array.isArray(saved) ? saved : [];
      const exists = arr.some((x: any) => x === lex.id || x?.id === lex.id);
      const next = exists
        ? arr.filter((x: any) => x !== lex.id && x?.id !== lex.id)
        : [...arr, { id: lex.id, form: lex.form, tr: lex.translations?.tr || "" }];
      localStorage.setItem("cerkesce-favoriler", JSON.stringify(next));
      setIsFav(!exists);
    } catch {}
  };

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    }
  };

  const dialectBadge = getDialectHeaderLabel(lex.dialect, lex.id);
  const translations = lex.translations || {};

  return (
    <Theme appearance={isDark ? "dark" : "light"} accentColor="indigo" grayColor="slate" radius="large">
      <div
        className={`min-h-screen w-full py-6 px-4 sm:px-6 transition-colors ${
          isDark ? "bg-slate-950 text-slate-100" : "bg-slate-50/70 text-slate-900"
        }`}
      >
        <div className="max-w-3xl mx-auto space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <Link
              href="/sozluk"
              className={`inline-flex items-center gap-1.5 text-sm font-medium transition-colors ${
                isDark ? "text-indigo-400 hover:text-indigo-300" : "text-indigo-600 hover:text-indigo-800"
              }`}
            >
              <ArrowLeft className="w-4 h-4" />
              Sözlüğe dön
            </Link>

            <div className="flex items-center gap-2">
              <Badge color={dialectBadge.color} variant="soft" size="2">
                {dialectBadge.label}
              </Badge>
              <Button size="1" variant="ghost" color="gray" onClick={handleShare} title="Bağlantıyı kopyala">
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Share2 className="w-3.5 h-3.5" />}
              </Button>
            </div>
          </div>

          <Card size="3">
            <div className="space-y-3">
              <div className="flex flex-wrap items-baseline justify-between gap-3">
                <div className="flex flex-wrap items-baseline gap-3">
                  <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">{lex.form}</h1>
                  {lex.ipa && (
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md font-mono text-sm ${
                        isDark ? "bg-slate-800 text-slate-300" : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      <Volume2 className="w-3.5 h-3.5 opacity-70" />
                      [{lex.ipa}]
                    </span>
                  )}
                </div>

                <Button
                  size="2"
                  variant={isFav ? "solid" : "soft"}
                  color={isFav ? "crimson" : "gray"}
                  onClick={toggleFavorite}
                >
                  <Heart className={`w-4 h-4 ${isFav ? "fill-current" : ""}`} />
                  {isFav ? "Favorilerde" : "Favorilere ekle"}
                </Button>
              </div>

              <div className="flex flex-wrap items-center gap-2 pt-1">
                {lex.partOfSpeech && (
                  <Badge color="crimson" variant="surface" size="2">
                    {lex.partOfSpeech}
                  </Badge>
                )}

                {lex.rootIds?.map((r) => (
                  <Badge key={r} color="violet" variant="soft" size="2" className="font-mono">
                    <GitBranch className="w-3 h-3 mr-1" />
                    {r}
                  </Badge>
                ))}

                {lex.wordFamilyId && (
                  <Link href={`/sozluk/family/${encodeURIComponent(lex.wordFamilyId)}`} className="no-underline">
                    <Badge color="green" variant="soft" size="2" className="font-mono cursor-pointer">
                      <Layers className="w-3 h-3 mr-1" />
                      {lex.wordFamilyId}
                    </Badge>
                  </Link>
                )}

                {lex.conceptId && (
                  <Link href={`/kavram/${encodeURIComponent(String(lex.conceptId).toLowerCase())}`} className="no-underline">
                    <Badge color="amber" variant="soft" size="2" className="cursor-pointer">
                      <Tag className="w-3 h-3 mr-1" />
                      {lex.conceptId}
                    </Badge>
                  </Link>
                )}
              </div>

              <Separator size="4" my="2" />

              <div className="grid grid-cols-1 gap-2.5 text-sm sm:text-base">
                {lex.derivation?.components && lex.derivation.components.length > 0 && (
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-semibold text-xs uppercase tracking-wider opacity-75">
                      ПСАЛЪЭ ЛЪАБЖЬЭ (Kök &amp; Ekler):
                    </span>
                    <span
                      className={`px-2.5 py-0.5 rounded font-mono text-sm ${
                        isDark ? "bg-indigo-950/70 text-indigo-300" : "bg-indigo-50 text-indigo-800"
                      }`}
                    >
                      {lex.derivation.components.join(" + ")}
                    </span>
                  </div>
                )}

                {translations.tr && (
                  <div>
                    <span className="font-bold text-xs uppercase tracking-wider opacity-75 mr-2">TÜRKÇE (МЫХЬЭНЭ):</span>
                    <span className="font-medium">{translations.tr}</span>
                  </div>
                )}
                {translations.en && (
                  <div>
                    <span className="font-bold text-xs uppercase tracking-wider opacity-75 mr-2">İNGİLİZCE (ИНДЖЫЛЫБЗЭ):</span>
                    <span>{translations.en}</span>
                  </div>
                )}
                {translations.ru && (
                  <div>
                    <span className="font-bold text-xs uppercase tracking-wider opacity-75 mr-2">RUSÇA (УРЫСЫБЗЭ):</span>
                    <span>{translations.ru}</span>
                  </div>
                )}
                {translations.ar && (
                  <div>
                    <span className="font-bold text-xs uppercase tracking-wider opacity-75 mr-2">ARAPÇA (ХЬЭРЫПЫБЗЭ):</span>
                    <span dir="rtl">{translations.ar}</span>
                  </div>
                )}
                {lex.literalMeaning && (
                  <div>
                    <span className="font-bold text-xs uppercase tracking-wider opacity-75 mr-2">KELİME ANLAMI (LITERAL):</span>
                    <span className="italic opacity-90">{lex.literalMeaning}</span>
                  </div>
                )}
              </div>
            </div>
          </Card>

          {variants && (
            <Card size="3">
              <div className="space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h2 className="text-base font-bold flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-indigo-500" />
                    Diyalekt Karşılıkları &amp; Sözlük Varyantları
                  </h2>
                  <Badge color="indigo" variant="soft" size="1">
                    <CheckCircle2 className="w-3 h-3 mr-1" />
                    Huvaj &amp; AIG Doğrulamalı
                  </Badge>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className={`p-3.5 rounded-xl border ${isDark ? "bg-amber-950/25 border-amber-800/50" : "bg-amber-50/90 border-amber-200/80"}`}>
                    <div className="text-[11px] font-bold tracking-wider uppercase text-amber-600 dark:text-amber-400">
                      BATI ÇERKESÇESİ (ADÎĞECE)
                    </div>
                    <div className="mt-1.5 flex flex-wrap items-center gap-2">
                      <span className="text-xl font-bold">{variants.adyghePrimary}</span>
                      <Badge size="1" color="amber" variant="surface">Huvaj / Akademik</Badge>
                    </div>
                    {variants.adygheAlternatives.map((alt) => (
                      <div key={alt.form} className="mt-1.5 flex flex-wrap items-center gap-2 text-xs">
                        <span className="opacity-75">Alternatif: <b>{alt.form}</b></span>
                        <Badge size="1" color="gray" variant="soft">{alt.sourceLabel}</Badge>
                      </div>
                    ))}
                  </div>

                  <div className={`p-3.5 rounded-xl border ${isDark ? "bg-sky-950/25 border-sky-800/50" : "bg-sky-50/90 border-sky-200/80"}`}>
                    <div className="text-[11px] font-bold tracking-wider uppercase text-sky-600 dark:text-sky-400">
                      DOĞU ÇERKESÇESİ (KABARDEYCE)
                    </div>
                    <div className="mt-1.5 flex flex-wrap items-center gap-2">
                      <span className="text-xl font-bold">{variants.kabardianPrimary}</span>
                      <Badge size="1" color="blue" variant="surface">Standart</Badge>
                    </div>
                    {variants.kabardianAlternatives.map((alt) => (
                      <div key={alt.form} className="mt-1.5 flex flex-wrap items-center gap-2 text-xs">
                        <span className="opacity-75">Alternatif: <b>{alt.form}</b></span>
                        <Badge size="1" color="gray" variant="soft">{alt.sourceLabel}</Badge>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          )}

          {verbConjugation && (
            <Card size="3">
              <div className="space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h2 className="text-base font-bold">Глагол зэхъуэкӀыкӀэ (Fiil Çekim Tablosu)</h2>
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge color="indigo" variant="soft" size="2">Kök: {verbConjugation.root}</Badge>
                    <Badge color="gray" variant="soft" size="2">Mastar: {verbConjugation.infinitive}</Badge>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <Table.Root size="2" variant="surface">
                    <Table.Header>
                      <Table.Row>
                        <Table.ColumnHeaderCell>Şahıs</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell>Şimdiki Zaman</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell>Geçmiş Zaman</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell>Gelecek Zaman</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell>Olumsuz (-къым)</Table.ColumnHeaderCell>
                      </Table.Row>
                    </Table.Header>
                    <Table.Body>
                      {verbConjugation.rows.map((row) => (
                        <Table.Row key={row.personCode}>
                          <Table.RowHeaderCell>
                            <div className="font-bold">{row.pronounCircassian}</div>
                            <div className="text-xs opacity-65">{row.personLabelTr}</div>
                          </Table.RowHeaderCell>
                          <Table.Cell>{row.present}</Table.Cell>
                          <Table.Cell><b>{row.past}</b></Table.Cell>
                          <Table.Cell>{row.future}</Table.Cell>
                          <Table.Cell className="opacity-75">{row.negative}</Table.Cell>
                        </Table.Row>
                      ))}
                    </Table.Body>
                  </Table.Root>
                </div>
              </div>
            </Card>
          )}

          {declension && (
            <Card size="3">
              <div className="space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h2 className="text-base font-bold">Склоненэ (İsim Çekim Tablosu)</h2>
                  <Badge color="gray" variant="soft" size="1">Закъуэ / Куэд Бжыгъэ</Badge>
                </div>

                <div className="overflow-x-auto">
                  <Table.Root size="2" variant="surface">
                    <Table.Header>
                      <Table.Row>
                        <Table.ColumnHeaderCell>Hal</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell>Tekil Belirtisiz</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell>Tekil Belirtili (-р/-м)</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell>Çoğul Belirtisiz</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell>Çoğul Belirtili (-хэ-)</Table.ColumnHeaderCell>
                      </Table.Row>
                    </Table.Header>
                    <Table.Body>
                      {declension.map((row) => (
                        <Table.Row key={row.caseNameCircassian}>
                          <Table.RowHeaderCell>
                            <div className="font-bold">{row.caseNameCircassian}</div>
                            <div className="text-xs opacity-65">{row.caseNameTr}</div>
                          </Table.RowHeaderCell>
                          <Table.Cell>{row.singularIndefinite}</Table.Cell>
                          <Table.Cell><b>{row.singularDefinite}</b></Table.Cell>
                          <Table.Cell>{row.pluralIndefinite}</Table.Cell>
                          <Table.Cell><b>{row.pluralDefinite}</b></Table.Cell>
                        </Table.Row>
                      ))}
                    </Table.Body>
                  </Table.Root>
                </div>
              </div>
            </Card>
          )}

          {lex.examples && lex.examples.length > 0 && (
            <Card size="3">
              <div className="space-y-2.5">
                <h2 className="text-base font-bold flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-emerald-500" />
                  Щапхъэхэр (Örnek Cümleler)
                </h2>
                <ul className="space-y-1.5 text-sm sm:text-base pl-1">
                  {lex.examples.map((ex, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-indigo-500 font-bold">•</span>
                      <span>{typeof ex === "string" ? ex : ex.text || ""}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Card>
          )}

          {relatedLexemes.length > 0 && (
            <Card size="3">
              <div className="space-y-3">
                <h2 className="text-base font-bold flex items-center gap-2">
                  <Layers className="w-4 h-4 text-purple-500" />
                  Псалъафэ зэпыщӀахэр (İlişkili Kelimeler &amp; Aile Üyeleri)
                </h2>

                <div className="flex flex-wrap gap-2.5">
                  {relatedLexemes.map((rel) => (
                    <Link
                      key={rel.id}
                      href={`/lexeme/${encodeURIComponent(rel.id)}`}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium border transition-all ${
                        isDark
                          ? "bg-purple-950/40 border-purple-800/60 text-purple-200 hover:bg-purple-900/60 hover:border-purple-600"
                          : "bg-purple-50 border-purple-200 text-purple-900 hover:bg-purple-100 hover:border-purple-300"
                      }`}
                    >
                      <span className="font-bold">{rel.form}</span>
                      {rel.tr && <span className="opacity-75">— {rel.tr}</span>}
                    </Link>
                  ))}
                </div>
              </div>
            </Card>
          )}
        </div>
      </div>
    </Theme>
  );
}
