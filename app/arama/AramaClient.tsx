"use client"

// MVP-2 Gozlem: Latin mi Kiril mi sayaci, localStorage'da tutulur

function gozlemOku() {
  try {
    const l = localStorage.getItem("cerkesce-latin-sayac") || "0";
    const k = localStorage.getItem("cerkesce-kiril-sayac") || "0";
    return { l, k };
  } catch { return { l: "0", k: "0" }; }
}

function gozlemSayac(q: string) {
  try {
    const isLatin = q.length > 0 && !/[\u0400-\u04FF]/.test(q);
    const key = isLatin ? "cerkesce-latin-sayac" : "cerkesce-kiril-sayac";
    const cur = parseInt(localStorage.getItem(key) || "0", 10) || 0;
    localStorage.setItem(key, String(cur + 1));
  } catch {}
}
;

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  Theme, Container, Flex, Box, Text, Heading, TextField, Button, Card, Badge, Separator, IconButton, Tooltip, SegmentedControl, Spinner,
} from "@radix-ui/themes";
import { MagnifyingGlassIcon, HeartIcon, Cross2Icon, SunIcon, MoonIcon } from "@radix-ui/react-icons";
import { AkilliKlavye } from "@/components/features/AkilliKlavye";
import "./arama.css";
import { getDialectMapper } from "@/lib/dialectRules";
import { DialectCode } from "@/domain/dialect/types/DialectTypes";

type LexemeResult = { id: string; form: string; tr: string; ipa: string; partOfSpeech: string; dialectVariants?: { adyghe?: string; kabardian?: string }; };
type RawResult = Record<string, unknown>;
const POPULAR_TERMS = ["гу", "псы", "унэ", "шы", "псалъэ"];
const GECMIS_KEY = "cerkesce-arama-gecmisi";
const FAVORI_KEY = "cerkesce-favoriler";

function asString(v: unknown): string { if (typeof v === "string") return v; return v == null ? "" : String(v); }
function normalizeResult(raw: RawResult): LexemeResult {
  return {
    id: asString(raw.id ?? raw.lexemeId ?? raw.form),
    form: asString(raw.form ?? raw.headword ?? raw.lexeme),
    tr: asString(raw.tr ?? raw.turkish ?? raw.meaning_tr ?? raw.meaning),
    ipa: asString(raw.ipa ?? raw.pronunciation),
    partOfSpeech: asString(raw.partOfSpeech ?? raw.pos),
    dialectVariants: (raw.dialectVariants as { adyghe?: string; kabardian?: string } | undefined),
  };
}

