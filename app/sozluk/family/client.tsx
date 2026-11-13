'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Box,
  Flex,
  Grid,
  Card,
  Badge,
  Button,
  Text,
  Heading,
  TextField,
  SegmentedControl,
  Separator,
  ScrollArea,
  Callout,
} from '@radix-ui/themes';
import { MagnifyingGlassIcon, ArrowLeftIcon, ArrowRightIcon, InfoCircledIcon } from '@radix-ui/react-icons';

interface FamilySummary {
  id: string;
  headword: string;
  glossTr: string;
  rootId: string | null;
}

interface LexemeSummary {
  id: string;
  form: string;
  wordFamilyId: string;
  dialect: string | null;
  dialectVariants: { adyghe?: string; kabardian?: string } | null;
  tr: string;
}

export default function Client({
  initialFamilies,
  initialLexemes,
}: {
  initialFamilies: FamilySummary[];
  initialLexemes: LexemeSummary[];
}) {
  const [sel, setSel] = useState(initialFamilies[0]?.id || 'WF-1');
  const [q, setQ] = useState('');
  const [dialectFilter, setDialectFilter] = useState<'all' | 'adyghe' | 'kabardian' | 'paired'>('all');

  const membersByFamily = useMemo(() => {
    const map = new Map<string, LexemeSummary[]>();
    for (const l of initialLexemes) {
      const list = map.get(l.wordFamilyId);
      if (list) list.push(l);
      else map.set(l.wordFamilyId, [l]);
    }
    return map;
  }, [initialLexemes]);

  const filtered = useMemo(() => {
    const s = q.toLowerCase().trim();
    if (!s) return initialFamilies.slice(0, 300);
    return initialFamilies
      .filter((f) => {
        if (f.id.toLowerCase().includes(s)) return true;
        if (f.headword.toLowerCase().includes(s)) return true;
        if (f.glossTr.toLowerCase().includes(s)) return true;
        const fMembers = membersByFamily.get(f.id) || [];
        return fMembers.some(
          (m) =>
            m.form.toLowerCase().includes(s) ||
            m.tr.toLowerCase().includes(s) ||
            (m.dialectVariants?.adyghe || '').toLowerCase().includes(s) ||
            (m.dialectVariants?.kabardian || '').toLowerCase().includes(s)
        );
      })
      .slice(0, 300);
  }, [initialFamilies, membersByFamily, q]);

  const selectedFamily = useMemo(
    () => initialFamilies.find((f) => f.id === sel) || null,
    [initialFamilies, sel]
  );

  const members = useMemo(() => {
    const raw = (membersByFamily.get(sel) || []).slice(0, 200);
    if (dialectFilter === 'all') return raw;
    if (dialectFilter === 'paired') {
      return raw.filter(
        (m) =>
          m.dialectVariants?.adyghe &&
          m.dialectVariants?.kabardian &&
          m.dialectVariants.adyghe !== m.dialectVariants.kabardian
      );
    }
    if (dialectFilter === 'adyghe') {
      return raw.filter((m) => m.dialect === 'ADY' || Boolean(m.dialectVariants?.adyghe));
    }
    return raw.filter((m) => m.dialect === 'KBD' || Boolean(m.dialectVariants?.kabardian));
  }, [membersByFamily, sel, dialectFilter]);

  return (
    <Flex direction={{ initial: 'column', md: 'row' }} className="min-h-[calc(100vh-4rem)]">
      {/* Sol Gezinme Paneli */}
      <Box
        asChild
        width={{ initial: '100%', md: '360px' }}
        p="4"
        className="border-b md:border-b-0 md:border-r border-[var(--gray-a5)] bg-[var(--color-panel-solid)] shrink-0"
      >
        <aside aria-label="Kelime aileleri listesi">
          <Flex direction="column" gap="3">
            <Flex align="center" justify="between">
              <Button asChild variant="ghost" size="2" highContrast>
                <Link href="/sozluk">
                  <ArrowLeftIcon aria-hidden="true" /> Sözlük
                </Link>
              </Button>
              <Badge variant="soft" color="indigo" highContrast role="status" aria-live="polite">
                {filtered.length} / {initialFamilies.length} aile
              </Badge>
            </Flex>

            <Box>
              <Heading as="h2" size="5" weight="bold">
                Kelime Aileleri
              </Heading>
              <Text as="p" size="2" color="gray">
                Kök ve türev ilişkisine göre gruplanmış sözlük aileleri
              </Text>
            </Box>

            <Box>
              <label htmlFor="family-search-input" className="sr-only">
                Kelime ailesi, baş kelime veya Türkçe anlam ara
              </label>
              <TextField.Root
                id="family-search-input"
                size="3"
                radius="full"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="WF- kodu, kelime veya anlam ara..."
                aria-label="Kelime ailesi, baş kelime veya Türkçe anlam ara"
              >
                <TextField.Slot>
                  <MagnifyingGlassIcon height="16" width="16" aria-hidden="true" />
                </TextField.Slot>
              </TextField.Root>
            </Box>

            <ScrollArea type="auto" scrollbars="vertical" style={{ maxHeight: 'calc(100vh - 230px)' }}>
              <Flex direction="column" gap="2" pr="2" role="listbox" aria-label="Kelime aileleri">
                {filtered.map((f) => {
                  const active = sel === f.id;
                  const fMembers = membersByFamily.get(f.id) || [];
                  const title = f.headword || fMembers[0]?.form || f.id;

                  return (
                    <Button
                      key={f.id}
                      type="button"
                      variant={active ? 'solid' : 'surface'}
                      color={active ? 'indigo' : 'gray'}
                      highContrast={active}
                      size="3"
                      onClick={() => setSel(f.id)}
                      aria-selected={active}
                      role="option"
                      className="!h-auto !py-2.5 !px-3.5 !justify-between text-left"
                    >
                      <Flex direction="column" gap="1" className="min-w-0 flex-1">
                        <Text size="2" weight="bold" truncate>
                          {title}
                        </Text>
                        <Text size="1" color={active ? undefined : 'gray'} truncate>
                          {f.id} {f.glossTr ? `· ${f.glossTr}` : ''}
                        </Text>
                      </Flex>
                      <Badge variant={active ? 'solid' : 'soft'} color={active ? 'amber' : 'indigo'} highContrast>
                        {fMembers.length}
                      </Badge>
                    </Button>
                  );
                })}
              </Flex>
            </ScrollArea>
          </Flex>
        </aside>
      </Box>

      {/* Sağ İçerik Paneli */}
      <Box asChild p={{ initial: '4', md: '6' }} className="flex-1 min-w-0">
        <section aria-labelledby="selected-family-heading">
          <Flex direction="column" gap="5">
            <Card size="3" variant="surface">
              <Flex direction={{ initial: 'column', sm: 'row' }} justify="between" align={{ sm: 'center' }} gap="4">
                <Box>
                  <Flex align="center" gap="2" wrap="wrap">
                    <Heading id="selected-family-heading" as="h1" size="7" weight="bold">
                      {selectedFamily?.headword || members[0]?.form || sel}
                    </Heading>
                    <Badge variant="outline" color="indigo" size="2" highContrast>
                      {sel}
                    </Badge>
                  </Flex>
                  <Text as="p" size="2" color="gray" mt="1" role="status" aria-live="polite">
                    {selectedFamily?.glossTr ? `${selectedFamily.glossTr} · ` : ''}
                    {members.length} türev madde görüntüleniyor
                  </Text>
                </Box>

                <Flex align="center" gap="2" wrap="wrap">
                  {selectedFamily?.rootId && (
                    <Button asChild variant="soft" color="teal" size="2" highContrast>
                      <Link href={`/sozluk/root/${encodeURIComponent(selectedFamily.rootId)}`}>
                        🌱 Kök: {selectedFamily.rootId}
                      </Link>
                    </Button>
                  )}
                  <Button asChild variant="solid" color="indigo" size="2" highContrast>
                    <Link href={`/sozluk/family/${encodeURIComponent(sel)}`}>
                      Aile Detay Sayfası <ArrowRightIcon aria-hidden="true" />
                    </Link>
                  </Button>
                </Flex>
              </Flex>

              <Separator size="4" my="4" />

              {/* UDL Çoklu Görünüm / Lehçe Filtresi */}
              <Flex direction={{ initial: 'column', sm: 'row' }} align={{ sm: 'center' }} justify="between" gap="3">
                <Text as="span" size="2" weight="medium">
                  Lehçe görünümü (UDL):
                </Text>
                <SegmentedControl.Root
                  size="2"
                  value={dialectFilter}
                  onValueChange={(v) => setDialectFilter(v as typeof dialectFilter)}
                  aria-label="Lehçe görünüm filtresi"
                >
                  <SegmentedControl.Item value="all">Tümü</SegmentedControl.Item>
                  <SegmentedControl.Item value="paired">ADY ↔ KBD Çiftleri</SegmentedControl.Item>
                  <SegmentedControl.Item value="adyghe">Adıgece</SegmentedControl.Item>
                  <SegmentedControl.Item value="kabardian">Kabardeyce</SegmentedControl.Item>
                </SegmentedControl.Root>
              </Flex>
            </Card>

            {members.length === 0 ? (
              <Callout.Root color="amber" variant="surface">
                <Callout.Icon>
                  <InfoCircledIcon aria-hidden="true" />
                </Callout.Icon>
                <Callout.Text>
                  Seçili lehçe filtresine uygun türev madde bulunamadı. Tüm maddeleri görmek için &ldquo;Tümü&rdquo; seçeneğine geçebilirsiniz.
                </Callout.Text>
              </Callout.Root>
            ) : (
              <Grid columns={{ initial: '1', lg: '2' }} gap="3">
                {members.map((m) => {
                  const ady = m.dialectVariants?.adyghe;
                  const kbd = m.dialectVariants?.kabardian;
                  const showPair = ady && kbd && ady !== kbd;

                  return (
                    <Card key={m.id} asChild size="2" variant="surface" className="hover:border-[var(--indigo-8)] transition-colors">
                      <Link
                        href={`/lexeme/${encodeURIComponent(m.id)}`}
                        aria-label={`${m.form} — ${m.tr || 'Detay sayfasına git'}`}
                      >
                        <Flex direction="column" gap="2">
                          <Flex align="center" justify="between" gap="2">
                            <Text size="4" weight="bold">
                              {m.form}
                            </Text>
                            <Badge variant="soft" color="gray" size="1">
                              {m.id}
                            </Badge>
                          </Flex>

                          {showPair && (
                            <Flex align="center" gap="2" wrap="wrap" aria-label="Lehçe karşılıkları">
                              <Badge variant="soft" color="sky" highContrast size="1">
                                ADY: {ady}
                              </Badge>
                              <Text size="1" color="gray" aria-hidden="true">
                                ↔
                              </Text>
                              <Badge variant="soft" color="purple" highContrast size="1">
                                KBD: {kbd}
                              </Badge>
                            </Flex>
                          )}

                          <Text as="p" size="2" color="gray">
                            {m.tr || '—'}
                          </Text>
                        </Flex>
                      </Link>
                    </Card>
                  );
                })}
              </Grid>
            )}
          </Flex>
        </section>
      </Box>
    </Flex>
  );
}
