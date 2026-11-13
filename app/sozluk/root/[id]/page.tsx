'use client';

import { useEffect, useState, useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
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
  MagnifyingGlassIcon,
  ExclamationTriangleIcon,
  InfoCircledIcon,
} from '@radix-ui/react-icons';

export default function RootDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = decodeURIComponent((params?.id as string) || '');

  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [dialectFilter, setDialectFilter] = useState<'all' | 'paired' | 'adyghe' | 'kabardian'>('all');

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    fetch(`/api/sozluk/root/${encodeURIComponent(id)}`)
      .then((r) => r.json())
      .then((res) => setData(res))
      .catch((err) => console.error('Kök verisi yüklenemedi:', err))
      .finally(() => setLoading(false));
  }, [id]);

  const filteredMembers = useMemo(() => {
    const list = data?.members || [];
    const q = searchQuery.toLowerCase().trim();
    return list.filter((m: any) => {
      if (dialectFilter === 'paired') {
        const ady = m.dialectVariants?.adyghe;
        const kbd = m.dialectVariants?.kabardian;
        if (!ady || !kbd || ady === kbd) return false;
      } else if (dialectFilter === 'adyghe') {
        if (m.dialect !== 'ADY' && !m.dialectVariants?.adyghe) return false;
      } else if (dialectFilter === 'kabardian') {
        if (m.dialect !== 'KBD' && !m.dialectVariants?.kabardian) return false;
      }

      if (!q) return true;
      return (
        (m.form || '').toLowerCase().includes(q) ||
        (m.dialectVariants?.adyghe || '').toLowerCase().includes(q) ||
        (m.dialectVariants?.kabardian || '').toLowerCase().includes(q) ||
        (m.translations?.tr || m.literalMeaning || '').toLowerCase().includes(q) ||
        (m.id || '').toLowerCase().includes(q)
      );
    });
  }, [data, searchQuery, dialectFilter]);

  if (!loading && (!data || data.error)) {
    return (
      <Container size="3" p={{ initial: '4', md: '6' }}>
        <Flex direction="column" gap="4" align="start">
          <Callout.Root color="red" variant="surface" role="alert">
            <Callout.Icon>
              <ExclamationTriangleIcon aria-hidden="true" />
            </Callout.Icon>
            <Callout.Text>
              {data?.error || 'Kök kaydı bulunamadı.'}
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

  const canonicalId = data?.id || id;

  return (
    <Container size="4" p={{ initial: '4', md: '6' }}>
      <Flex direction="column" gap="5">
        {/* Üst Gezinme */}
        <Flex align="center" justify="between" wrap="wrap" gap="2">
          <Button
            type="button"
            variant="surface"
            color="gray"
            size="2"
            highContrast
            onClick={() => router.back()}
          >
            <ArrowLeftIcon aria-hidden="true" /> Geri
          </Button>
          <Badge variant="soft" color="gray" size="1">
            API: /api/sozluk/root/{canonicalId}
          </Badge>
        </Flex>

        {/* Hiyerarşi ve Kök Başlık Kartı */}
        <Card size="3" variant="surface">
          <Flex direction="column" gap="3">
            <nav aria-label="Kök hiyerarşisi">
              <Flex align="center" gap="2" wrap="wrap">
                <Badge variant="solid" color="jade" size="2" highContrast aria-current="page">
                  🌱 ROOT: {canonicalId}
                </Badge>
                <Text size="2" color="gray" aria-hidden="true">›</Text>
                <Badge variant="soft" color="indigo" size="2" highContrast>
                  🌿 {data?.families?.length ?? 0} Kelime Ailesi
                </Badge>
                <Text size="2" color="gray" aria-hidden="true">›</Text>
                <Badge variant="soft" color="amber" size="2" highContrast>
                  🏷️ {data?.concepts?.length ?? 0} Kavram
                </Badge>
              </Flex>
            </nav>

            <Flex align="baseline" gap="3" wrap="wrap">
              <Heading as="h1" size="8" weight="bold">
                {data?.root?.form || data?.root?.headword || canonicalId}
              </Heading>
              <Badge variant="outline" color="gray" size="2" highContrast>
                {canonicalId}
              </Badge>
              {data?.root?.meaning && (
                <Text size="3">— {data.root.meaning}</Text>
              )}
              <Text size="2" color="gray" role="status" aria-live="polite">
                · {data?.count ?? 0} türev kelime
              </Text>
            </Flex>
          </Flex>
        </Card>

        {loading ? (
          <Flex direction="column" gap="4" role="status" aria-live="polite" aria-label="Kök ağacı yükleniyor">
            <Skeleton height="110px" />
            <Skeleton height="240px" />
          </Flex>
        ) : (
          <>
            {/* 2. Katman: Türeyen Kelime Aileleri */}
            {data?.families?.length > 0 && (
              <section aria-labelledby="root-families-heading">
                <Heading id="root-families-heading" as="h2" size="3" mb="3" color="indigo">
                  🌿 Türeyen Kelime Aileleri (Family)
                </Heading>
                <Grid columns={{ initial: '1', sm: '2', md: '3' }} gap="3">
                  {data.families.map((fam: any) => (
                    <Card key={fam.id} asChild size="2" variant="surface" className="hover:border-[var(--indigo-8)] transition-colors">
                      <Link href={`/sozluk/family/${encodeURIComponent(fam.id)}`}>
                        <Flex direction="column" gap="1">
                          <Flex align="center" justify="between">
                            <Text size="3" weight="bold" color="indigo">
                              {fam.id}
                            </Text>
                            <Badge variant="soft" color="indigo" highContrast>
                              {fam.count} üye
                            </Badge>
                          </Flex>
                          {fam.sampleForms?.length > 0 && (
                            <Text as="p" size="2" color="gray" truncate>
                              {fam.sampleForms.join(', ')}
                            </Text>
                          )}
                        </Flex>
                      </Link>
                    </Card>
                  ))}
                </Grid>
              </section>
            )}

            {/* 3. Katman: Bağlı Kavramlar */}
            {data?.concepts?.length > 0 && (
              <section aria-labelledby="root-concepts-heading">
                <Heading id="root-concepts-heading" as="h2" size="3" mb="3" color="amber">
                  🏷️ Bağlı Kavramlar (Concept)
                </Heading>
                <Flex gap="2" wrap="wrap">
                  {data.concepts.map((c: any) => (
                    <Button key={c.id} asChild variant="surface" color="amber" size="2" highContrast>
                      <Link href={`/kavram/${c.id.toLowerCase()}`}>
                        <span>🏷️ {c.id}</span>
                        {c.labelTr && <Text size="1" color="gray">({c.labelTr})</Text>}
                        <Badge variant="soft" color="amber" highContrast>
                          {c.count}
                        </Badge>
                      </Link>
                    </Button>
                  ))}
                </Flex>
              </section>
            )}

            {/* 4. Katman: Köke Bağlı Tüm Kelimeler */}
            <section aria-labelledby="root-members-heading">
              <Flex direction="column" gap="3">
                <Flex align={{ md: 'center' }} justify="between" gap="3" wrap="wrap">
                  <Heading id="root-members-heading" as="h2" size="3">
                    📖 Köke Bağlı Kelimeler ({filteredMembers.length})
                  </Heading>

                  <Flex align="center" gap="3" wrap="wrap">
                    <SegmentedControl.Root
                      size="2"
                      value={dialectFilter}
                      onValueChange={(v) => setDialectFilter(v as typeof dialectFilter)}
                      aria-label="Kök üyeleri lehçe filtresi"
                    >
                      <SegmentedControl.Item value="all">Tümü</SegmentedControl.Item>
                      <SegmentedControl.Item value="paired">ADY ↔ KBD</SegmentedControl.Item>
                      <SegmentedControl.Item value="adyghe">Adıgece</SegmentedControl.Item>
                      <SegmentedControl.Item value="kabardian">Kabardeyce</SegmentedControl.Item>
                    </SegmentedControl.Root>

                    <Box className="w-full sm:w-64">
                      <label htmlFor="root-member-search" className="sr-only">
                        Köke bağlı kelimelerde ara
                      </label>
                      <TextField.Root
                        id="root-member-search"
                        size="2"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Köke bağlı kelimelerde ara..."
                        aria-label="Köke bağlı kelimelerde ara"
                      >
                        <TextField.Slot>
                          <MagnifyingGlassIcon height="15" width="15" aria-hidden="true" />
                        </TextField.Slot>
                      </TextField.Root>
                    </Box>
                  </Flex>
                </Flex>

                {filteredMembers.length === 0 ? (
                  <Callout.Root color="amber" variant="surface">
                    <Callout.Icon>
                      <InfoCircledIcon aria-hidden="true" />
                    </Callout.Icon>
                    <Callout.Text>
                      Arama veya lehçe filtresine uygun türev kelime bulunamadı.
                    </Callout.Text>
                  </Callout.Root>
                ) : (
                  <Card size="2" variant="surface">
                    <Flex direction="column">
                      {filteredMembers.map((m: any, idx: number) => {
                        const ady = m.dialectVariants?.adyghe;
                        const kbd = m.dialectVariants?.kabardian;
                        const showPair = ady && kbd && ady !== kbd;

                        return (
                          <Box key={m.id}>
                            {idx > 0 && <Separator size="4" my="3" />}
                            <Flex
                              align={{ sm: 'center' }}
                              justify="between"
                              direction={{ initial: 'column', sm: 'row' }}
                              gap="2"
                            >
                              <Box>
                                <Flex align="center" gap="2" wrap="wrap">
                                  <Link
                                    href={`/lexeme/${encodeURIComponent(m.id)}`}
                                    className="font-bold text-base hover:underline focus-visible:outline-2 focus-visible:outline-offset-2"
                                  >
                                    {m.form}
                                  </Link>
                                  {m.ipa && (
                                    <Text size="1" color="gray" className="font-mono" aria-label={`Fonetik: ${m.ipa}`}>
                                      /{m.ipa}/
                                    </Text>
                                  )}
                                  {showPair && (
                                    <Flex align="center" gap="1" wrap="wrap" aria-label="Lehçe karşılıkları">
                                      <Badge variant="soft" color="sky" highContrast size="1">
                                        ADY: {ady}
                                      </Badge>
                                      <Text size="1" color="gray" aria-hidden="true">↔</Text>
                                      <Badge variant="soft" color="purple" highContrast size="1">
                                        KBD: {kbd}
                                      </Badge>
                                    </Flex>
                                  )}
                                </Flex>
                                <Text as="p" size="2" color="gray" mt="1">
                                  {m.translations?.tr || m.literalMeaning || '—'}
                                </Text>
                              </Box>

                              <Flex align="center" gap="2" wrap="wrap">
                                {m.wordFamilyId && (
                                  <Badge asChild variant="soft" color="indigo" size="2" highContrast>
                                    <Link href={`/sozluk/family/${encodeURIComponent(m.wordFamilyId)}`}>
                                      🌿 {m.wordFamilyId}
                                    </Link>
                                  </Badge>
                                )}
                                {m.conceptId && (
                                  <Badge asChild variant="soft" color="gray" size="2" highContrast>
                                    <Link href={`/kavram/${m.conceptId.toLowerCase()}`}>
                                      🏷️ {m.conceptId}
                                    </Link>
                                  </Badge>
                                )}
                              </Flex>
                            </Flex>
                          </Box>
                        );
                      })}
                    </Flex>
                  </Card>
                )}
              </Flex>
            </section>
          </>
        )}
      </Flex>
    </Container>
  );
}