export default function AramaClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<LexemeResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [error, setError] = useState("");
  const [ms, setMs] = useState(0);
  const [appearance, setAppearance] = useState<"light" | "dark">("light");
  const [favorites, setFavorites] = useState<Set<string>>(() => new Set());
  const [showFavorites, setShowFavorites] = useState(false);
  const [favoritesLoaded, setFavoritesLoaded] = useState(false);
  const [gecmis, setGecmis] = useState<string[]>([]);
  const [klavyeAcik, setKlavyeAcik] = useState(false);
  const [oneriler, setOneriler] = useState<LexemeResult[]>([]);
  const [oneriAcik, setOneriAcik] = useState(false);
  const [dialect, setDialect] = useState<"all" | "adyghe" | "kabardian">("all");
  const requestIdRef = useRef(0);
  const initialSearchDoneRef = useRef(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    try { setAppearance(window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"); } catch {}
  }, []);

  useEffect(() => {
    try {
      const f = localStorage.getItem(FAVORI_KEY);
      if (f) { const a = JSON.parse(f); if (Array.isArray(a)) setFavorites(new Set(a.filter((x: unknown) => typeof x === "string"))); }
    } catch {}
    setFavoritesLoaded(true);
    try {
      const g = localStorage.getItem(GECMIS_KEY);
      if (g) { const a = JSON.parse(g); if (Array.isArray(a)) setGecmis(a.filter((x: unknown) => typeof x === "string").slice(0, 8)); }
    } catch {}
  }, []);

  useEffect(() => {
    if (!favoritesLoaded) return;
    try { localStorage.setItem(FAVORI_KEY, JSON.stringify([...favorites])); } catch {}
  }, [favorites, favoritesLoaded]);

  // --- TEK Escape effect, baska yok ---
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setQuery(""); setResults([]); setSearched(false); setError(""); setOneriAcik(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // --- Oneriler ---
  useEffect(() => {
    const trimmed = query.trim();
    if (trimmed.length < 2) { setOneriler([]); setOneriAcik(false); return; }
    const t = setTimeout(async () => {
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(trimmed)}&limit=5`);
        if (!res.ok) return;
        const data = await res.json();
        const list: LexemeResult[] = Array.isArray(data.results) ? data.results.map((r: RawResult) => normalizeResult(r)) : [];
        setOneriler(list.filter((r: LexemeResult) => r.form !== trimmed && r.form.toLowerCase() !== trimmed.toLowerCase()).slice(0, 5));
        setOneriAcik(true);
      } catch {}
    }, 300);
    return () => clearTimeout(t);
  }, [query]);

  const gecmiseEkle = useCallback((term: string) => {
    setGecmis((prev: string[]) => {
      const next = [term, ...prev.filter((x: string) => x !== term)].slice(0, 8);
      try { localStorage.setItem(GECMIS_KEY, JSON.stringify(next)); } catch {}
      return next;
    });
  }, []);

  const gecmistenSil = (term: string) => {
    setGecmis((prev: string[]) => {
      const next = prev.filter((x: string) => x !== term);
      try { localStorage.setItem(GECMIS_KEY, JSON.stringify(next)); } catch {}
      return next;
    });
  };
  const gecmisiTemizle = () => { setGecmis([]); try { localStorage.removeItem(GECMIS_KEY); } catch {} };
  const harfEkle = (harf: string) => { setQuery((q: string) => q + harf); inputRef.current?.focus(); };

  const doSearch = useCallback(async (term: string) => {
    const trimmed = term.trim();
    if (!trimmed) {
      requestIdRef.current += 1;
      setResults([]); setSearched(false); setError(""); setMs(0);
      router.replace("/arama", { scroll: false });
      return;
    }
    const requestId = ++requestIdRef.current;
    const started = performance.now();
    setLoading(true); setSearched(true); setError("");
    gecmiseEkle(trimmed); setOneriAcik(false);
    try {
      gozlemSayac(trimmed);
      const res = await fetch(`/api/search?q=${encodeURIComponent(trimmed)}&limit=20`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      if (requestId !== requestIdRef.current) return;
      const list = Array.isArray(data.results) ? data.results : [];
      setResults(list.map((r: RawResult) => normalizeResult(r)));
      setMs(typeof data.ms === "number" ? data.ms : Math.round(performance.now() - started));
    } catch {
      if (requestId !== requestIdRef.current) return;
      setResults([]); setMs(0); setError("Arama şu anda tamamlanamadı. Lütfen tekrar dene.");
    } finally {
      if (requestId === requestIdRef.current) setLoading(false);
    }
    if (requestId === requestIdRef.current) router.replace(`/arama?q=${encodeURIComponent(trimmed)}`, { scroll: false });
  }, [router, gecmiseEkle]);

  useEffect(() => {
    if (initialSearchDoneRef.current) return;
    const q = searchParams.get("q") || "";
    if (q) { initialSearchDoneRef.current = true; setQuery(q); doSearch(q); }
  }, [searchParams, doSearch]);

  const visibleResults = showFavorites ? results.filter((r: LexemeResult) => favorites.has(r.id)) : results;
  const toggleFavorite = (id: string) => {
    setFavorites((p: Set<string>) => { const n = new Set(p); if (n.has(id)) n.delete(id); else n.add(id); return n; });
  };
  const toggleAppearance = () => setAppearance((c: "light" | "dark") => (c === "dark" ? "light" : "dark"));

  return (
    <Theme accentColor="indigo" grayColor="slate" radius="large" scaling="110%" appearance={appearance} hasBackground>
      <Box className="arama-shell">
        <a className="skip-link" href="#icerik">İçeriğe geç</a>
        <Container size="3" className="arama-container">
          <Flex justify="end" align="center" gap="2" className="topbar-mini">
            <Badge variant="soft" color="indigo" highContrast>MVP-1</Badge>
            <Button variant="soft" size="2" onClick={toggleAppearance} aria-pressed={appearance === "dark"} aria-label={appearance === "dark" ? "Açık temaya geç" : "Koyu temaya geç"}>
              {appearance === "dark" ? (<><SunIcon aria-hidden="true" /> Açık tema</>) : (<><MoonIcon aria-hidden="true" /> Koyu tema</>)}
            </Button>
          </Flex>
          <main id="icerik">
            <Card variant="surface" className="search-panel">
              <form className="search-form" role="search" aria-label="Sözlükte kelime ara" onSubmit={(e) => { e.preventDefault(); doSearch(query); }}>
                <Text as="label" htmlFor="arama-girdisi" size="2" weight="medium" className="search-label">Sözlükte ara</Text>
                <Flex gap="2" className="search-controls">
                  <TextField.Root id="arama-girdisi" size="3" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Türkçe veya Çerkesçe ara..." aria-label="Aranacak kelime" autoComplete="off" spellCheck={false} className="search-input">
                    <TextField.Slot><MagnifyingGlassIcon aria-hidden="true" /></TextField.Slot>
                  </TextField.Root>
                  <Button type="submit" size="3" highContrast disabled={loading} className="search-submit">{loading ? <Spinner size="2" /> : "Ara"}</Button>
                </Flex>
                <Flex justify="between" align="center" gap="3" wrap="wrap" className="search-meta">
                  
                  <Text size="1" color="gray"><span className="key-hint">Enter</span><span className="key-hint-label"> ile ara</span><span className="key-hint" style={{ marginLeft: 8 }}>Esc</span><span className="key-hint-label"> ile temizle</span></Text>
                </Flex>
              </form>

              {oneriAcik && oneriler.length > 0 && !loading && (
                <Box className="oneri-kutu">
                  <Text size="1" weight="medium" className="oneri-baslik">Bunu mu demek istediniz?</Text>
                  <Flex gap="2" wrap="wrap" className="oneri-list">
                    {oneriler.map((o: LexemeResult) => (
                      <button key={o.id || o.form} type="button" className="oneri-chip" title={o.tr} onClick={() => { setQuery(o.form); setOneriAcik(false); doSearch(o.form); }}>
                        <span lang="ady-Cyrl" className="oneri-form">{o.form}</span>
                        {o.tr && <span className="oneri-tr">{o.tr}</span>}
                      </button>
                    ))}
                  </Flex>
                </Box>
              )}


              <Flex justify="between" align="center" gap="2" className="klavye-toggle-row" style={{ marginTop: "16px" }}>
                <Text size="1" color="gray">Çerkesçe harfler</Text>
                <Button variant="soft" size="2" onClick={() => setKlavyeAcik((v: boolean) => !v)} aria-expanded={klavyeAcik} aria-controls="akilli-klavye">
                  {klavyeAcik ? "Klavye ✕" : "⌨ Klavyeyi aç"}
                </Button>
              </Flex>
              {klavyeAcik && (
                <Box id="akilli-klavye" className="klavye-wrap">
                  <AkilliKlavye
                    onKeyPress={(char: string) => harfEkle(char)}
                    onBackspace={() => setQuery((q: string) => q.slice(0, -1))}
                    onClear={() => setQuery("")}
                  />
                </Box>
              )}

              <Separator my="4" />
              <Flex align="center" gap="2" wrap="wrap" className="popular-row">
                <Text size="1" color="gray">Hızlı başlangıç</Text>
                {POPULAR_TERMS.map((term: string) => (
                  <Button key={term} variant="soft" size="1" onClick={() => { setQuery(term); doSearch(term); }} aria-label={`Popüler arama: ${term}`}><span lang="ady-Cyrl">{term}</span></Button>
                ))}
              </Flex>

              {gecmis.length > 0 && (
                <>
                  <Separator my="4" />
                  <Flex align="center" gap="2" wrap="wrap" className="popular-row">
                    <Text size="1" color="gray">Son aramalar</Text>
                    {gecmis.map((term: string) => (
                      <span key={term} className="history-chip">
                        <button type="button" className="history-chip-btn" onClick={() => { setQuery(term); doSearch(term); }}>{term}</button>
                        <button type="button" className="history-chip-x" aria-label={`${term} geçmişten sil`} onClick={() => gecmistenSil(term)}>✕</button>
                      </span>
                    ))}
                    <button type="button" className="history-clear" onClick={gecmisiTemizle}>Temizle</button>
                  </Flex>
                  <Flex align="center" gap="2" wrap="wrap" className="popular-row">
                    <Text size="1" color="gray">Gozlem: Latin {gozlemOku().l} - Kiril {gozlemOku().k}</Text>
                  </Flex>
                  <Flex align="center" gap="2" wrap="wrap" className="popular-row">
                    <Text size="1" color="gray">Dialect:</Text>
                    <button type="button" style={{ background: dialect === "all" ? "#e5e7eb" : "#f3f4f6", color: "#111827", border: "1px solid #d1d5db", borderRadius: "999px", padding: "4px 12px", minWidth: "64px", height: "28px", fontSize: "12px", fontWeight: dialect === "all" ? 700 : 400 }} onClick={() => setDialect("all")}>Зэкӏэ</button>
                    <button type="button" style={{ background: dialect === "adyghe" ? "#2563eb" : "#dbeafe", color: dialect === "adyghe" ? "#fff" : "#1e40af", border: "1px solid #93c5fd", borderRadius: "999px", padding: "4px 12px", minWidth: "64px", height: "28px", fontSize: "12px", fontWeight: dialect === "adyghe" ? 700 : 400 }} onClick={() => setDialect("adyghe")}>ADY</button>
                    <button type="button" style={{ background: dialect === "kabardian" ? "#16a34a" : "#dcfce7", color: dialect === "kabardian" ? "#fff" : "#166534", border: "1px solid #86efac", borderRadius: "999px", padding: "4px 12px", minWidth: "64px", height: "28px", fontSize: "12px", fontWeight: dialect === "kabardian" ? 700 : 400 }} onClick={() => setDialect("kabardian")}>KBD</button>
                  </Flex>
                </>
              )}
            </Card>

            <Separator my="6" />

            <section aria-labelledby="sonuclar-baslik" className="results-section">
              <Flex justify="between" align="end" gap="4" wrap="wrap" className="results-heading">
                <div>
                  <Text size="1" color="gray" className="section-kicker">SÖZLÜK</Text>
                  <Heading as="h2" size="6" weight="bold" id="sonuclar-baslik">Arama sonuçları</Heading>
                  <Text size="2" color="gray" role="status" aria-live="polite">
                    {loading ? "Kelimeler aranıyor…" : searched ? `${visibleResults.length} sonuç gösteriliyor • ${ms} ms` : "Bir kelime ara veya popüler aramalardan başla."}
                  </Text>
                </div>
                <SegmentedControl.Root value={showFavorites ? "favorites" : "all"} onValueChange={(v: string) => setShowFavorites(v === "favorites")} aria-label="Sonuç filtresi">
                  <SegmentedControl.Item value="all">Tüm sonuçlar</SegmentedControl.Item>
                  <SegmentedControl.Item value="favorites">Favoriler ({favorites.size})</SegmentedControl.Item>
                </SegmentedControl.Root>
              </Flex>

              <div className="results-list" aria-busy={loading}>
                {loading && (
                  <Card variant="surface" className="result-card loading-card">
                    <div className="loading-lines" aria-hidden="true"><span /><span /><span /></div>
                    <Text size="2" color="gray">Sonuçlar hazırlanıyor…</Text>
                  </Card>
                )}
                {!loading && error && (
                  <Card variant="surface" className="empty-card" role="alert">
                    <Box className="empty-icon" aria-hidden="true"><Cross2Icon /></Box>
                    <Text weight="bold">Arama tamamlanamadı</Text>
                    <Text size="2" color="gray">{error}</Text>
                    <Button variant="soft" onClick={() => doSearch(query)}>Yeniden dene</Button>
                  </Card>
                )}
                {!loading && !error && searched && visibleResults.length === 0 && (
                  <Card variant="surface" className="empty-card">
                    <Box className="empty-icon" aria-hidden="true"><Cross2Icon /></Box>
                    <Text weight="bold">{showFavorites ? "Henüz favorin yok" : "Sonuç bulunamadı"}</Text>
                    <Text size="2" color="gray">{showFavorites ? "Bir kelimenin yanındaki kalp simgesini seçerek buraya ekleyebilirsin." : "Başka bir kelime dene veya popüler aramalardan birini seç."}</Text>
                  </Card>
                )}
                {!loading && visibleResults.map((result: LexemeResult, index: number) => {
                  const displayForm = (() => {
                    if (dialect === "all") return result.form;
                    const pre = dialect === "adyghe" ? result.dialectVariants?.adyghe : result.dialectVariants?.kabardian;
                    if (pre) return pre;
                    // dialectVariants yoksa, eski DialectMapper kuralla uret
                    try {
                      const m = getDialectMapper();
                      const src = dialect === "adyghe" ? DialectCode.KBD : DialectCode.ADY;
                      const tgt = dialect === "adyghe" ? DialectCode.ADY : DialectCode.KBD;
                      return m.transform(result.form, src, tgt);
                    } catch { return result.form; }
                  })();
                  const isFavorite = favorites.has(result.id);
                  const accessibleName = [result.form, result.tr, "Sözlük detayına git"].filter(Boolean).join(". ");
                  return (
                    <Card key={result.id || `${result.form}-${index}`} variant="surface" className="result-card">
                      <Flex align="center" gap="3" className="result-layout">
                        <Link href={`/lexeme/${result.id}`} className="result-main" aria-label={accessibleName}>
                          <Flex align="center" gap="3" className="result-word-row">
                            <Heading as="h3" size="5" weight="bold" className="result-word"><span lang="ady-Cyrl">{displayForm}</span></Heading>
                            {result.partOfSpeech && (<Badge variant="soft" color="indigo" highContrast>{result.partOfSpeech}</Badge>)}
                          </Flex>
                          <Text size="2" color="gray" className="result-ipa">{result.ipa ? `[${result.ipa}]` : "Telaffuz bilgisi yok"}</Text>
                        </Link>
                        <Flex align="center" gap="3" className="result-meaning">
                          <Text size="3" weight="medium">{result.tr || "Anlam eklenmemiş"}</Text>
                          <Tooltip content={isFavorite ? "Favorilerden çıkar" : "Favorilere ekle"}>
                            <IconButton type="button" variant={isFavorite ? "soft" : "ghost"} color={isFavorite ? "red" : "gray"} highContrast aria-label={isFavorite ? "Favorilerden çıkar" : "Favorilere ekle"} aria-pressed={isFavorite} onClick={() => toggleFavorite(result.id)}>
                              <HeartIcon aria-hidden="true" />
                            </IconButton>
                          </Tooltip>
                        </Flex>
                      </Flex>
                    </Card>
                  );
                })}
              </div>
            </section>

            <footer className="page-footer">
              <Separator my="5" />
              <Flex justify="between" align="center" gap="3" wrap="wrap">
                <Text size="2" color="gray">Çerkesçe kelimeleri keşfet, öğren, paylaş.</Text>
                <Text size="1" color="gray"><span lang="ady-Cyrl">гу • псы • унэ • шы</span></Text>
              </Flex>
            </footer>
          </main>
        </Container>
      </Box>
    </Theme>
  );
}
