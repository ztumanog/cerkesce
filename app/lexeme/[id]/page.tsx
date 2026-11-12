import fs from 'fs';
import path from 'path';
import { Flex, Text, Heading, Badge, Card, Button, Box } from '@radix-ui/themes';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { resolveDialectVariantDisplay } from '@/lib/linguistic/dialectVariantsHelper';

function getLexeme(id: string) {
  const p = path.join(process.cwd(), 'public', 'data', 'linguistic', 'lexemes.json');
  const raw = JSON.parse(fs.readFileSync(p, 'utf-8'));
  const list = Array.isArray(raw) ? raw : raw.lexemes ?? [];
  return list.find((l: any) => l.id === id);
}

export default async function LexemePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const lex = getLexeme(decodeURIComponent(id));
  if (!lex) notFound();
  const tr = lex.translations?.tr;
  const variants = resolveDialectVariantDisplay({
    form: lex.form,
    dialect: lex.dialect,
    dialectVariants: lex.dialectVariants,
  });

  return (
    <Flex direction="column" gap="4" style={{ maxWidth: 680, margin: '0 auto', padding: 24 }}>
      <Link href="/arama" style={{ color: '#6d28d9', textDecoration: 'none' }}>← Aramaya dön</Link>
      <Heading size="9">{lex.form}</Heading>
      <Flex gap="2" wrap="wrap">
        {lex.rootIds?.map((r: string) => <Badge key={r} color="violet">{r}</Badge>)}
        {lex.wordFamilyId && <Badge color="green">{lex.wordFamilyId}</Badge>}
        {lex.conceptId && <Badge color="amber">{lex.conceptId}</Badge>}
      </Flex>
      <Card>
        <Flex direction="column" gap="2">
          {lex.partOfSpeech && <Text><b>FORM:</b> {lex.partOfSpeech}</Text>}
          {lex.ipa && <Text><b>IPA:</b> [{lex.ipa}]</Text>}
          {tr && <Text><b>TÜRKÇE:</b> {tr}</Text>}
          {lex.literalMeaning && <Text><b>LITERAL:</b> {lex.literalMeaning}</Text>}
        </Flex>
      </Card>

      {variants && (
        <Card>
          <Flex direction="column" gap="3">
            <Flex align="center" justify="between">
              <Heading size="3">Diyalekt Karşılıkları &amp; Sözlük Varyantları</Heading>
              <Badge color="indigo" variant="soft">Huvaj &amp; AIG Doğrulamalı</Badge>
            </Flex>
            <Flex gap="3" wrap="wrap">
              <Box style={{ flex: '1 1 260px', padding: 12, borderRadius: 8, background: 'var(--amber-2)' }}>
                <Text size="1" color="amber" weight="bold">BATI ÇERKESÇESİ (ADÎĞECE)</Text>
                <Flex align="center" gap="2" mt="1" wrap="wrap">
                  <Text size="5" weight="bold">{variants.adyghePrimary}</Text>
                  <Badge size="1" color="amber" variant="surface">Huvaj / Akademik</Badge>
                </Flex>
                {variants.adygheAlternatives.map((alt) => (
                  <Flex key={alt.form} align="center" gap="2" mt="1">
                    <Text size="2" color="gray">Alternatif: <b>{alt.form}</b></Text>
                    <Badge size="1" color="gray" variant="soft">{alt.sourceLabel}</Badge>
                  </Flex>
                ))}
              </Box>

              <Box style={{ flex: '1 1 260px', padding: 12, borderRadius: 8, background: 'var(--blue-2)' }}>
                <Text size="1" color="blue" weight="bold">DOĞU ÇERKESÇESİ (KABARDEYCE)</Text>
                <Flex align="center" gap="2" mt="1" wrap="wrap">
                  <Text size="5" weight="bold">{variants.kabardianPrimary}</Text>
                  <Badge size="1" color="blue" variant="surface">Standart</Badge>
                </Flex>
                {variants.kabardianAlternatives.map((alt) => (
                  <Flex key={alt.form} align="center" gap="2" mt="1">
                    <Text size="2" color="gray">Alternatif: <b>{alt.form}</b></Text>
                    <Badge size="1" color="gray" variant="soft">{alt.sourceLabel}</Badge>
                  </Flex>
                ))}
              </Box>
            </Flex>
          </Flex>
        </Card>
      )}

      {lex.examples?.length > 0 && (
        <Card>
          <Heading size="3">Örnekler</Heading>
          {lex.examples.map((ex: any, i: number) => (
            <Text key={i} as="p">{typeof ex === 'string' ? ex : ex.text || ''}</Text>
          ))}
        </Card>
      )}
      <Button variant="outline">♡ Favorilere ekle</Button>
    </Flex>
  );
}