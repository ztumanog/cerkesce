import csv
import html
import json
from pathlib import Path
import re
import sys
import unicodedata

# Windows PowerShell / CMD ekranında Çerkesçe/Kiril karakterlerin bozulmasını önler
if hasattr(sys.stdout, "reconfigure"):
  sys.stdout.reconfigure(encoding="utf-8")


class KabardianRootsQuery:

  def __init__(self, data_dir=None):
    if data_dir is None:
      script_dir = Path(__file__).parent
      possible_paths = [
          Path(r"e:\projeler\Cerkesce\public\data"),
          script_dir.parent.parent / "public" / "data",
          script_dir / "public" / "data",
          script_dir,
      ]
      self.data_dir = script_dir
      for p in possible_paths:
        if p.exists() and p.is_dir():
          self.data_dir = p
          break
    else:
      self.data_dir = Path(data_dir)

    print(f"📂 Veri klasörü: {self.data_dir.absolute()}")
    self.words = []
    self._load_all_json()

  @staticmethod
  def _normalize_text(text: str) -> str:
    """Çerkesçe Kiril metinleri ve Paloçka (Ӏ) karakterlerini standart hale getirir.

    İngilizce 'I', 'l', '1' veya farklı Unicode Paloçka çeşitlerini tek bir
    standart Çerkesçe Paloçka (U+04C0) karakterine dönüştürür.
    """
    if not text:
      return ""

    # 1. Unicode Karakter Normalizasyonu (NFC)
    normalized = unicodedata.normalize("NFC", text)

    # 2. Farklı yazılan Paloçka karakterlerini Standart Çerkesçe Paloçka'ya (Ӏ) çevir
    # (Latin I, Latin l, Rakam 1, Küçük Paloçka ӏ, Ukrayna І vs.)
    palochka_regex = r"[I|l|1|ӏ|Ӏ|І|і]"
    normalized = re.sub(palochka_regex, "Ӏ", normalized)

    return normalized.strip().lower()

  @staticmethod
  def _clean_html(raw_html: str) -> str:
    if not raw_html:
      return ""
    unescaped = html.unescape(raw_html)
    clean_text = re.sub(r"<[^>]+>", " ", unescaped)
    return " ".join(clean_text.split())

  def _load_all_json(self):
    json_files = list(self.data_dir.glob("*.json"))
    if not json_files:
      print(
          f"⚠️ Klasörde hiç .json dosyası bulunamadı: {self.data_dir.absolute()}"
      )
      return

    for file in json_files:
      try:
        with open(file, encoding="utf-8") as f:
          data = json.load(f)
          loaded_count = 0

          if isinstance(data, dict) and "words" in data:
            dict_title = data.get("title", file.stem)
            for key_spelling, entry in data["words"].items():
              if not isinstance(entry, dict):
                continue

              spelling = (
                  entry.get("spelling") or key_spelling or ""
              ).strip()
              if not spelling:
                spelling = "Bilinmeyen"

              meanings = []
              definitions = entry.get("definitions", [])
              if isinstance(definitions, list) and len(definitions) > 0:
                for d in definitions:
                  if (
                      isinstance(d, dict)
                      and "meaning" in d
                      and d["meaning"]
                  ):
                    meanings.append(d["meaning"])

              html_def = entry.get("full_definition_in_html", "")
              if html_def:
                cleaned_meaning = self._clean_html(html_def)
                if cleaned_meaning and cleaned_meaning not in meanings:
                  meanings.append(cleaned_meaning)

              if entry.get("meaning_primary") and entry.get(
                  "meaning_primary"
              ) not in meanings:
                meanings.append(entry.get("meaning_primary"))

              primary_meaning = meanings[0] if meanings else ""
              secondary_meaning = (
                  " | ".join(meanings[1:]) if len(meanings) > 1 else ""
              )

              self.words.append({
                  "source": dict_title,
                  "spelling": spelling,
                  # Arama performansı için normalize edilmiş kelime
                  "normalized_spelling": self._normalize_text(spelling),
                  "type": entry.get("type", ""),
                  "meaning_primary": primary_meaning,
                  "meaning_secondary": secondary_meaning,
                  "all_meanings": meanings,
                  "compounds": entry.get("compounds", []),
              })
              loaded_count += 1

          elif isinstance(data, dict) and "root_categories" in data:
            for cat in data["root_categories"]:
              cat_name = cat.get("category_name", "")
              for item in cat.get("primary_roots", []):
                spelling = item.get("root", "")
                self.words.append({
                    "source": cat_name,
                    "spelling": spelling,
                    "normalized_spelling": self._normalize_text(spelling),
                    "type": "root",
                    "meaning_primary": item.get("meaning_primary", ""),
                    "meaning_secondary": item.get("meaning_secondary", ""),
                    "all_meanings": [
                        item.get("meaning_primary", ""),
                        item.get("meaning_secondary", ""),
                    ],
                    "compounds": item.get("compounds", []),
                })
                loaded_count += 1

          elif isinstance(data, list):
            for item in data:
              if isinstance(item, dict):
                spelling = (
                    item.get("spelling")
                    or item.get("root")
                    or item.get("kelime")
                    or ""
                )
                meaning = (
                    item.get("meaning")
                    or item.get("meaning_primary")
                    or ""
                )
                self.words.append({
                    "source": file.stem,
                    "spelling": spelling,
                    "normalized_spelling": self._normalize_text(spelling),
                    "type": "",
                    "meaning_primary": meaning,
                    "meaning_secondary": "",
                    "all_meanings": [meaning],
                    "compounds": item.get("compounds", []),
                })
                loaded_count += 1

          print(f"✅ [{file.name}] yüklendi -> {loaded_count} kelime eklendi.")

      except Exception as e:
        print(f"⚠️ [{file.name}] yüklenirken hata oluştu: {e}")

    print(f"\n📊 Toplam {len(self.words)} kelime veritabanına aktarıldı.\n")

  def search_word(self, query: str, search_in_meanings: bool = False):
    """Normalize edilmiş kelime araması yapar."""
    q_norm = self._normalize_text(query)

    if not q_norm:
      return []

    results = []
    for w in self.words:
      # 1. Kelimenin kendisinde arama yap (Normalize edilmiş)
      if q_norm in w["normalized_spelling"]:
        results.append(w)
      # 2. İsteğe bağlı: Anlamlarda arama yap
      elif search_in_meanings:
        meanings_str = " ".join(w["all_meanings"]).lower()
        if q_norm in meanings_str:
          results.append(w)

    return results

  def export_to_csv(self, filename="tum_kelimeler.csv"):
    if not self.words:
      print("⚠️ Kelime bulunamadığı için CSV oluşturulamadı.")
      return

    filepath = self.data_dir / filename
    with open(filepath, "w", encoding="utf-8-sig", newline="") as f:
      writer = csv.writer(f)
      writer.writerow(
          ["Kaynak", "Kelime/Kök", "Tür", "Birincil Anlam", "Diğer Anlamlar"]
      )
      for w in self.words:
        writer.writerow([
            w["source"],
            w["spelling"],
            w["type"],
            w["meaning_primary"],
            w["meaning_secondary"],
        ])
    print(f"📁 CSV dosyası oluşturuldu: {filepath.absolute()}")


if __name__ == "__main__":
  engine = KabardianRootsQuery()

  if engine.words:
    print("--- Kelime Araması Örneği ('щӀэ') ---")
    # İster klavyeden Latin 'I' ile 'щIэ', ister Kiril 'щӀэ' yazın, normalize edilerek doğru eşleşir.
    results = engine.search_word("щӀэ")
    for r in results[:10]:
      print(f"• {r['spelling']} ({r['source']}) -> {r['meaning_primary']}")

    # CSV olarak kaydet
    engine.export_to_csv()