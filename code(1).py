import os
import re
import json
from dataclasses import dataclass, asdict
from typing import List, Dict, Any, Optional

@dataclass
class DerivedWord:
    word: str
    gloss: str
    literal_meaning: str = ""

@dataclass
class WordFamily:
    root: str
    core_meanings: List[str]
    semantic_chain: List[str]
    derived_words: List[DerivedWord]
    metrics: Optional[Dict[str, int]] = None


class SomaticFamilyParser:
    """
    006-word-families.md dosyasındaki tüm kelime ailelerini ayrıştırarak
    hedeflenen tam JSON formatına dönüştüren sınıftır.
    """

    def __init__(self, file_path: str):
        self.file_path = file_path

    def parse(self) -> List[Dict[str, Any]]:
        """
        Markdown içeriğini okur, satır sonlarını normalize eder ve
        tüm ailelerin JSON listesini döndürür.
        """
        if not os.path.exists(self.file_path):
            raise FileNotFoundError(f"Dosya bulunamadı: {self.file_path}")

        with open(self.file_path, "r", encoding="utf-8") as f:
            content = f.read()

        # Windows satır sonu (\r\n) sorununu çözme
        content = content.replace("\r\n", "\n")

        families = self._parse_families(content)
        return [asdict(fam) for fam in families]

    def _parse_families(self, content: str) -> List[WordFamily]:
        families: List[WordFamily] = []
        
        # '## Family' başlıklarına göre içeriği bloklara ayırma
        family_blocks = re.split(r'(?m)^##\s+Family\s+', content)[1:]

        for block in family_blocks:
            lines = [l.strip() for l in block.split('\n') if l.strip()]
            if not lines:
                continue

            # 1. Kök (Root) Ayrıştırma (Örn: "001 - гу" -> "гу")
            header_line = lines[0]
            parts = header_line.split('-')
            root = parts[1].strip() if len(parts) > 1 else header_line.strip()

            # 2. Temel Anlamlar (Core Meaning / Meanings)
            core_section = re.search(r'###\s+Core Meaning[s]?\s*\n(.*?)(?=\n###|\n---|$)', block, re.DOTALL | re.IGNORECASE)
            core_meanings: List[str] = []
            if core_section:
                for line in core_section.group(1).split('\n'):
                    line = line.strip()
                    if line.startswith('-') or line.startswith('*'):
                        clean_line = line.lstrip('-*').strip()
                        if clean_line:
                            core_meanings.append(clean_line)

            # 3. Semantik Zincir (Semantic Expansion / Chain)
            expansion_section = re.search(r'###\s+Semantic (?:Expansion|Chain)\s*\n(.*?)(?=\n###|\n---|$)', block, re.DOTALL | re.IGNORECASE)
            semantic_chain: List[str] = []
            if expansion_section:
                semantic_chain = [
                    item.strip() 
                    for item in expansion_section.group(1).split('↓') 
                    if item.strip()
                ]

            # 4. Türetilmiş Kelimeler (Derived Forms / Words)
            derived_words: List[DerivedWord] = []
            derived_section = re.search(r'###\s+Derived (?:Forms|Words)\s*\n(.*?)(?=\n###|\n---|$)', block, re.DOTALL | re.IGNORECASE)
            if derived_section:
                for line in derived_section.group(1).split('\n'):
                    line = line.strip()
                    if line.startswith('*') or line.startswith('-'):
                        # Kelime ve kalan metni ayırma
                        m_base = re.search(r'[\*\-]\s*\*\*`([^`]+)`\*\*\s*→\s*(.*)', line)
                        if m_base:
                            word = m_base.group(1).strip()
                            rest = m_base.group(2).strip()

                            # Literal anlam var mı kontrol etme
                            lit_match = re.search(r'\(literal:\s*([^)]+)\)', rest, re.IGNORECASE)
                            if lit_match:
                                literal = lit_match.group(1).strip()
                                gloss = re.sub(r'\(literal:\s*[^)]+\)', '', rest, flags=re.IGNORECASE).strip()
                            else:
                                literal = ""
                                gloss = rest

                            derived_words.append(DerivedWord(
                                word=word,
                                gloss=gloss,
                                literal_meaning=literal
                            ))

            # 5. Metrikler / İstatistikler (Statistics / Metrics)
            stats_section = re.search(r'###\s+(?:Statistics|Metrics)\s*\n(.*?)(?=\n###|\n---|$)', block, re.DOTALL | re.IGNORECASE)
            metrics: Dict[str, int] = {}
            if stats_section:
                for line in stats_section.group(1).split('\n'):
                    line = line.strip()
                    if line.startswith('-') or line.startswith('*'):
                        stat_match = re.search(r'[\-\*]\s*(.*?)\s*=\s*(\d+)', line)
                        if stat_match:
                            metrics[stat_match.group(1).strip()] = int(stat_match.group(2))

            families.append(WordFamily(
                root=root,
                core_meanings=core_meanings,
                semantic_chain=semantic_chain,
                derived_words=derived_words,
                metrics=metrics if metrics else None
            ))

        return families


if __name__ == "__main__":
    SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
    PROJECT_ROOT = os.path.abspath(os.path.join(SCRIPT_DIR, "..", ".."))
    
    # archive/resource klasör dizini
    doc_path = os.path.join(PROJECT_ROOT, "archive", "resource", "006-word-families.md")
    json_output_path = os.path.join(SCRIPT_DIR, "word_families_parsed.json")

    print(f"📂 Okunan Dosya: {doc_path}")
    
    try:
        parser = SomaticFamilyParser(doc_path)
        result = parser.parse()

        with open(json_output_path, "w", encoding="utf-8") as f:
            json.dump(result, f, ensure_ascii=False, indent=2)

        print(f"✅ Başarılı: Toplam {len(result)} aile ayrıştırıldı ve '{json_output_path}' dosyasına yazıldı.")
    except Exception as e:
        print(f"❌ Hata Oluştu: {e}")