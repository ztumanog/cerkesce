"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import * as Dialog from "@radix-ui/react-dialog";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import {
  Theme,
  Box,
  Flex,
  Grid,
  Card,
  Text,
  Heading,
  Badge,
  Button,
  TextField,
  SegmentedControl,
  Table,
  Callout,
  Separator,
  IconButton,
} from "@radix-ui/themes";
import {
  Search,
  X,
  SlidersHorizontal,
  MoreHorizontal,
  Pencil,
  ExternalLink,
  Copy,
  Check,
  Sparkles,
  AlertCircle,
  CheckCircle2,
  BookOpen,
  Layers,
  Tag,
  GitBranch,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface LexemeSummary {
  id: string;
  form: string;
  dialect?: string | null;
  ipa?: string | null;
  partOfSpeech?: string | null;
  meaning?: string;
  translations?: {
    tr?: string | string[];
    en?: string | string[];
    ru?: string | string[];
    ar?: string | string[];
  };
  rootIds?: string[];
  wordFamilyId?: string | null;
  conceptId?: string | null;
  corpusFrequency?: number;
  notes?: string;
}

type FilterType =
  | "all"
  | "common"
  | "kbd"
  | "ady"
  | "missing_roots"
  | "missing_concept"
  | "missing_meaning";

function formatTrField(val?: string | string[]): string {
  if (!val) return "";
  if (Array.isArray(val)) return val.filter(Boolean).join(", ");
  return String(val).trim();
}

function getDialectMeta(lex: LexemeSummary) {
  const d = String(lex.dialect || "").toUpperCase();
  if (d === "COMMON") {
    return { label: "Ortak (COMMON)", color: "indigo" as const };
  }
  if (d.startsWith("ADY") || d === "WESTERN" || lex.id.includes("ADY")) {
    return { label: "Batı (Adıge)", color: "teal" as const };
  }
  if (d.startsWith("KBD") || d === "EASTERN" || lex.id.includes("KBD")) {
    return { label: "Doğu (Kabardey)", color: "cyan" as const };
  }
  return { label: d || "Belirsiz", color: "gray" as const };
}

export default function LexemeCurationListPage() {
  const [isDark, setIsDark] = useState(false);

  // Header'daki aydınlık / karanlık tema değişimini canlı dinle
  useEffect(() => {
    const syncTheme = () => {
      setIsDark(document.documentElement.classList.contains("dark"));
    };
    syncTheme();
    const observer = new MutationObserver(syncTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);

  const [lexemes, setLexemes] = useState<LexemeSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState<FilterType>("all");
  const [page, setPage] = useState(1);
  const pageSize = 40;

  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Radix Dialog Hızlı Düzenleme Durumu
  const [editingLex, setEditingLex] = useState<LexemeSummary | null>(null);
  const [formState, setFormState] = useState({
    form: "",
    dialect: "COMMON",
    tr: "",
    en: "",
    ru: "",
    ar: "",
    ipa: "",
    partOfSpeech: "",
    rootIds: "",
    wordFamilyId: "",
    conceptId: "",
  });
  const [diffPreview, setDiffPreview] = useState<{ field: string; oldValue: any; newValue: any }[] | null>(null);
  const [saving, setSaving] = useState(false);
  const [saveNotice, setSaveNotice] = useState<{ type: "ok" | "err"; text: string } | null>(null);

  useEffect(() => {
    async function fetchLexemes() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch("/api/admin/curation/lexeme");
        if (!res.ok) throw new Error(`API Hatası: ${res.status}`);
        const data = await res.json();
        const list = Array.isArray(data) ? data : data.lexemes || data.data || [];
        setLexemes(list);
      } catch (err: any) {
        setError(err.message || "Veriler yüklenemedi.");
      } finally {
        setLoading(false);
      }
    }
    fetchLexemes();
  }, []);

  const stats = useMemo(() => {
    let missingRoots = 0;
    let missingConcept = 0;
    let missingMeaning = 0;
    for (const l of lexemes) {
      if (!l.rootIds || l.rootIds.length === 0) missingRoots++;
      if (!l.conceptId) missingConcept++;
      const hasM =
        l.meaning ||
        formatTrField(l.translations?.tr) ||
        formatTrField(l.translations?.en) ||
        formatTrField(l.translations?.ru);
      if (!hasM) missingMeaning++;
    }
    return {
      total: lexemes.length,
      missingRoots,
      missingConcept,
      missingMeaning,
    };
  }, [lexemes]);

  const filteredLexemes = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    return lexemes.filter((lex) => {
      const d = String(lex.dialect || "").toUpperCase();
      if (filter === "common" && d !== "COMMON") return false;
      if (filter === "ady" && !d.startsWith("ADY") && d !== "WESTERN" && !lex.id.includes("ADY")) return false;
      if (filter === "kbd" && !d.startsWith("KBD") && d !== "EASTERN" && !lex.id.includes("KBD")) return false;
      if (filter === "missing_roots" && lex.rootIds && lex.rootIds.length > 0) return false;
      if (filter === "missing_meaning") {
        const hasMeaning =
          lex.meaning ||
          formatTrField(lex.translations?.tr) ||
          formatTrField(lex.translations?.en) ||
          formatTrField(lex.translations?.ru);
        if (hasMeaning) return false;
      }
      if (filter === "missing_concept" && lex.conceptId) return false;

      if (!q) return true;

      return (
        lex.form?.toLowerCase().includes(q) ||
        lex.id?.toLowerCase().includes(q) ||
        lex.conceptId?.toLowerCase().includes(q) ||
        lex.wordFamilyId?.toLowerCase().includes(q) ||
        (lex.rootIds || []).some((r) => r.toLowerCase().includes(q)) ||
        lex.meaning?.toLowerCase().includes(q) ||
        formatTrField(lex.translations?.tr).toLowerCase().includes(q) ||
        formatTrField(lex.translations?.en).toLowerCase().includes(q) ||
        formatTrField(lex.translations?.ru).toLowerCase().includes(q)
      );
    });
  }, [lexemes, searchQuery, filter]);

  useEffect(() => {
    setPage(1);
  }, [searchQuery, filter]);

  const totalPages = Math.ceil(filteredLexemes.length / pageSize) || 1;
  const paginatedLexemes = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filteredLexemes.slice(start, start + pageSize);
  }, [filteredLexemes, page]);

  const openQuickEdit = (lex: LexemeSummary) => {
    setEditingLex(lex);
    setDiffPreview(null);
    setSaveNotice(null);
    setFormState({
      form: lex.form || "",
      dialect: String(lex.dialect || "COMMON").toUpperCase(),
      tr: formatTrField(lex.translations?.tr) || lex.meaning || "",
      en: formatTrField(lex.translations?.en),
      ru: formatTrField(lex.translations?.ru),
      ar: formatTrField(lex.translations?.ar),
      ipa: lex.ipa || "",
      partOfSpeech: lex.partOfSpeech || "",
      rootIds: Array.isArray(lex.rootIds) ? lex.rootIds.join(", ") : "",
      wordFamilyId: lex.wordFamilyId || "",
      conceptId: lex.conceptId || "",
    });
  };

  const handleDryRunOrSave = async (confirm: boolean) => {
    if (!editingLex) return;
    setSaving(true);
    setSaveNotice(null);
    try {
      const res = await fetch("/api/admin/curation/lexeme", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          lexemeId: editingLex.id,
          changes: formState,
          confirm,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "İşlem başarısız.");

      if (!confirm) {
        setDiffPreview(data.diff || []);
        if (!data.diff || data.diff.length === 0) {
          setSaveNotice({ type: "ok", text: "Değişiklik tespit edilmedi." });
        }
      } else {
        setLexemes((prev) =>
          prev.map((item) => (item.id === editingLex.id ? { ...item, ...data.lexeme } : item))
        );
        setSaveNotice({ type: "ok", text: data.message || "Kayıt güncellendi." });
        setDiffPreview(null);
        setTimeout(() => setEditingLex(null), 650);
      }
    } catch (err: any) {
      setSaveNotice({ type: "err", text: err.message || "Kaydetme hatası." });
    } finally {
      setSaving(false);
    }
  };

  const copyId = (id: string) => {
    navigator.clipboard.writeText(id);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1400);
  };

  return (
    <Theme appearance={isDark ? "dark" : "light"} accentColor="blue" grayColor="slate" radius="large" scaling="100%">
      <Box className="min-h-screen w-full bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 p-6 transition-colors">
        <Box className="max-w-7xl mx-auto space-y-6">
          {/* Üst Başlık ve Hızlı Bağlantılar */}
          <Flex
            justify="between"
            align="center"
            wrap="wrap"
            gap="4"
            className="border-b border-slate-200 dark:border-slate-800 pb-5"
          >
            <Box>
              <Flex align="center" gap="2">
                <Badge color="blue" variant="soft" size="2">
                  <Sparkles className="w-3.5 h-3.5" /> Morfolojik Korpus Yönetimi
                </Badge>
                <Badge color="gray" variant="outline" size="1">
                  {isDark ? "Karanlık Tema" : "Aydınlık Tema"}
                </Badge>
              </Flex>
              <Heading size="7" className="mt-2 tracking-tight">
                Lexeme Kürasyon Portalı
              </Heading>
              <Text size="2" color="gray">
                Toplam {stats.total.toLocaleString("tr-TR")} kayıttan{" "}
                <strong className="text-slate-900 dark:text-slate-100">
                  {filteredLexemes.length.toLocaleString("tr-TR")}
                </strong>{" "}
                birim listeleniyor.
              </Text>
            </Box>

            <Flex gap="2" wrap="wrap">
              <Button asChild variant="soft" color="cyan">
                <Link href="/admin/curation/roots">
                  <GitBranch className="w-4 h-4" /> Kökler
                </Link>
              </Button>
              <Button asChild variant="soft" color="purple">
                <Link href="/admin/curation/concepts">
                  <Tag className="w-4 h-4" /> Kavramlar
                </Link>
              </Button>
              <Button asChild variant="soft" color="teal">
                <Link href="/admin/curation/family">
                  <Layers className="w-4 h-4" /> Kelime Aileleri
                </Link>
              </Button>
              <Button asChild variant="solid" color="blue">
                <Link href="/admin/curation/new">+ Yeni Lexeme</Link>
              </Button>
            </Flex>
          </Flex>

          {/* Özet Metrik Kartları */}
          <Grid columns={{ initial: "2", md: "4" }} gap="3">
            <Card
              className="cursor-pointer transition hover:border-blue-500/60"
              onClick={() => setFilter("all")}
            >
              <Flex justify="between" align="center">
                <Text size="2" color="gray">
                  Toplam Madde
                </Text>
                <BookOpen className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              </Flex>
              <Heading size="6" className="mt-1">
                {stats.total.toLocaleString("tr-TR")}
              </Heading>
            </Card>

            <Card
              className="cursor-pointer transition hover:border-amber-500/60"
              onClick={() => setFilter("missing_roots")}
            >
              <Flex justify="between" align="center">
                <Text size="2" color="gray">
                  Köksüz Maddeler
                </Text>
                <GitBranch className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              </Flex>
              <Heading size="6" className="mt-1 text-amber-700 dark:text-amber-300">
                {stats.missingRoots.toLocaleString("tr-TR")}
              </Heading>
            </Card>

            <Card
              className="cursor-pointer transition hover:border-purple-500/60"
              onClick={() => setFilter("missing_concept")}
            >
              <Flex justify="between" align="center">
                <Text size="2" color="gray">
                  Kavramsız Maddeler
                </Text>
                <Tag className="w-4 h-4 text-purple-600 dark:text-purple-400" />
              </Flex>
              <Heading size="6" className="mt-1 text-purple-700 dark:text-purple-300">
                {stats.missingConcept.toLocaleString("tr-TR")}
              </Heading>
            </Card>

            <Card
              className="cursor-pointer transition hover:border-rose-500/60"
              onClick={() => setFilter("missing_meaning")}
            >
              <Flex justify="between" align="center">
                <Text size="2" color="gray">
                  Anlamı Eksik
                </Text>
                <AlertCircle className="w-4 h-4 text-rose-600 dark:text-rose-400" />
              </Flex>
              <Heading size="6" className="mt-1 text-rose-700 dark:text-rose-300">
                {stats.missingMeaning.toLocaleString("tr-TR")}
              </Heading>
            </Card>
          </Grid>

          {/* Arama ve Radix SegmentedControl Filtre Paneli */}
          <Card size="3">
            <Flex direction="column" gap="3">
              <TextField.Root
                size="3"
                placeholder="Çerkesçe form, Türkçe/İngilizce/Rusça anlam, Kök ID, Kavram veya Lexeme ID ara..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              >
                <TextField.Slot>
                  <Search className="w-4 h-4 text-slate-400" />
                </TextField.Slot>
                {searchQuery && (
                  <TextField.Slot>
                    <IconButton size="1" variant="ghost" color="gray" onClick={() => setSearchQuery("")}>
                      <X className="w-3.5 h-3.5" />
                    </IconButton>
                  </TextField.Slot>
                )}
              </TextField.Root>

              <Flex align="center" justify="between" wrap="wrap" gap="3">
                <Flex align="center" gap="2" wrap="wrap">
                  <SlidersHorizontal className="w-4 h-4 text-slate-500" />
                  <SegmentedControl.Root
                    value={filter}
                    onValueChange={(v) => setFilter(v as FilterType)}
                    size="2"
                  >
                    <SegmentedControl.Item value="all">Tümü</SegmentedControl.Item>
                    <SegmentedControl.Item value="common">Ortak (COMMON)</SegmentedControl.Item>
                    <SegmentedControl.Item value="kbd">Kabardey (Doğu)</SegmentedControl.Item>
                    <SegmentedControl.Item value="ady">Adıge (Batı)</SegmentedControl.Item>
                    <SegmentedControl.Item value="missing_roots">Köksüzler</SegmentedControl.Item>
                    <SegmentedControl.Item value="missing_concept">Kavramsızlar</SegmentedControl.Item>
                    <SegmentedControl.Item value="missing_meaning">Anlamsızlar</SegmentedControl.Item>
                  </SegmentedControl.Root>
                </Flex>

                <Text size="1" color="gray">
                  Sayfa {page} / {totalPages}
                </Text>
              </Flex>
            </Flex>
          </Card>

          {loading && (
            <Card>
              <Flex align="center" justify="center" py="8">
                <Text color="gray">Lexeme veritabanı yükleniyor...</Text>
              </Flex>
            </Card>
          )}

          {error && (
            <Callout.Root color="red" variant="surface">
              <Callout.Icon>
                <AlertCircle className="w-4 h-4" />
              </Callout.Icon>
              <Callout.Text>{error}</Callout.Text>
            </Callout.Root>
          )}

          {!loading && !error && (
            <Card className="p-0 overflow-hidden">
              <Table.Root variant="surface" size="2">
                <Table.Header>
                  <Table.Row>
                    <Table.ColumnHeaderCell>ID</Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell>Lehçe</Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell>Form (Çerkesçe)</Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell>Anlam (TR / EN / RU)</Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell>Kök İlişkisi</Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell>Kavram</Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell align="right">İşlemler</Table.ColumnHeaderCell>
                  </Table.Row>
                </Table.Header>

                <Table.Body>
                  {paginatedLexemes.map((lex) => {
                    const trText =
                      formatTrField(lex.translations?.tr) ||
                      lex.meaning ||
                      formatTrField(lex.translations?.en) ||
                      formatTrField(lex.translations?.ru) ||
                      "—";
                    const dialectMeta = getDialectMeta(lex);

                    return (
                      <Table.Row
                        key={lex.id}
                        align="center"
                        className="hover:bg-slate-100/80 dark:hover:bg-slate-900/70 transition-colors"
                      >
                        <Table.RowHeaderCell>
                          <Flex align="center" gap="1">
                            <Text size="1" className="font-mono text-slate-500 dark:text-slate-400">
                              {lex.id}
                            </Text>
                            <IconButton
                              size="1"
                              variant="ghost"
                              color="gray"
                              onClick={() => copyId(lex.id)}
                              title="ID Kopyala"
                            >
                              {copiedId === lex.id ? (
                                <Check className="w-3 h-3 text-emerald-500" />
                              ) : (
                                <Copy className="w-3 h-3" />
                              )}
                            </IconButton>
                          </Flex>
                        </Table.RowHeaderCell>

                        <Table.Cell>
                          <Badge color={dialectMeta.color} variant="soft" size="1">
                            {dialectMeta.label}
                          </Badge>
                        </Table.Cell>

                        <Table.Cell>
                          <Flex direction="column">
                            <Text weight="bold" size="3" className="text-blue-700 dark:text-blue-300">
                              {lex.form}
                            </Text>
                            {lex.ipa && (
                              <Text size="1" color="gray" className="font-mono">
                                [{lex.ipa}]
                              </Text>
                            )}
                          </Flex>
                        </Table.Cell>

                        <Table.Cell>
                          <Text size="2" className="line-clamp-2 max-w-xs" title={trText}>
                            {trText}
                          </Text>
                        </Table.Cell>

                        <Table.Cell>
                          {lex.rootIds && lex.rootIds.length > 0 ? (
                            <Flex gap="1" wrap="wrap">
                              {lex.rootIds.map((r) => (
                                <Badge key={r} color="green" variant="soft" size="1" className="font-mono">
                                  {r}
                                </Badge>
                              ))}
                            </Flex>
                          ) : (
                            <Badge color="amber" variant="outline" size="1">
                              Eksik
                            </Badge>
                          )}
                        </Table.Cell>

                        <Table.Cell>
                          {lex.conceptId ? (
                            <Badge color="purple" variant="soft" size="1" className="font-mono">
                              #{lex.conceptId}
                            </Badge>
                          ) : (
                            <Badge color="gray" variant="outline" size="1">
                              Yok
                            </Badge>
                          )}
                        </Table.Cell>

                        <Table.Cell align="right">
                          <Flex justify="end" align="center" gap="2">
                            <Button size="1" variant="soft" color="blue" onClick={() => openQuickEdit(lex)}>
                              <Pencil className="w-3 h-3" /> Hızlı Düzenle
                            </Button>

                            <DropdownMenu.Root>
                              <DropdownMenu.Trigger asChild>
                                <IconButton size="1" variant="ghost" color="gray" aria-label="Diğer işlemler">
                                  <MoreHorizontal className="w-4 h-4" />
                                </IconButton>
                              </DropdownMenu.Trigger>

                              <DropdownMenu.Portal>
                                <DropdownMenu.Content
                                  sideOffset={6}
                                  align="end"
                                  className="z-50 min-w-[195px] rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-1.5 text-xs text-slate-800 dark:text-slate-200 shadow-xl"
                                >
                                  <DropdownMenu.Item
                                    onSelect={() => openQuickEdit(lex)}
                                    className="flex cursor-pointer items-center gap-2 rounded-lg px-2.5 py-2 outline-none hover:bg-slate-100 dark:hover:bg-slate-800"
                                  >
                                    <Pencil className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                                    Modal ile Düzenle
                                  </DropdownMenu.Item>

                                  <DropdownMenu.Item asChild>
                                    <Link
                                      href={`/admin/curation/${lex.id}`}
                                      className="flex cursor-pointer items-center gap-2 rounded-lg px-2.5 py-2 outline-none hover:bg-slate-100 dark:hover:bg-slate-800"
                                    >
                                      <ExternalLink className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
                                      Tam Sayfa Editörünü Aç
                                    </Link>
                                  </DropdownMenu.Item>

                                  {lex.conceptId && (
                                    <DropdownMenu.Item asChild>
                                      <Link
                                        href={`/kavram/${encodeURIComponent(lex.conceptId)}`}
                                        className="flex cursor-pointer items-center gap-2 rounded-lg px-2.5 py-2 outline-none hover:bg-slate-100 dark:hover:bg-slate-800"
                                      >
                                        <Tag className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
                                        Kavram Ağında Gör (#{lex.conceptId})
                                      </Link>
                                    </DropdownMenu.Item>
                                  )}

                                  <DropdownMenu.Separator className="my-1 h-px bg-slate-200 dark:bg-slate-800" />

                                  <DropdownMenu.Item
                                    onSelect={() => copyId(lex.id)}
                                    className="flex cursor-pointer items-center gap-2 rounded-lg px-2.5 py-2 outline-none hover:bg-slate-100 dark:hover:bg-slate-800"
                                  >
                                    <Copy className="w-3.5 h-3.5 text-slate-500" />
                                    Lexeme ID Kopyala
                                  </DropdownMenu.Item>
                                </DropdownMenu.Content>
                              </DropdownMenu.Portal>
                            </DropdownMenu.Root>
                          </Flex>
                        </Table.Cell>
                      </Table.Row>
                    );
                  })}
                </Table.Body>
              </Table.Root>

              {/* Sayfalama Alt Çubuğu */}
              {totalPages > 1 && (
                <Flex
                  justify="between"
                  align="center"
                  px="4"
                  py="3"
                  className="border-t border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900/60"
                >
                  <Button
                    size="2"
                    variant="soft"
                    color="gray"
                    disabled={page <= 1}
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                  >
                    <ChevronLeft className="w-4 h-4" /> Önceki Sayfa
                  </Button>

                  <Text size="2" color="gray">
                    Sayfa <strong className="text-slate-900 dark:text-slate-100">{page}</strong> / {totalPages} (
                    {filteredLexemes.length.toLocaleString("tr-TR")} kayıt)
                  </Text>

                  <Button
                    size="2"
                    variant="soft"
                    color="gray"
                    disabled={page >= totalPages}
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  >
                    Sonraki Sayfa <ChevronRight className="w-4 h-4" />
                  </Button>
                </Flex>
              )}
            </Card>
          )}
        </Box>

        {/* Radix UI Dialog — Satır İçi Hızlı Kürasyon Modalı */}
        <Dialog.Root open={Boolean(editingLex)} onOpenChange={(open) => !open && setEditingLex(null)}>
          <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 z-50 bg-black/50 dark:bg-black/70 backdrop-blur-xs" />
            <Dialog.Content className="fixed left-1/2 top-1/2 z-50 max-h-[90vh] w-[calc(100vw-2rem)] max-w-2xl -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-6 text-slate-900 dark:text-slate-100 shadow-2xl">
              <Flex justify="between" align="start" gap="3">
                <Box>
                  <Badge color="blue" variant="soft" size="1" className="font-mono">
                    {editingLex?.id}
                  </Badge>
                  <Dialog.Title className="mt-1.5 text-xl font-bold">
                    Lexeme Hızlı Kürasyon: {editingLex?.form}
                  </Dialog.Title>
                  <Dialog.Description className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                    Değişiklikleri önce Dry-Run ile önizleyebilir veya doğrudan lexemes.json ve audit_log.jsonl
                    dosyalarına işleyebilirsiniz.
                  </Dialog.Description>
                </Box>

                <Dialog.Close asChild>
                  <IconButton variant="ghost" color="gray" aria-label="Kapat">
                    <X className="w-4 h-4" />
                  </IconButton>
                </Dialog.Close>
</Flex>

              <Separator size="4" my="4" />

              <Grid columns={{ initial: "1", sm: "2" }} gap="3">
                <Box>
                  <Text as="label" size="1" weight="medium" color="gray">
                    Çerkesçe Form
                  </Text>
                  <TextField.Root
                    mt="1"
                    value={formState.form}
                    onChange={(e) => setFormState({ ...formState, form: e.target.value })}
                  />
                </Box>

                <Box>
                  <Text as="label" size="1" weight="medium" color="gray">
                    Lehçe (COMMON / ADY / KBD)
                  </Text>
                  <Box mt="1">
                    <SegmentedControl.Root
                      value={formState.dialect}
                      onValueChange={(v) => setFormState({ ...formState, dialect: v })}
                      size="2"
                      className="w-full"
                    >
                      <SegmentedControl.Item value="COMMON">COMMON</SegmentedControl.Item>
                      <SegmentedControl.Item value="ADY">ADY (Batı)</SegmentedControl.Item>
                      <SegmentedControl.Item value="KBD">KBD (Doğu)</SegmentedControl.Item>
                    </SegmentedControl.Root>
                  </Box>
                </Box>

                <Box>
                  <Text as="label" size="1" weight="medium" color="gray">
                    Türkçe Anlam (TR)
                  </Text>
                  <TextField.Root
                    mt="1"
                    value={formState.tr}
                    onChange={(e) => setFormState({ ...formState, tr: e.target.value })}
                  />
                </Box>

                <Box>
                  <Text as="label" size="1" weight="medium" color="gray">
                    İngilizce Anlam (EN)
                  </Text>
                  <TextField.Root
                    mt="1"
                    value={formState.en}
                    onChange={(e) => setFormState({ ...formState, en: e.target.value })}
                  />
                </Box>

                <Box>
                  <Text as="label" size="1" weight="medium" color="gray">
                    Rusça Anlam (RU)
                  </Text>
                  <TextField.Root
                    mt="1"
                    value={formState.ru}
                    onChange={(e) => setFormState({ ...formState, ru: e.target.value })}
                  />
                </Box>

                <Box>
                  <Text as="label" size="1" weight="medium" color="gray">
                    Arapça Anlam (AR)
                  </Text>
                  <TextField.Root
                    mt="1"
                    value={formState.ar}
                    onChange={(e) => setFormState({ ...formState, ar: e.target.value })}
                  />
                </Box>

                <Box>
                  <Text as="label" size="1" weight="medium" color="gray">
                    Kök ID&apos;leri (virgülle ayırın)
                  </Text>
                  <TextField.Root
                    mt="1"
                    placeholder="ör. R-PSY, R-001"
                    value={formState.rootIds}
                    onChange={(e) => setFormState({ ...formState, rootIds: e.target.value })}
                  />
                </Box>

                <Box>
                  <Text as="label" size="1" weight="medium" color="gray">
                    Kavram ID (Concept)
                  </Text>
                  <TextField.Root
                    mt="1"
                    placeholder="ör. WATER"
                    value={formState.conceptId}
                    onChange={(e) => setFormState({ ...formState, conceptId: e.target.value.toUpperCase() })}
                  />
                </Box>

                <Box>
                  <Text as="label" size="1" weight="medium" color="gray">
                    Kelime Ailesi ID (Word Family)
                  </Text>
                  <TextField.Root
                    mt="1"
                    placeholder="ör. WF-012"
                    value={formState.wordFamilyId}
                    onChange={(e) => setFormState({ ...formState, wordFamilyId: e.target.value })}
                  />
                </Box>

                <Box>
                  <Text as="label" size="1" weight="medium" color="gray">
                    IPA / Sözcük Türü (POS)
                  </Text>
                  <Flex gap="2" mt="1">
                    <TextField.Root
                      placeholder="/psə/"
                      value={formState.ipa}
                      onChange={(e) => setFormState({ ...formState, ipa: e.target.value })}
                    />
                    <TextField.Root
                      placeholder="noun / verb"
                      value={formState.partOfSpeech}
                      onChange={(e) => setFormState({ ...formState, partOfSpeech: e.target.value })}
                    />
                  </Flex>
                </Box>
              </Grid>

              {diffPreview && diffPreview.length > 0 && (
                <Box className="mt-4 rounded-xl border border-amber-400/70 dark:border-amber-700/60 bg-amber-50 dark:bg-amber-950/30 p-3 text-xs">
                  <Text weight="bold" color="amber" size="2">
                    Önizlenen Değişiklikler (Dry-Run Diff):
                  </Text>
                  <Box className="mt-2 space-y-1 font-mono">
                    {diffPreview.map((d) => (
                      <div key={d.field} className="flex flex-wrap gap-2">
                        <span className="text-slate-700 dark:text-slate-300">{d.field}:</span>
                        <span className="text-rose-600 dark:text-rose-400 line-through">
                          {String(d.oldValue || "boş")}
                        </span>
                        <span>→</span>
                        <span className="text-emerald-700 dark:text-emerald-400">
                          {String(d.newValue || "boş")}
                        </span>
                      </div>
                    ))}
                  </Box>
                </Box>
              )}

              {saveNotice && (
                <Callout.Root
                  color={saveNotice.type === "ok" ? "green" : "red"}
                  variant="surface"
                  className="mt-4"
                >
                  <Callout.Icon>
                    {saveNotice.type === "ok" ? (
                      <CheckCircle2 className="w-4 h-4" />
                    ) : (
                      <AlertCircle className="w-4 h-4" />
                    )}
                  </Callout.Icon>
                  <Callout.Text>{saveNotice.text}</Callout.Text>
                </Callout.Root>
              )}

              <Flex justify="between" align="center" mt="5" pt="4" className="border-t border-slate-200 dark:border-slate-800">
                <Button asChild variant="ghost" color="gray" size="2">
                  <Link href={`/admin/curation/${editingLex?.id}`}>
                    <ExternalLink className="w-3.5 h-3.5" /> Tam Sayfa Editöre Git
                  </Link>
                </Button>

                <Flex gap="2">
                  <Button
                    variant="soft"
                    color="amber"
                    disabled={saving}
                    onClick={() => handleDryRunOrSave(false)}
                  >
                    Önizle (Dry-Run)
                  </Button>
                  <Button
                    variant="solid"
                    color="blue"
                    disabled={saving}
                    onClick={() => handleDryRunOrSave(true)}
                  >
                    {saving ? "Kaydediliyor..." : "Onayla ve Kaydet"}
                  </Button>
                </Flex>
              </Flex>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </Box>
    </Theme>
  );
}
