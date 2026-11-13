"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  Container,
  Box,
  Flex,
  Grid,
  Card,
  Badge,
  Button,
  Table,
  Separator,
  Text,
  Heading,
  Callout,
} from "@radix-ui/themes";
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
  if (d === "COMMON") return { label: "Ortak (COMMON)", color: "indigo" as const };
  if (d === "WESTERN" || d === "ADY" || String(id || "").includes("ADY")) {
    return { label: "Batı Çerkesçesi (Адыгабзэ)", color: "jade" as const };
  }
  return { label: "Doğu Çerkesçesi (Къэбэрдей-Шэрджэсыбзэ)", color: "cyan" as const };
}

export default function LexemeDetailClient({
  lex,
  variants,
  verbConjugation,
  declension,
  relatedLexemes,
}: LexemeDetailProps) {
  const [isFav, setIsFav] = useState(false);
  const [copied, setCopied] = useState(false);

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
    <Container size="3" px={{ initial: "4", sm: "6" }} py="6">
      <Flex direction="column" gap="5">
        {/* WCAG 2.0 Üst Gezinme Çubuğu */}
        <nav aria-label="Madde üst gezinme">
          <Flex wrap="wrap" align="center" justify="between" gap="3">
            <Button asChild variant="ghost" color="indigo" size="2" highContrast>
              <Link href="/sozluk">
                <ArrowLeft className="w-4 h-4" aria-hidden="true" />
                Sözlüğe dön
              </Link>
            </Button>

            <Flex align="center" gap="2">
              <Badge color={dialectBadge.color} variant="soft" size="2" highContrast>
                {dialectBadge.label}
              </Badge>
              <Button
                type="button"
                size="2"
                variant="soft"
                color={copied ? "jade" : "gray"}
                highContrast
                onClick={handleShare}
                aria-label={copied ? "Bağlantı kopyalandı" : "Madde bağlantısını kopyala"}
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5" aria-hidden="true" />
                    <Text size="1">Kopyalandı</Text>
                  </>
                ) : (
                  <Share2 className="w-3.5 h-3.5" aria-hidden="true" />
                )}
              </Button>
            </Flex>
          </Flex>
        </nav>

        {/* Ana Madde Başlığı ve Çok Dilli Anlam Kartı */}
        <Card size="3" variant="surface" asChild>
          <section aria-labelledby="lexeme-main-heading">
            <Flex direction="column" gap="3">
              <Flex wrap="wrap" align="baseline" justify="between" gap="3">
                <Flex wrap="wrap" align="baseline" gap="3">
                  <Heading id="lexeme-main-heading" as="h1" size="8" weight="bold">
                    {lex.form}
                  </Heading>
                  {lex.ipa && (
                    <Badge
                      variant="soft"
                      color="gray"
                      size="2"
                      highContrast
                      className="font-mono"
                      aria-label={`Fonetik okunuş: ${lex.ipa}`}
                    >
                      <Volume2 className="w-3.5 h-3.5" aria-hidden="true" />
                      [{lex.ipa}]
                    </Badge>
                  )}
                </Flex>

                <Button
                  type="button"
                  size="2"
                  variant={isFav ? "solid" : "soft"}
                  color={isFav ? "crimson" : "gray"}
                  highContrast
                  aria-pressed={isFav}
                  onClick={toggleFavorite}
                >
                  <Heart className={`w-4 h-4 ${isFav ? "fill-current" : ""}`} aria-hidden="true" />
                  {isFav ? "Favorilerde" : "Favorilere ekle"}
                </Button>
              </Flex>

              {/* Yapısal Etiketler (Kök, Aile, Kavram, Sözcük Türü) */}
              <Flex wrap="wrap" align="center" gap="2" pt="1">
                {lex.partOfSpeech && (
                  <Badge color="crimson" variant="surface" size="2" highContrast>
                    {lex.partOfSpeech}
                  </Badge>
                )}

                {lex.rootIds?.map((r) => (
                  <Badge key={r} asChild color="violet" variant="soft" size="2" highContrast className="font-mono">
                    <Link href={`/sozluk/root/${encodeURIComponent(r)}`} aria-label={`Kök sayfasına git: ${r}`}>
                      <GitBranch className="w-3 h-3" aria-hidden="true" />
                      {r}
                    </Link>
                  </Badge>
                ))}

                {lex.wordFamilyId && (
                  <Badge asChild color="jade" variant="soft" size="2" highContrast className="font-mono">
                    <Link
                      href={`/sozluk/family/${encodeURIComponent(lex.wordFamilyId)}`}
                      aria-label={`Kelime ailesine git: ${lex.wordFamilyId}`}
                    >
                      <Layers className="w-3 h-3" aria-hidden="true" />
                      {lex.wordFamilyId}
                    </Link>
                  </Badge>
                )}

                {lex.conceptId && (
                  <Badge asChild color="amber" variant="soft" size="2" highContrast>
                    <Link
                      href={`/kavram/${encodeURIComponent(String(lex.conceptId).toLowerCase())}`}
                      aria-label={`Kavram sayfasına git: ${lex.conceptId}`}
                    >
                      <Tag className="w-3 h-3" aria-hidden="true" />
                      {lex.conceptId}
                    </Link>
                  </Badge>
                )}
              </Flex>

              <Separator size="4" my="2" />

              {/* Çok Dilli Çeviriler ve Morfolojik Ayrıştırma */}
              <Flex direction="column" gap="2">
                {lex.derivation?.components && lex.derivation.components.length > 0 && (
                  <Flex wrap="wrap" align="center" gap="2">
                    <Text size="1" weight="bold" color="gray" className="uppercase tracking-wider">
                      ПСАЛЪЭ ЛЪАБЖЬЭ (Kök &amp; Ekler):
                    </Text>
                    <Badge variant="soft" color="indigo" size="2" highContrast className="font-mono">
                      {lex.derivation.components.join(" + ")}
                    </Badge>
                  </Flex>
                )}

                {translations.tr && (
                  <Box>
                    <Text size="1" weight="bold" color="gray" className="uppercase tracking-wider mr-2">
                      TÜRKÇE (МЫХЬЭНЭ):
                    </Text>
                    <Text size="3" weight="medium">{translations.tr}</Text>
                  </Box>
                )}
                {translations.en && (
                  <Box>
                    <Text size="1" weight="bold" color="gray" className="uppercase tracking-wider mr-2">
                      İNGİLİZCE (ИНДЖЫЛЫБЗЭ):
                    </Text>
                    <Text size="3">{translations.en}</Text>
                  </Box>
                )}
                {translations.ru && (
                  <Box>
                    <Text size="1" weight="bold" color="gray" className="uppercase tracking-wider mr-2">
                      RUSÇA (УРЫСЫБЗЭ):
                    </Text>
                    <Text size="3">{translations.ru}</Text>
                  </Box>
                )}
                {translations.ar && (
                  <Box>
                    <Text size="1" weight="bold" color="gray" className="uppercase tracking-wider mr-2">
                      ARAPÇA (ХЬЭРЫПЫБЗЭ):
                    </Text>
                    <Text size="3" dir="rtl">{translations.ar}</Text>
                  </Box>
                )}
                {lex.literalMeaning && (
                  <Box>
                    <Text size="1" weight="bold" color="gray" className="uppercase tracking-wider mr-2">
                      KELİME ANLAMI (LITERAL):
                    </Text>
                    <Text size="3" className="italic">{lex.literalMeaning}</Text>
                  </Box>
                )}
              </Flex>
            </Flex>
          </section>
        </Card>

        {/* UDL Lehçe Karşılaştırma Kartı (Adıgece ↔ Kabardeyce) */}
        {variants && (
          <Card size="3" variant="surface" asChild>
            <section aria-labelledby="dialect-variants-heading">
              <Flex direction="column" gap="3">
                <Flex wrap="wrap" align="center" justify="between" gap="2">
                  <Heading id="dialect-variants-heading" as="h2" size="4" weight="bold">
                    <Flex align="center" gap="2">
                      <Sparkles className="w-4 h-4 text-[var(--indigo-9)]" aria-hidden="true" />
                      Diyalekt Karşılıkları &amp; Sözlük Varyantları
                    </Flex>
                  </Heading>
                  <Badge color="indigo" variant="soft" size="1" highContrast>
                    <CheckCircle2 className="w-3 h-3" aria-hidden="true" />
                    Huvaj &amp; AIG Doğrulamalı
                  </Badge>
                </Flex>

                <Grid columns={{ initial: "1", sm: "2" }} gap="3">
                  <Card size="2" variant="surface">
                    <Flex direction="column" gap="2">
                      <Text size="1" weight="bold" color="amber" highContrast className="uppercase tracking-wider">
                        BATI ÇERKESÇESİ (ADÎĞECE)
                      </Text>
                      <Flex wrap="wrap" align="center" gap="2">
                        <Text size="5" weight="bold">{variants.adyghePrimary}</Text>
                        <Badge size="1" color="amber" variant="soft" highContrast>
                          Huvaj / Akademik
                        </Badge>
                      </Flex>
                      {variants.adygheAlternatives.map((alt) => (
                        <Flex key={alt.form} wrap="wrap" align="center" gap="2">
                          <Text size="1" color="gray">
                            Alternatif: <strong>{alt.form}</strong>
                          </Text>
                          <Badge size="1" color="gray" variant="soft">
                            {alt.sourceLabel}
                          </Badge>
                        </Flex>
                      ))}
                    </Flex>
                  </Card>

                  <Card size="2" variant="surface">
                    <Flex direction="column" gap="2">
                      <Text size="1" weight="bold" color="sky" highContrast className="uppercase tracking-wider">
                        DOĞU ÇERKESÇESİ (KABARDEYCE)
                      </Text>
                      <Flex wrap="wrap" align="center" gap="2">
                        <Text size="5" weight="bold">{variants.kabardianPrimary}</Text>
                        <Badge size="1" color="sky" variant="soft" highContrast>
                          Standart
                        </Badge>
                      </Flex>
                      {variants.kabardianAlternatives.map((alt) => (
                        <Flex key={alt.form} wrap="wrap" align="center" gap="2">
                          <Text size="1" color="gray">
                            Alternatif: <strong>{alt.form}</strong>
                          </Text>
                          <Badge size="1" color="gray" variant="soft">
                            {alt.sourceLabel}
                          </Badge>
                        </Flex>
                      ))}
                    </Flex>
                  </Card>
                </Grid>
              </Flex>
            </section>
          </Card>
        )}

        {/* Fiil Çekim Tablosu */}
        {verbConjugation && (
          <Card size="3" variant="surface" asChild>
            <section aria-labelledby="verb-conjugation-heading">
              <Flex direction="column" gap="3">
                <Flex wrap="wrap" align="center" justify="between" gap="2">
                  <Heading id="verb-conjugation-heading" as="h2" size="4" weight="bold">
                    Глагол зэхъуэкӀыкӀэ (Fiil Çekim Tablosu)
                  </Heading>
                  <Flex wrap="wrap" align="center" gap="2">
                    <Badge color="indigo" variant="soft" size="2" highContrast>
                      Kök: {verbConjugation.root}
                    </Badge>
                    <Badge color="gray" variant="soft" size="2" highContrast>
                      Mastar: {verbConjugation.infinitive}
                    </Badge>
                  </Flex>
                </Flex>

                <Box className="overflow-x-auto">
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
                            <Text as="div" weight="bold">{row.pronounCircassian}</Text>
                            <Text as="div" size="1" color="gray">{row.personLabelTr}</Text>
                          </Table.RowHeaderCell>
                          <Table.Cell>{row.present}</Table.Cell>
                          <Table.Cell><strong>{row.past}</strong></Table.Cell>
                          <Table.Cell>{row.future}</Table.Cell>
                          <Table.Cell>{row.negative}</Table.Cell>
                        </Table.Row>
                      ))}
                    </Table.Body>
                  </Table.Root>
                </Box>
              </Flex>
            </section>
          </Card>
        )}

        {/* İsim Çekim Tablosu */}
        {declension && (
          <Card size="3" variant="surface" asChild>
            <section aria-labelledby="noun-declension-heading">
              <Flex direction="column" gap="3">
                <Flex wrap="wrap" align="center" justify="between" gap="2">
                  <Heading id="noun-declension-heading" as="h2" size="4" weight="bold">
                    Склоненэ (İsim Çekim Tablosu)
                  </Heading>
                  <Badge color="gray" variant="soft" size="1" highContrast>
                    Закъуэ / Куэд Бжыгъэ
                  </Badge>
                </Flex>

                <Box className="overflow-x-auto">
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
                            <Text as="div" weight="bold">{row.caseNameCircassian}</Text>
                            <Text as="div" size="1" color="gray">{row.caseNameTr}</Text>
                          </Table.RowHeaderCell>
                          <Table.Cell>{row.singularIndefinite}</Table.Cell>
                          <Table.Cell><strong>{row.singularDefinite}</strong></Table.Cell>
                          <Table.Cell>{row.pluralIndefinite}</Table.Cell>
                          <Table.Cell><strong>{row.pluralDefinite}</strong></Table.Cell>
                        </Table.Row>
                      ))}
                    </Table.Body>
                  </Table.Root>
                </Box>
              </Flex>
            </section>
          </Card>
        )}

        {/* Örnek Cümleler */}
        {lex.examples && lex.examples.length > 0 && (
          <Card size="3" variant="surface" asChild>
            <section aria-labelledby="examples-heading">
              <Flex direction="column" gap="2">
                <Heading id="examples-heading" as="h2" size="4" weight="bold">
                  <Flex align="center" gap="2">
                    <BookOpen className="w-4 h-4 text-[var(--jade-9)]" aria-hidden="true" />
                    Щапхъэхэр (Örnek Cümleler)
                  </Flex>
                </Heading>
                <Flex asChild direction="column" gap="2" pl="1">
                  <ul>
                    {lex.examples.map((ex, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Text color="indigo" weight="bold" aria-hidden="true">•</Text>
                        <Text size="3">{typeof ex === "string" ? ex : ex.text || ""}</Text>
                      </li>
                    ))}
                  </ul>
                </Flex>
              </Flex>
            </section>
          </Card>
        )}

        {/* İlişkili Kelimeler */}
        {relatedLexemes.length > 0 && (
          <Card size="3" variant="surface" asChild>
            <section aria-labelledby="related-lexemes-heading">
              <Flex direction="column" gap="3">
                <Heading id="related-lexemes-heading" as="h2" size="4" weight="bold">
                  <Flex align="center" gap="2">
                    <Layers className="w-4 h-4 text-[var(--purple-9)]" aria-hidden="true" />
                    Псалъафэ зэпыщӀахэр (İlişkili Kelimeler &amp; Aile Üyeleri)
                  </Flex>
                </Heading>

                <Flex wrap="wrap" gap="2">
                  {relatedLexemes.map((rel) => (
                    <Button key={rel.id} asChild variant="soft" color="purple" size="2" highContrast>
                      <Link href={`/lexeme/${encodeURIComponent(rel.id)}`}>
                        <strong>{rel.form}</strong>
                        {rel.tr && <Text size="1">— {rel.tr}</Text>}
                      </Link>
                    </Button>
                  ))}
                </Flex>
              </Flex>
            </section>
          </Card>
        )}
      </Flex>
    </Container>
  );
}
