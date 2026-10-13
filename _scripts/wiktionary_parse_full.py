# wiktionary_parse_full.py
import bz2
import re
import json
from pathlib import Path
from xml.etree import ElementTree as ET

BASE = Path(r"E:\projeler\Cerkesce")
DUMP = BASE/"_wiktionary"/"kbd-dump.xml.bz2"
OUT  = BASE/"_wiktionary"/"wiktionary_full.json"

NS = "{http://www.mediawiki.org/xml/export-0.11/}"


def clean_wiki(text):
    if not text:
        return ""
    text = re.sub(r'\[\[[^\]|]+\|([^\]]+)\]\]', r'\1', text)
    text = re.sub(r'\[\[([^\]]+)\]\]', r'\1', text)
    text = re.sub(r'\{\{[^}]+\}\}', '', text)
    text = re.sub(r"'''([^']+)'''", r'\1', text)
    text = re.sub(r"''([^']+)''", r'\1', text)
    text = re.sub(r'<[^>]+>', '', text)
    text = re.sub(r'\n+', ' ', text)
    return text.strip()


def extract_section(wikitext, section_name):
    pattern = rf'={2,4}\s*{re.escape(section_name)}\s*={2,4}\s*\n(.*?)(?=\n={2,4}|\Z)'
    m = re.search(pattern, wikitext, re.DOTALL | re.IGNORECASE)
    return m.group(1).strip() if m else None


def extract_ipa(wikitext):
    m = re.search(r'IPA\s*\[([^\]]+)\]', wikitext)
    if m:
        return m.group(1).strip()
    m = re.search(r'\{\{IPA\|([^}|]+)', wikitext)
    if m:
        return m.group(1).strip()
    return None


def extract_roots(wikitext):
    m = re.search(r'=\s*ПСАЛЪЭ ЛЪАБЖЬЭ\s*=\s*\n(.+)', wikitext)
    if m:
        line = m.group(1).strip()
        roots = re.findall(r'\[([^\]]+)\]', line)
        return roots if roots else None
    return None


def extract_definition(wikitext):
    sec = extract_section(wikitext, "МЫХЬЭНЭ")
    return clean_wiki(sec) if sec else None


def extract_examples(wikitext):
    sec = extract_section(wikitext, "ЩАПХЪЭХЭР")
    if not sec:
        return []
    examples = []
    for line in sec.split("\n"):
        line = line.strip()
        if line and not line.startswith("=") and not line.startswith("*"):
            cleaned = clean_wiki(line)
            if cleaned and len(cleaned) > 5:
                examples.append(cleaned)
    return examples


def extract_translations(wikitext):
    result = {"ru": None, "en": None}
    ru = extract_section(wikitext, "УРЫСЫБЗЭ")
    if ru:
        result["ru"] = clean_wiki(ru)
    en = extract_section(wikitext, "ИНДЖЫЛЫБЗЭ")
    if en:
        result["en"] = clean_wiki(en)
    return result


def extract_categories(wikitext):
    cats = re.findall(r'\[\[Category:([^\]|]+)', wikitext)
    return [c.strip() for c in cats]


print("Dump okunuyor...")
entries = {}
sayac = 0

with bz2.open(DUMP, "rb") as f:
    context = ET.iterparse(f, events=("end",))
    for event, elem in context:
        if elem.tag == f"{NS}page":
            ns_elem = elem.find(f"{NS}ns")
            if ns_elem is None or ns_elem.text != "0":
                elem.clear()
                continue

            title_elem = elem.find(f"{NS}title")
            if title_elem is None:
                elem.clear()
                continue
            title = title_elem.text

            rev = elem.find(f"{NS}revision")
            if rev is None:
                elem.clear()
                continue
            text_elem = rev.find(f"{NS}text")
            if text_elem is None or not text_elem.text:
                elem.clear()
                continue
            wikitext = text_elem.text

            ipa = extract_ipa(wikitext)
            if not ipa:
                elem.clear()
                continue

            entries[title] = {
                "ipa": ipa,
                "roots": extract_roots(wikitext),
                "definition": extract_definition(wikitext),
                "examples": extract_examples(wikitext),
                "translations": extract_translations(wikitext),
                "categories": extract_categories(wikitext),
            }
            sayac += 1
            if sayac % 5000 == 0:
                print(f"  {sayac} madde islendi...")

            elem.clear()

print(f"\nToplam IPA'li madde: {len(entries)}")

ornek_sayisi = sum(len(d["examples"]) for d in entries.values())
ceviri_ru = sum(1 for d in entries.values() if d["translations"]["ru"])
ceviri_en = sum(1 for d in entries.values() if d["translations"]["en"])
tanim = sum(1 for d in entries.values() if d["definition"])
root = sum(1 for d in entries.values() if d["roots"])

print(f"  Tanim        : {tanim}")
print(f"  Root ayrimi  : {root}")
print(f"  Ornek cumle  : {ornek_sayisi} (toplam)")
print(f"  Rusca ceviri : {ceviri_ru}")
print(f"  Ingilizce    : {ceviri_en}")

OUT.write_text(json.dumps(entries, ensure_ascii=False, indent=2), encoding="utf-8")
print(f"\nKaydedildi: {OUT}")
print(f"Dosya boyutu: {OUT.stat().st_size / 1024 / 1024:.1f} MB")

print("\n=== ORNEK 3 MADDE ===")
for t, d in list(entries.items())[:3]:
    print(f"\n{t}:")
    print(f"  IPA: {d['ipa']}")
    print(f"  Roots: {d['roots']}")
    print(f"  Tanim: {(d['definition'] or '')[:80]}")
    print(f"  RU: {d['translations']['ru']}")
    print(f"  EN: {d['translations']['en']}")
    print(f"  Ornekler: {len(d['examples'])} adet")
    for ex in d['examples'][:2]:
        print(f"    - {ex[:80]}")