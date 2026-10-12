import json
import re
from pathlib import Path
from collections import defaultdict

# 1. Corpus dosyalarını bul
corpus_dir = Path("data/corpus/raw")
jsonl_files = list(corpus_dir.glob("circassian_*.jsonl"))
print(f"Corpus dosyası: {len(jsonl_files)}")

# 2. Inverted index oluştur
index = defaultdict(list)
sentences = []

sentence_id = 0
for jsonl_file in jsonl_files:
    print(f"İşleniyor: {jsonl_file.name}")
    with jsonl_file.open(encoding="utf-8") as f:
        for line in f:
            try:
                data = json.loads(line)
                for key, value in data.items():
                    if isinstance(value, str):
                        sentences.append(value)
                        # Kelimelere ayır (Kiril + Latin + rakam)
                        words = re.findall(r'[\wӀӏ]+', value.lower())
                        for word in words:
                            if len(word) > 2:
                                index[word].append(sentence_id)
                        sentence_id += 1
            except:
                pass

print(f"\nToplam cümle: {len(sentences)}")
print(f"Benzersiz kelime: {len(index)}")

# 3. Index'i kaydet
index_path = Path("data/corpus/inverted-index.json")
index_path.write_text(json.dumps(dict(index), ensure_ascii=False), encoding="utf-8")
print(f"✅ Index kaydedildi: {index_path}")

# 4. Sentences'i kaydet
sent_path = Path("data/corpus/sentences.json")
sent_path.write_text(json.dumps(sentences, ensure_ascii=False), encoding="utf-8")
print(f"✅ Cümleler kaydedildi: {sent_path}")
