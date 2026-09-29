# -*- coding: utf-8 -*-
"""ADR-0017 ve ADR-0018 durumlarini ACCEPTED yap"""

from pathlib import Path
from datetime import datetime

BASE = Path(r"E:\projeler\Cerkesce")
ADR = BASE / "docs" / "architecture" / "adr"

# ADR dosyalari
adr_files = {
    "ADR-0017-WORDFAMILY-CONCEPT-MAPPING.md": "ADR-0017",
    "ADR-0018-WORDFAMILYRESOLVER-SCOPE-BOUNDARY.md": "ADR-0018",
}

for fname, adr_id in adr_files.items():
    path = ADR / fname
    if not path.exists():
        print(f"[YOK] {fname}")
        continue

    with open(path, encoding="utf-8") as f:
        content = f.read()

    # Durumu degistir
    eski = "**Durum:** PROPOSED"
    yeni = f"**Durum:** ACCEPTED\n**Kabul Tarihi:** {datetime.now():%Y-%m-%d}"

    if eski in content:
        content = content.replace(eski, yeni, 1)
        with open(path, "w", encoding="utf-8") as f:
            f.write(content)
        print(f"[GUNCELLENDI] {fname}: PROPOSED -> ACCEPTED")
    else:
        # Farkli format dene
        if "Durum: PROPOSED" in content:
            content = content.replace("Durum: PROPOSED",
                                     f"Durum: ACCEPTED\nKabul Tarihi: {datetime.now():%Y-%m-%d}", 1)
            with open(path, "w", encoding="utf-8") as f:
                f.write(content)
            print(f"[GUNCELLENDI] {fname}: PROPOSED -> ACCEPTED (farkli format)")
        else:
            print(f"[ATLA] {fname}: 'PROPOSED' bulunamadi")

print("\n[***] ADR DURUMLARI GUNCELLENDI! ***")