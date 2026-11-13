'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import {
  Container,
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
  Callout,
  Skeleton,
} from '@radix-ui/themes';
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  MagnifyingGlassIcon,
  ExclamationTriangleIcon,
  InfoCircledIcon,
} from '@radix-ui/react-icons';

export default function FamilyDetailPage() {
  const params = useParams();
  const id = decodeURIComponent((params?.id as string) || '');
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [memberQuery, setMemberQuery] = useState('');
  const [dialectMode, setDialectMode] = useState<'all' | 'paired' | 'adyghe' | 'kabardian'>('all');

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    fetch(`/api/sozluk/family/${encodeURIComponent(id)}`)
      .then((res) => res.json())
      .then((d) => setData(d))
      .catch((err) => console.error('Aile verisi yüklenemedi:', err))
      .finally(() => setLoading(false));
  }, [id]);

  const members = useMemo(() => data?.members || [], [data]);

  const filteredMembers = useMemo(() => {
    const q = memberQuery.toLowerCase().trim();
    return members.filter((m: any) => {
      if (dialectMode === 'paired') {
        const ady = m.dialectVariants?.adyghe;
        const kbd = m.dialectVariants?.kabardian;
        if (!ady || !kbd || ady === kbd) return false;
      } else if (dialectMode === 'adyghe') {
        if (m.dialect !== 'ADY' && !m.dialectVariants?.adyghe) return false;
      } else if (dialectMode === 'kabardian') {
        if (m.dialect !== 'KBD' && !m.dialectVariants?.kabardian) return false;
      }

      if (!q) return true;
      return (
        (m.form || '').toLowerCase().includes(q) ||
        (m.dialectVariants?.adyghe || '').toLowerCase().includes(q) ||
        (m.dialectVariants?.kabardian || '').toLowerCase().includes(q) ||
        (m.translations?.tr || m.translations?.en || '').toLowerCase().includes(q) ||
        (m.ipa || '').toLowerCase().includes(q)
      );
    });
  }, [members, memberQuery, dialectMode]);

  if (loading) {
    return (
      <Container size="4" p={{ initial: '4', md: '6' }}>
        <Flex direction="column" gap="4" role="status" aria-live="polite" aria-label="Kelime ailesi yükleniyor">
          <Skeleton height="32px" width="240px" />
          <Skeleton height="140px" />
          <Grid columns={{ initial: '1', md: '3' }} gap="4">
            <Skeleton height="150px" />
            <Skeleton height="150px" />
            <Skeleton height="150px" />
          </Grid>
        </Flex>
      </Container>
    );
  }

  if (!data || data.error) {
    return (
      <Container size="3" p={{ initial: '4', md: '6' }}>
        <Flex direction="column" gap="4" align="start">
          <Callout.Root color="red" variant="surface" role="alert">
            <Callout.Icon>
              <ExclamationTriangleIcon aria-hidden="true" />
            </Callout.Icon>
            <Callout.Text>
              {data?.error || 'Kelime ailesi bulunamadı.'}
            </Callout.Text>
          </Callout.Root>
          <Button asChild variant="soft" color="indigo" size="3" highContrast>
            <Link href="/sozluk">
              <ArrowLeftIcon aria-hidden="true" /> Sözlüğe Dön
            </Link>
          </Button>
        </Flex>
      </Container>
    );
  }

  const root = data.root || (Array.isArray(data.roots) ? data.roots[0] : null);
  const concepts: { id: string; labelTr?: string; count?: number }[] =
    Array.isArray(data.concepts) && data.concepts.length > 0
      ? data.concepts
      : Array.from(new Set(members.map((m: any) => m.conceptId).filter(Boolean))).map(
          (cid) => ({ id: String(cid) })
        );

  return (
    <Container size="4" p={{ initial: '4', md: '6' }}>
      <Flex direction="column" gap="5">
        {/* WCAG 2.0 Semantik Breadcrumb */}
        <nav aria-label="Hiyerarşik konum">
          <Flex align="center" gap="2" wrap="wrap">
            <Button asChild variant="ghost" size="2" highContrast>
              <Link href="/sozluk">Sözlük</Link>
            </Button>
            <Text size="2" color="gray" aria-hidden="true">›</Text>
            <Button asChild variant="ghost" size="2" highContrast>
              <Link href="/sozluk/family">Aileler</Link>
            </Button>
            <Text size="2" color="gray" aria-hidden="true">›</Text>
            {root ? (
              <>
                <Badge asChild variant="soft" color="teal" size="2" highContrast>
                  <Link href={`/sozluk/root/${encodeURIComponent(root.id)}`}>
                    🌱 Kök: {root.form || root.id}
                  </Link>
                </Badge>
                <Text size="2" color="gray" aria-hidden="true">›</Text>
              </>
            ) : (
              <>
                <Badge variant="surface" color="gray" size="2">
                  Kök Bağlantısı Yok
                </Badge>
                <Text size="2" color="gray" aria-hidden="true">›</Text>
              </>
            )}
            <Badge variant="solid" color="indigo" size="2" highContrast aria-current="page">
              🌿 Aile: {data.familyId || data.id}
            </Badge>
          </Flex>
        </nav>

        {/* Başlık Kartı */}
        <Card size="3" variant="surface">
          <Flex direction={{ initial: 'column', md: 'row' }} justify="between" align={{ md: 'center' }} gap="4">
            <Box>
              <Text as="div" size="1" weight="bold" color="indigo" className="uppercase tracking-wider">
                Kelime Ailesi (Word Family)
              </Text>
              <Flex align="center" gap="3" wrap="wrap" mt="1">
                <Heading as="h1" size="8" weight="bold">
                  {data.headword || data.familyId || data.id}
                </Heading>
                <Badge variant="outline" color="gray" size="2" highContrast>
                  {data.familyId || data.id}
                </Badge>
              </Flex>
              {data.glossTr && (
                <Text as="p" size="3" mt="2">
                  Temel Anlam: <strong>{data.glossTr}</strong>
                </Text>
              )}
              <Text as="p" size="2" color="gray" mt="1" role="status" aria-live="polite">
                Bu ailede toplam <strong>{members.length}</strong> türev madde kayıtlı.
              </Text>
            </Box>

            <Button asChild variant="soft" color="gray" size="3" highContrast>
              <Link href="/sozluk/family">
                <ArrowLeftIcon aria-hidden="true" /> Tüm Aileler
              </Link>
            </Button>
          </Flex>
        </Card>

        {/* Bağlı Kavramlar */}
        {concepts.length > 0 && (
          <Card size="2" variant="surface" asChild>
            <section aria-labelledby="family-concepts-heading">
              <Flex align="center" gap="2" wrap="wrap">
                <Heading id="family-concepts-heading" as="h2" size="2" weight="bold">
                  🏷️ İlişkili Kavramlar:
                </Heading>
                {concepts.map((c) => (
                  <Badge key={c.id} asChild variant="soft" color="amber" size="2" highContrast>
                    <Link href={`/kavram/${c.id.toLowerCase()}`}>
                      {c.labelTr ? `${c.labelTr} (${c.id})` : c.id}
                    </Link>
                  </Badge>
                ))}
              </Flex>
            </section>
          </Card>
        )}

        {/* UDL Filtreleme & Arama Çubuğu */}
        <Card size="2" variant="surface">
          <Flex direction={{ initial: 'column', md: 'row' }} align={{ md: 'center' }} justify="between" gap="3">
            <Box className="w-full md:w-80">
              <label htmlFor="family-member-filter" className="sr-only">
                Aile üyeleri içinde ara
              </label>
              <TextField.Root
                id="family-member-filter"
                size="2"
                value={memberQuery}
                onChange={(e) => setMemberQuery(e.target.value)}
                placeholder="Form, IPA veya Türkçe anlam filtrele..."
                aria-label="Aile üyeleri içinde ara"
              >
                <TextField.Slot>
                  <MagnifyingGlassIcon height="15" width="15" aria-hidden="true" />
                </TextField.Slot>
              </TextField.Root>
            </Box>

            <SegmentedControl.Root
              size="2"
              value={dialectMode}
              onValueChange={(v) => setDialectMode(v as typeof dialectMode)}
              aria-label="Lehçe gösterim modu"
            >
              <SegmentedControl.Item value="all">Tümü ({members.length})</SegmentedControl.Item>
              <SegmentedControl.Item value="paired">ADY ↔ KBD</SegmentedControl.Item>
              <SegmentedControl.Item value="adyghe">Adıgece</SegmentedControl.Item>
              <SegmentedControl.Item value="kabardian">Kabardeyce</SegmentedControl.Item>
            </SegmentedControl.Root>
          </Flex>
        </Card>

        {/* Aile Üyeleri */}
        <section aria-labelledby="family-members-heading">
          <Heading id="family-members-heading" as="h2" size="3" mb="3" color="gray">
            Türev Maddeler ({filteredMembers.length})
          </Heading>

          {filteredMembers.length === 0 ? (
            <Callout.Root color="amber" variant="surface">
              <Callout.Icon>
                <InfoCircledIcon aria-hidden="true" />
              </Callout.Icon>
              <Callout.Text>
                Arama veya lehçe filtresine eşleşen aile üyesi bulunamadı.
              </Callout.Text>
            </Callout.Root>
          ) : (
            <Grid columns={{ initial: '1', sm: '2', lg: '3' }} gap="4">
              {filteredMembers.map((m: any) => {
                const ady = m.dialectVariants?.adyghe;
                const kbd = m.dialectVariants?.kabardian;
                const showDialectPair = ady && kbd && ady !== kbd;

                return (
                  <Card key={m.id} size="2" variant="surface" className="hover:border-[var(--indigo-8)] transition-colors">
                    <Flex direction="column" justify="between" gap="3" height="100%">
                      <Box>
                        <Flex justify="between" align="start" gap="2">
                          <Link
                            href={`/lexeme/${encodeURIComponent(m.id)}`}
                            className="font-bold text-lg hover:underline focus-visible:outline-2 focus-visible:outline-offset-2"
                          >
                            {m.form}
                          </Link>
                          {m.dialect && (
                            <Badge variant="soft" color="amber" highContrast size="1">
                              {m.dialect}
                            </Badge>
                          )}
                        </Flex>

                        {m.ipa && (
                          <Text as="div" size="1" color="gray" className="font-mono mt-0.5" aria-label={`Fonetik okunuş: ${m.ipa}`}>
                            /{m.ipa}/
                          </Text>
                        )}

                        {showDialectPair && (
                          <Flex align="center" gap="1" wrap="wrap" mt="2" aria-label="Lehçe çifti">
                            <Badge variant="soft" color="sky" highContrast size="1">
                              ADY: {ady}
                            </Badge>
                            <Text size="1" color="gray" aria-hidden="true">↔</Text>
                            <Badge variant="soft" color="purple" highContrast size="1">
                              KBD: {kbd}
                            </Badge>
                          </Flex>
                        )}

                        <Text as="p" size="2" mt="2" className="line-clamp-2">
                          {m.translations?.tr || m.translations?.en || '—'}
                        </Text>
                      </Box>

                      <Box>
                        <Separator size="4" mb="2" />
                        <Flex align="center" justify="between" gap="2">
                          {m.conceptId ? (
                            <Badge asChild variant="soft" color="jade" size="1" highContrast>
                              <Link href={`/kavram/${m.conceptId.toLowerCase()}`}>
                                🏷️ {m.conceptId}
                              </Link>
                            </Badge>
                          ) : (
                            <Text size="1" color="gray">
                              Kavram atanmamış
                            </Text>
                          )}

                          <Button asChild variant="ghost" size="1" highContrast>
                            <Link href={`/lexeme/${encodeURIComponent(m.id)}`}>
                              Detay <ArrowRightIcon aria-hidden="true" />
                            </Link>
                          </Button>
                        </Flex>
                      </Box>
                    </Flex>
                  </Card>
                );
              })}
            </Grid>
          )}
        </section>
      </Flex>
    </Container>
  );
}

