import fs from 'fs'; import path from 'path';
import { Flex, Text, Heading, Badge, Card, Button } from '@radix-ui/themes';
import Link from 'next/link'; import { notFound } from 'next/navigation';

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

  return (
    <Flex direction="column" gap="4" style={{ maxWidth: 680, margin: '0 auto', padding: 24 }}>
      <Link href="/arama" style={{ color: '#6d28d9', textDecoration: 'none' }}>← Aramaya dön</Link>
      <Heading size="9">{lex.form}</Heading>
      <Flex gap="2">
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
      {lex.examples?.length > 0 && (
        <Card><Heading size="3">Örnekler</Heading>{lex.examples.map((ex: any, i: number) => <Text key={i} as="p">{typeof ex === 'string' ? ex : ex.text || ''}</Text>)}</Card>
      )}
      <Button variant="outline">♡ Favorilere ekle</Button>
    </Flex>
  );
}