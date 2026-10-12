import sys
sys.stdout.reconfigure(encoding="utf-8")
import json
from pathlib import Path

sr_path = Path("public/data/linguistic/semantic_relations.json")
if sr_path.exists():
    sr = json.loads(sr_path.read_text(encoding="utf-8"))
    print(f"Toplam semantic relation: {len(sr)}")
    if sr:
        print(f"\nOrnek kayit:")
        print(json.dumps(sr[0], ensure_ascii=False, indent=2))
        print(f"\nEvidence tasiyan: {len([r for r in sr if r.get('evidence')])}")
        print(f"Confidence tasiyan: {len([r for r in sr if r.get('confidence')])}")
        print(f"Source tasiyan: {len([r for r in sr if r.get('source')])}")
else:
    print("semantic_relations.json bulunamadi")
